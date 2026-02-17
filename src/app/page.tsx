'use client'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectGrid from '@/components/ProjectGrid'
import Expertise from '@/components/Expertise'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="content-layer">
                <Hero />
                <ProjectGrid />
                <Expertise />
                <Footer />
            </main>
        </>
    )
}
