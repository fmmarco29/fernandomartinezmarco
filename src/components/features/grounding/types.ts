// Bayesian Network Types for v2 - Technical Dashboard Edition
export type NodeState = 'safe' | 'warning' | 'critical'
export type NodeType = 'environment' | 'structure' | 'stability' | 'consequence'
export type AlertLevel = 'low' | 'medium' | 'high' | 'critical' | undefined

export interface BayesianNode {
    id: string
    label: string
    type: NodeType
    probability: number
    state: NodeState
    parents: string[]
    description?: string
    formula?: string
    weights?: Record<string, number> // Parent ID -> Weight
}

export interface BayesianEdge {
    source: string
    target: string
    strength: number
}

export interface SensorReading {
    timestamp: number
    sensor: string
    value: number | string
    unit?: string
    alert?: AlertLevel
    nodeId?: string
}

export interface Milestone {
    timestamp: number
    label: string
    description: string
    severity: 'info' | 'warning' | 'critical'
}

export interface GroundingScenario {
    id: string
    name: string
    description: string
    duration: number
    events: SensorReading[]
    milestones: Milestone[]
    initialNodeStates?: Record<string, number>
}
