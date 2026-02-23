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

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
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
                ctx.fillStyle = `rgba(0, 124, 240, ${this.op + 0.1})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.fillStyle = `rgba(0, 100, 210, ${this.labelAlpha})`
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
            }

            update() {
                if (!canvas) return

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
            }

            draw() {
                if (!ctx) return
                const breathing = Math.abs(Math.sin(Date.now() * 0.0004)) * 0.08
                // Transformers are slightly more visible
                const typeMultiplier = this.type === 'transformer' ? 1.4 : 1.0
                let currentOpacity = (this.opacity + breathing) * typeMultiplier

                // Skip Connections (for Transformer feel) - Enhanced visibility
                if (this.type === 'transformer') {
                    ctx.setLineDash([3, 5])
                    ctx.strokeStyle = `rgba(0, 113, 227, ${currentOpacity * 0.4})`
                    ctx.lineWidth = 0.6
                    ctx.beginPath()
                    // Primary skip
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
                                ctx.strokeStyle = `rgba(0, 113, 227, ${currentOpacity * 0.35})`
                                ctx.lineWidth = 0.5
                                ctx.beginPath()
                                ctx.moveTo(this.x + l * this.scale * 2.2, this.y + (n1 - nodes1 / 2) * this.scale)
                                ctx.lineTo(this.x + (l + 1) * this.scale * 2.2, this.y + (n2 - nodes2 / 2) * this.scale)
                                ctx.stroke()
                            }
                        }
                    }
                }

                // Clearly Circular Nodes
                for (let l = 0; l < this.layers.length; l++) {
                    const nodes = this.layers[l]
                    for (let n = 0; n < nodes; n++) {
                        const nx = this.x + l * this.scale * 2.2
                        const ny = this.y + (n - nodes / 2) * this.scale

                        // Node shadow/glow
                        ctx.fillStyle = `rgba(0, 113, 227, ${currentOpacity * 0.4})`
                        ctx.beginPath()
                        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2)
                        ctx.fill()

                        // Circular node core
                        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.85})`
                        ctx.beginPath()
                        ctx.arc(nx, ny, 1.8, 0, Math.PI * 2)
                        ctx.fill()
                    }
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

            // Interaction logic: Draw edges (probabilistic connections)
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i]
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.15
                        ctx.strokeStyle = `rgba(0, 113, 227, ${opacity})`
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
        resize()
        init()
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
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
