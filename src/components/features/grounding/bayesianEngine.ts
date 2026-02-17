import { BayesianNode } from './types'

// ---------------------------------------------------------------------------
// Constants & Configuration
// ---------------------------------------------------------------------------

const PROBABILITY_EPSILON = 1e-9
const DEFAULT_EDGE_STRENGTH = 0.5
const DEFAULT_DAMPENING = 0.3
const MAX_CONVERGENCE_ITERATIONS = 100
const CONVERGENCE_THRESHOLD = 1e-6

// ---------------------------------------------------------------------------
// Supporting Types
// ---------------------------------------------------------------------------

export type NodeState = 'safe' | 'warning' | 'critical'

export interface StateThresholds {
    /** Probability below this value is considered safe. Default 0.3 */
    safeBelow: number
    /** Probability below this value is considered warning. Default 0.7 */
    warningBelow: number
}

export interface PropagationOptions {
    /**
     * Dampening factor in [0, 1]. Higher values produce smoother transitions
     * at the cost of slower convergence. Default 0.3.
     */
    dampening?: number
    /**
     * When true, the engine iterates updates until the network converges
     * rather than performing a single forward pass. Useful for graphs with
     * feedback paths after cycle-breaking.
     */
    iterateToConvergence?: boolean
    /** Node IDs whose probabilities are treated as hard evidence (pinned). */
    evidenceNodes?: Set<string>
    /** Custom state classification thresholds. */
    thresholds?: StateThresholds
}

export interface NetworkUpdateResult {
    nodes: BayesianNode[]
    /** Number of forward-pass iterations performed. */
    iterations: number
    /** True if the network reached a stable state within the iteration limit. */
    converged: boolean
    /** Maximum probability delta observed in the final iteration. */
    finalDelta: number
}

export interface ValidationResult {
    valid: boolean
    errors: string[]
    warnings: string[]
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Validates structural and probabilistic integrity of a Bayesian network.
 * Returns a structured result with errors that prevent execution and warnings
 * that indicate potential modelling issues.
 */
export function validateNetwork(
    nodes: BayesianNode[],
    edgeStrengths: Map<string, number>
): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const ids = new Set(nodes.map(n => n.id))

    nodes.forEach(node => {
        if (node.probability < 0 || node.probability > 1) {
            errors.push(
                `Node "${node.id}" has an out-of-range probability: ${node.probability}. Must be in [0, 1].`
            )
        }

        node.parents.forEach(parentId => {
            if (!ids.has(parentId)) {
                errors.push(
                    `Node "${node.id}" references unknown parent "${parentId}".`
                )
            }
        })
    })

    edgeStrengths.forEach((strength, key) => {
        if (strength < 0 || strength > 1) {
            warnings.push(
                `Edge "${key}" has strength ${strength} outside [0, 1]. Values will be clamped during inference.`
            )
        }
    })

    const cycleResult = detectCycles(nodes)
    if (cycleResult.hasCycles) {
        warnings.push(
            `Network contains ${cycleResult.cycles.length} cycle(s): ` +
            cycleResult.cycles.map(c => c.join(' -> ')).join('; ') +
            '. Belief propagation will approximate by ignoring back-edges.'
        )
    }

    return { valid: errors.length === 0, errors, warnings }
}

// ---------------------------------------------------------------------------
// Graph Analysis
// ---------------------------------------------------------------------------

interface CycleDetectionResult {
    hasCycles: boolean
    cycles: string[][]
}

/**
 * Detects cycles in the directed graph using depth-first search with
 * three-color marking (white / grey / black).
 */
function detectCycles(nodes: BayesianNode[]): CycleDetectionResult {
    const WHITE = 0, GREY = 1, BLACK = 2
    const color = new Map<string, number>(nodes.map(n => [n.id, WHITE]))
    const nodeMap = new Map(nodes.map(n => [n.id, n]))
    const cycles: string[][] = []

    function dfs(id: string, path: string[]): void {
        color.set(id, GREY)
        const node = nodeMap.get(id)
        if (!node) return

        node.parents.forEach(parentId => {
            const parentColor = color.get(parentId)
            if (parentColor === GREY) {
                const cycleStart = path.indexOf(parentId)
                cycles.push([...path.slice(cycleStart), parentId])
            } else if (parentColor === WHITE) {
                dfs(parentId, [...path, parentId])
            }
        })

        color.set(id, BLACK)
    }

    nodes.forEach(node => {
        if (color.get(node.id) === WHITE) {
            dfs(node.id, [node.id])
        }
    })

    return { hasCycles: cycles.length > 0, cycles }
}

/**
 * Returns nodes in topological order (ancestors before descendants) using
 * Kahn's algorithm. Back-edges that would create cycles are silently skipped,
 * allowing approximate inference on networks with feedback.
 */
