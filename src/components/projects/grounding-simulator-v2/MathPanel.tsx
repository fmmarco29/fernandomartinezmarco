'use client'
import { BayesianNode } from './types'
import { Sigma, Info } from 'lucide-react'

interface MathPanelProps {
    node: BayesianNode | null
}

const MathPanel = ({ node }: MathPanelProps) => {
    if (!node) return (
        <div style={{ padding: 8, color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontSize: 9, border: '1px dashed #1e293b', borderRadius: 4, background: 'rgba(15, 23, 42, 0.2)' }}>
            SELECT NODE IN DAG FOR MATH
        </div>
    )

    return (
        <div className="math-panel" style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: 4, padding: '10px 12px', border: '1px solid #1e293b', maxHeight: '35vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: '#4AA3FF' }}>
                <Sigma size={14} />
                <h3 style={{ fontSize: 10, fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>Inference Metadata: {node.label}</h3>
            </div>

            <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>GOVERNING PRINCIPLE / DESCRIPTION</div>
                <div style={{ fontSize: 10, color: '#fff', lineHeight: 1.3 }}>{node.description}</div>
            </div>

            <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>MATHEMATICAL ABSTRACTION</div>
                <div style={{ background: '#000', padding: '6px 10px', borderRadius: 4, fontFamily: 'monospace', fontSize: 11, color: '#00ff88', border: '1px solid #1e293b' }}>
                    {node.formula}
                </div>
            </div>

            {node.weights && (
                <div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>CAUSAL WEIGHTS (P(X|Parents))</div>
                    {Object.entries(node.weights).map(([parentId, weight]) => (
                        <div key={parentId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>→ {parentId.replace('_', ' ')}</span>
                            <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.1)', margin: '0 12px' }}>
                                <div style={{ height: '100%', background: '#4AA3FF', width: `${weight * 100}%` }} />
                            </div>
                            <span style={{ fontSize: 10, color: '#4AA3FF', fontWeight: 700, fontFamily: 'monospace' }}>{weight.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MathPanel
