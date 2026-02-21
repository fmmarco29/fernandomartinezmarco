'use client'

import React from 'react'
import '@/styles/article.css'

const ShipRegsArticle = () => {
    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    Revolutionizing Maritime Compliance: How a New AI System Decodes Ship Regulations
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                For naval architects, surveyors, and engineers, navigating the labyrinth of international ship regulations is a daunting professional reality. With documents spanning tens of thousands of pages—filled with complex equations, cross-referenced tables, and specific jargon—finding the right rule at the right time is often a needle-in-a-haystack endeavor.
            </p>

            <blockquote className="article-quote">
                "A groundbreaking study has successfully developed a Q&A system that doesn't just retrieve information but 'understands' the nuances of maritime law better than standard AI models."
            </blockquote>

            <p className="article-text-content">
                However, a groundbreaking study titled <strong>"A RAG-based Q&A system for ship regulations applying domain adaptation"</strong> by In-Su Han, Myung-Il Roh, and Min-Chul Kong offers a compelling solution. The researchers have developed a system that bridges the gap between raw regulatory data and actionable engineering intelligence.
            </p>

            <h2 className="article-subtitle">1. Mastering the "Language" of Ships</h2>
            <p className="article-text-content">
                One of the primary hurdles in specialized fields is the language barrier. To a standard AI, "Draft" usually refers to a document version. In maritime engineering, it refers to the depth of a ship's hull submerged in water.
            </p>
            <p className="article-text-content">
                Because there was no existing large-scale dataset for ship regulation Q&A, the authors devised an ingenious method using <strong>Generative Pseudo-Labeling (GPL)</strong>. They used an advanced model (GPT-4o) to synthesize <strong>3 million training data triplets</strong> (queries, related rules, and unrelated rules) from the regulations themselves.
            </p>

            <div className="article-highlight-box">
                <h3>94.33%</h3>
                <div className="label">Retrieval Accuracy after Domain Adaptation</div>
                <p>
                    By training a BERT-based model on this synthetic data using contrastive learning, accuracy jumped from a base of 85.50% to a staggering 94.33%.
                </p>
            </div>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>02. Multimodal Logic</h2>
                    <h3>Decoding Tables and Equations</h3>
                    <p>
                        The researchers converted tables into <strong>HTML format</strong> and equations into <strong>LaTeX</strong>. This allowed the AI to answer complex queries like calculating testing times or determining plate thickness from structured data tables, integrating multimodal elements seamlessly.
                    </p>
                </div>
                <div className="article-card">
                    <h2>03. Resource Efficiency</h2>
                    <h3>The Offline Breakthrough</h3>
                    <p>
                        Implemented using <strong>LLaMA 3.1</strong> with 4-bit quantization, the system runs locally on consumer hardware requiring only <strong>4GB of GPU memory</strong>. This ensures total data confidentiality and reliability even in remote locations without internet access.
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">4. Beating the Human Benchmark</h2>
            <p className="article-text-content">
                To verify results, the researchers used expert human review and LLM-as-a-judge evaluations. The Q&A system achieved higher scores in <strong>clarity (4.22 vs 3.82)</strong> and <strong>completeness (3.80 vs 3.43)</strong> compared to answers written by human experts.
            </p>
            <p className="article-text-content" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
                Qualitative feedback from senior researchers in fluid dynamics and autonomous navigation confirmed that the system provided reliable, rule-based answers without the "hallucinations" often associated with general AI.
            </p>

            <h2 className="article-subtitle">Conclusion</h2>
            <p className="article-text-content-large">
                The article by Han et al. demonstrates that the future of regulatory compliance lies in specialized, domain-adapted AI. By teaching an AI the specific vernacular of naval architecture and optimizing it for secure, offline use, they have created an intelligent assistant capable of reasoning through the complex logic of maritime safety.
            </p>

            <div className="article-highlight-box" style={{ textAlign: 'left', padding: '30px', background: 'rgba(255,255,255,0.03)', marginTop: '40px' }}>
                <p className="label" style={{ fontSize: '12px', marginBottom: '10px' }}>Official Reference</p>
                <p style={{ fontSize: '13px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    Han, I.-S., Roh, M.-I., & Kong, M.-C. (2025). A RAG-based Q&A system for ship regulations applying domain adaptation. <em>International Journal of Naval Architecture and Ocean Engineering</em>, 18, 100735.
                </p>
            </div>

            <div className="article-tags">
                <span className="tag">RAG Architecture</span>
                <span className="tag">Domain Adaptation</span>
                <span className="tag">BERT</span>
                <span className="tag">LLaMA 3.1</span>
                <span className="tag">Naval Engineering</span>
            </div>
        </div>
    )
}

export default ShipRegsArticle
