'use client'

import React from 'react'
import '@/styles/article.css'
import HybridArchitectureVisual from '@/components/shared/HybridArchitectureVisual'

const RiserFatigueArticle = () => {
    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    Revolutionizing Offshore Safety: A New Digital Twin Approach for Riser Fatigue Monitoring
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                In the offshore oil and gas industry, the push into deeper waters brings with it significant engineering challenges. Among the most critical components in these operations are marine risers—the pipelines connecting seabed equipment to surface platforms.
            </p>

            <blockquote className="article-quote">
                "Digital twin approach with minimal sensors for Riser’s fatigue-damage estimation" — Lee et al. (2024)
            </blockquote>

            <p className="article-text-content">
                Ensuring the structural integrity of these risers is paramount, yet traditional monitoring methods are often costly, complex, and reliant on extensive underwater sensor networks. A recent breakthrough study proposes a novel solution that could transform how we assess fatigue life in deep-water environments.
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>01. Sensor Optimization</h2>
                    <h3>High-Fidelity Monitoring</h3>
                    <p>
                        The study validates a <strong>Digital Twin</strong> methodology using minimal sensors. Reliable monitoring is feasible using primarily "dry" sensors on the vessel (Top Oscillation Model) or adding just one sensor at the sag bend.
                    </p>
                </div>
                <div className="article-card">
                    <h2>02. Machine Learning</h2>
                    <h3>Environmental Prediction</h3>
                    <p>
                        An <strong>Artificial Neural Network</strong> inversely estimates 3D current profiles based on vessel motion. This eliminates the need for expensive acoustic Doppler current profilers (ADCPs) while maintaining high accuracy.
                    </p>
                </div>
            </div>
            <HybridArchitectureVisual />
            <h2 className="article-subtitle">Proven Accuracy & Robustness</h2>
            <p className="article-text-content">
                The model was rigorously validated against a "Full Field Model" simulating conditions in the Guyana Sea and extreme storms in the Gulf of Mexico.
            </p>

            <div className="article-highlight-box">
                <h3>5% - 10%</h3>
                <div className="label">Error Rate</div>
                <p>
                    The estimated accumulated fatigue damage showed remarkably low error rates compared to reference models, successfully identifying critical "hotspots" at the top connection and touchdown point.
                </p>
            </div>

            <h2 className="article-subtitle">Conclusion</h2>
            <p className="article-text-content-large">
                This research presents a cost-effective, real-time solution for riser health monitoring. By leveraging digital twins and machine learning, operators can estimate fatigue life with high precision using standard vessel motion sensors, reducing OPEX and enhancing safety for deep-water energy production.
            </p>

            <div className="article-reference" style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                <strong>Reference:</strong> Lee, Y., Jin, C., Kim, M., & Xu, W. (2024). Digital twin approach with minimal sensors for Riser’s fatigue-damage estimation. <em>International Journal of Naval Architecture and Ocean Engineering</em>, 16, 100603.
            </div>

            <div className="article-tags">
                <span className="tag">Digital Twin</span>
                <span className="tag">Offshore Safety</span>
                <span className="tag">Machine Learning</span>
                <span className="tag">Riser Monitoring</span>
                <span className="tag">Fatigue Analysis</span>
            </div>
        </div>
    )
}

export default RiserFatigueArticle
