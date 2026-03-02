'use client'

import React from 'react'
import { FileText, ChevronRight, Binary, BrainCircuit, MessageSquare, Database, Network } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const getSubjects = (language: 'en' | 'es') => [
    {
        id: 'deep-learning',
        title: 'Deep Learning',
        description: language === 'es' ? 'Arquitecturas de redes neuronales, optimización hiper-paramétrica y representación dimensional de datos.' : 'Neural network architectures, optimization, and data representation.',
        icon: BrainCircuit,
        files: [
            {
                name: language === 'es' ? 'PEC 0: Intro a Statistical Learning & Deep Learning' : 'PEC 0: Intro to Statistical Learning & Deep Learning',
                path: '/master-materials/20251124_PEC_0_MARTINEZ_FERNANDO.html',
                score: '10/10'
            },
            {
                name: language === 'es' ? 'PEC 0: Intro a VL & Deep Learning (EN)' : 'PEC 0: Intro to VL & Deep Learning (EN)',
                path: '/master-materials/20251124_PEC_0_MARTINEZ_FERNANDO_EN.html',
                score: '10/10'
            }
        ]
    },
    {
        id: 'probabilistic-methods',
        title: language === 'es' ? 'Métodos Probabilísticos' : 'Probabilistic Methods',
        description: language === 'es' ? 'Modelado matemático de la incertidumbre, Redes Bayesianas Computacionales y procesos estocásticos.' : 'Uncertainty modeling, Bayesian Networks, and stochastic processes.',
        icon: Binary,
        files: [
            {
                name: language === 'es' ? 'PEC 1: Incertidumbre e Inferencia Bayesiana' : 'PEC 1: Uncertainty & Bayesian Inference',
                path: '/master-materials/TAREA_1_Martinez_Fernando.pdf',
                score: language === 'es' ? 'Pendiente' : 'Pending'
            },
            {
                name: language === 'es' ? 'PEC 2: Redes Bayesianas & Métodos Probabilísticos' : 'PEC 2: Bayesian Networks & Probabilistic Methods',
                path: '/master-materials/TAREA_2_Martinez_Fernando.pdf',
                score: language === 'es' ? 'Pendiente' : 'Pending'
            }
        ]
    },
    {
        id: 'nlp',
        title: language === 'es' ? 'Fundamentos de NLP' : 'Foundations of NLP',
        description: language === 'es' ? 'Análisis del Lenguaje Natural Computacional, morfología vectorial, sintaxis abstracta y Grandes Modelos de Lenguaje (LLMs).' : 'Natural language analysis, morphology, syntax, and language models.',
        icon: MessageSquare,
        files: [
            {
                name: language === 'es' ? 'Práctica 1' : 'Assignment 1',
                path: '/master-materials/Tarea_1_NLP.pdf',
                score: language === 'es' ? 'Pendiente' : 'Pending'
            },
            {
                name: language === 'es' ? 'Práctica 2' : 'Assignment 2',
                path: '/master-materials/Tarea_2_NLP.pdf',
                score: '9/10'
            }
        ]
    },
    {
        id: 'machine-learning',
        title: language === 'es' ? 'Métodos de Machine Learning' : 'Machine Learning Methods',
        description: language === 'es' ? 'Algoritmos fundamentales de aprendizaje supervisado, no supervisado topológico, y reinforcement learning (RL).' : 'Supervised, unsupervised, and reinforcement learning algorithms.',
        icon: Network,
        files: [
            {
                name: language === 'es' ? 'Regresión, Sesgo & Varianza' : 'Regression, Bias & Variance',
                path: '/master-materials/Regresión, Sesgo-Varianza, Selección de Modelos I_Martinez_Fernando.pdf',
                score: language === 'es' ? 'Pendiente' : 'Pending'
            }
        ]
    },
    {
        id: 'semantic-web',
        title: language === 'es' ? 'Web Semántica & Linked Data' : 'Semantic Web & Linked Data',
        description: language === 'es' ? 'Ontologías formales, diseño de Grafos de Conocimiento (Knowledge Graphs), modelado RDF, y consultas lógicas SPARQL.' : 'Ontologies, knowledge graphs, RDF, and SPARQL.',
        icon: Database,
        files: [
            {
                name: language === 'es' ? 'Grafos de Conocimiento (KG)' : 'Knowledge Graphs (KG)',
                path: '/master-materials/Memoria_KG_Opcional.pdf',
                score: language === 'es' ? 'Pendiente' : 'Pending'
            },
            {
                name: language === 'es' ? 'Ontologías Lógicas OWL' : 'OWL Ontologies',
                path: '/master-materials/Memoria_OWL.pdf',
                score: language === 'es' ? 'Pendiente' : 'Pending'
            },
            {
                name: language === 'es' ? 'Property Graphs Extensivos' : 'Property Graphs',
                path: '/master-materials/Memoria_Property_Graphs.pdf',
                score: language === 'es' ? 'Pendiente' : 'Pending'
            },
            {
                name: language === 'es' ? 'Estructura RDF' : 'RDF',
                path: '/master-materials/Memoria_RDF.pdf',
                score: language === 'es' ? 'Pendiente' : 'Pending'
            }
        ]
    }
]

