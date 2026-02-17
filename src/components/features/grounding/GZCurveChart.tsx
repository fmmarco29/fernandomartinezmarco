'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { BayesianNode, SensorReading } from './types'

const GZCurveChart = ({ nodes, readings, currentTime }: { nodes: BayesianNode[], readings: SensorReading[], currentTime?: number }) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const stabilityNode = nodes.find(n => n.id === 'stability_loss')
    const stabilityLoss = stabilityNode ? stabilityNode.probability : 0

    // Generación de datos ultra-simpleizada
    const chartData = []
    for (let h = 0; h <= 80; h += 5) {
        const rad = (h * Math.PI) / 180
        const gm = 3.5
        const intactGZ = gm * Math.sin(rad) * Math.cos(rad * 0.5)
        const currentGZ = intactGZ * (1 - stabilityLoss * 0.7)
        chartData.push({
            heel: h,
            intact: Number(intactGZ.toFixed(2)),
            current: Number(currentGZ.toFixed(2))
        })
    }

    const currentHeelReading = readings.find(r => r.sensor.toLowerCase().includes('heel'))
    const currentHeel = currentHeelReading ? currentHeelReading.value : 0
    const currentHeelVal = typeof currentHeel === 'string' ? parseFloat(currentHeel) : currentHeel

    // Calculations for the informative panels
    const gmValue = (3.5 * (1 - stabilityLoss * 0.4)).toFixed(2)
    const maxGZValue = Math.max(...chartData.map(d => d.current))
    const rangeVal = 80 * (1 - stabilityLoss * 0.6)
    const dynamicStability = (maxGZValue * (rangeVal / 57.3) * 0.5).toFixed(3) // Simplified integral

    if (!mounted) return <div style={{ height: 350, background: '#0a0f18' }} />

    return (
        <div style={{
            width: '100%',
            background: '#0a0f18',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: stabilityLoss > 0.6 ? '#ff4d4d' : '#4AA3FF' }} />
                    <span style={{ color: '#fff', fontSize: '10px', fontWeight: 900, letterSpacing: '0.15em' }}>HYDROSTATIC REPORT</span>
                </div>
                <div style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid #1e293b',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 6
                }}>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '7px', fontWeight: 800 }}>RESIDUAL_CAPACITY</span>
                    <span style={{
                        color: stabilityLoss > 0.8 ? '#ff4d4d' : stabilityLoss > 0.4 ? '#ffa500' : '#4AA3FF',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        fontWeight: 900,
                        textShadow: stabilityLoss > 0.8 ? '0 0 8px rgba(255,77,77,0.3)' : 'none'
                    }}>
                        {((1 - stabilityLoss) * 100).toFixed(1)}%
                    </span>
                </div>
            </div>

            <div style={{ width: '100%', height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="1 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="heel"
                            stroke="rgba(255,255,255,0.2)"
                            fontSize={9}
                            tick={{ fill: 'rgba(255,255,255,0.4)' }}
                            ticks={[0, 20, 40, 60, 80]}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.2)"
                            fontSize={9}
                            tick={{ fill: 'rgba(255,255,255,0.4)' }}
                            domain={[0, 4]}
                        />
                        <Tooltip
                            contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', fontSize: '9px', borderRadius: 4 }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="intact"
                            stroke="rgba(0, 255, 136, 0.4)"
                            strokeWidth={1}
                            strokeDasharray="3 3"
                            dot={false}
                            name="Intact GZ"
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="current"
                            stroke={stabilityLoss > 0.7 ? '#ff4d4d' : '#4AA3FF'}
                            strokeWidth={2.5}
                            dot={false}
                            name="Damaged GZ"
                            isAnimationActive={false}
                        />
                        <ReferenceLine
                            x={currentHeelVal}
                            stroke="#ff9100"
                            strokeWidth={1.5}
                            strokeDasharray="5 2"
                            label={{ value: `HEEL: ${currentHeelVal.toFixed(1)}°`, position: 'top', fill: '#ff9100', fontSize: 7, fontWeight: 900 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Informative Panels / Banners */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', padding: '6px 8px', borderRadius: 4 }}>
                    <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Metacentric Height (GM)</div>
                    <div style={{ fontSize: '11px', color: '#00ff88', fontWeight: '900', fontFamily: 'monospace' }}>{gmValue} m</div>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', padding: '6px 8px', borderRadius: 4 }}>
                    <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Righting Arm (Max GZ)</div>
                    <div style={{ fontSize: '11px', color: '#fff', fontWeight: '900', fontFamily: 'monospace' }}>{maxGZValue.toFixed(2)} m</div>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', padding: '6px 8px', borderRadius: 4 }}>
                    <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Vanishing Angle</div>
                    <div style={{ fontSize: '11px', color: stabilityLoss > 0.5 ? '#ff4d4d' : '#4AA3FF', fontWeight: '900', fontFamily: 'monospace' }}>{rangeVal.toFixed(1)}°</div>
                </div>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', padding: '6px 8px', borderRadius: 4 }}>
                    <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Dynamic Stability</div>
                    <div style={{ fontSize: '11px', color: '#ffa500', fontWeight: '900', fontFamily: 'monospace' }}>{dynamicStability} m·rad</div>
                </div>
            </div>

            <div style={{
                background: stabilityLoss > 0.6 ? 'rgba(255, 77, 77, 0.1)' : 'rgba(74, 163, 255, 0.1)',
                border: `1px solid ${stabilityLoss > 0.6 ? '#ff4d4d' : '#4AA3FF'}`,
                padding: '5px 10px',
                borderRadius: 2,
                marginTop: '4px',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '8px', color: stabilityLoss > 0.6 ? '#ff4d4d' : '#4AA3FF', fontWeight: 'bold' }}>
                    STATUS: {stabilityLoss > 0.8 ? 'UNSTABLE_ULS_EXCEEDED' : stabilityLoss > 0.5 ? 'WARNING_MARGINAL_STABILITY' : 'OPERATIONAL_NORMAL'}
                </div>
            </div>
        </div>
    )
}

export default GZCurveChart
