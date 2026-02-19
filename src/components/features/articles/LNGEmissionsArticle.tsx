'use client'

import React from 'react'
import '@/styles/article.css'

const LNGEmissionsArticle = () => {
  return (
    <div className="article-container">
      <header className="article-header">
        <h1 className="article-title">
          From Reactive to Proactive: How Data-Driven Models Can Slash Emissions in LNG Shipping
        </h1>
        <div className="article-divider"></div>
      </header>

      <p className="article-lead">
        Liquefied Natural Gas (LNG) is often hailed as a bridge fuel for a greener future, yet the vessels transporting it face a paradoxical challenge: to maintain safety, they sometimes have to burn the very cargo they are trying to deliver. This process, involving the Gas Combustion Unit (GCU), creates unnecessary greenhouse gas (GHG) emissions.
      </p>

      <blockquote className="article-quote">
        "By transitioning from reactive to proactive management of cargo pressure, ships can significantly reduce their carbon footprint."
      </blockquote>

      <p className="article-text-content">
        However, a fascinating new study published in the <em>International Journal of Naval Architecture and Ocean Engineering</em> by Hyun Soo Kim and Myung-Il Roh suggests that the key to solving this lies in <strong>predictive modeling</strong>. By transitioning from reactive to proactive management of cargo pressure, ships can significantly reduce their carbon footprint.
      </p>

      <div className="article-section-grid">
        <div className="article-card">
          <h2>01. The Problem</h2>
          <h3>The Boil-Off Gas Dilemma</h3>
          <p>
            LNG must be kept at cryogenic temperatures (-163°C). External heat and sloshing cause <strong>Boil-Off Gas (BOG)</strong>. When reliquefaction systems reach their limits during rough seas, surplus gas is diverted to the <strong>Gas Combustion Unit (GCU)</strong> and incinerated.
          </p>
        </div>
        <div className="article-card">
          <h2>02. The Solution</h2>
          <h3>Predicting the Future</h3>
          <p>
            Kim and Roh built an ML model capable of predicting cargo tank pressure by accounting for real-world variables like sea states. Knowing pressure rises <em>before</em> they happen allows for proactive intervention.
          </p>
        </div>
      </div>

      <h2 className="article-subtitle">The "Proactive" Strategy</h2>
      <p className="article-text-content">
        Instead of waiting for an alarm, the predictive model analyzes upcoming weather. If it forecasts a pressure increase, the operator can activate the reliquefaction system at <strong>"full-load mode" preemptively</strong>. This head start prevents the pressure from hitting the trigger threshold for the GCU.
      </p>

      <div className="article-highlight-box">
        <h3>579 Tons</h3>
        <div className="label">Saved Emissions per Voyage</div>
        <p>
          Historical data from "Voyage 1" showed 673 tons of LNG consumed. The study concluded that with proactive modeling, <strong>579 tons</strong> of that waste could have been avoided entirely.
        </p>
      </div>

      <h2 className="article-subtitle">Conclusion</h2>
      <p className="article-text-content-large">
        This study demonstrates that the path to decarbonization in shipping isn't just about building new engines; it is also about <strong>smarter data utilization</strong>. By leveraging predictive algorithms like Multiple Linear Regression (MLR), ship operators can move from a defensive stance to an offensive one, smoothing out inefficiencies before they become emissions.
      </p>

      <div className="article-tags">
        <span className="tag">Machine Learning</span>
        <span className="tag">LNG Shipping</span>
        <span className="tag">Predictive Modeling</span>
        <span className="tag">Sustainability</span>
        <span className="tag">Decarbonization</span>
      </div>
    </div>
  )
}

export default LNGEmissionsArticle