function topologicalSort(nodes: BayesianNode[]): BayesianNode[] {
    const nodeMap = new Map(nodes.map(n => [n.id, n]))
    const { cycles } = detectCycles(nodes)

    const cycleEdges = new Set<string>()
    cycles.forEach(cycle => {
        if (cycle.length >= 2) {
            cycleEdges.add(`${cycle[cycle.length - 1]}->${cycle[0]}`)
        }
    })

    const forwardParents = new Map<string, string[]>()
    const inDegree = new Map<string, number>()

    nodes.forEach(node => {
        const parents = node.parents.filter(
            parentId => !cycleEdges.has(`${parentId}->${node.id}`)
        )
        forwardParents.set(node.id, parents)
        inDegree.set(node.id, parents.length)
    })

    const queue: string[] = []
    inDegree.forEach((degree, id) => {
        if (degree === 0) queue.push(id)
    })

    const sorted: BayesianNode[] = []

    while (queue.length > 0) {
        const id = queue.shift()!
        const node = nodeMap.get(id)
        if (!node) continue
        sorted.push(node)

        nodes.forEach(candidate => {
            const parents = forwardParents.get(candidate.id) ?? []
            if (parents.includes(id)) {
                const newDegree = (inDegree.get(candidate.id) ?? 0) - 1
                inDegree.set(candidate.id, newDegree)
                if (newDegree === 0) queue.push(candidate.id)
            }
        })
    }

    const sortedIds = new Set(sorted.map(n => n.id))
    nodes.forEach(n => { if (!sortedIds.has(n.id)) sorted.push(n) })

    return sorted
}

// ---------------------------------------------------------------------------
// Core Inference
// ---------------------------------------------------------------------------

/**
 * Computes the posterior probability of a node given the current state of its
 * parents, using the Noisy-OR model.
 *
 * The Noisy-OR model assumes each parent independently activates the child
 * with a causal strength s_i. The probability that no parent activates the
 * child is the product of (1 - p_i * s_i) over all parents. The posterior is
 * 1 minus that product, blended with the node's prior via a leak term that
 * captures unmodelled causal background factors.
 *
 * Reference: Pearl, J. (1988). Probabilistic Reasoning in Intelligent Systems.
 */
export function computeNoisyORPosterior(
    node: BayesianNode,
    nodeMap: Map<string, BayesianNode>,
    edgeStrengths: Map<string, number>,
    dampening: number = DEFAULT_DAMPENING
): number {
    if (node.parents.length === 0) {
        return node.probability
    }

    let inhibitionProduct = 1.0

    node.parents.forEach(parentId => {
        const parent = nodeMap.get(parentId)
        if (!parent) return

        const edgeKey = `${parentId}->${node.id}`
        const strength = clamp(edgeStrengths.get(edgeKey) ?? DEFAULT_EDGE_STRENGTH, 0, 1)
        inhibitionProduct *= 1 - parent.probability * strength
    })

    const noisyORProbability = 1 - inhibitionProduct

    // Leak term: the node's prior represents background activation probability
    const leak = node.probability * (1 - dampening)
    const combined = noisyORProbability + leak * (1 - noisyORProbability)

    return clamp(
        node.probability * dampening + combined * (1 - dampening),
        0,
        1
    )
}

/**
 * Performs a single forward pass over the network, updating each node's
 * probability in topological order.
 */
