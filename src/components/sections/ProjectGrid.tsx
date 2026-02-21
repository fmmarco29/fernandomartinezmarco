'use client'
import dynamic from 'next/dynamic'
import InteractiveProjectCard from '@/components/common/InteractiveProjectCard'

const BentoGridSimulator = dynamic(
  () => import('@/components/features/grounding/BentoGridSimulator'),
  { ssr: false }
)

const InteractiveSARDashboard = dynamic(
  () => import('@/components/features/sar/InteractiveSARDashboard'),
  { ssr: false }
)

const LNGEmissionsArticle = dynamic(
  () => import('@/components/features/articles/LNGEmissionsArticle'),
  { ssr: false }
)

const LNGSloshingArticle = dynamic(
  () => import('@/components/features/articles/LNGSloshingArticle'),
  { ssr: false }
)

const ShipRegsArticle = dynamic(
  () => import('@/components/features/articles/ShipRegsArticle'),
  { ssr: false }
)

const OffshoreSafetyArticle = dynamic(
  () => import('@/components/features/articles/OffshoreSafetyArticle'),
  { ssr: false }
)

const ExplorationArticle = dynamic(
  () => import('@/components/features/articles/ExplorationArticle'),
  { ssr: false }
)

const projects = [
  {
    title: "Emissions Reduction in LNG Shipping",
    description: "Technical analysis of how predictive machine learning models for cargo tank pressure can reduce GHG emissions by up to 86% during rough sea voyages. This study demonstrates the power of data-driven 'proactive' strategies over traditional reactive operations.",
    stack: ["Machine Learning", "Predictive Modeling", "Naval Architecture", "GHG Mitigation"],
    link: "#",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <img src="/lng_emissions_preview.png" alt="LNG Emissions Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <LNGEmissionsArticle />
  },
  {
    title: "Taming Sloshing with Neural Networks",
    description: "An analysis of how deep Artificial Neural Networks (ANNs) and immense experimental databases can predict extreme sloshing loads in LNG carriers, revolutionizing preliminary ship design and replacing costly physical model tests.",
    stack: ["Neural Networks", "Data Mining", "Naval Architecture", "LNG Carriers"],
    link: "#",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <img src="/slosh.png" alt="LNG Sloshing Neural Network Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <LNGSloshingArticle />
  },
  {
    title: "AI Semantic Search for Maritime Regulations",
    description: "Development of a RAG-based Q&A system for international ship regulations. Using domain adaptation (GPL) and contrastive learning, the engine achieves 94% accuracy in retrieving complex maritime rules, equations, and tables while running entirely offline on consumer hardware.",
    stack: ["RAG Systems", "Domain Adaptation", "LLM Quantization", "NLP", "Naval Engineering"],
    link: "https://colab.research.google.com/github/fmmarco29/langchain-qa-rag/blob/main/demo.ipynb",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <img src="/naval_shipyard.png" alt="AI Maritime Regulations Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <ShipRegsArticle />
  },
  {
    title: "Dynamic Risk Assessment in Offshore Platforms",
    description: "Technical study on DQRA using the DEMATEL-BN method to evaluate accidents induced by leakage. The framework transitions from static failure probabilities to dynamic updates, uncovering hidden organizational interdependencies and modeling safety barrier dependencies with high precision.",
    stack: ["Dynamic QRA", "Bayesian Networks", "DEMATEL", "Offshore Safety", "System Dynamics"],
    link: "#",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <img src="/bayes.png" alt="Dynamic Risk Assessment Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <OffshoreSafetyArticle />
  },
  {
    title: "Ship Grounding Risk Assessment",
    description: "Advanced Quantitative Risk Assessment (QRA) platform leveraging Dynamic Bayesian Networks (DBNs) and Noisy-OR causal logic (Pearl 1988). The engine employs Kahn's topological sorting and BFS-based belief propagation to model the complex multi-physics interactions between structural breach, sequential compartment flooding, and non-linear stability (GZ) degradation under stochastic operational conditions.",
    stack: ["Probabilistic Graphical Models", "Structural Stress Analysis", "Naval Hydrostatics", "Causal Inference", "Real-time DBN Solver"],
    link: "https://github.com/fmmarco29",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden' }}>
        <img src="/grounding_simulator_cover.png" alt="Simulator Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <BentoGridSimulator />
  },
  {
    title: "Bayesian SAR Orchestrator",
    description: "In the critical moments following vessel abandonment, traditional search patterns often fail to account for the dynamic complexity of maritime environments. This project bridges the gap between Naval Architecture and AI System Design by deploying a Dynamic Bayesian Network to infer survival craft trajectories. By synthesizing real-time atmospheric data with high-fidelity leeway coefficients, the engine generates an evolving probability heat map, significantly compressing search windows and optimizing life-saving asset deployment.",
    stack: ["Stochastic Drift Inference", "Agentic Orchestration", "Domain-Specific Physics", "Decision-Support Metrics", "Dynamic Bayesian Networks"],
    link: "https://github.com/fmmarco29",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden' }}>
        <img src="/sar_preview.png" alt="SAR Orchestrator Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <InteractiveSARDashboard />
  },
  {
    title: "AI Research Lab",
    description: "An architect's exploration into the intersection of naval engineering and artificial intelligence. This lab showcases experimental prototypes, deep learning architectures, and a journey into data-driven maritime solutions.",
    stack: ["Next.js", "React", "Deep Learning", "Research"],
    link: "https://fmmarco29.github.io/AI/",
    status: "offline" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <img src="/rl.png" alt="AI Research Lab Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <ExplorationArticle />
  }
]

const ProjectGrid = () => {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Insights</h2>
      <div className="project-grid">
        {projects.map((project, i) => (
          <InteractiveProjectCard
            key={i}
            title={project.title}
            description={project.description}
            stack={project.stack}
            link={project.link}
            status={project.status}
            preview={project.preview}
            expandedContent={project.expandedContent}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectGrid
