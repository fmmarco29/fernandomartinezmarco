'use client'

import React from 'react'
import '@/styles/article.css'

const ShipHullLoadArticle = () => {
    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    Navigating the Future: How Deep Learning is Revolutionizing Real-Time Ship Hull Load Predictions
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                Ensuring the structural integrity of large container ships amidst complex and unpredictable sea conditions is paramount for maritime safety. Traditionally, classification societies mandate structural strength verification during the design phase, and modern vessels often rely on Hull Response Monitoring Systems (HRMS) using physical strain gauges.
            </p>

            <blockquote className="article-quote">
                "Ship motion data offers a far more accessible and stable alternative for assessing dynamic forces."
            </blockquote>

            <p className="article-text-content">
                In a recent breakthrough, researchers published an innovative article in the <em>International Journal of Naval Architecture and Ocean Engineering</em>. This publication represents a significant paradigm shift in maritime engineering by utilizing <strong>Recurrent Neural Networks (RNNs)</strong> to predict wave-induced hull girder loads in real time.
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>01. Robust Models</h2>
                    <h3>RNNs for Real-Time Prediction</h3>
                    <p>
                        By applying <strong>LSTM and GRU architectures</strong>, the system accounts for the dynamic time-history of hull loads, capturing how previous ship motions influence current structural stress (VBM, HBM, and Torsional Moments).
                    </p>
                </div>
                <div className="article-card">
                    <h2>02. Optimization</h2>
                    <h3>Tailored Architectures</h3>
                    <p>
                        The study discovered that different loads require distinct networks: a single-layer LSTM proved optimal for VBM, while a deeper 3-layer GRU was utilized to extract complex features for TM and HBM.
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">The Error Correction Strategy (ECS)</h2>
            <p className="article-text-content">
                The most innovative contribution is a three-step ECS framework:
                1. Establishing an <strong>Original model</strong> to map motions to loads.
                2. Creating an <strong>Error model</strong> mapping motions to prediction errors.
                3. Combining outputs to continuously adjust and correct predictions in real-time.
            </p>

            <div className="article-highlight-box">
                <h3>48.08%</h3>
                <div className="label">Accuracy Improvement in Oblique Seas</div>
                <p>
                    The implementation of the ECS yielded remarkable improvements, plummeting the RMSE for HBM predictions from 5.2% to 2.7% under identical sea state conditions.
                </p>
            </div>

            <h2 className="article-subtitle">Conclusion</h2>
            <p className="article-text-content-large">
                This research marks a monumental leap in ship monitoring. By marrying deep learning networks with accessible ship motion data, authors have provided a viable tool for real-time load monitoring, empowering captains to make informed navigational decisions.
            </p>

            <div className="article-tags">
                <span className="tag">Deep Learning</span>
                <span className="tag">Naval Architecture</span>
                <span className="tag">RNN</span>
                <span className="tag">Structural Integrity</span>
                <span className="tag">LSTM/GRU</span>
            </div>

            <p style={{ marginTop: '40px', fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                Reference: Wang, Q., et al. (2024). International Journal of Naval Architecture and Ocean Engineering.
            </p>
        </div>
    )
}

export default ShipHullLoadArticle