function forwardPass(
    nodes: BayesianNode[],
    edgeStrengths: Map<string, number>,
    options: Required<Pick<PropagationOptions, 'dampening' | 'evidenceNodes' | 'thresholds'>>
): { nodes: BayesianNode[]; maxDelta: number } {
    const sorted = topologicalSort(nodes)
    const nodeMap = new Map<string, BayesianNode>(sorted.map(n => [n.id, { ...n }]))

    let maxDelta = 0

    sorted.forEach(original => {
        const node = nodeMap.get(original.id)!

        if (options.evidenceNodes.has(node.id)) {
            node.state = classifyState(node.probability, options.thresholds)
            return
        }

        const updatedProbability = computeNoisyORPosterior(
            node,
            nodeMap,
            edgeStrengths,
            options.dampening
        )

        const delta = Math.abs(updatedProbability - node.probability)
        if (delta > maxDelta) maxDelta = delta

        node.probability = updatedProbability
        node.state = classifyState(node.probability, options.thresholds)
        nodeMap.set(node.id, node)
    })

    return { nodes: Array.from(nodeMap.values()), maxDelta }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Updates all nodes in the Bayesian network and returns a detailed result.
 *
 * For directed acyclic graphs, a single topological forward pass is sufficient.
 * When `iterateToConvergence` is true, the engine repeats passes until the
 * maximum probability change falls below CONVERGENCE_THRESHOLD or the
 * iteration limit is reached — useful for networks with feedback approximations.
 */
export function updateBayesianNetwork(
    nodes: BayesianNode[],
    edgeStrengths: Map<string, number>,
    options: PropagationOptions = {}
): NetworkUpdateResult {
    const {
        dampening = DEFAULT_DAMPENING,
        iterateToConvergence = false,
        evidenceNodes = new Set<string>(),
        thresholds = { safeBelow: 0.3, warningBelow: 0.7 },
    } = options

    const passOptions = { dampening, evidenceNodes, thresholds }

    let current = nodes.map(n => ({ ...n }))
    let iterations = 0
    let converged = false
    let finalDelta = Infinity

    do {
        const { nodes: updated, maxDelta } = forwardPass(current, edgeStrengths, passOptions)
        finalDelta = maxDelta
        current = updated
        iterations++

        if (finalDelta < CONVERGENCE_THRESHOLD) {
            converged = true
            break
        }
    } while (iterateToConvergence && iterations < MAX_CONVERGENCE_ITERATIONS)

    if (!iterateToConvergence) converged = true

    return { nodes: current, iterations, converged, finalDelta }
}

/**
 * Estimates the marginal sensitivity of a target node's probability with
 * respect to each potential ancestor, using finite-difference perturbation.
 * Returns a map from node ID to sensitivity coefficient in [0, 1].
 */
export function computeSensitivity(
    targetNodeId: string,
    nodes: BayesianNode[],
    edgeStrengths: Map<string, number>,
    delta: number = 0.01
): Map<string, number> {
    const sensitivity = new Map<string, number>()
    const baseResult = updateBayesianNetwork(nodes, edgeStrengths)
    const baseNode = baseResult.nodes.find(n => n.id === targetNodeId)

    if (!baseNode) return sensitivity

    const baseProbability = baseNode.probability

    nodes.forEach(candidate => {
        if (candidate.id === targetNodeId) return

        const perturbed = nodes.map(n =>
            n.id === candidate.id
                ? { ...n, probability: clamp(n.probability + delta, 0, 1) }
                : { ...n }
        )

        const perturbedResult = updateBayesianNetwork(perturbed, edgeStrengths)
        const perturbedTarget = perturbedResult.nodes.find(n => n.id === targetNodeId)
        if (!perturbedTarget) return

        const dP = (perturbedTarget.probability - baseProbability) / delta
        if (Math.abs(dP) > PROBABILITY_EPSILON) {
            sensitivity.set(candidate.id, clamp(Math.abs(dP), 0, 1))
        }
    })

    return sensitivity
}

/**
 * Injects hard evidence by pinning a set of node probabilities and propagating
 * downstream effects through the network. Evidence nodes are never overwritten
 * by inference.
 */
export function injectEvidence(
    evidence: Map<string, number>,
    nodes: BayesianNode[],
    edgeStrengths: Map<string, number>,
    options: Omit<PropagationOptions, 'evidenceNodes'> = {}
): NetworkUpdateResult {
    const evidenceNodes = new Set(evidence.keys())
    const updatedNodes = nodes.map(n =>
        evidence.has(n.id) ? { ...n, probability: clamp(evidence.get(n.id)!, 0, 1) } : { ...n }
    )

    return updateBayesianNetwork(updatedNodes, edgeStrengths, {
        ...options,
        evidenceNodes,
        iterateToConvergence: true,
    })
}

// ---------------------------------------------------------------------------
// State Classification & Visual Utilities
// ---------------------------------------------------------------------------

/**
 * Classifies a probability value into a discrete operational state.
 */
export function classifyState(
    probability: number,
    thresholds: StateThresholds = { safeBelow: 0.3, warningBelow: 0.7 }
): NodeState {
    if (probability < thresholds.safeBelow) return 'safe'
    if (probability < thresholds.warningBelow) return 'warning'
    return 'critical'
}

/** @deprecated Use `classifyState` for configurable thresholds. */
export function getNodeState(probability: number): NodeState {
    return classifyState(probability)
}

const STATE_COLORS: Record<NodeState, string> = {
    safe: '#00ff88',
    warning: '#ffa500',
    critical: '#ff4444',
}

/** Returns the canonical display color for a given node state. */
export function getNodeColor(state: NodeState): string {
    return STATE_COLORS[state]
}

/**
 * Returns an interpolated hex color between safe and critical based on raw
 * probability, providing continuous visual feedback rather than discrete jumps.
 */
export function getProbabilityColor(probability: number): string {
    const p = clamp(probability, 0, 1)
    if (p < 0.3) return interpolateHex('#00ff88', '#ffa500', p / 0.3)
    return interpolateHex('#ffa500', '#ff4444', (p - 0.3) / 0.7)
}

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------

/**
 * Updates a single node's probability given its parents without a full network
 * rebuild. Intended for lightweight targeted recalculations only.
 *
 * @deprecated Prefer `updateBayesianNetwork` for correct propagation ordering.
 */
export function updateNodeProbability(
    node: BayesianNode,
    nodes: BayesianNode[],
    edgeStrengths: Map<string, number>,
    dampening: number = DEFAULT_DAMPENING
): number {
    if (node.parents.length === 0) return node.probability
    const nodeMap = new Map(nodes.map(n => [n.id, n]))
    return computeNoisyORPosterior(node, nodeMap, edgeStrengths, dampening)
}

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
}

function hexToRgb(hex: string): [number, number, number] {
    const n = parseInt(hex.replace('#', ''), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function interpolateHex(from: string, to: string, t: number): string {
    const [r1, g1, b1] = hexToRgb(from)
    const [r2, g2, b2] = hexToRgb(to)
    const r = Math.round(r1 + (r2 - r1) * t)
    const g = Math.round(g1 + (g2 - g1) * t)
    const b = Math.round(b1 + (b2 - b1) * t)
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`
}
