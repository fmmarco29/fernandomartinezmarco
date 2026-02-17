'use client'
import { Cpu, Anchor } from 'lucide-react'

const expertiseData = [
    {
        title: "Artificial Intelligence",
        icon: Cpu,
        skills: ["LLMs", "Graph-RAG Frameworks", "Deep Learning", "NLP", "Python", "Vector Stores"]
    },
    {
        title: "Naval Architecture",
        icon: Anchor,
        skills: ["DP FMEA", "Gas Carriers", "SOLAS / IMO Rules", "Stability (ABS & BV)", "Maritime Operations", "Project Management"]
    }
]

const Expertise = () => {
    return (
        <section id="expertise" className="section" style={{ paddingTop: '40px' }}>
            <h2 className="section-title" style={{ fontSize: '24px', marginBottom: '24px', opacity: 0.8 }}>Technical Expertise</h2>
            <div className="expertise-container">
                {expertiseData.map((group, i) => {
                    const Icon = group.icon
                    return (
                        <div key={i} className="expertise-column">
                            <h3>
                                <Icon size={20} />
                                {group.title}
                            </h3>
                            <div className="skill-list">
                                {group.skills.map((skill, si) => (
                                    <span key={si} className="skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Expertise
