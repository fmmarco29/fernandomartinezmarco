'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Wind, Anchor, Target, AlertCircle, Radio, Cpu, Navigation, Plus, MapPin } from 'lucide-react'

// Simulation engine with progressive updates
class ClientDriftSimulator {
    static simulate(params: {
        lkp: [number, number],
        wind: { speed: number, direction: number },
        current: { speed: number, direction: number },
        hours: number,
        particles: number,
        uncertainty: number,
        evidence?: Array<{ lat: number, lon: number, confidence: number }>
    }) {
        const { lkp, wind, current, hours, particles, uncertainty, evidence = [] } = params
        const results: Array<{ lat: number, lon: number, weight: number }> = []

        const leewaySlope = 0.03
        const leewayOffset = 0.02

        for (let i = 0; i < particles; i++) {
            const windSpeedNoise = wind.speed * (1 + (Math.random() - 0.5) * uncertainty)
            const currentSpeedNoise = current.speed * (1 + (Math.random() - 0.5) * uncertainty)
            const leewaySpeed = windSpeedNoise * leewaySlope + leewayOffset

            const windRad = (wind.direction * Math.PI) / 180
            const currentRad = (current.direction * Math.PI) / 180

            const dn = (Math.cos(windRad) * leewaySpeed + Math.cos(currentRad) * currentSpeedNoise) * hours
            const de = (Math.sin(windRad) * leewaySpeed + Math.sin(currentRad) * currentSpeedNoise) * hours

            const finalLat = lkp[0] + (dn / 60.0)
            const finalLon = lkp[1] + (de / (60.0 * Math.cos((lkp[0] * Math.PI) / 180)))

            // Bayesian weight adjustment based on evidence
            let weight = 1.0
            if (evidence.length > 0) {
                evidence.forEach(ev => {
                    const dist = Math.sqrt(Math.pow(finalLat - ev.lat, 2) + Math.pow(finalLon - ev.lon, 2))
                    weight *= (1 + ev.confidence * Math.exp(-dist * 100))
                })
            }

            results.push({ lat: finalLat, lon: finalLon, weight })
        }

        // Normalize weights
        const totalWeight = results.reduce((sum, p) => sum + p.weight, 0)
        results.forEach(p => p.weight /= totalWeight)

        return results
    }

    static analyzeDistribution(particles: Array<{ lat: number, lon: number, weight: number }>) {
        const totalWeight = particles.reduce((sum, p) => sum + p.weight, 0)

        const meanLat = particles.reduce((sum, p) => sum + p.lat * p.weight, 0) / totalWeight
        const meanLon = particles.reduce((sum, p) => sum + p.lon * p.weight, 0) / totalWeight

        const varLat = particles.reduce((sum, p) => sum + Math.pow(p.lat - meanLat, 2) * p.weight, 0) / totalWeight
        const varLon = particles.reduce((sum, p) => sum + Math.pow(p.lon - meanLon, 2) * p.weight, 0) / totalWeight

        const stdLat = Math.sqrt(varLat)
        const stdLon = Math.sqrt(varLon)

        const confidenceRadiusNm = stdLat * 60 * 1.96
        const spreadKm2 = Math.PI * Math.pow(confidenceRadiusNm * 1.852, 2)

        const aspect = Math.max(stdLat, stdLon) / Math.min(stdLat, stdLon)
        const eccentricity = 1 - (1 / aspect)

        const entropy = -particles.reduce((sum, p) => {
            if (p.weight > 0) return sum + p.weight * Math.log(p.weight)
            return sum
        }, 0)

        return {
            centerLat: meanLat,
            centerLon: meanLon,
            confidenceRadiusNm,
            spreadKm2,
            eccentricity,
            entropy,
            stdLat,
            stdLon
        }
    }

