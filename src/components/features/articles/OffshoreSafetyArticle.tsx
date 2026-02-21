'use client'

import React from 'react'
import '@/styles/article.css'

const OffshoreSafetyArticle = () => {
    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    Beyond Static Models: How DEMATEL-BN is Revolutionizing Offshore Safety
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                In the high-stakes world of offshore oil and gas production, the margin for error is non-existent. Catastrophic events, such as the Deepwater Horizon disaster, serve as grim reminders that traditional safety protocols are often insufficient to predict complex system failures.
            </p>

            <blockquote className="article-quote">
                "A groundbreaking article addresses this critical gap by proposing a novel, dynamic approach to risk assessment using DEMATEL-BN."
            </blockquote>

            <p className="article-text-content">
                The study titled <strong>"Dynamic quantitative risk assessment of accidents induced by leakage on offshore platforms using DEMATEL-BN"</strong> (Meng et al.) offers a compelling solution to the limitations of traditional Quantitative Risk Assessment (QRA). By shifting focus toward real-time monitoring and logical interdependencies, the research provides a framework for the future of industrial safety.
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>01. Evolution</h2>
                    <h3>From Static to Dynamic</h3>
                    <p>
                        The integration of <strong>Bayesian Networks (BN)</strong> allows for Dynamic QRA (DQRA). Unlike static Fault Trees, this model updates failure probabilities in real-time using accident precursor data, allowing operators to visualize risk trends across distinct time intervals.
                    </p>
                </div>
                <div className="article-card">
                    <h2>02. Complexity</h2>
                    <h3>DEMATEL Interdependencies</h3>
                    <p>
                        By utilizing the <strong>Decision-Making Trial and Evaluation Laboratory (DEMATEL)</strong>, the study identifies organizational management as a critical root cause that influences subsystems like human error and maintenance deficiencies.
                    </p>
                </div>
            </div>

            <div className="article-section-grid" style={{ marginTop: '0' }}>
                <div className="article-card">
                    <h2>03. Integration</h2>
                    <h3>Safety Barrier Dependency</h3>
                    <p>
                        The model challenges the assumption that safety barriers operate independently. By applying correction coefficients to <strong>Conditional Probability Tables (CPT)</strong>, it reveals how the failure of one system significantly increases the risk of subsequent barrier failures.
                    </p>
                </div>
                <div className="article-card">
                    <h2>04. Analysis</h2>
                    <h3>Abductive Reasoning</h3>
                    <p>
                        The BN framework enables backward "abductive reasoning" to identify root causes after an event. The study confirms that human error and inadequate maintenance remain the most likely culprits behind large-scale safety barrier failures.
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">Conclusion</h2>
            <p className="article-text-content-large">
                The methodology proposed represents a significant leap forward in safety engineering. By combining relational mapping with probabilistic updating, it provides a tool that actively monitors risk evolution, potentially preventing catastrophic failures through dynamic monitoring.
            </p>

            <div className="article-highlight-box" style={{ textAlign: 'left', padding: '30px', background: 'rgba(255,255,255,0.03)', marginTop: '40px' }}>
                <p className="label" style={{ fontSize: '12px', marginBottom: '10px' }}>Reference</p>
                <p style={{ fontSize: '13px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    Meng, X., et al. (2018). Dynamic quantitative risk assessment of accidents induced by leakage on offshore platforms using DEMATEL-BN. <em>International Journal of Naval Architecture and Ocean Engineering</em>, 11(1), 22-32.
                </p>
            </div>

            <div className="article-tags">
                <span className="tag">DEMATEL</span>
                <span className="tag">Bayesian Networks</span>
                <span className="tag">Dynamic QRA</span>
                <span className="tag">Offshore Safety</span>
                <span className="tag">Risk Assessment</span>
            </div>
        </div>
    )
}

export default OffshoreSafetyArticle
