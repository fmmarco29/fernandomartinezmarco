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

        const types = ['Prior', 'Evidence', 'Likelihood', 'Posteriori']

        class Particle {
            x: number = 0
            y: number = 0
            anchorX: number
            anchorY: number
            size: number
            phase: number
            range: number
            op: number
            type: string
            labelAlpha: number = 0
            dispX: number = 0
            dispY: number = 0

            constructor(ax: number, ay: number) {
                this.anchorX = ax
                this.anchorY = ay
                this.size = Math.random() * 1.5 + 0.5
                this.phase = Math.random() * Math.PI * 2
                this.range = Math.random() * 20 + 20
                this.op = Math.random() * 0.25 + 0.1
                this.type = types[Math.floor(Math.random() * types.length)]
            }

            update() {
                const time = (Date.now() - startTime) * 0.0006
                const driftX = Math.sin(time + this.phase) * this.range
                const driftY = Math.cos(time * 0.7 + this.phase) * this.range

                const dx = mouse.x - this.anchorX
                const dy = mouse.y - this.anchorY
                const dist = Math.sqrt(dx * dx + dy * dy) || 1
                const pull = dist < 600 ? (1 - dist / 600) * 45 : 0

                const targetDispX = (dx / dist) * pull
                const targetDispY = (dy / dist) * pull

                // Smoothly interpolate displacement
                this.dispX += (targetDispX - this.dispX) * 0.05
                this.dispY += (targetDispY - this.dispY) * 0.05

                this.x = this.anchorX + this.dispX + driftX
                this.y = this.anchorY + this.dispY + driftY

                if (isFocused) {
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

                this.labelAlpha = 0.15 + Math.abs(Math.sin(time * 1.2 * this.op)) * 0.25
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
                this.range = Math.random() * 15 + 15
                this.type = Math.random() > 0.5 ? 'transformer' : 'standard'
                this.layers = this.type === 'transformer' ? [4, 6, 6, 4] : [3, 5, 3]
                this.opacity = Math.random() * 0.1 + 0.05
                this.scale = Math.random() * 8 + 10
                this.prob = 0.95 + Math.random() * 0.045
            }

            update() {
                const time = (Date.now() - startTime) * 0.0004
                const driftX = Math.sin(time * 0.8 + this.phase) * this.range
                const driftY = Math.cos(time + this.phase) * this.range

                const dx = mouse.x - this.anchorX
                const dy = mouse.y - this.anchorY
                const dist = Math.sqrt(dx * dx + dy * dy) || 1
                const pull = dist < 700 ? (1 - dist / 700) * 35 : 0

                const targetDispX = (dx / dist) * pull
                const targetDispY = (dy / dist) * pull

                // Smoothly interpolate displacement
                this.dispX += (targetDispX - this.dispX) * 0.05
                this.dispY += (targetDispY - this.dispY) * 0.05

                this.x = this.anchorX + this.dispX + driftX
                this.y = this.anchorY + this.dispY + driftY

                if (isFocused) {
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
                const mDx = mouse.x - this.x
                const mDy = mouse.y - this.y
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy)
                const proximityEffect = mDist < 200 ? (1 - mDist / 200) * 0.3 : 0
                const typeMultiplier = this.type === 'transformer' ? 1.4 : 1.0
                let currentOpacity = (this.opacity + breathing + proximityEffect) * typeMultiplier
                const netColor = isFocused ? '0, 255, 136' : '0, 113, 227'

                // Skip Connections
                if (this.type === 'transformer') {
                    ctx.setLineDash([3, 5])
                    ctx.strokeStyle = `rgba(${netColor}, ${currentOpacity * 0.4})`
                    ctx.lineWidth = 0.6 + proximityEffect
                    ctx.beginPath()
                    ctx.moveTo(this.x, this.y)
                    ctx.bezierCurveTo(this.x + this.scale * 2, this.y - this.scale * 4, this.x + this.scale * 4, this.y - this.scale * 4, this.x + this.scale * 4, this.y)
                    ctx.stroke()
                    ctx.setLineDash([])
                }

                // Connections
                for (let l = 0; l < this.layers.length - 1; l++) {
                    const lc = this.layers[l]
                    const nlc = this.layers[l + 1]
                    for (let n1 = 0; n1 < lc; n1++) {
                        for (let n2 = 0; n2 < nlc; n2++) {
                            if ((n1 + n2) % 2 === 0 || this.type === 'standard') {
                                ctx.strokeStyle = `rgba(${netColor}, ${currentOpacity * 0.35})`
                                ctx.lineWidth = 0.5 + proximityEffect
                                ctx.beginPath()
                                ctx.moveTo(this.x + l * this.scale * 2.2, this.y + (n1 - lc / 2) * this.scale)
                                ctx.lineTo(this.x + (l + 1) * this.scale * 2.2, this.y + (n2 - nlc / 2) * this.scale)
                                ctx.stroke()
                            }
                        }
                    }
                }

                // Nodes
                for (let l = 0; l < this.layers.length; l++) {
                    const lc = this.layers[l]
                    for (let n = 0; n < lc; n++) {
                        const nx = this.x + l * this.scale * 2.2
                        const ny = this.y + (n - lc / 2) * this.scale
                        ctx.fillStyle = `rgba(${netColor}, ${currentOpacity * 0.4})`
                        ctx.beginPath()
                        ctx.arc(nx, ny, 3.5 + proximityEffect * 2, 0, Math.PI * 2)
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

            for (let i = 0; i < 4; i++) {
                const cell = cells.pop()!
                neuralNets.push(new NeuralNet(
                    cell.c * cellW + cellW / 2,
                    cell.r * cellH + cellH / 2
                ))
            }

            while (cells.length > 2 && particles.length < 22) {
                const cell = cells.pop()!
                particles.push(new Particle(
                    cell.c * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.4,
                    cell.r * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.4
                ))
            }
        }

        const animate = () => {
            if (!canvas || !ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            neuralNets.forEach(net => { net.update(); net.draw() })

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i]
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const d2 = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2
                    if (d2 < 140 * 140) {
                        const dist = Math.sqrt(d2)
                        const opacity = (1 - dist / 140) * 0.12
                        const color = isFocused ? '0, 255, 1 green' : '0, 113, 227'
                        ctx.strokeStyle = `rgba(${color === '0, 255, 1 green' ? '0, 255, 136' : color}, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
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
        <canvas
            id="particle-canvas"
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                opacity: 0.6
            }}
        />
    )
}

export default Particles
