'use client'
import { useEffect, useRef } from 'react'

const Particles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let particles: Particle[] = []
        let neuralNets: NeuralNet[] = []
        let mouse = { x: -1000, y: -1000 }
        let isFocused = false
        const startTime = Date.now()

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleFocus = (e: any) => {
            isFocused = e.detail.focused
        }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            init()
        }

        const types = ['Prior', 'Condition', 'Evidence', 'Likelihood', 'Parameters', 'Posteriori']

        class Particle {
            x: number = 0
            y: number = 0
            anchorX: number
            anchorY: number
            offsetX: number
            offsetY: number
            size: number
            phase: number
            range: number
            op: number
            type: string
            clusterId: number
            labelAlpha: number = 0
            dispX: number = 0
            dispY: number = 0

            constructor(ax: number, ay: number, cid: number, ox: number, oy: number, tIdx: number) {
                this.anchorX = ax
                this.anchorY = ay
                this.clusterId = cid
                this.offsetX = ox
                this.offsetY = oy
                this.size = 1.2
                this.phase = Math.random() * Math.PI * 2
                this.range = 10 + Math.random() * 10
                this.op = Math.random() * 0.2 + 0.2
                this.type = types[tIdx]
            }

            update() {
                const time = (Date.now() - startTime) * 0.0004
                const driftX = Math.sin(time + this.phase) * this.range
                const driftY = Math.cos(time * 0.7 + this.phase) * this.range

                const dx = mouse.x - this.anchorX
                const dy = mouse.y - this.anchorY
                const dist = Math.sqrt(dx * dx + dy * dy) || 1
                const pull = dist < 600 ? (1 - dist / 600) * 45 : 0

                const targetDispX = (dx / dist) * pull
                const targetDispY = (dy / dist) * pull

                // Smooth mouse interpolation (Inertia)
                this.dispX += (targetDispX - this.dispX) * 0.05
                this.dispY += (targetDispY - this.dispY) * 0.05

                this.x = this.anchorX + this.dispX + driftX + this.offsetX
                this.y = this.anchorY + this.dispY + driftY + this.offsetY

                if (isFocused && canvas) {
                    const centerX = canvas.width / 2
                    const centerY = canvas.height / 2
                    const offX = this.x - centerX
                    const offY = this.y - centerY
                    const offDist = Math.sqrt(offX * offX + offY * offY) || 1
                    if (offDist < 400) {
                        this.x += (offX / offDist) * 150 * (1 - offDist / 400)
                        this.y += (offY / offDist) * 150 * (1 - offDist / 400)
                    }
                }

                this.labelAlpha = 0.25 + Math.abs(Math.sin(time * 1.5)) * 0.3
            }

            draw() {
                if (!ctx) return
                const color = isFocused ? '0, 255, 136' : '0, 124, 240'
                ctx.fillStyle = `rgba(${color}, ${this.op + 0.1})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.fillStyle = `rgba(${color}, ${this.labelAlpha})`
                ctx.font = '600 9px Inter, sans-serif'
                ctx.fillText(this.type, this.x + 10, this.y + 3)
            }
        }

        class NeuralNet {
            x: number = 0
            y: number = 0
            anchorX: number
            anchorY: number
            phase: number
            range: number
            layers: number[]
            opacity: number
            scale: number
            type: 'standard' | 'transformer'
            prob: number
            dispX: number = 0
            dispY: number = 0

            constructor(ax: number, ay: number) {
                this.anchorX = ax
                this.anchorY = ay
                this.phase = Math.random() * Math.PI * 2
                this.range = 15 + Math.random() * 15
                this.type = Math.random() > 0.5 ? 'transformer' : 'standard'
                this.layers = this.type === 'transformer' ? [4, 6, 6, 4] : [3, 5, 3]
                this.opacity = Math.random() * 0.1 + 0.08
                this.scale = Math.random() * 8 + 10
                this.prob = 0.95 + Math.random() * 0.045
            }

            update() {
                const time = (Date.now() - startTime) * 0.0003
                const driftX = Math.sin(time * 0.8 + this.phase) * this.range
                const driftY = Math.cos(time + this.phase) * this.range

                const dx = mouse.x - this.anchorX
                const dy = mouse.y - this.anchorY
                const dist = Math.sqrt(dx * dx + dy * dy) || 1
                const pull = dist < 700 ? (1 - dist / 700) * 35 : 0

                const targetDispX = (dx / dist) * pull
                const targetDispY = (dy / dist) * pull

                this.dispX += (targetDispX - this.dispX) * 0.05
                this.dispY += (targetDispY - this.dispY) * 0.05

                this.x = this.anchorX + this.dispX + driftX
                this.y = this.anchorY + this.dispY + driftY

                if (isFocused && canvas) {
                    const centerX = canvas.width / 2
                    const centerY = canvas.height / 2
                    const offX = this.x - centerX
                    const offY = this.y - centerY
                    const offDist = Math.sqrt(offX * offX + offY * offY) || 1
                    if (offDist < 500) {
                        this.x += (offX / offDist) * 200 * (1 - offDist / 500)
                        this.y += (offY / offDist) * 200 * (1 - offDist / 500)
                    }
                }

                if (Math.random() > 0.99) this.prob = 0.95 + Math.random() * 0.045
            }

            draw() {
                if (!ctx) return
                const breathing = Math.abs(Math.sin(Date.now() * 0.0004)) * 0.08
                const proximityEffect = (Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2) < 200) ? 0.2 : 0
                let currentOpacity = (this.opacity + breathing + proximityEffect)
                const netColor = isFocused ? '0, 255, 136' : '0, 113, 227'

                if (this.type === 'transformer') {
                    ctx.setLineDash([3, 5])
                    ctx.strokeStyle = `rgba(${netColor}, ${currentOpacity * 0.4})`
                    ctx.lineWidth = 0.6
                    ctx.beginPath()
                    ctx.moveTo(this.x, this.y)
                    ctx.bezierCurveTo(this.x + this.scale * 2, this.y - this.scale * 4, this.x + this.scale * 4, this.y - this.scale * 4, this.x + this.scale * 4, this.y)
                    ctx.stroke()
                    ctx.setLineDash([])
                }

                for (let l = 0; l < this.layers.length - 1; l++) {
                    const lc = this.layers[l]
                    const nlc = this.layers[l + 1]
                    for (let n1 = 0; n1 < lc; n1++) {
                        for (let n2 = 0; n2 < nlc; n2++) {
                            if ((n1 + n2) % 2 === 0 || this.type === 'standard') {
                                ctx.strokeStyle = `rgba(${netColor}, ${currentOpacity * 0.35})`
                                ctx.lineWidth = 0.5
                                ctx.beginPath()
                                ctx.moveTo(this.x + l * this.scale * 2.2, this.y + (n1 - lc / 2) * this.scale)
                                ctx.lineTo(this.x + (l + 1) * this.scale * 2.2, this.y + (n2 - nlc / 2) * this.scale)
                                ctx.stroke()
                            }
                        }
                    }
                }

                for (let l = 0; l < this.layers.length; l++) {
                    const lc = this.layers[l]
                    for (let n = 0; n < lc; n++) {
                        const nx = this.x + l * this.scale * 2.2
                        const ny = this.y + (n - lc / 2) * this.scale
                        ctx.fillStyle = `rgba(${netColor}, ${currentOpacity * 0.4})`
                        ctx.beginPath()
                        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2)
                        ctx.fill()
                        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.85})`
                        ctx.beginPath()
                        ctx.arc(nx, ny, 1.8, 0, Math.PI * 2)
                        ctx.fill()
                    }
                }

                if (currentOpacity > 0.08) {
                    ctx.fillStyle = `rgba(${netColor}, ${currentOpacity * 0.5})`
                    ctx.font = '500 8px Inter, monospace'
                    ctx.fillText(`Σ_prob: ${this.prob.toFixed(3)}`, this.x, this.y + (this.layers[1] / 2 + 1) * this.scale + 10)
                }
            }
        }

        const init = () => {
            if (!canvas) return
            particles = []
            neuralNets = []

            const cols = 6
            const rows = 5
            const cellW = canvas.width / cols
            const cellH = canvas.height / rows

            const cells: { r: number, c: number }[] = []
            for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ r, c })

            for (let i = cells.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cells[i], cells[j]] = [cells[j], cells[i]];
            }

            // Big Neural Nets
            for (let i = 0; i < 4; i++) {
                if (cells.length === 0) break
                const cell = cells.pop()!
                neuralNets.push(new NeuralNet(
                    cell.c * cellW + cellW / 2,
                    cell.r * cellH + cellH / 2
                ))
            }

            // Bayesian Clusters (Spaced out for clarity)
            let clusterId = 0
            while (cells.length >= 1 && clusterId < 6) {
                const cell = cells.pop()!
                const ax = cell.c * cellW + cellW / 2
                const ay = cell.r * cellH + cellH / 2
                const cid = clusterId++

                // Complex DAG arrangement (6 nodes)
                const offsets = [
                    { x: -50, y: -50 },  // Prior
                    { x: -80, y: -15 },  // Condition
                    { x: -80, y: 15 },   // Evidence
                    { x: 10, y: 0 },     // Likelihood
                    { x: -50, y: 50 },   // Parameters
                    { x: 70, y: 0 }      // Posteriori
                ]

                for (let i = 0; i < 6; i++) {
                    particles.push(new Particle(ax, ay, cid, offsets[i].x, offsets[i].y, i))
                }
            }
        }

        const animate = () => {
            if (!canvas || !ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            neuralNets.forEach(net => { net.update(); net.draw() })

            // Connect Bayesian nodes in a richer DAG pattern
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i]
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    if (p1.clusterId === p2.clusterId) {
                        const t1 = types.indexOf(p1.type)
                        const t2 = types.indexOf(p2.type)

                        // Rich DAG Pattern: 
                        // Inputs (0,1,2,4) -> Likelihood (3)
                        // Likelihood (3) -> Posteriori (5)
                        // Internal dependencies: 1->0, 4->0, 4->5
                        const connections = [
                            [0, 3], [1, 3], [2, 3], [4, 3], // Inputs to Likelihood
                            [3, 5],                         // Likelihood to Posterior
                            [1, 0], [4, 0], [4, 5]          // Extra context/parameter links
                        ]

                        const isConnected = connections.some(conn =>
                            (conn[0] === t1 && conn[1] === t2) || (conn[0] === t2 && conn[1] === t1)
                        )

                        if (isConnected) {
                            const color = isFocused ? '0, 255, 136' : '0, 113, 227'
                            ctx.strokeStyle = `rgba(${color}, 0.15)`
                            ctx.lineWidth = 0.8
                            ctx.beginPath()
                            ctx.moveTo(p1.x, p1.y)
                            ctx.lineTo(p2.x, p2.y)
                            ctx.stroke()
                        }
                    }
                }
            }

            particles.forEach(p => { p.update(); p.draw() })
            requestAnimationFrame(animate)
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('app-focus', handleFocus)
        resize()
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('app-focus', handleFocus)
        }
    }, [])

    return (
        <canvas id="particle-canvas" ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', opacity: 0.75 }} />
    )
}

export default Particles