const ExplorationArticle = () => {
    const { language } = useLanguage()
    const subjects = getSubjects(language)

    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    {language === 'es' ? 'La Hoja de Ruta Investigadora (UNED)' : 'The Research Roadmap (UNED)'}
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                {language === 'es'
                    ? 'Un viaje evolutivo riguroso a través de la investigación académica de Estado del Arte en Inteligencia Artificial. Esta cronología rastrea y cataloga la progresión de asignaturas matrices y hallazgos especializados durante este Máster Universitario oficial.'
                    : 'An evolutionary journey through Artificial Intelligence research. This timeline tracks the progression of subjects and specialized findings during the University Master\'s program.'}
            </p>

            <div className="knowledge-map">
                {subjects.map((subject) => (
                    <div
                        key={subject.id}
                        className="timeline-item active"
                    >
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                            <div className="timeline-header">
                                <h2 className="timeline-title">{subject.title}</h2>
                                <span className="timeline-tag">{subject.id.replace(/-/g, ' ')}</span>
                            </div>
                            <p className="timeline-desc">{subject.description}</p>

                            <div className="timeline-expansion" style={{ height: 'auto', opacity: 1, marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <div className="timeline-file-box">
                                    {subject.files.length > 0 ? (
                                        subject.files.map((file, fIdx) => (
                                            <a
                                                key={fIdx}
                                                href={file.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="timeline-file"
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                                                    <FileText size={16} color="#0071e3" />
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', flex: 1 }}>
                                                        <span style={{ fontWeight: 600 }}>{file.name}</span>
                                                        <span style={{
                                                            fontSize: '11px',
                                                            padding: '2px 8px',
                                                            background: 'rgba(0, 255, 136, 0.1)',
                                                            color: '#00ff88',
                                                            borderRadius: '4px',
                                                            border: '1px solid rgba(0, 255, 136, 0.2)',
                                                            fontWeight: 700
                                                        }}>
                                                            {language === 'es' ? `Nota: ${file.score}` : `Grade: ${file.score}`}
                                                        </span>
                                                    </div>
                                                    <ChevronRight size={12} style={{ opacity: 0.3 }} />
                                                </div>
                                            </a>
                                        ))
                                    ) : (
                                        <div className="timeline-empty">
                                            <BrainCircuit size={16} />
                                            <span>
                                                {language === 'es'
                                                    ? 'No hay publicaciones liberadas para esta fase todavía.'
                                                    : 'No publications released for this stage yet.'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="article-highlight-box" style={{ padding: '40px' }}>
                <h3 style={{ fontSize: '32px' }}>{language === 'es' ? 'Evolución Investigadora' : 'Research Evolution'}</h3>
                <div className="label">{language === 'es' ? 'Rastreador de Hitos Continuo' : 'Continuous Milestone Tracker'}</div>
                <p style={{ maxWidth: '100%', textAlign: 'justify' }}>
                    {language === 'es'
                        ? 'Cada vértice exacto en este mapa de navegación académica representa un dominio crítico forjado en IA avanzada. A medida que progresa empíricamente el grado, nuevos reportes exhaustivos técnicos y prototipos codificados de implementación funcional serán integrados sinfónicamente en esta estructura interactiva de neuro-conocimiento.'
                        : 'Each point in this roadmap represents a critical domain of AI. As the master progresses, new technical reports and implementation prototypes will be integrated into this interactive knowledge structure.'}
                </p>
            </div>

            <div className="article-tags">
                <span className="tag">{language === 'es' ? 'Viaje Investigador' : 'Research Journey'}</span>
                <span className="tag">{language === 'es' ? 'Cronograma del Máster' : 'Master\'s Timeline'}</span>
                <span className="tag">{language === 'es' ? 'Hitos Funcionales IA' : 'AI Milestones'}</span>
                <span className="tag">{language === 'es' ? 'I+D UNED' : 'UNED Research'}</span>
            </div>
        </div>
    )
}

export default ExplorationArticle
