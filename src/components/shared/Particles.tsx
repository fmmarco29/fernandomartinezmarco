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

            constructor() {
                this.x = Math.random() * (canvas?.width || 0)
                this.y = Math.random() * (canvas?.height || 0)
                this.size = Math.random() * 1.5 + 0.5
                this.vx = (Math.random() - 0.5) * 0.12
                this.vy = (Math.random() - 0.5) * 0.12
                this.op = Math.random() * 0.3 + 0.1
                this.type = types[Math.floor(Math.random() * types.length)]
                this.labelAlpha = Math.random() * 0.2 // Very subtle initial opacity
            }

            update() {
                if (!canvas) return
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1

                // Improved label breathing effect for sharper visibility
                this.labelAlpha = 0.15 + Math.abs(Math.sin(Date.now() * 0.0008 * this.op)) * 0.25
            }

            draw() {
                if (!ctx) return
                // Draw node
                ctx.fillStyle = `rgba(0, 124, 240, ${this.op + 0.1})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()

                // Draw tiny, elegant label - sharper and slightly larger
                ctx.fillStyle = `rgba(0, 100, 210, ${this.labelAlpha})`
                ctx.font = '600 9px Inter, sans-serif'
                ctx.fillText(this.type, this.x + 10, this.y + 3)
            }
        }

        const init = () => {
            particles = []
            for (let i = 0; i < 32; i++) particles.push(new Particle())
        }

        const animate = () => {
            if (!canvas || !ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Interaction logic: Draw edges (probabilistic connections)
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i]
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.25
                        ctx.strokeStyle = `rgba(0, 113, 227, ${opacity})`
                        ctx.lineWidth = 0.6
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
        resize()
        init()
        animate()

        return () => window.removeEventListener('resize', resize)
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
