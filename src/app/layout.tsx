import './globals.css'
import '../styles/interactive-cards.css'
import '../styles/grounding-simulator.css'
import '../styles/bento-grid.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Particles from '@/components/shared/Particles'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
    title: 'Fernando Martínez Marco | Engineering & AI Research',
    description: 'Professional portfolio bridging Naval Engineering and AI Research.',
    openGraph: {
        title: 'Fernando Martínez Marco | Engineering & AI Research',
        description: 'Professional portfolio bridging Naval Engineering and AI Research.',
        url: 'https://fernandomartinezmarco.vercel.app',
        siteName: 'Fernando Martínez Marco Portfolio',
        images: [
            {
                url: '/metadata/social-preview.png',
                width: 1200,
                height: 630,
                alt: 'Fernando Martínez Marco - Engineering Intelligence'
            }
        ],
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fernando Martínez Marco | Engineering & AI Research',
        description: 'Professional portfolio bridging Naval Engineering and AI Research.',
        images: ['/metadata/social-preview.png']
    }
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
