'use client'
import { Play, Pause, RefreshCw } from 'lucide-react'

interface Scenario {
    id: string
    name: string
    description: string
}

interface ScenarioControlsProps {
    scenarios: Scenario[]
    selectedScenario: string
    onScenarioChange: (id: string) => void
    isPlaying: boolean
    onTogglePlay: () => void
}

export default function ScenarioControls({
    scenarios,
    selectedScenario,
    onScenarioChange,
    isPlaying,
    onTogglePlay
}: ScenarioControlsProps) {
    const selected = scenarios.find(s => s.id === selectedScenario) || scenarios[0]

    return (
        <div className="scenario-controls-industrial">
            <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, marginBottom: 6 }}>Context</div>
                <h2 style={{ fontSize: 13, color: '#fff', margin: '0 0 4px 0', fontWeight: 700 }}>{selected.name}</h2>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, margin: 0 }}>{selected.description}</p>
            </div>

            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                <button
                    onClick={onTogglePlay}
                    style={{
                        flex: 1,
                        background: isPlaying ? 'rgba(255,77,77,0.1)' : 'rgba(0,255,136,0.1)',
                        border: `1px solid ${isPlaying ? '#ff4d4d' : '#00ff88'}`,
                        color: isPlaying ? '#ff4d4d' : '#00ff88',
                        padding: '4px',
                        borderRadius: 3,
                        fontSize: 9,
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4
                    }}
                >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    {isPlaying ? 'ABORT SESSION' : 'ENGAGE SIMULATION'}
                </button>
                <button
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        width: '28px',
                        borderRadius: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => window.location.reload()}
                >
                    <RefreshCw size={12} />
                </button>
            </div>

            <div>
                <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 4 }}>Scenarios</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {scenarios.map(s => (
                        <button
                            key={s.id}
                            onClick={() => onScenarioChange(s.id)}
                            style={{
                                width: '100%',
                                padding: '3px 6px',
                                fontSize: 8,
                                background: selectedScenario === s.id ? 'rgba(74, 163, 255, 0.15)' : 'transparent',
                                border: `1px solid ${selectedScenario === s.id ? '#4AA3FF' : 'rgba(255,255,255,0.05)'}`,
                                color: selectedScenario === s.id ? '#4AA3FF' : 'rgba(255,255,255,0.4)',
                                borderRadius: 2,
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.1s'
                            }}
                        >
                            {s.id.toUpperCase().replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
