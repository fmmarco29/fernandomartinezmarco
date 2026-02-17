'use client'
import { BayesianNode } from './types'
import CaptainInsight from './CaptainInsight'
interface DecisionPanelProps {
    nodes: BayesianNode[]
}

const DecisionPanel = ({ nodes }: DecisionPanelProps) => {
    return (
        <div className="decision-panel" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CaptainInsight nodes={nodes} />
        </div>
    )
}

export default DecisionPanel
