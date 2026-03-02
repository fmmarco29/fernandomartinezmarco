'use client'
import { Cpu, Anchor } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const getExpertiseData = (language: 'en' | 'es') => [
    {
        title: language === 'es' ? "Inteligencia Artificial" : "Artificial Intelligence",
        skills: ["LLMs", "Graph-RAG Frameworks", "Deep Learning", "NLP", "Dynamic Bayesian Networks", "Python", "Vector Stores"]
    },
    {
        title: language === 'es' ? "Arquitectura Naval" : "Naval Architecture",
        skills: ["DP FMEA", "Gas Carriers", "SOLAS / IMO Rules", "Stability", "Maritime Operations", "Project Management"]
    }
]

const Expertise = () => {
    const { language } = useLanguage();
    const expertiseData = getExpertiseData(language);

    return (
        <section id="expertise" className="section" style={{ paddingTop: '40px' }}>
            <h2 className="section-title" style={{ fontSize: '24px', marginBottom: '24px', opacity: 0.8 }}>
                {language === 'es' ? 'Pericia Técnica' : 'Technical Expertise'}
            </h2>
            <div className="expertise-container">
                {expertiseData.map((group, i) => {
                    return (
                        <div key={i} className="expertise-column">
                            <h3>
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
