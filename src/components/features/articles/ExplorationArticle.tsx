'use client'

import React from 'react'
import '@/styles/article.css'

const ExplorationArticle = () => {
    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    The Intersection of Hull Design and Algorithms: A Technical Exploration
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                The traditional focus of naval architecture remains centered on buoyancy, structural integrity, and physical constraints. However, there is a growing necessity to explore the digital structures offered by artificial intelligence as a complement to classical engineering principles.
            </p>

            <blockquote className="article-quote">
                "This exploration is not an attempt to reinvent the industry, but rather a technical inquiry into whether data-driven solutions can optimize existing maritime processes."
            </blockquote>

            <p className="article-text-content">
                This space serves as a technical laboratory rather than a commercial portfolio. It is dedicated to exploring how Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and Bayesian Networks can be integrated into the complex landscape of maritime engineering.
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>The Motivation</h2>
                    <h3>Curiosity Over Commercialization</h3>
                    <p>
                        The maritime industry operates within high-stakes, traditional frameworks. Mountaintop-sized regulations and vast operational datasets are often handled reactively. This research investigates whether predictive algorithms can facilitate a transition toward proactive management without compromising safety-first standards.
                    </p>
                </div>
                <div className="article-card">
                    <h2>The Method</h2>
                    <h3>Implementation-Led Research</h3>
                    <p>
                        The methodology is grounded in practical implementation, from decoding KR Rules via RAG to predicting LNG boil-off gas behavior. The objective is to evaluate the efficacy of AI prototypes in real-world scenarios, identifying both their potential advantages and their current limitations.
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">A Realistic Framework</h2>
            <p className="article-text-content">
                AI is not presented as a definitive solution for every engineering challenge. Shipping remains a complex and physical domain. The focus remains on how these technologies can assist technical experts—streamlining regulatory consultation, enhancing risk visualization, and improving operational efficiency.
            </p>

            <div className="article-highlight-box">
                <h3>Systematic Development</h3>
                <div className="label">Evolutionary Roadmap</div>
                <p>
                    Each project represents a stage in the process of translating specialized naval vernacular into machine-readable logic. This ensures that as the industry adopts new digital tools, the core principles of naval architecture remain the primary foundation.
                </p>
            </div>

            <h2 className="article-subtitle">Moving Forward</h2>
            <p className="article-text-content-large">
                This ongoing exploration continues at the intersection of maritime physics and digital intelligence. The research projects presented here are an open invitation to examine how data-driven strategies can contribute to a more efficient and technologically integrated maritime industry.
            </p>

            <div className="article-tags">
                <span className="tag">Naval Architecture</span>
                <span className="tag">AI Research</span>
                <span className="tag">Technical Exploration</span>
                <span className="tag">Maritime Tech</span>
                <span className="tag">Data-Driven Engineering</span>
            </div>
        </div>
    )
}

export default ExplorationArticle
