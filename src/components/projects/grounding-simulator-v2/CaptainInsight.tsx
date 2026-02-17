'use client'
import { BayesianNode } from './types'
import { AlertCircle, AlertTriangle, CheckCircle, Navigation } from 'lucide-react'

interface CaptainInsightProps {
    nodes: BayesianNode[]
}

const CaptainInsight = ({ nodes }: CaptainInsightProps) => {
    const getTopInference = () => {
        const structuralFailure = nodes.find(n => n.id === 'structural_failure')
        const capsizingRisk = nodes.find(n => n.id === 'capsizing_risk')
        const lngRelease = nodes.find(n => n.id === 'lng_release')

        const maxProb = Math.max(
            structuralFailure?.probability || 0,
            capsizingRisk?.probability || 0,
            lngRelease?.probability || 0
        )
        // Improved ETA calculation: non-linear decay for professional realism.
        const eta = Math.max(1, Math.round(120 * Math.exp(-4 * maxProb)))

        if (structuralFailure?.state === 'critical' || (structuralFailure && structuralFailure.probability > 0.6)) {
            return {
                icon: <AlertCircle size={24} color="#ff4d4d" />,
                text: `STRUCTURAL SURVIVABILITY: ${eta} MIN`,
                severity: 'critical' as const,
                recommendation: 'TRIGGER ABANDON SHIP — ULS reached.',
                eta
            }
        }

        if (capsizingRisk?.state === 'critical' || (capsizingRisk && capsizingRisk.probability > 0.5)) {
            return {
                icon: <AlertCircle size={24} color="#ff4d4d" />,
                text: `TIME TO CAPSIZING: ${eta} MIN`,
                severity: 'critical' as const,
                recommendation: 'PRE-EMPTIVE EVACUATION — GZ reserve failing.',
                eta
            }
        }

        if (lngRelease?.state === 'warning' || (lngRelease && lngRelease.probability > 0.4)) {
            return {
                icon: <AlertTriangle size={24} color="#ffa500" />,
                text: `ABANDON SHIP WINDOW: ${eta} MIN`,
                severity: 'warning' as const,
                recommendation: 'SAFEGUARD CREW — LNG dispersal risk.',
                eta
            }
        }

        return {
            icon: <CheckCircle size={24} color="#00ff88" />,
            text: `ESTIMATED ABANDON WINDOW: ${eta} MIN`,
            severity: 'safe' as const,
            recommendation: 'Operational safety within margins. Monitor GZ curve.',
            eta
        }
    }

    const insight = getTopInference()

    return (
        <div className="captain-insight" style={{
            padding: '10px 12px',
            borderRadius: 4,
            border: '1px solid #1e293b',
            background: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            gap: 10
        }}>
            {/* Technical Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Navigation size={10} color="rgba(255,255,255,0.4)" />
                <h3 style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, margin: 0 }}>
                    STRATEGIC COMMAND REPORT
                </h3>
            </div>

            {/* Status Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flexShrink: 0 }}>{insight.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
                    {insight.text}
                </div>
            </div>

            {/* Recommendation Box (Matches User Photo) */}
            <div style={{
                padding: '8px 10px',
                borderRadius: 2,
                background: '#000',
                color: insight.severity === 'critical' ? '#ff4d4d' : '#ffa500',
                fontSize: 10,
                lineHeight: 1.4,
                borderLeft: `3px solid ${insight.severity === 'critical' ? '#ff4d4d' : '#ffa500'}`,
                fontFamily: 'monospace',
                display: 'flex',
                gap: 8
            }}>
                <span style={{ opacity: 0.8 }}>{'>'}</span>
                <span>{insight.recommendation}</span>
            </div>
        </div>
    )
}

export default CaptainInsight
