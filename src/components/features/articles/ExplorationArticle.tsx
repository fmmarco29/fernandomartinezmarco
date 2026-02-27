'use client'

import React, { useState } from 'react'
import { Folder, FileText, CheckCircle2, ChevronRight, Binary, BrainCircuit, MessageSquare, Database, Network } from 'lucide-react'
import '@/styles/article.css'

const subjects = [
    {
        id: 'deep-learning',
        title: 'Deep Learning',
        description: 'Neural network architectures, optimization, and data representation.',
        icon: BrainCircuit,
        files: [
            {
                name: 'PEC 0: Intro to Statistical Learning & Deep Learning',
                path: '/master-materials/20251124_PEC_0_MARTINEZ_FERNANDO.html',
                score: '10/10'
            },
            {
                name: 'PEC 0: Intro to VL & Deep Learning (EN)',
                path: '/master-materials/20251124_PEC_0_MARTINEZ_FERNANDO_EN.html',
                score: '10/10'
            }
        ]
    },
    {
        id: 'probabilistic-methods',
        title: 'Probabilistic Methods',
        description: 'Uncertainty modeling, Bayesian Networks, and stochastic processes.',
        icon: Binary,
        files: [
            {
                name: 'PEC 1: Uncertainty & Bayesian Inference',
                path: '/master-materials/TAREA_1_Martinez_Fernando.pdf',
                score: 'Pending'
            },
            {
                name: 'PEC 2: Bayesian Networks & Probabilistic Methods',
                path: '/master-materials/TAREA_2_Martinez_Fernando.pdf',
                score: 'Pending'
            }
        ]
    },
    {
        id: 'nlp',
        title: 'Foundations of NLP',
        description: 'Natural language analysis, morphology, syntax, and language models.',
        icon: MessageSquare,
        files: [
            {
                name: 'Assignment 1',
                path: '/master-materials/Tarea_1_NLP.pdf',
                score: 'Pending'
            },
            {
                name: 'Assignment 2',
                path: '/master-materials/Tarea_2_NLP.pdf',
                score: '9/10'
            }
        ]
    },
    {
        id: 'machine-learning',
        title: 'Machine Learning Methods',
        description: 'Supervised, unsupervised, and reinforcement learning algorithms.',
        icon: Network,
        files: [
            {
                name: 'Regression, Bias & Variance',
                path: '/master-materials/Regresión, Sesgo-Varianza, Selección de Modelos I_Martinez_Fernando.pdf',
                score: 'Pending'
            }
        ]
    },
    {
        id: 'semantic-web',
        title: 'Semantic Web & Linked Data',
        description: 'Ontologies, knowledge graphs, RDF, and SPARQL.',
        icon: Database,
        files: [
            {
                name: 'Knowledge Graphs (KG)',
                path: '/master-materials/Memoria_KG_Opcional.pdf',
                score: 'Pending'
            },
            {
                name: 'OWL Ontologies',
                path: '/master-materials/Memoria_OWL.pdf',
                score: 'Pending'
            },
            {
                name: 'Property Graphs',
                path: '/master-materials/Memoria_Property_Graphs.pdf',
                score: 'Pending'
            },
            {
                name: 'RDF',
                path: '/master-materials/Memoria_RDF.pdf',
                score: 'Pending'
            }
        ]
    }
]

const ExplorationArticle = () => {
    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    The Research Roadmap (UNED)
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                An evolutionary journey through Artificial Intelligence research. This timeline tracks the progression of subjects and specialized findings during the University Master's program.
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
                                                            Grade: {file.score}
                                                        </span>
                                                    </div>
                                                    <ChevronRight size={12} style={{ opacity: 0.3 }} />
                                                </div>
                                            </a>
                                        ))
                                    ) : (
                                        <div className="timeline-empty">
                                            <BrainCircuit size={16} />
                                            <span>No publications released for this stage yet.</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="article-highlight-box" style={{ padding: '40px' }}>
                <h3 style={{ fontSize: '32px' }}>Research Evolution</h3>
                <div className="label">Continuous Milestone Tracker</div>
                <p style={{ maxWidth: '100%', textAlign: 'justify' }}>
                    Each point in this roadmap represents a critical domain of AI. As the master progresses, new technical reports and implementation prototypes will be integrated into this interactive knowledge structure.
                </p>
            </div>

            <div className="article-tags">
                <span className="tag">Research Journey</span>
                <span className="tag">Master's Timeline</span>
                <span className="tag">AI Milestones</span>
                <span className="tag">UNED Research</span>
            </div>
        </div>
    )
}

export default ExplorationArticle

