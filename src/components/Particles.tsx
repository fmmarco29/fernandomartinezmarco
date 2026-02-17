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

        class Particle {
            x: number
            y: number
            size: number
            vx: number
            vy: number
            op: number

            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 2 + 0.5
                this.vx = (Math.random() - 0.5) * 0.25
                this.vy = (Math.random() - 0.5) * 0.25
                this.op = Math.random() * 0.3 + 0.1
            }

            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = `rgba(0, 0, 0, ${this.op})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const init = () => {
            particles = []
            for (let i = 0; i < 70; i++) particles.push(new Particle())
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
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
                opacity: 0.4
            }}
        />
    )
}

export default Particles
