'use client'
import { useEffect, useRef, useState } from 'react'
import { BayesianNode, BayesianEdge } from './types'
import { getNodeColor, getProbabilityColor } from './bayesianEngine'

interface BayesianNetworkDAGProps {
    nodes: BayesianNode[]
    edges: BayesianEdge[]
    onSelectNode: (node: BayesianNode) => void
    selectedNodeId: string | null
}

const BayesianNetworkDAG = ({ nodes, edges, onSelectNode, selectedNodeId }: BayesianNetworkDAGProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

    useEffect(() => {
        if (!containerRef.current) return
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                })
            }
        }
        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    // Optimized virtual space for stable rendering
    const virtualW = 600
    const virtualH = 520

    const getNodePosition = (node: BayesianNode) => {
        const typeOrder = ['environment', 'structure', 'stability', 'consequence']
        const colIndex = typeOrder.indexOf(node.type)
        const colNodes = nodes.filter(n => n.type === node.type)
        const indexInGroup = colNodes.findIndex(n => n.id === node.id)

        const xSpace = virtualW / typeOrder.length
        const x = (colIndex + 0.5) * xSpace

        const topMargin = 95
        const rowGap = 90
        const y = topMargin + (indexInGroup * rowGap)

        return { x, y }
    }

    // Helper to calculate the point where the line intersects the node rectangle
    const getClampedPoint = (start: { x: number, y: number }, end: { x: number, y: number }, isSource: boolean) => {
        const boxW = 125
        const boxH = 52
        const halfW = boxW / 2
        const halfH = boxH / 2

        const dx = end.x - start.x
        const dy = end.y - start.y

        if (dx === 0 && dy === 0) return start

        // Use the sign of dx/dy to determine which side we hit
        // Since it's a grid, most connections are horizontal-ish
        const scaleX = dx !== 0 ? halfW / Math.abs(dx) : Infinity
        const scaleY = dy !== 0 ? halfH / Math.abs(dy) : Infinity
        const scale = Math.min(scaleX, scaleY)

        if (isSource) {
            return {
                x: start.x + dx * scale,
                y: start.y + dy * scale
            }
        } else {
            return {
                x: end.x - dx * scale,
                y: end.y - dy * scale
            }
        }
    }

    return (
        <div className="bayesian-network-dag" ref={containerRef} style={{ background: '#0a111a', borderRadius: 4, overflow: 'hidden', height: '100%', border: '1px solid #1e293b', position: 'relative' }}>
            {/* Technical Header */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                padding: '8px 12px',
                background: 'rgba(10, 17, 26, 0.95)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                zIndex: 10
            }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4AA3FF', boxShadow: '0 0 10px #4AA3FF' }} />
                <span style={{ fontSize: '10px', fontWeight: '900', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em' }}>
                    BAYESIAN_PROBABILISTIC_NETWORK
                </span>
            </div>

            {/* Engineering Grid Background */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }} />

            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${virtualW} ${virtualH}`}
                preserveAspectRatio="xMidYMin meet"
                style={{ position: 'relative', zIndex: 1, marginTop: '40px' }}
            >
                <defs>
                    <marker id="arrowhead-tech" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
                        <polygon points="0 0, 5 2, 0 4" fill="rgba(74, 163, 255, 0.7)" />
                    </marker>
                </defs>

                {/* Column Titles */}
                {['Inputs', 'Structural', 'Stability', 'Outcome'].map((label, i) => (
                    <text
                        key={i}
                        x={(i + 0.5) * (virtualW / 4)}
                        y={50}
                        textAnchor="middle"
                        fill="rgba(255, 255, 255, 0.5)"
                        fontSize="12px"
                        fontWeight="900"
                        letterSpacing="0.2em"
                    >
                        {label.toUpperCase()}
                    </text>
                ))}

                {/* Connections */}
                <g>
                    {edges.map((edge) => {
                        const source = nodes.find(n => n.id === edge.source)
                        const target = nodes.find(n => n.id === edge.target)
                        if (!source || !target) return null

                        const sCenter = getNodePosition(source)
                        const tCenter = getNodePosition(target)

                        const p1 = getClampedPoint(sCenter, tCenter, true)
                        const p2 = getClampedPoint(sCenter, tCenter, false)

                        // Prevent NaN coordinates
                        if (isNaN(p1.x) || isNaN(p1.y) || isNaN(p2.x) || isNaN(p2.y)) return null

                        return (
                            <line
                                key={`${edge.source}-${edge.target}`}
                                x1={p1.x} y1={p1.y}
                                x2={p2.x} y2={p2.y}
                                stroke="rgba(74, 163, 255, 0.55)"
                                strokeWidth={2}
                                markerEnd="url(#arrowhead-tech)"
                            />
                        )
                    })}
                </g>

                {/* Blocks */}
                <g>
                    {nodes.map((node) => {
                        const pos = getNodePosition(node)
                        const color = getNodeColor(node.state)
                        const isSelected = selectedNodeId === node.id
                        const boxW = 125
                        const boxH = 52

                        return (
                            <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`} onClick={() => onSelectNode(node)} style={{ cursor: 'pointer' }}>
                                <rect
                                    x={-boxW / 2}
                                    y={-boxH / 2}
                                    width={boxW}
                                    height={boxH}
                                    fill={isSelected ? 'rgba(74, 163, 255, 0.12)' : '#0d1520'}
                                    stroke={isSelected ? '#4AA3FF' : 'rgba(255,255,255,0.08)'}
                                    strokeWidth={isSelected ? 1.5 : 1}
                                    rx={2}
                                />
                                <rect x={-boxW / 2} y={-boxH / 2} width={4} height={boxH} fill={color} />

                                <text x={0} y={-6} textAnchor="middle" fill="#ffffff" fontSize="10px" fontWeight="700">
                                    {node.label.toUpperCase()}
                                </text>
                                <text x={0} y={12} textAnchor="middle" fill={color} fontSize="14px" fontWeight="900" fontFamily="monospace">
                                    {(node.probability * 100).toFixed(1)}%
                                </text>

                                <rect x={-boxW / 2 + 10} y={20} width={boxW - 20} height={2} fill="rgba(255,255,255,0.05)" />
                                <rect x={-boxW / 2 + 10} y={20} width={(boxW - 20) * node.probability} height={2} fill={getProbabilityColor(node.probability)} />
                            </g>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}

export default BayesianNetworkDAG
