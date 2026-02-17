'use client'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import ProjectGrid from '@/components/sections/ProjectGrid'
import Expertise from '@/components/sections/Expertise'
import Footer from '@/components/layout/Footer'

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
