'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const LNGKnowledgeGraphArticle = () => {
    const { language } = useLanguage()

    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    {language === 'es'
                        ? 'Navegando la Complejidad: Cómo la IA y los Grafos de Conocimiento Revolucionan las Inspecciones Marítimas de GNL'
                        : 'Navigating Complexity: How AI and Knowledge Graphs are Revolutionizing LNG Ship Inspections'}
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                {language === 'es'
                    ? 'El transporte marítimo de Gas Natural Licuado (GNL) es una industria de altísimo riesgo donde la seguridad es primordial. Los metaneros se encuentran entre los buques más sofisticados a flote, sujetos a rigurosos estándares de construcción. Sin embargo, mantener la gobernanza de estos estándares durante la vida operativa del buque depende en gran medida de las inspecciones de Control del Estado Rector del Puerto (PSC).'
                    : 'The maritime transport of Liquefied Natural Gas (LNG) is a high-stakes industry where safety is paramount. LNG carriers are among the most sophisticated vessels afloat, subject to rigorous construction standards. However, maintaining these standards throughout a ship\'s operational life relies heavily on Port State Control (PSC) inspections.'}
            </p>

            <p className="article-text-content">
                {language === 'es'
                    ? 'Un reciente y fascinante estudio publicado en la revista científica Ocean Engineering por Zhang et al., titulado "A knowledge graph-based inspection items recommendation method for port state control inspection of LNG carriers", propone un enfoque disruptivo para asistir a los inspectores. El artículo aborda un cuello de botella crítico: las inspecciones consumen un tiempo draconiano, y los inspectores (PSCOs) no pueden revisar fisiológicamente cada componente con la misma profundidad.'
                    : 'A recent study published in Ocean Engineering by Zhang et al., titled "A knowledge graph-based inspection items recommendation method for port state control inspection of LNG carriers," proposes a groundbreaking approach to assist inspectors. The paper addresses a critical bottleneck: inspections are time-consuming, and inspectors (PSCOs) cannot check every single component with equal depth.'}
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>{language === 'es' ? 'El Problema Central' : 'The Core Problem'}</h2>
                    <h3>{language === 'es' ? 'Sobrecarga de Información' : 'Information Overload'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Los algoritmos de inspección estándar suelen tratar los puntos de datos de forma aislada. Sin embargo, una inspección de GNL requiere conectar puntos hipercomplejos: normativas marítimas (SOLAS, IGC), maquinaria específica y datos históricos probabilísticos de deficiencias. Una sola pieza del equipo puede tener interconectados múltiples puntos de control vinculados a cláusulas regulatorias radicalmente distintas.'
                            : 'Standard inspection algorithms often treat data points in isolation. However, LNG inspection requires connecting complex dots: regulations, specific machinery, and historical deficiency data. A single piece of equipment might have multiple checkpoints linked to specific regulation clauses.'}
                    </p>
                </div>
                <div className="article-card">
                    <h2>{language === 'es' ? 'Hitos Clave' : 'Key Achievements'}</h2>
                    <h3>{language === 'es' ? 'Grafo de Conocimiento & PT-KGCN' : 'Knowledge Graph & PT-KGCN'}</h3>
                    <p>
                        {language === 'es'
                            ? 'El estudio introduce un Grafo de Conocimiento (KG) especializado y un potentísimo modelo PT-KGCN, utilizando RoBERTa para el Procesamiento del Lenguaje Natural (NLP) y Redes Convolucionales de Grafos (GCN) para la agregación del tensor de información. Este desarrollo logró una precisión récord superior al 87% en la predicción estocástica de ítems defectuosos.'
                            : 'The study introduces a specialized Knowledge Graph (KG) and the PT-KGCN model, using RoBERTa for NLP and Graph Convolutional Networks (GCN) to aggregate information. This achieved an accuracy of over 87% in predicting defective items.'}
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'Entendiendo la Lógica: Un Ejemplo en Python' : 'Understanding the Logic: A Python Example'}</h2>
            <p className="article-text-content">
                {language === 'es'
                    ? 'La genuina "magia" del artículo reside en cómo el algoritmo calcula matemáticamente la importancia de los tensores de un ítem de inspección en base a su topología de conexiones en el Grafo de Conocimiento. A continuación, se presenta un pseudocódigo simplificado en Python ilustrando la lógica matricial del Agregador AGCN.'
                    : 'The "magic" of the article lies in how the algorithm calculates the importance of an inspection item based on its connections in the Knowledge Graph. Below is a simplified Python conceptualization of the AGCN Aggregator logic.'}
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

            <h2 className="article-subtitle">{language === 'es' ? 'Por Qué esto es Trascendental' : 'Why This Matters'}</h2>
            <p className="article-text-content-large">
                {language === 'es'
                    ? 'Esta revolucionaria tecnología dota a los agentes PSCOs de las herramientas para transicionar de inspecciones mecánicas "basadas en listas de verificación" (checklists) a entornos de "Inteligencia Predictiva basada en Riesgos", salvando incontables vidas al detectar y priorizar deficiencias estructurales críticas que, de otro modo computacional, pasarían totalmente desapercibidas en el factor humano.'
                    : 'This technology allows PSCOs to move from "checklist-based" inspections to "risk-based" intelligence, potentially saving lives by catching critical deficiencies that might otherwise be missed.'}
            </p>

            <div className="article-tags">
                <span className="tag">{language === 'es' ? 'Grafos de Conocimiento' : 'Knowledge Graphs'}</span>
                <span className="tag">{language === 'es' ? 'Metaneros GNL' : 'LNG Carriers'}</span>
                <span className="tag">{language === 'es' ? 'PSC (Estado Rector)' : 'Port State Control'}</span>
                <span className="tag">PT-KGCN</span>
                <span className="tag">{language === 'es' ? 'IA Marítima' : 'Maritime AI'}</span>
            </div>

            <footer className="article-footer" style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.7 }}>
                <strong>{language === 'es' ? 'Referencia:' : 'Reference:'}</strong> Zhang, X., Liu, C., Xu, Y., Ye, B., Gan, L., & Shu, Y. (2024). A knowledge graph-based inspection items recommendation method for port state control inspection of LNG carriers. <em>Ocean Engineering</em>, 313, 119434.
            </footer>
        </div>
    )
}

export default LNGKnowledgeGraphArticle
