'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const ShipTrajectoryArticle = () => {
    const { language } = useLanguage()

    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    {language === 'es'
                        ? 'El Paradigma HMG: Revolucionando la Predicción de Trayectorias mediante Redes Neuronales de Grafos Heterogéneos'
                        : 'The HMG Paradigm: Revolutionizing Vessel Trajectory Prediction via Heterogeneous Spatiotemporal GNNs'}
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                {language === 'es'
                    ? 'Ante la saturación crítica de las arterias marítimas globales, que gestionan el 90% del comercio mundial, la necesidad de una predicción de trayectorias de alta fidelidad ha trascendido la mera conveniencia operativa para convertirse en un pilar de la seguridad existencial. El HSTDFormer, presentado en "Applied Ocean Research", emerge como un salto cuántico frente a las limitaciones de los modelos homogéneos tradicionales.'
                    : 'As global maritime arteries—handling 90% of international trade—approach critical saturation, high-fidelity trajectory prediction has transcended operational convenience to become a cornerstone of navigational safety. The HSTDFormer architecture, detailed in "Applied Ocean Research", represents a quantum leap beyond the constraints of traditional homogeneous modeling.'}
            </p>

            <blockquote className="article-quote">
                {language === 'es'
                    ? '"Al fusionar la ontología estática del buque con su dinámica cinemática, el HSTDFormer trasciende la simple regresión para capturar la esencia de la interacción social en el mar."'
                    : '"By synthesizing vessel-specific static ontologies with kinematic dynamics, the HSTDFormer transcends mere regression to capture the essence of socio-maritime interaction."'}
            </blockquote>

            <p className="article-text-content">
                {language === 'es'
                    ? 'Desarrollado por Yanyun Yu et al., el modelo introduce el Grafo Marítimo Heterogéneo (HMG), una estructura capaz de diferenciar entre la idiosincrasia física del buque y su comportamiento dinámico, permitiendo una simulación fidedigna de las reglas de navegación realistas.'
                    : 'Developed by Yanyun Yu et al., the model introduces the Heterogeneous Maritime Graph (HMG)—a sovereign structure capable of distinguishing between a vessel\'s physical idiosyncrasies and its dynamic behavior, enabling a high-fidelity simulation of complex maritime navigational rules.'}
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>{language === 'es' ? '01. Arquitectura de Grafos' : '01. Graph Architecture'}</h2>
                    <h3>{language === 'es' ? 'Fusión Ontológica de Datos' : 'Ontological Data Fusion'}</h3>
                    <p>
                        {language === 'es'
                            ? 'El HMG integra parámetros dinámicos (SOG, rumbo, posición) con atributos estáticos discretos (tipo, eslora, calado) mediante meta-rutas específicas. Esta heterogeneidad modela explícitamente cómo las limitaciones físicas dictan la envolvente de maniobrabilidad del buque.'
                            : 'The HMG integrates dynamic parameters (SOG, heading, position) with discrete static attributes (vessel type, length, draft) via specialized meta-paths. This heterogeneity explicitly models how physical constraints dictate a vessel\'s maneuverability envelope.'}
                    </p>
                </div>
                <div className="article-card">
                    <h2>{language === 'es' ? '02. Atención Dual (DAA)' : '02. Dual-Axis Attention'}</h2>
                    <h3>{language === 'es' ? 'Priorización de Riesgos' : 'Cognitive Risk Prioritization'}</h3>
                    <p>
                        {language === 'es'
                            ? 'El mecanismo DAA emula la carga cognitiva del oficial de guardia, priorizando iterativamente los contactos de alto riesgo mediante Atención Temporal Híbrida (HTA) y de Características (HFA), optimizando la inferencia sin penalización computacional.'
                            : 'The DAA mechanism emulates the cognitive load of a duty officer by iteratively prioritizing high-risk contacts through Hybrid Temporal (HTA) and Feature (HFA) Attention, optimizing inference without computational overhead.'}
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'Inferencia de Largo Alcance mediante iTransformer' : 'Long-Range Inference via iTransformer Integration'}</h2>
            <p className="article-text-content">
                {language === 'es'
                    ? 'La degradación de la precisión en horizontes extendidos se mitiga mediante la integración de iTransformer. Esta arquitectura captura dependencias temporales profundas al tratar los pasos de tiempo como tokens independientes, preservando la coherencia de la trayectoria hasta en pronósticos de 96 minutos.'
                    : 'Accuracy degradation over extended horizons is mitigated through iTransformer integration. This architecture captures deep temporal dependencies by treating individual time steps as independent tokens, preserving trajectory coherence even in 96-minute forecasts.'}
            </p>

            <div className="article-highlight-box">
                <h3>442.4 m</h3>
                <div className="label">{language === 'es' ? 'ADE en Escenarios de Alta Congestión' : 'ADE in High-Density Scenarios'}</div>
                <p>
                    {language === 'es'
                        ? 'Validado rigurosamente en hubs críticos (Denmark, California, Houston), el modelo superó consistentemente a arquitecturas GRU y BiLSTM, alcanzando un throughput de 845 trayectorias por segundo en hardware estándar.'
                        : 'Rigorously validated in critical maritime hubs (Denmark, California, Houston), the model consistently outperformed GRU and BiLSTM architectures, achieving a throughput of 845 trajectories per second on standard hardware.'}
                </p>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'Hacia la Autonomía Marítima' : 'The Path to Maritime Autonomy'}</h2>
            <p className="article-text-content-large">
                {language === 'es'
                    ? 'El HSTDFormer no es meramente un refinamiento incremental; es la base para la próxima generación de sistemas para evitar colisiones y navegación autónoma. Al decodificar el "lenguaje social" de los barcos, este modelo redefine los límites de lo que es predecible en aguas saturadas.'
                    : 'The HSTDFormer is not merely an incremental refinement; it is the foundation for the next generation of autonomous navigation and collision avoidance systems. By decoding the "social language" of vessels, this model redefines the boundaries of predictability in saturated waters.'}
            </p>

            <div className="article-tags">
                <span className="tag">ST-GNN</span>
                <span className="tag">{language === 'es' ? 'IA Marítima' : 'Maritime AI'}</span>
                <span className="tag">HSTDFormer</span>
                <span className="tag">iTransformer</span>
                <span className="tag">{language === 'es' ? 'Navegación Autónoma' : 'Autonomous Navigation'}</span>
            </div>

            <p style={{ marginTop: '40px', fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                {language === 'es' ? 'Referencia Académica:' : 'Reference:'} Yu, Y., et al. (2026). Ship trajectory prediction method based on heterogeneous spatiotemporal graph neural networks. Applied Ocean Research, 168, 104969.
            </p>
        </div>
    )
}

export default ShipTrajectoryArticle
