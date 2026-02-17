'use client'
import { useState, useEffect, useRef } from 'react'
import ScenarioControls from './ScenarioControls'
import BayesianNetworkDAG from './BayesianNetworkDAG'
import DecisionPanel from './DecisionPanel'
import MathPanel from './MathPanel'
import GZCurveChart from './GZCurveChart'
import InferenceConsole from './InferenceConsole'
import { MilestonePanel, EventLogTicker } from './EventLogTicker'
import { lngGroundingNodes, lngGroundingEdges, scenarios } from './data/lngGroundingNetwork'
import { BayesianNode, SensorReading, Milestone, GroundingScenario } from './types'
import { updateBayesianNetwork } from './bayesianEngine'
import { Activity, ShieldAlert, Cpu } from 'lucide-react'

export default function BentoGridSimulator() {
    const [selectedScenario, setSelectedScenario] = useState<GroundingScenario>(scenarios[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [simulationTime, setSimulationTime] = useState(0)
    const [nodes, setNodes] = useState<BayesianNode[]>(lngGroundingNodes)
    const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([])
    const [activeMilestones, setActiveMilestones] = useState<Milestone[]>([])
    const [selectedNode, setSelectedNode] = useState<BayesianNode | null>(null)
    const [inferenceLogs, setInferenceLogs] = useState<string[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const processedEventsRef = useRef<Set<string>>(new Set()) // Changed to string for unique keys
    const isMountedRef = useRef(false) // Prevent duplicate execution in StrictMode

    const edgeStrengthMap = new Map(lngGroundingEdges.map(e => [`${e.source}->${e.target}`, e.strength]))

    useEffect(() => {
        if (!isPlaying) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return
        }

        intervalRef.current = setInterval(() => {
            setSimulationTime(prev => {
                const newTime = prev + 100
                if (newTime > selectedScenario.duration) {
                    setIsPlaying(false)
                    return prev
                }

                const newEvents = selectedScenario.events.filter(e => e.timestamp > prev && e.timestamp <= newTime)
                if (newEvents.length > 0) {
                    // Filter out already processed events using unique key (timestamp + sensor)
                    const unprocessedEvents = newEvents.filter(ev => {
                        const eventKey = `${ev.timestamp}-${ev.sensor}`
                        return !processedEventsRef.current.has(eventKey)
                    })

                    if (unprocessedEvents.length > 0) {
                        // Add synthetic heel angle data for stability visualization
                        const syntheticHeelData = unprocessedEvents
                            .filter(ev => ev.nodeId === 'compartment_flooding' || ev.nodeId === 'stability_loss')
                            .map((ev, idx) => ({
                                timestamp: ev.timestamp + idx + 50,
                                sensor: 'Heel Angle',
                                value: `${(2 + Math.random() * 5).toFixed(1)}° STBD`,
                                alert: 'medium' as const,
                                unit: '°',
                                nodeId: 'capsizing_risk'
                            }))

                        setSensorReadings(current => [...current, ...unprocessedEvents, ...syntheticHeelData])

                        setNodes(prevNodes => {
                            let updated = [...prevNodes]
                            unprocessedEvents.forEach(ev => {
                                const node = updated.find(n => ev.nodeId ? n.id === ev.nodeId : n.label.toLowerCase().includes(ev.sensor.toLowerCase().split(' ')[0]))
                                if (node) {
                                    node.probability = Math.min(0.95, node.probability + 0.08)
                                }
                            })
                            const result = updateBayesianNetwork(updated, edgeStrengthMap)
                            return result.nodes
                        })

                        setInferenceLogs(prevLogs => {
                            const newLogs = unprocessedEvents.map(ev =>
                                `[${(ev.alert || 'info').toUpperCase()}] ${ev.sensor}: ${ev.value} → ${ev.nodeId}`
                            )
                            return [...prevLogs.slice(-(40 - newLogs.length)), ...newLogs]
                        })

                        // Mark events as processed using unique key
                        unprocessedEvents.forEach(ev => {
                            const eventKey = `${ev.timestamp}-${ev.sensor}`
                            processedEventsRef.current.add(eventKey)
                        })
                    }
                }

                const newMilestones = selectedScenario.milestones.filter(m => m.timestamp > prev && m.timestamp <= newTime)
                if (newMilestones.length > 0) {
                    setActiveMilestones(current => [...current, ...newMilestones])
                    setInferenceLogs(prevLogs => [
                        ...prevLogs.slice(-49),
                        `[MILESTONE] CRITICAL STATE: ${newMilestones[0].label.toUpperCase()}`
                    ])
                }

                return newTime
            })
        }, 100)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            isMountedRef.current = false
        }
    }, [isPlaying, selectedScenario])

    const handleScenarioChange = (scenarioId: string) => {
        const scenario = scenarios.find(s => s.id === scenarioId)
        if (scenario) {
            setSelectedScenario(scenario)
            setSimulationTime(0)
            setSensorReadings([])
            setActiveMilestones([])
            setNodes(lngGroundingNodes)
            setInferenceLogs([])
            setSelectedNode(null)
            setIsPlaying(false)
            processedEventsRef.current.clear() // Reset processed events tracker
        }
    }

    return (
        <div className="scientific-dashboard" style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr 340px',
            gridTemplateRows: '28px 1fr 18px',
            gap: '4px',
            background: '#04070a',
            padding: '4px',
            color: '#e2e8f0',
            height: '800px',
            width: '100%',
            fontFamily: 'Inter, monospace',
            overflow: 'visible',
            boxSizing: 'border-box',
            fontSize: '9px'
        }}>
            {/* Header: Global Metadata */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '4px 12px', borderRadius: 2, border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ShieldAlert size={14} color="#4AA3FF" />
                    <h1 style={{ fontSize: 10, fontWeight: 900, margin: 0, letterSpacing: '0.1em' }}>LNG_GROUNDING_DSS</h1>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 8, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: 2, fontSize: 7 }}>PRESS [F11] FOR FULLSCREEN</span>
                    <span>SIM_CLOCK: T+{(simulationTime / 1000).toFixed(2)}s</span>
                    <span>FRAME: 10Hz</span>
                </div>
            </div>
            {/* Column 1: Scenarios & Milestones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%', minWidth: 0, overflow: 'hidden' }}>
                <div style={{ background: '#0f172a', borderRadius: 2, border: '1px solid #1e293b', padding: 4, flexShrink: 0 }}>
                    <ScenarioControls
                        scenarios={scenarios.map(s => ({ id: s.id, name: s.name, description: s.description }))}
                        selectedScenario={selectedScenario.id}
                        onScenarioChange={handleScenarioChange}
                        isPlaying={isPlaying}
                        onTogglePlay={() => setIsPlaying(!isPlaying)}
                    />
                </div>
                <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: 2, border: '1px solid #1e293b' }}>
                    <MilestonePanel milestones={activeMilestones} />
                </div>
            </div>

            {/* Column 2: DAG & Real-time Math Log */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%', minWidth: 0, overflow: 'hidden' }}>
                <div style={{ height: 450, minHeight: 0, background: '#0a111a', borderRadius: 2, border: '1px solid #1e293b' }}>
                    <BayesianNetworkDAG
                        nodes={nodes}
                        edges={lngGroundingEdges}
                        onSelectNode={setSelectedNode}
                        selectedNodeId={selectedNode?.id || null}
                    />
                </div>
                <div style={{ flex: '0 0 200px', minHeight: 0, overflow: 'hidden' }}>
                    <InferenceConsole logs={inferenceLogs} />
                </div>
            </div>

            {/* Column 3: Calculations & Stability */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%', minWidth: 0, overflow: 'hidden' }}>
                <div style={{ flexShrink: 0 }}>
                    <MathPanel node={nodes.find(n => n.id === selectedNode?.id) || null} />
                </div>
                <div style={{ background: '#0f172a', borderRadius: 2, border: '1px solid #1e293b', padding: 4, flexShrink: 0 }}>
                    <DecisionPanel nodes={nodes} />
                </div>
                {/* GZ Curve - Full Remaining Space with min height for Recharts */}
                <div style={{ flex: 1, minHeight: 300, background: '#0f172a', borderRadius: 2, border: '1px solid #1e293b', padding: 8, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <GZCurveChart nodes={nodes} currentTime={simulationTime} readings={sensorReadings} />
                </div>
            </div>

            {/* Bottom Bar: Operational Status */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 20, padding: '4px 12px', background: '#000', fontSize: 9, color: 'rgba(255,165,0,0.8)', border: '1px solid rgba(255,165,0,0.2)', borderRadius: 2 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Cpu size={10} /> DBN_SOLVER: ACTIVE
                </span>
                <span>DATA_STREAM: NOMINAL</span>
                <span>PROB_UPDATE_CYCLE: 100ms</span>
                <span style={{ marginLeft: 'auto' }}>FERNANDO_MARTINEZ_AI-DRIVEN_NAVAL_ARCHITECTURE</span>
            </div>
        </div>
    )
}
