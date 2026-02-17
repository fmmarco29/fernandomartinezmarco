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

const projects = [
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
    title: "Rules Semantic Graph-RAG agentic",
    description: "Corporate-level Retrieval-Augmented Generation system designed for complex engineering documentation with semantic search and contextual understanding.",
    stack: ["LangChain", "Python", "Vector Stores", "RAG Architecture", "Embeddings"],
    link: "https://colab.research.google.com/github/fmmarco29/langchain-qa-rag/blob/main/demo.ipynb",
    status: "offline" as const
  },
  {
    title: "AI Research Lab",
    description: "Experimental hub for interactive AI research, showcasing deep learning architectures and autonomous systems with live demonstrations.",
    stack: ["Next.js", "React", "Deep Learning", "Research"],
    link: "https://fmmarco29.github.io/AI/",
    status: "offline" as const
  }
]

const ProjectGrid = () => {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Portfolio</h2>
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
