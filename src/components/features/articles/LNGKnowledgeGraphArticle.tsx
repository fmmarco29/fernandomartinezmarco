'use client'

import React from 'react'
import '@/styles/article.css'

const LNGKnowledgeGraphArticle = () => {
    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    Navigating Complexity: How AI and Knowledge Graphs are Revolutionizing LNG Ship Inspections
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                The maritime transport of Liquefied Natural Gas (LNG) is a high-stakes industry where safety is paramount. LNG carriers are among the most sophisticated vessels afloat, subject to rigorous construction standards. However, maintaining these standards throughout a ship's operational life relies heavily on Port State Control (PSC) inspections.
            </p>

            <p className="article-text-content">
                A recent study published in <em>Ocean Engineering</em> by Zhang et al., titled <strong>"A knowledge graph-based inspection items recommendation method for port state control inspection of LNG carriers,"</strong> proposes a groundbreaking approach to assist inspectors. The paper addresses a critical bottleneck: inspections are time-consuming, and inspectors (PSCOs) cannot check every single component with equal depth.
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>The Core Problem</h2>
                    <h3>Information Overload</h3>
                    <p>
                        Standard inspection algorithms often treat data points in isolation. However, LNG inspection requires connecting complex dots: regulations, specific machinery, and historical deficiency data. A single piece of equipment might have multiple checkpoints linked to specific regulation clauses.
                    </p>
                </div>
                <div className="article-card">
                    <h2>Key Achievements</h2>
                    <h3>Knowledge Graph & PT-KGCN</h3>
                    <p>
                        The study introduces a specialized Knowledge Graph (KG) and the PT-KGCN model, using RoBERTa for NLP and Graph Convolutional Networks (GCN) to aggregate information. This achieved an accuracy of over 87% in predicting defective items.
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">Understanding the Logic: A Python Example</h2>
            <p className="article-text-content">
                The "magic" of the article lies in how the algorithm calculates the importance of an inspection item based on its connections in the Knowledge Graph. Below is a simplified Python conceptualization of the AGCN Aggregator logic.
            </p>

            <div className="article-code-block">
                <pre><code>{`import numpy as np

class SimpleKGCN_Aggregator:
    def __init__(self, input_dim):
        self.weights = np.random.rand(input_dim, input_dim)
        self.bias = np.random.rand(input_dim)

    def aggregate(self, target_node_vector, neighbor_vectors, relations):
        # Step 1: Calculate attention scores
        scores = [np.dot(n, r) for n, r in zip(neighbor_vectors, relations)]
        normalized_scores = self.softmax(scores)
        
        # Step 2: Aggregate neighbor information
        neighbor_agg = sum(s * n for s, n in zip(normalized_scores, neighbor_vectors))
            
        # Step 3: Combine Target + Neighbors
        combined_vector = target_node_vector + neighbor_agg
        output_vector = np.tanh(np.dot(combined_vector, self.weights) + self.bias)
        
        return 1 / (1 + np.exp(-np.sum(output_vector))) # Risk Score`}</code></pre>
            </div>

            <h2 className="article-subtitle">Why This Matters</h2>
            <p className="article-text-content-large">
                This technology allows PSCOs to move from "checklist-based" inspections to "risk-based" intelligence, potentially saving lives by catching critical deficiencies that might otherwise be missed.
            </p>

            <div className="article-tags">
                <span className="tag">Knowledge Graphs</span>
                <span className="tag">LNG Carriers</span>
                <span className="tag">Port State Control</span>
                <span className="tag">PT-KGCN</span>
                <span className="tag">Maritime AI</span>
            </div>

            <footer className="article-footer" style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.7 }}>
                <strong>Reference:</strong> Zhang, X., Liu, C., Xu, Y., Ye, B., Gan, L., & Shu, Y. (2024). A knowledge graph-based inspection items recommendation method for port state control inspection of LNG carriers. <em>Ocean Engineering</em>, 313, 119434.
            </footer>
        </div>
    )
}

export default LNGKnowledgeGraphArticle
