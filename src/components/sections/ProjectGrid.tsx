'use client'
import 'next/image'
import Image from 'next/image'
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

const RiserFatigueArticle = dynamic(
  () => import('@/components/features/articles/RiserFatigueArticle'),
  { ssr: false }
)

const ShipHullLoadArticle = dynamic(
  () => import('@/components/features/articles/ShipHullLoadArticle'),
  { ssr: false }
)

const LNGKnowledgeGraphArticle = dynamic(
  () => import('@/components/features/articles/LNGKnowledgeGraphArticle'),
  { ssr: false }
)

const HydroGNNBayesDashboard = dynamic(
  () => import('@/components/features/hydrognn/HydroGNNBayesDashboard'),
  { ssr: false }
)

import { useLanguage } from '@/contexts/LanguageContext'

const getProjects = (language: 'en' | 'es') => [
  {
    title: "HydroGNN-Bayes: LNG BOG Physics Engine",
    description: language === 'es'
      ? "Motor físico termodinámico PINN en tiempo real para predecir el Boil-Off Gas (BOG) en tanques GTT Mark-III. Relacionando la conducción de calor y el cambio de fase para simular exactamente la tasa de evaporación diaria. Incluye una arquitectura ST-GNN + Bayesiana para simular rutas estocásticas y variables climáticas dinámicas de Copernicus."
      : "Real-time PINN thermodynamics engine for LNG Boil-Off Gas (BOG) prediction on GTT Mark-III tanks. By solving Fourier heat conduction and Clapeyron phase-change equations, the model calculates how dynamic environmental factors (SST, wave height, wind) drive thermal ingress (Q) into the cryogenic cargo, accurately simulating the daily evaporation rate. Includes a proposed ST-GNN + Bayesian architecture to predict these non-linear dynamics under route-aware uncertainty.",
    stack: ["PINN", "ERA5/HYCOM", "GTT Mark-III", "Fourier Heat Eq.", "ST-GNN (proposed)"],
    link: "#",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#020817', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <Image src="/pinn.png" alt="HydroGNN-Bayes Preview" fill style={{ objectFit: 'cover' }} quality={100} priority />
        <div style={{ position: 'absolute', bottom: 12, left: 12, fontFamily: 'monospace', fontSize: 10, color: 'rgba(139,92,246,0.9)', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>ST-GNN · PINN · BAYES</div>
      </div>
    ),
    expandedContent: <HydroGNNBayesDashboard />
  },
  {
    title: "Deep Learning for Ship Hull Load Prediction",
    description: language === 'es'
      ? "Implementación revolucionaria de redes RNN (LSTM/GRU) y una novedosa Estrategia de Corrección de Errores para predecir cargas de viga-casco inducidas por el oleaje en tiempo real. Utilizando datos de movimiento del buque en lugar de galgas extensiométricas, el sistema mejora la precisión hasta un 48% en estados de mar complejos."
      : "Revolutionary implementation of RNNs (LSTM/GRU) and a novel Error Correction Strategy to predict wave-induced hull girder loads in real-time. By leveraging ship motion data instead of physical strain gauges, the system achieves up to 48% accuracy improvement in complex sea states.",
    stack: ["LSTM", "GRU", "Deep Learning", "Naval Architecture", "Predictive Analytics"],
    link: "#",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <img src="/lng_2.png" alt="Ship Hull Load Prediction Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <ShipHullLoadArticle />
  },
  {
    title: "Digital Twin for Riser Fatigue Monitoring",
    description: language === 'es'
      ? "Novedosa metodología de Gemelo Digital usando sensores mínimos y machine learning para estimar el daño por fatiga en risers de aguas profundas. Validado en condiciones reales en el Mar de Guyana y el Golfo de México, logrando una altisima fidelidad (5-10% de error) y reduciendo drásticamente los costes de instrumentación submarina."
      : "Novel Digital Twin methodology using minimal sensors and machine learning to estimate fatigue damage in deep-water risers. Validated against extreme conditions in the Guyana Sea and Gulf of Mexico, achieving high-fidelity results (5-10% error) while significantly reducing subsea instrumentation costs.",
    stack: ["Digital Twin", "Machine Learning", "Fatigue Analysis", "Offshore Engineering", "Sensor Fusion"],
    link: "#",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <img src="/riser.png" alt="Riser Fatigue Monitoring Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <RiserFatigueArticle />
  },
  {
    title: "Emissions Reduction in LNG Shipping",
    description: language === 'es'
      ? "Análisis técnico de cómo los modelos predictivos de machine learning para presión de tanques de carga pueden reducir las emisiones GHG hasta un 86% durante viajes desafiantes. Este estudio demuestra el inmenso poder de las estrategias de ruteo 'proactivas' basadas en datos sobre las operaciones reactivas tradicionales de la flota."
      : "Technical analysis of how predictive machine learning models for cargo tank pressure can reduce GHG emissions by up to 86% during rough sea voyages. This study demonstrates the power of data-driven 'proactive' strategies over traditional reactive operations.",
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
    title: "Graph-Based LNG Inspection Intelligence",
    description: language === 'es'
      ? "Implementación de un Grafo de Conocimiento (KG) y modelo PT-KGCN para optimizar las inspecciones de PSC (control del estado rector del puerto). Usando Redes Convolucionales de Grafos y NLP (RoBERTa), el sistema predice deficiencias en buques con un 87% de precisión, evolucionando las inspecciones hacia un modelo de inteligencia pre-evaluable basado en riesgos."
      : "Implementation of a Knowledge Graph (KG) and PT-KGCN model for Port State Control (PSC) inspections. Using Graph Convolutional Networks and NLP (RoBERTa), the system achieves 87% accuracy in predicting ship deficiencies, transitioning inspections from static checklists to dynamic, risk-based intelligence.",
    stack: ["Knowledge Graphs", "Graph Convolutional Networks", "RoBERTa", "Maritime Safety", "Predictive Analytics"],
    link: "#",
    status: "online" as const,
    preview: (
      <div style={{ width: '100%', height: '100%', background: '#050a12', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
        <img src="/lng_kg.png" alt="LNG Knowledge Graph Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ),
    expandedContent: <LNGKnowledgeGraphArticle />
  },
  {
    title: "Taming Sloshing with Neural Networks",
    description: language === 'es'
      ? "Análisis de cómo redes neuronales profundas (ANN) y gigantescas bases de datos experimentales pueden predecir cargas extremas hidrodinámicas de sloshing (chapoteo) en buques GNL. Este análisis revoluciona el diseño preliminar del barco ahorrando meses de campaña y sustituyendo directamente los costosos ensayos de hexápodo con modelos físicos."
      : "An analysis of how deep Artificial Neural Networks (ANNs) and immense experimental databases can predict extreme sloshing loads in LNG carriers, revolutionizing preliminary ship design and replacing costly physical model tests.",
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
    description: language === 'es'
      ? "Desarrollo de un sistema avanzado de preguntas y respuestas RAG para normativa marítima internacional (IMO, SOLAS, MARPOL). Utilizando afinación y adaptación de dominio (GPL) y aprendizaje contrastivo, el motor LLM alcanza un impresionante 94% de precisión recuperando complejas reglas navales, corriendo 100% offline y en hardware estándar de propósito general."
      : "Development of a RAG-based Q&A system for international ship regulations. Using domain adaptation (GPL) and contrastive learning, the engine achieves 94% accuracy in retrieving complex maritime rules, equations, and tables while running entirely offline on consumer hardware.",
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
    description: language === 'es'
      ? "Estudio técnico sobre DQRA usando el potente método DEMATEL-BN para evaluar accidentes catastróficos inducidos por fugas de gas. El framework híbrido pasa de probabilidades estructurales totalmente estáticas a actualizaciones Bayesianas dinámicas, modelando y desvelando interdependencias humanas-organizacionales y operativas con extrema precisión matemática."
      : "Technical study on DQRA using the DEMATEL-BN method to evaluate accidents induced by leakage. The framework transitions from static failure probabilities to dynamic updates, uncovering hidden organizational interdependencies and modeling safety barrier dependencies with high precision.",
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
    description: language === 'es'
      ? "Plataforma avanzada de Evaluación Cuantitativa de Riesgos (QRA) combinando Redes Bayesianas Dinámicas (DBN) y lógica probabilistica causal Pearl Noisy-OR. El potente motor emplea inferencia de topología de Kahn y BFS para simular y conectar la interacción multi-física dinámica en tiempo real tras la varada: desgarro estructural, inundación secuencial de bodega compartimental y degradación asimétrica no lineal de la estabilidad y brazo (GZ)."
      : "Advanced Quantitative Risk Assessment (QRA) platform leveraging Dynamic Bayesian Networks (DBNs) and Noisy-OR causal logic (Pearl 1988). The engine employs Kahn's topological sorting and BFS-based belief propagation to model the complex multi-physics interactions between structural breach, sequential compartment flooding, and non-linear stability (GZ) degradation under stochastic operational conditions.",
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
    description: language === 'es'
      ? "Ante un trágico abandono de buque en alta mar, los patrones cinemáticos de búsqueda tradicionales no logran abarcar la enorme complejidad de fuerzas del entorno marítimo. Este proyecto de alto impacto une Arquitectura Naval y Sistemas de IA desplegando una Red Bayesiana Dinámica para derivas. Sintetizando modelos oceanográficos en tiempo real con coeficientes aerodinámicos de abatimiento, genera un 'Probability Heat Map', optimizando el rescate en la estrecha ventana térmica."
      : "In the critical moments following vessel abandonment, traditional search patterns often fail to account for the dynamic complexity of maritime environments. This project bridges the gap between Naval Architecture and AI System Design by deploying a Dynamic Bayesian Network to infer survival craft trajectories. By synthesizing real-time atmospheric data with high-fidelity leeway coefficients, the engine generates an evolving probability heat map, significantly compressing search windows and optimizing life-saving asset deployment.",
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
    description: language === 'es'
      ? "Una exploración de un arquitecto naval dentro de los ecosistemas, la intersección e investigación propia dentro de la inteligencia artificial. Abriendo un laboratorio que detalla y muestra directamente todas las matemáticas, prototipos en Python, pruebas sobre hardware, las arquitecturas de deep learning subyacentes y el viaje y la tesis hacia soluciones marítimas impulsadas analíticamente por IA."
      : "An architect's exploration into the intersection of naval engineering and artificial intelligence. This lab showcases experimental prototypes, deep learning architectures, and a journey into data-driven maritime solutions.",
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
  const { language } = useLanguage();
  const projects = getProjects(language);
  const labTitles = ["HydroGNN-Bayes: LNG BOG Physics Engine", "Ship Grounding Risk Assessment", "Bayesian SAR Orchestrator", "AI Research Lab"];

  const labProjects = projects.filter(p => labTitles.includes(p.title));
  const insightProjects = projects.filter(p => !labTitles.includes(p.title));

  return (
    <>
      <section id="lab" className="section">
        <h2 className="section-title">{language === 'es' ? 'El Laboratorio' : 'The Lab'}</h2>
        <div className="project-grid">
          {labProjects.map((project, i) => (
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

      <section id="projects" className="section">
        <h2 className="section-title">{language === 'es' ? 'Proyectos e Informes' : 'Insights'}</h2>
        <div className="project-grid">
          {insightProjects.map((project, i) => (
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
    </>
  )
}

export default ProjectGrid