    static recommendPattern(eccentricity: number, spreadKm2: number) {
        if (eccentricity > 0.7) return { pattern: 'Parallel Sweep', spacing_nm: 1.5, assets: { uav: 2, helicopter: 1 } }
        if (spreadKm2 > 500) return { pattern: 'Creeping Line', spacing_nm: 2.0, assets: { uav: 1, fixed_wing: 1, surface: 2 } }
        if (eccentricity < 0.4) return { pattern: 'Expanding Square', spacing_nm: 1.2, assets: { uav: 3, helicopter: 1 } }
        return { pattern: 'Sector Search', spacing_nm: 1.8, assets: { uav: 2, helicopter: 2, surface: 1 } }
    }
}

const scenarios = [
    {
        id: 'north_sea',
        name: 'North Sea High-Wind',
        lkp: [54.30, 3.15],
        wind: { speed: 35, direction: 270 },
        current: { speed: 2.8, direction: 45 },
        waterTemp: 8,
        seaState: 6
    },
    {
        id: 'mediterranean',
        name: 'Mediterranean Multi-LKP',
        lkp: [38.45, 15.20],
        wind: { speed: 12, direction: 135 },
        current: { speed: 0.8, direction: 90 },
        waterTemp: 18,
        seaState: 3
    },
    {
        id: 'atlantic',
        name: 'Atlantic Deep-Water',
        lkp: [43.50, -28.40],
        wind: { speed: 45, direction: 220 },
        current: { speed: 1.5, direction: 60 },
        waterTemp: 12,
        seaState: 8
    }
]

