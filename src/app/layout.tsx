import './globals.css'
import './interactive-cards.css'
import './grounding-simulator.css'
import './bento-grid.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Particles from '@/components/Particles'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
    title: 'Fernando Martínez Marco | Engineering & AI Research',
    description: 'Professional portfolio bridging Naval Engineering and AI Research.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <div className="bg-mesh">
                    <div className="orb orb-1"></div>
                    <div className="orb orb-2"></div>
                    <div className="orb orb-3"></div>
                </div>
                <Particles />
                <div className="content-layer">
                    {children}
                </div>
            </body>
        </html>
    )
}
