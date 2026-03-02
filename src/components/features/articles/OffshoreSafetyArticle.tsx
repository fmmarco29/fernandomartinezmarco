'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const OffshoreSafetyArticle = () => {
    const { language } = useLanguage()

    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    {language === 'es'
                        ? 'Más allá del QRA Estático: Cómo el algoritmo DEMATEL-BN está Revolucionando la Seguridad Offshore Extrema'
                        : 'Beyond Static Models: How DEMATEL-BN is Revolutionizing Offshore Safety'}
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                {language === 'es'
                    ? 'En el entorno implacable de la producción petrolera y gasística del ultra-deepwater (Aguas Profundas O&G), el margen de tolerancia a una falla es absoluta, literal y rigurosamente cero. Eventos cataclísmicos como la explosión del Deepwater Horizon o Piper Alpha en el Mar del Norte operan como sombríos memoriales de la insuficiencia de los modelos arbóreos estáticos tradicionales (Fault Trees) para gobernar las complejas cascadas de colapso en sistemas multi-componente.'
                    : 'In the high-stakes world of offshore oil and gas production, the margin for error is non-existent. Catastrophic events, such as the Deepwater Horizon disaster, serve as grim reminders that traditional safety protocols are often insufficient to predict complex system failures.'}
            </p>

            <blockquote className="article-quote">
                {language === 'es'
                    ? '"Un extraordinario paper aborda y erradica de golpe esta enorme vulnerabilidad estructural al orquestar un modelado Dinámico Bayesiano-Causal de evaluación prospectiva."'
                    : '"A groundbreaking article addresses this critical gap by proposing a novel, dynamic approach to risk assessment using DEMATEL-BN."'}
            </blockquote>

            <p className="article-text-content">
                {language === 'es'
                    ? 'La sublime investigación titulada "Dynamic quantitative risk assessment of accidents induced by leakage on offshore platforms using DEMATEL-BN" publicaba por Meng et al., inyecta una elegantísima matriz estocástica para transcender las gigantescas parálisis operativas del Análisis Estático de Fallos (QRA clásico). Al mudar todo el core lógico de inferencia hacia redes bayesianas guiadas por evidencia de incidentes reales "Near Misses", proyectan el vector evolutivo que liderará todo diseño crítico en el siglo XXI.'
                    : 'The study titled "Dynamic quantitative risk assessment of accidents induced by leakage on offshore platforms using DEMATEL-BN" (Meng et al.) offers a compelling solution to the limitations of traditional Quantitative Risk Assessment (QRA). By shifting focus toward real-time monitoring and logical interdependencies, the research provides a framework for the future of industrial safety.'}
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>{language === 'es' ? '01. La Evolución Paramétrica' : '01. Evolution'}</h2>
                    <h3>{language === 'es' ? 'Del Análisis Estático al QRA Dinámico' : 'From Static to Dynamic'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Armonizando la Teoría de Grafos mediante Redes Bayesianas Computacionales (BN), el algoritmo transforma la topología en un DQRA (Dynamic QRA) puro. En antítesis al tradicional y oxidado Árbol de Eventos que decae tras el arranque (Start-up / Commissioning), este grafo Bayesiano altera autónomamente (Up-dating) la matriz CPT probabilística ingerida, recalculando el vector de Riesgo Top-Event con la métrica secuencial de anomalías temporales.'
                            : 'The integration of Bayesian Networks (BN) allows for Dynamic QRA (DQRA). Unlike static Fault Trees, this model updates failure probabilities in real-time using accident precursor data, allowing operators to visualize risk trends across distinct time intervals.'}
                    </p>
                </div>
                <div className="article-card">
                    <h2>{language === 'es' ? '02. Descifrando el Caos' : '02. Complexity'}</h2>
                    <h3>{language === 'es' ? 'Interdependencias Sistémicas con DEMATEL' : 'DEMATEL Interdependencies'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Filtrando el ruido entrópico con matrices especializadas de inferencia humana (DEMATEL), la metodología desenmascara contundentemente la "Cultura de Organización y Liderazgo" como el hiper-vector raíz causal capaz de envenenar y tumbar los sistemas sub-adyacentes de ingeniería robótica en subsea y mantenimiento perimetral.'
                            : 'By utilizing the Decision-Making Trial and Evaluation Laboratory (DEMATEL), the study identifies organizational management as a critical root cause that influences subsystems like human error and maintenance deficiencies.'}
                    </p>
                </div>
            </div>

            <div className="article-section-grid" style={{ marginTop: '0' }}>
                <div className="article-card">
                    <h2>{language === 'es' ? '03. Lógica Estructural' : '03. Integration'}</h2>
                    <h3>{language === 'es' ? 'Co-dependencia del Muro de Contención' : 'Safety Barrier Dependency'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Este código de red bayesiana pulveriza computacionalmente la utópica premisa de la OMI de que las "Barreras Críticas" jamás fallarán simultáneamente por la misma causa matriz de eventos comunes. Inyectando coeficientes Leaky Noisy-OR a los Nodos Discretos, la cadena de Markov desvela el colapso simétrico inducido.'
                            : 'The model challenges the assumption that safety barriers operate independently. By applying correction coefficients to Conditional Probability Tables (CPT), it reveals how the failure of one system significantly increases the risk of subsequent barrier failures.'}
                    </p>
                </div>
                <div className="article-card">
                    <h2>{language === 'es' ? '04. Análisis Regresivo' : '04. Analysis'}</h2>
                    <h3>{language === 'es' ? 'Filtrado e Inferencia Abductiva Posterior' : 'Abductive Reasoning'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Teniendo preconfigurados los algoritmos directores de creencias, el armazón Bayesiano permite la ingeniería inversa (back-propagation) o Inferencia Abductiva (Diagnostic Reasoning) una vez se dispara la alarma "Gas-Leak=100%", forzando matemáticamente la actualización de los nodos ancestrales y delatando qué cuadrilla de humanos o equipo valvular es culpable.'
                            : 'The BN framework enables backward "abductive reasoning" to identify root causes after an event. The study confirms that human error and inadequate maintenance remain the most likely culprits behind large-scale safety barrier failures.'}
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'Conclusión y Visión' : 'Conclusion'}</h2>
            <p className="article-text-content-large">
                {language === 'es'
                    ? 'La arquitectura probabilística conceptual expuesta forja un avance sideral sin parangón en el campo de la Safety Engineering crítica. Entrelazando topologías de co-dependencias Bayesianas hiper-matrizales, y un motor analítico prospectivo perpetuo que no envejece con el activo, dota a los CEOs y Jefes de Operaciones HSE de la clarividencia táctica matemática para anular singularidades explosivas letales y colapsos ambientales.'
                    : 'The methodology proposed represents a significant leap forward in safety engineering. By combining relational mapping with probabilistic updating, it provides a tool that actively monitors risk evolution, potentially preventing catastrophic failures through dynamic monitoring.'}
            </p>

            <div className="article-highlight-box" style={{ textAlign: 'left', padding: '30px', background: 'rgba(255,255,255,0.03)', marginTop: '40px' }}>
                <p className="label" style={{ fontSize: '12px', marginBottom: '10px' }}>{language === 'es' ? 'Referencia Académica Causal' : 'Reference'}</p>
                <p style={{ fontSize: '13px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    Meng, X., et al. (2018). Dynamic quantitative risk assessment of accidents induced by leakage on offshore platforms using DEMATEL-BN. <em>International Journal of Naval Architecture and Ocean Engineering</em>, 11(1), 22-32.
                </p>
            </div>

            <div className="article-tags">
                <span className="tag">DEMATEL</span>
                <span className="tag">{language === 'es' ? 'Redes Bayesianas' : 'Bayesian Networks'}</span>
                <span className="tag">{language === 'es' ? 'QRA Dinámico' : 'Dynamic QRA'}</span>
                <span className="tag">{language === 'es' ? 'FPSO Safety' : 'Offshore Safety'}</span>
                <span className="tag">{language === 'es' ? 'Gestión de Riesgos' : 'Risk Assessment'}</span>
            </div>
        </div>
    )
}

export default OffshoreSafetyArticle
