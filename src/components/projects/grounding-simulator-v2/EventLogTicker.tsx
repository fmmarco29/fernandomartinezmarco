'use client'
import { BayesianNode, SensorReading, Milestone } from './types'
import { Activity, Flag, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'

interface SensorTickerProps {
    readings: SensorReading[]
    maxDisplay?: number
}

export const EventLogTicker = ({ readings, maxDisplay = 10 }: SensorTickerProps) => {
    const getAlertColor = (level: string | undefined) => {
        switch (level) {
            case 'critical': return '#ff0000'
            case 'high': return '#ff4444'
            case 'medium': return '#ffa500'
            case 'low': return '#4AA3FF'
            default: return '#00ff88'
        }
    }

    return (
        <div className="event-log-ticker" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: 6 }}>
            <div className="ticker-header" style={{ marginBottom: 4 }}>
                <Activity size={10} />
                <h4 style={{ fontSize: 9, fontWeight: 700, color: '#4AA3FF', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>TELEMETERED EVENTS</h4>
            </div>
            <div className="log-content" style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
                {readings.length === 0 ? (
                    <div className="log-empty">Awaiting sensor data streams...</div>
                ) : (
                    [...readings].reverse().map((reading, i) => (
                        <div key={`event-${i}`} className="log-entry" style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 11 }}>
                            <span className="log-prefix" style={{ color: '#4AA3FF', fontWeight: 700, marginRight: 8 }}>
                                T+{(reading.timestamp / 1000).toFixed(1)}s
                            </span>
                            <span style={{ color: 'white' }}>{reading.sensor}:</span>
                            <span style={{ color: reading.alert === 'critical' || reading.alert === 'high' ? '#ff4d4d' : '#00ff88', marginLeft: 6, fontWeight: 600 }}>
                                {reading.value} {reading.unit}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

interface MilestonePanelProps {
    milestones: Milestone[]
}

export const MilestonePanel = ({ milestones }: MilestonePanelProps) => {
    return (
        <div className="milestone-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: 6 }}>
            <div className="ticker-header" style={{ marginBottom: 6 }}>
                <Flag size={10} />
                <h4 style={{ fontSize: 9, fontWeight: 700, color: '#4AA3FF', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>STRUCTURAL MILESTONES</h4>
            </div>
            <div className="log-content" style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
                {milestones.length === 0 ? (
                    <div className="log-empty">No critical milestones recorded.</div>
                ) : (
                    [...milestones].reverse().map((m, i) => (
                        <div key={`m-${i}`} className="milestone-entry" style={{
                            padding: '6px 8px', marginBottom: 6, borderRadius: 4,
                            background: m.severity === 'critical' ? 'rgba(255,0,0,0.08)' : 'rgba(0,124,240,0.08)',
                            borderLeft: `2px solid ${m.severity === 'critical' ? '#ff4d4d' : '#4AA3FF'}`,
                            border: `1px solid ${m.severity === 'critical' ? 'rgba(255,0,0,0.2)' : 'rgba(0,124,240,0.2)'}`
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: 9, fontWeight: 800, color: m.severity === 'critical' ? '#ff4d4d' : '#4AA3FF', textTransform: 'uppercase' }}>{m.label}</span>
                                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>T+{(m.timestamp / 1000).toFixed(1)}s</span>
                            </div>
                            <div style={{ fontSize: 12, color: 'white', lineHeight: 1.4, fontWeight: 400 }}>{m.description}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
