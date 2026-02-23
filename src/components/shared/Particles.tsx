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
        }

        const types = ['Prior', 'Evidence', 'Likelihood', 'Posteriori']

        class Particle {
            x: number
            y: number
            size: number
            vx: number
            vy: number
            op: number
            type: string
            labelAlpha: number

            constructor(existingItems: { x: number, y: number }[]) {
                let valid = false;
                let tx = 0, ty = 0;
                let attempts = 0;

                while (!valid && attempts < 50) {
                    tx = Math.random() * (canvas?.width || 0);
                    ty = Math.random() * (canvas?.height || 0);
                    valid = existingItems.every(item => {
                        const dx = item.x - tx;
                        const dy = item.y - ty;
                        return Math.sqrt(dx * dx + dy * dy) > 100; // Spacing
                    });
                    attempts++;
                }

                this.x = tx;
                this.y = ty;
                this.size = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.05;
                this.vy = (Math.random() - 0.5) * 0.05;
                this.op = Math.random() * 0.3 + 0.1;
                this.type = types[Math.floor(Math.random() * types.length)];
                this.labelAlpha = 0;
            }

            update() {
                if (!canvas) return

                // Focus Mode Logic: Push away from center
                if (isFocused) {
                    const centerX = canvas.width / 2
                    const centerY = canvas.height / 2
                    const distToCenter = Math.sqrt((this.x - centerX) ** 2 + (this.y - centerY) ** 2)
                    if (distToCenter < 600) {
                        this.vx += (this.x - centerX) * 0.00005
                        this.vy += (this.y - centerY) * 0.00005
                    }
                }

                // Subtle Mouse Attraction
                const mDx = mouse.x - this.x
                const mDy = mouse.y - this.y
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy)
                if (mDist < 400) {
                    this.vx += mDx * 0.000003
                    this.vy += mDy * 0.000003
                }

                // Speed Limit
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
                if (speed > 0.2) {
                    this.vx *= 0.94
                    this.vy *= 0.94
                }

                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1
                this.labelAlpha = 0.15 + Math.abs(Math.sin(Date.now() * 0.0008 * this.op)) * 0.25
            }

            draw() {
                if (!ctx) return
                // Suggestion 4: Color shift on focus
                const particleColor = isFocused ? '0, 255, 136' : '0, 124, 240'
                ctx.fillStyle = `rgba(${particleColor}, ${this.op + 0.1})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.fillStyle = `rgba(${particleColor}, ${this.labelAlpha})`
                ctx.font = '600 9px Inter, sans-serif'
                ctx.fillText(this.type, this.x + 10, this.y + 3)
            }
        }

        class NeuralNet {
            x: number
            y: number
            vx: number
            vy: number
            layers: number[]
            opacity: number
            scale: number
            type: 'standard' | 'transformer'
            prob: number

            constructor(existingItems: { x: number, y: number }[]) {
                let valid = false;
                let tx = 0, ty = 0;
                let attempts = 0;

                while (!valid && attempts < 50) {
                    tx = Math.random() * (canvas?.width || 0);
                    ty = Math.random() * (canvas?.height || 0);
                    valid = existingItems.every(item => {
                        const dx = item.x - tx;
                        const dy = item.y - ty;
                        return Math.sqrt(dx * dx + dy * dy) > 250; // Larger spacing for nets
                    });
                    attempts++;
                }

                this.x = tx;
                this.y = ty;
                this.vx = (Math.random() - 0.5) * 0.02
                this.vy = (Math.random() - 0.5) * 0.02
                this.type = Math.random() > 0.5 ? 'transformer' : 'standard'
                this.layers = this.type === 'transformer' ? [4, 6, 6, 4] : [3, 5, 3]
                this.opacity = Math.random() * 0.1 + 0.04
                this.scale = Math.random() * 8 + 10
                this.prob = 0.95 + Math.random() * 0.045
            }

            update() {
                if (!canvas) return

                // Focus Mode Logic: Push away
                if (isFocused) {
                    const centerX = canvas.width / 2
                    const centerY = canvas.height / 2
                    const distToCenter = Math.sqrt((this.x - centerX) ** 2 + (this.y - centerY) ** 2)
                    if (distToCenter < 600) {
                        this.vx += (this.x - centerX) * 0.00003
                        this.vy += (this.y - centerY) * 0.00003
                    }
                }

                // Subtle Mouse Attraction
                const mDx = mouse.x - this.x
                const mDy = mouse.y - this.y
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy)
                if (mDist < 500) {
                    this.vx += mDx * 0.000001
                    this.vy += mDy * 0.000001
                }

                // Speed Limit
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
                if (speed > 0.1) {
                    this.vx *= 0.96
                    this.vy *= 0.96
                }

                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1

                // Update internal state
                if (Math.random() > 0.99) this.prob = 0.95 + Math.random() * 0.045
            }

            draw() {
                if (!ctx) return
                const breathing = Math.abs(Math.sin(Date.now() * 0.0004)) * 0.08

                // Suggestion 1: Quantum Link (Pulse when mouse near)
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

                // Standard Connections
                for (let l = 0; l < this.layers.length - 1; l++) {
                    const nodes1 = this.layers[l]
                    const nodes2 = this.layers[l + 1]
                    for (let n1 = 0; n1 < nodes1; n1++) {
                        for (let n2 = 0; n2 < nodes2; n2++) {
                            if ((n1 + n2) % 2 === 0 || this.type === 'standard') {
                                ctx.strokeStyle = `rgba(${netColor}, ${currentOpacity * 0.35})`
                                ctx.lineWidth = 0.5 + proximityEffect
                                ctx.beginPath()
                                ctx.moveTo(this.x + l * this.scale * 2.2, this.y + (n1 - nodes1 / 2) * this.scale)
                                ctx.lineTo(this.x + (l + 1) * this.scale * 2.2, this.y + (n2 - nodes2 / 2) * this.scale)
                                ctx.stroke()
                            }
                        }
                    }
                }

                // Nodes
                for (let l = 0; l < this.layers.length; l++) {
                    const nodes = this.layers[l]
                    for (let n = 0; n < nodes; n++) {
                        const nx = this.x + l * this.scale * 2.2
                        const ny = this.y + (n - nodes / 2) * this.scale

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

                // Suggestion 3: Network State indicator
                if (currentOpacity > 0.08) {
                    ctx.fillStyle = `rgba(${netColor}, ${currentOpacity * 0.5})`
                    ctx.font = '500 8px Inter, monospace'
                    ctx.fillText(`Σ_prob: ${this.prob.toFixed(3)}`, this.x, this.y + (this.layers[1] / 2 + 1) * this.scale + 10)
                }
            }
        }

        const init = () => {
            particles = []
            neuralNets = []
            const allItems: { x: number, y: number }[] = []

            for (let i = 0; i < 4; i++) {
                const net = new NeuralNet(allItems)
                neuralNets.push(net)
                allItems.push({ x: net.x, y: net.y })
            }

            for (let i = 0; i < 22; i++) {
                const p = new Particle(allItems)
                particles.push(p)
                allItems.push({ x: p.x, y: p.y })
            }
        }

        const animate = () => {
            if (!canvas || !ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            neuralNets.forEach(net => {
                net.update()
                net.draw()
            })

            // Interaction logic
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i]
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.15
                        const edgeColor = isFocused ? '0, 255, 136' : '0, 113, 227'
                        ctx.strokeStyle = `rgba(${edgeColor}, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            }

            particles.forEach(p => {
                p.update()
                p.draw()
            })
            requestAnimationFrame(animate)
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('app-focus', handleFocus)
        resize()
        init()
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
