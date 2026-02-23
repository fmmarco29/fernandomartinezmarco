'use client'

import React from 'react'
import { motion } from 'framer-motion'

const HybridArchitectureVisual = () => {
    // ANN Layers configuration
    const layers = [
        { id: 'input', count: 4, label: 'Sensory Input' },
        { id: 'hidden', count: 6, label: 'Deep Features' },
        { id: 'output', count: 3, label: 'Current Profile' }
    ]

    // Bayesian Nodes
    const bayesianNodes = [
        { id: 'bn1', label: 'Top Stress', x: 750, y: 150, prob: 0.85 },
        { id: 'bn2', label: 'Fatigue Damage', x: 820, y: 300, prob: 0.92 },
        { id: 'bn3', label: 'TDP Health', x: 750, y: 450, prob: 0.78 }
    ]

    return (
        <div className="hybrid-visual-container" style={{
            width: '100%',
            height: '500px',
            background: 'rgba(5, 10, 18, 0.4)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            overflow: 'hidden',
            position: 'relative',
            margin: '40px 0'
        }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                {/* Connection Lines for ANN */}
                <defs>
                    <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0071e3" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#4AA3FF" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Neural Network Connections */}
                {layers.map((layer, i) => {
                    if (i === layers.length - 1) return null;
                    const nextLayer = layers[i + 1];
                    return Array.from({ length: layer.count }).map((_, srcIdx) => (
                        Array.from({ length: nextLayer.count }).map((_, destIdx) => (
                            <motion.line
                                key={`link-${i}-${srcIdx}-${destIdx}`}
                                x1={100 + i * 200}
                                y1={300 - (layer.count - 1) * 30 + srcIdx * 60}
                                x2={100 + (i + 1) * 200}
                                y2={300 - (nextLayer.count - 1) * 30 + destIdx * 60}
                                stroke="url(#neural-gradient)"
                                strokeWidth="1"
                                initial={{ opacity: 0.1 }}
                                animate={{
                                    opacity: [0.1, 0.4, 0.1],
                                    strokeWidth: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))
                    ))
                })}

                {/* Neural Nodes */}
                {layers.map((layer, i) => (
                    <g key={`layer-${layer.id}`}>
                        {Array.from({ length: layer.count }).map((_, idx) => (
                            <motion.circle
                                key={`node-${layer.id}-${idx}`}
                                cx={100 + i * 200}
                                cy={300 - (layer.count - 1) * 30 + idx * 60}
                                r="6"
                                fill={i === 2 ? "#4AA3FF" : "#0071e3"}
                                filter="url(#glow)"
                                animate={{
                                    r: [6, 8, 6],
                                    fillOpacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.5 + idx * 0.2
                                }}
                            />
                        ))}
                        <text
                            x={100 + i * 200}
                            y={550}
                            textAnchor="middle"
                            fill="rgba(255,255,255,0.4)"
                            fontSize="12"
                            className="font-mono"
                        >
                            {layer.label}
                        </text>
                    </g>
                ))}

                {/* Bridge to Bayesian */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <motion.path
                        key={`bridge-${i}`}
                        d={`M 500 ${240 + i * 60} C 600 ${240 + i * 60}, 650 ${bayesianNodes[i].y}, ${bayesianNodes[i].x} ${bayesianNodes[i].y}`}
                        stroke="rgba(74, 163, 255, 0.3)"
                        strokeDasharray="5,5"
                        fill="none"
                        animate={{ strokeDashoffset: [0, -20] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                ))}

                {/* Bayesian Nodes */}
                {bayesianNodes.map((bn) => (
                    <motion.g
                        key={bn.id}
                        animate={{
                            y: [0, -10, 0],
                            x: [0, 5, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Outer Ring */}
                        <circle
                            cx={bn.x}
                            cy={bn.y}
                            r="40"
                            fill="none"
                            stroke="rgba(0, 255, 136, 0.2)"
                            strokeWidth="2"
                        />
                        {/* Probability Arc */}
                        <motion.circle
                            cx={bn.x}
                            cy={bn.y}
                            r="40"
                            fill="none"
                            stroke="#00ff88"
                            strokeWidth="3"
                            strokeDasharray={`${bn.prob * 251}, 251`}
                            initial={{ rotate: -90 }}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Inner Circle */}
                        <circle
                            cx={bn.x}
                            cy={bn.y}
                            r="32"
                            fill="rgba(0, 255, 136, 0.1)"
                        />
                        <text
                            x={bn.x}
                            y={bn.y - 5}
                            textAnchor="middle"
                            fill="#00ff88"
                            fontSize="14"
                            fontWeight="bold"
                        >
                            {(bn.prob * 100).toFixed(0)}%
                        </text>
                        <text
                            x={bn.x}
                            y={bn.y + 15}
                            textAnchor="middle"
                            fill="rgba(255,255,255,0.6)"
                            fontSize="10"
                            style={{ textTransform: 'uppercase' }}
                        >
                            {bn.label}
                        </text>
                    </motion.g>
                ))}
            </svg>

            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                textAlign: 'right'
            }}>
                <div style={{ color: '#00ff88', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.1em' }}>HYBRID_INFERENCE_ENGINE</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '8px' }}>ANN + DIGITAL_TWIN</div>
            </div>
        </div>
    )
}

export default HybridArchitectureVisual