export default function InteractiveSARDashboard() {
    const [selectedScenario, setSelectedScenario] = useState(scenarios[0])
    const [craftType, setCraftType] = useState<'life_raft' | 'lifeboat' | 'debris'>('life_raft')
    const [hoursElapsed, setHoursElapsed] = useState(4)
    const [uncertaintyMargin, setUncertaintyMargin] = useState(0.1)
    const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'complete'>('idle')
    const [particles, setParticles] = useState<Array<{ lat: number, lon: number, weight: number }>>([])
    const [currentProgress, setCurrentProgress] = useState(0)
    const [analysis, setAnalysis] = useState<any>(null)
    const [recommendation, setRecommendation] = useState<any>(null)
    const [evidence, setEvidence] = useState<Array<{ lat: number, lon: number, confidence: number, label: string }>>([])
    const [showEvidenceInput, setShowEvidenceInput] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<any>(null)

    const runSimulation = () => {
        setSimulationState('running')
        setCurrentProgress(0)
        setParticles([])

        const totalParticles = 2000
        const batchSize = 40
        const totalBatches = Math.ceil(totalParticles / batchSize)
        const intervalTime = (90000) / totalBatches // 1.5 minutes total

        let currentBatch = 0
        let allParticles: Array<{ lat: number, lon: number, weight: number }> = []

        animationRef.current = setInterval(() => {
            if (currentBatch >= totalBatches) {
                clearInterval(animationRef.current)

                const analysisResults = ClientDriftSimulator.analyzeDistribution(allParticles)
                const rec = ClientDriftSimulator.recommendPattern(analysisResults.eccentricity, analysisResults.spreadKm2)

                setAnalysis(analysisResults)
                setRecommendation(rec)
                setSimulationState('complete')
                setCurrentProgress(100)
                return
            }

            const batchParticles = ClientDriftSimulator.simulate({
                lkp: selectedScenario.lkp as [number, number],
                wind: selectedScenario.wind,
                current: selectedScenario.current,
                hours: hoursElapsed,
                particles: batchSize,
                uncertainty: uncertaintyMargin,
                evidence: evidence
            })

            allParticles = [...allParticles, ...batchParticles]
            setParticles(allParticles)

            currentBatch++
            setCurrentProgress((currentBatch / totalBatches) * 100)
        }, intervalTime)
    }

    const addEvidence = (lat: number, lon: number, confidence: number, label: string) => {
        setEvidence([...evidence, { lat, lon, confidence, label }])
        setShowEvidenceInput(false)
    }

    // Canvas rendering with map background
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height

        // Draw satellite map background
        ctx.fillStyle = '#0a1929'
        ctx.fillRect(0, 0, width, height)

        // Draw ocean grid pattern
        ctx.strokeStyle = 'rgba(30, 64, 175, 0.2)'
        ctx.lineWidth = 1
        for (let i = 0; i <= 20; i++) {
            const x = (width * i) / 20
            const y = (height * i) / 20
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
            ctx.stroke()
        }

        // Add subtle wave pattern
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
        ctx.lineWidth = 2
        for (let y = 0; y < height; y += 40) {
            ctx.beginPath()
            for (let x = 0; x <= width; x += 5) {
                const wave = Math.sin((x + y) * 0.02) * 3
                if (x === 0) ctx.moveTo(x, y + wave)
                else ctx.lineTo(x, y + wave)
            }
            ctx.stroke()
        }

        if (particles.length === 0) return

        const lats = particles.map(p => p.lat)
        const lons = particles.map(p => p.lon)
        const minLat = Math.min(...lats, selectedScenario.lkp[0])
        const maxLat = Math.max(...lats, selectedScenario.lkp[0])
        const minLon = Math.min(...lons, selectedScenario.lkp[1])
        const maxLon = Math.max(...lons, selectedScenario.lkp[1])

        const padding = 60
        const scaleX = (width - 2 * padding) / (maxLon - minLon || 1)
        const scaleY = (height - 2 * padding) / (maxLat - minLat || 1)

        // Coordinate labels
        ctx.fillStyle = '#64748b'
        ctx.font = '9px monospace'
        ctx.fillText(`${maxLat.toFixed(2)}°N`, 10, padding + 10)
        ctx.fillText(`${minLat.toFixed(2)}°N`, 10, height - padding - 5)
        ctx.fillText(`${minLon.toFixed(2)}°E`, padding + 5, height - 10)
        ctx.fillText(`${maxLon.toFixed(2)}°E`, width - padding - 40, height - 10)

        // Draw particles (heatmap with weight-based intensity)
        particles.forEach(p => {
            const x = padding + (p.lon - minLon) * scaleX
            const y = height - padding - (p.lat - minLat) * scaleY

            const intensity = Math.min(1, p.weight * particles.length * 0.5)
            const radius = 2 + intensity * 2

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
            gradient.addColorStop(0, `rgba(251, 191, 36, ${0.7 * intensity})`)
            gradient.addColorStop(0.5, `rgba(239, 68, 68, ${0.4 * intensity})`)
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0)')

            ctx.fillStyle = gradient
            ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
        })

        // Draw LKP
        const lkpX = padding + (selectedScenario.lkp[1] - minLon) * scaleX
        const lkpY = height - padding - (selectedScenario.lkp[0] - minLat) * scaleY

        ctx.fillStyle = '#3b82f6'
        ctx.beginPath()
        ctx.arc(lkpX, lkpY, 7, 0, 2 * Math.PI)
        ctx.fill()
        ctx.strokeStyle = '#60a5fa'
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.fillStyle = '#3b82f6'
        ctx.font = '10px monospace'
        ctx.fillText('LKP', lkpX + 12, lkpY - 8)

        // Draw center of mass
        if (analysis) {
            const centerX = padding + (analysis.centerLon - minLon) * scaleX
            const centerY = height - padding - (analysis.centerLat - minLat) * scaleY

            ctx.strokeStyle = '#10b981'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(centerX, centerY, 9, 0, 2 * Math.PI)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(centerX - 14, centerY)
            ctx.lineTo(centerX + 14, centerY)
            ctx.moveTo(centerX, centerY - 14)
            ctx.lineTo(centerX, centerY + 14)
            ctx.stroke()

            ctx.fillStyle = '#10b981'
            ctx.font = '10px monospace'
            ctx.fillText('MPP', centerX + 14, centerY - 10)
        }

        // Draw evidence markers
        evidence.forEach((ev, idx) => {
            const evX = padding + (ev.lon - minLon) * scaleX
            const evY = height - padding - (ev.lat - minLat) * scaleY

            ctx.fillStyle = `rgba(168, 85, 247, ${ev.confidence})`
            ctx.beginPath()
            ctx.arc(evX, evY, 6, 0, 2 * Math.PI)
            ctx.fill()

            ctx.strokeStyle = '#a855f7'
            ctx.lineWidth = 2
            ctx.stroke()

            ctx.fillStyle = '#a855f7'
            ctx.font = '9px monospace'
            ctx.fillText(ev.label, evX + 10, evY - 5)
        })

    }, [particles, analysis, selectedScenario, evidence])

    const survivalTime = Math.max(0, 24 - (hoursElapsed * (20 / selectedScenario.waterTemp)))
    const poc = analysis ? (95.5 - analysis.eccentricity * 8.2 - (analysis.spreadKm2 / 100)) : 0

    return (
        <div style={{
            background: '#020617',
            color: '#e2e8f0',
            fontFamily: 'Inter, monospace',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            overflow: 'hidden',
            maxHeight: '900px'
        }}>
            {/* Header */}
            <header style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                padding: '12px 20px',
                borderBottom: '1px solid #334155',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0
            }}>
                <div>
                    <h1 style={{ fontSize: '16px', fontWeight: 900, margin: 0, letterSpacing: '0.05em' }}>
                        AeroSAR | Probabilistic Command & Control
                    </h1>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
                        {selectedScenario.name} | Sea State {selectedScenario.seaState}
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Radio size={12} color="#10b981" />
                        <span>OPERATIONAL</span>
                    </div>
                    <div style={{ color: '#fbbf24', fontWeight: 700 }}>
                        T+{String(hoursElapsed).padStart(2, '0')}:00 UTC
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
                {/* Left Sidebar */}
                <div style={{
                    width: '240px',
                    background: '#0f172a',
                    borderRight: '1px solid #1e293b',
                    padding: '16px',
                    overflowY: 'auto',
                    flexShrink: 0
                }}>
                    <h3 style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', marginBottom: '12px', letterSpacing: '0.1em' }}>
                        ENVIRONMENTAL FORCING
                    </h3>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '9px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Scenario</label>
                        <select
                            value={selectedScenario.id}
                            onChange={(e) => setSelectedScenario(scenarios.find(s => s.id === e.target.value)!)}
                            style={{
                                width: '100%',
                                background: '#1e293b',
                                border: '1px solid #334155',
                                color: '#e2e8f0',
                                padding: '6px',
                                borderRadius: '4px',
                                fontSize: '11px'
                            }}
                        >
                            {scenarios.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '9px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Craft Type</label>
                        <select
                            value={craftType}
                            onChange={(e) => setCraftType(e.target.value as any)}
                            style={{
                                width: '100%',
                                background: '#1e293b',
                                border: '1px solid #334155',
                                color: '#e2e8f0',
                                padding: '6px',
                                borderRadius: '4px',
                                fontSize: '11px'
                            }}
                        >
                            <option value="life_raft">Life Raft (6-Person)</option>
                            <option value="lifeboat">Open Lifeboat</option>
                            <option value="debris">Semi-Submerged Debris</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '9px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span>Time Elapsed</span>
                            <span style={{ color: '#fbbf24', fontWeight: 700 }}>{hoursElapsed}h</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="12"
                            value={hoursElapsed}
                            onChange={(e) => setHoursElapsed(Number(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '9px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span>Uncertainty</span>
                            <span style={{ color: '#fbbf24', fontWeight: 700 }}>{(uncertaintyMargin * 100).toFixed(0)}%</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="0.5"
                            step="0.05"
                            value={uncertaintyMargin}
                            onChange={(e) => setUncertaintyMargin(Number(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '12px', padding: '10px', background: '#1e293b', borderRadius: '4px', border: '1px solid #334155' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                            <Wind size={12} color="#fbbf24" />
                            <span style={{ fontSize: '9px', fontWeight: 700 }}>WIND</span>
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>
                            {selectedScenario.wind.speed.toFixed(1)} kts @ {selectedScenario.wind.direction}°
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px', padding: '10px', background: '#1e293b', borderRadius: '4px', border: '1px solid #334155' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                            <Anchor size={12} color="#3b82f6" />
                            <span style={{ fontSize: '9px', fontWeight: 700 }}>CURRENT</span>
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>
                            {selectedScenario.current.speed.toFixed(1)} kts @ {selectedScenario.current.direction}°
                        </div>
                    </div>

                    <button
                        onClick={() => setShowEvidenceInput(!showEvidenceInput)}
                        style={{
                            width: '100%',
                            background: '#1e293b',
                            color: '#a855f7',
                            border: '1px solid #a855f7',
                            padding: '8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                        }}
                    >
                        <Plus size={12} />
                        ADD EVIDENCE
                    </button>

                    {showEvidenceInput && (
                        <div style={{ padding: '10px', background: '#1e293b', borderRadius: '4px', marginBottom: '12px' }}>
                            <input
                                type="text"
                                placeholder="Label (e.g., 'E1')"
                                id="ev-label"
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    color: '#e2e8f0',
                                    padding: '6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    marginBottom: '6px'
                                }}
                            />
                            <input
                                type="number"
                                placeholder="Lat"
                                id="ev-lat"
                                step="0.01"
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    color: '#e2e8f0',
                                    padding: '6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    marginBottom: '6px'
                                }}
                            />
                            <input
                                type="number"
                                placeholder="Lon"
                                id="ev-lon"
                                step="0.01"
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    color: '#e2e8f0',
                                    padding: '6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    marginBottom: '6px'
                                }}
                            />
                            <input
                                type="range"
                                id="ev-conf"
                                min="0.1"
                                max="1"
                                step="0.1"
                                defaultValue="0.5"
                                style={{ width: '100%', marginBottom: '6px' }}
                            />
                            <button
                                onClick={() => {
                                    const label = (document.getElementById('ev-label') as HTMLInputElement).value
                                    const lat = parseFloat((document.getElementById('ev-lat') as HTMLInputElement).value)
                                    const lon = parseFloat((document.getElementById('ev-lon') as HTMLInputElement).value)
                                    const conf = parseFloat((document.getElementById('ev-conf') as HTMLInputElement).value)
                                    if (label && !isNaN(lat) && !isNaN(lon)) {
                                        addEvidence(lat, lon, conf, label)
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    background: '#a855f7',
                                    color: 'white',
                                    border: 'none',
                                    padding: '6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    )}

                    <button
                        onClick={runSimulation}
                        disabled={simulationState === 'running'}
                        style={{
                            width: '100%',
                            background: simulationState === 'running' ? '#475569' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 800,
                            cursor: simulationState === 'running' ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                        }}
                    >
                        <Cpu size={14} />
                        {simulationState === 'running' ? `${currentProgress.toFixed(0)}% SIMULATING...` : 'RUN MONTE CARLO'}
                    </button>
                </div>

                {/* Main Canvas */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', minWidth: 0 }}>
                    <div style={{
                        padding: '10px 16px',
                        borderBottom: '1px solid #1e293b',
                        fontSize: '9px',
                        color: '#64748b',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>STOCHASTIC DISTRIBUTION CLOUD</span>
                        {simulationState === 'running' && (
                            <span style={{ color: '#fbbf24', fontSize: '10px' }}>
                                PARTICLES: {particles.length} / 2000
                            </span>
                        )}
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', minHeight: 0 }}>
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={500}
                            style={{
                                border: '1px solid #1e293b',
                                borderRadius: '8px',
                                background: '#020817',
                                maxWidth: '100%',
                                maxHeight: '100%'
                            }}
                        />
                    </div>
                </div>

                {/* Right Sidebar */}
                <div style={{
                    width: '260px',
                    background: '#0f172a',
                    borderLeft: '1px solid #1e293b',
                    padding: '16px',
                    overflowY: 'auto',
                    flexShrink: 0
                }}>
                    <h3 style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', marginBottom: '12px', letterSpacing: '0.1em' }}>
                        MISSION INTELLIGENCE
                    </h3>

                    {simulationState === 'complete' && analysis && (
                        <>
                            <div style={{ marginBottom: '14px', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px' }}>
                                <div style={{ fontSize: '9px', color: '#6ee7b7', marginBottom: '4px' }}>POC (CONTAINMENT)</div>
                                <div style={{ fontSize: '20px', fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
                                    {poc.toFixed(2)}%
                                </div>
                            </div>

                            <div style={{ marginBottom: '14px', padding: '10px', background: '#1e293b', borderRadius: '4px', border: '1px solid #334155' }}>
                                <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '6px' }}>MPP (MOST PROBABLE)</div>
                                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#e2e8f0' }}>
                                    {analysis.centerLat.toFixed(5)}°N<br />
                                    {analysis.centerLon.toFixed(5)}°E
                                </div>
                            </div>

                            <div style={{ marginBottom: '14px', padding: '10px', background: '#1e293b', borderRadius: '4px', border: '1px solid #334155' }}>
                                <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '6px' }}>CONFIDENCE ELLIPSE</div>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: '#fbbf24', fontFamily: 'monospace' }}>
                                    {analysis.confidenceRadiusNm.toFixed(2)} NM
                                </div>
                                <div style={{ fontSize: '9px', color: '#64748b', marginTop: '4px' }}>
                                    95th percentile
                                </div>
                            </div>

                            <div style={{ marginBottom: '14px', padding: '10px', background: '#1e293b', borderRadius: '4px', border: '1px solid #334155' }}>
                                <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '6px' }}>SEARCH AREA</div>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: '#fbbf24', fontFamily: 'monospace' }}>
                                    {analysis.spreadKm2.toFixed(1)} km²
                                </div>
                            </div>

                            <div style={{ marginBottom: '14px', padding: '10px', background: '#1e293b', borderRadius: '4px', border: '1px solid #334155' }}>
                                <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '6px' }}>ENTROPY (UNCERTAINTY)</div>
                                <div style={{ fontSize: '12px', fontWeight: 900, color: '#e2e8f0', fontFamily: 'monospace' }}>
                                    {analysis.entropy.toFixed(3)} nats
                                </div>
                            </div>

                            {recommendation && (
                                <div style={{ marginBottom: '14px', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                        <Target size={12} color="#60a5fa" />
                                        <div style={{ fontSize: '9px', color: '#93c5fd', fontWeight: 700 }}>PATTERN</div>
                                    </div>
                                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#3b82f6', marginBottom: '6px' }}>
                                        {recommendation.pattern}
                                    </div>
                                    <div style={{ fontSize: '9px', color: '#94a3b8' }}>
                                        Spacing: {recommendation.spacing_nm} NM
                                    </div>
                                </div>
                            )}

                            <div style={{ padding: '10px', background: survivalTime < 6 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(251, 191, 36, 0.1)', border: `1px solid ${survivalTime < 6 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`, borderRadius: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                    <AlertCircle size={12} color={survivalTime < 6 ? '#ef4444' : '#fbbf24'} />
                                    <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>SURVIVAL</div>
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: survivalTime < 6 ? '#ef4444' : '#fbbf24', fontFamily: 'monospace' }}>
                                    {Math.round(survivalTime)}h
                                </div>
                                <div style={{ fontSize: '8px', color: '#94a3b8', marginTop: '4px' }}>
                                    T_water={selectedScenario.waterTemp}°C
                                </div>
                            </div>
                        </>
                    )}

                    {simulationState === 'idle' && (
                        <div style={{ textAlign: 'center', padding: '30px 16px', color: '#475569' }}>
                            <Navigation size={28} style={{ margin: '0 auto 10px' }} />
                            <div style={{ fontSize: '11px' }}>
                                Initialize simulation
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
