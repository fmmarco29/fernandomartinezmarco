'use client'

import React from 'react'
import '@/styles/article.css'

const LNGSloshingArticle = () => {
  return (
    <div className="article-container">
      <header className="article-header">
        <h1 className="article-title">
          Revolutionizing LNG Ship Design: How Neural Networks are Taming Sloshing Loads
        </h1>
        <div className="article-divider"></div>
      </header>

      <p className="article-lead">
        In the world of naval architecture, few challenges are as persistent and complex as <strong>sloshing</strong>. For ships carrying liquid cargo—particularly Liquefied Natural Gas (LNG) carriers and LNG-fueled vessels—the violent movement of liquid inside tanks can cause severe structural damage.
      </p>

      <p className="article-text-content">
        Traditionally, ensuring the safety of these tanks has been a costly and time-consuming endeavor involving months of physical model testing. However, a remarkable study published in <em>Marine Structures</em> by Yangjun Ahn and Yonghwan Kim from Seoul National University offers a glimpse into a more efficient future.
      </p>

      <blockquote className="article-quote">
        "Their paper successfully demonstrates how machine learning can transform how we predict extreme loads."
      </blockquote>

      <p className="article-text-content">
        Their paper, <strong>"Data mining in sloshing experiment database and application of neural network for extreme load prediction"</strong>, successfully demonstrates how machine learning can transform how we predict extreme loads. Here are the key achievements detailed in their research.
      </p>

      <div className="article-section-grid">
        <div className="article-card">
          <h2>01. The Foundation</h2>
          <h3>Mining a Massive Database</h3>
          <p>
            The authors leveraged the <strong>Seoul National University Sloshing Model Test Database (SNU DB)</strong>, containing over <strong>540 terabytes</strong> of experimental data. They mined results from 3,589 conditions, representing nearly <strong>18,000 hours</strong> of physical testing across tank dimensions, environmental conditions, and ship motion responses.
          </p>
        </div>
        <div className="article-card">
          <h2>02. The Architecture</h2>
          <h3>Overcoming Complexity</h3>
          <p>
            Sloshing is highly nonlinear. To solve this, they developed a deep <strong>Artificial Neural Network (ANN)</strong> with <strong>five hidden layers</strong> and applied an <strong>Ensemble Method</strong>. Averaging the predictions of the top five networks significantly improved reliability, smoothing out stochastic variances.
          </p>
        </div>
      </div>

      <h2 className="article-subtitle">Validating the "Black Box"</h2>
      <p className="article-text-content">
        The most impressive achievement of the study was the validation. The neural network was successfully challenged to predict the results of real-world tank designs used by major shipbuilders like Hyundai Heavy Industries (HHI) and Samsung Heavy Industries (SHI).
      </p>

      <div className="article-highlight-box">
        <h3>HHI & SHI</h3>
        <div className="label">Real-World Validation</div>
        <ul style={{ textAlign: 'left', marginTop: '1rem', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Fuel Tanks (HHI):</strong> Accurately predicted that a "two-row" tank arrangement would experience significantly lower sloshing loads compared to a "one-row" arrangement.</li>
          <li><strong>Cargo Holds (SHI):</strong> Successfully identified how subtle changes in tank geometry (like the lower chamfer height) mitigate impact pressures, predicting the "Optimum" model's superior performance.</li>
        </ul>
      </div>

      <h2 className="article-subtitle">A New Tool for Efficient Design</h2>
      <p className="article-text-content">
        This neural network approach is a game-changer for the preliminary design phase. It allows engineers to <strong>rapidly screen</strong> thousands of variations, <strong>identify critical conditions</strong>, and <strong>predict extreme loads</strong> with exceptional accuracy, saving immense time and resources.
      </p>

      <h2 className="article-subtitle">Conclusion</h2>
      <p className="article-text-content-large">
        Ahn and Kim’s work represents a significant step forward in maritime engineering. By successfully bridging the gap between massive physical datasets and advanced machine learning, they have provided a tool that enhances both the safety and efficiency of LNG ship design.
      </p>

      <div className="article-tags">
        <span className="tag">Machine Learning</span>
        <span className="tag">Naval Architecture</span>
        <span className="tag">LNG Carriers</span>
        <span className="tag">Neural Networks</span>
        <span className="tag">Sloshing Simulation</span>
      </div>
    </div>
  )
}

export default LNGSloshingArticle
