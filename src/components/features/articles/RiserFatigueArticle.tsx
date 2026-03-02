'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'
import HybridArchitectureVisual from '@/components/shared/HybridArchitectureVisual'

const RiserFatigueArticle = () => {
    const { language } = useLanguage()

    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    {language === 'es'
                        ? 'Revolucionando la Precisión Offshore: Un Nuevo Enfoque de Gemelos Digitales para la Monitorización de Fatiga en Risers'
                        : 'Revolutionizing Offshore Safety: A New Digital Twin Approach for Riser Fatigue Monitoring'}
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                {language === 'es'
                    ? 'En la ultra-competitiva industria global de extracción de crudo en aguas profundas (Offshore Oil & Gas), adentrarse en la frontera submarina conlleva colosales retos ingenieriles. El latido estructural más vulnerable en esta inmensidad azul yace en los Risers Marinos—las inmensas tuberías umbilicales interconectando los cabezales ciegos del lecho marino con las imponentes plataformas mecánicas de superficie (FPSO).'
                    : 'In the offshore oil and gas industry, the push into deeper waters brings with it significant engineering challenges. Among the most critical components in these operations are marine risers—the pipelines connecting seabed equipment to surface platforms.'}
            </p>

            <blockquote className="article-quote">
                {language === 'es'
                    ? '"Una aproximación hiperrealista de Gemelo Digital empleando instrumentación mínima para un cálculo determinista de fatiga plástica del Riser" — Lee et al. (2024)'
                    : '"Digital twin approach with minimal sensors for Riser’s fatigue-damage estimation" — Lee et al. (2024)'}
            </blockquote>

            <p className="article-text-content">
                {language === 'es'
                    ? 'Garantizar la integridad estructural a flexo-tensión en estos risers es indiscutiblemente innegociable. No obstante, las prácticas de telemetría pasadas dependientes de complejas redes de perfiladores ADCP y cadenas de sensores acústicos submarinos encarecen astronómicamente el CAPEX. Un trascendental estudio avalado propone una subversiva y brillante alternativa computacional prediciendo la supervivencia mecánica remota.'
                    : 'Ensuring the structural integrity of these risers is paramount, yet traditional monitoring methods are often costly, complex, and reliant on extensive underwater sensor networks. A recent breakthrough study proposes a novel solution that could transform how we assess fatigue life in deep-water environments.'}
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>{language === 'es' ? '01. Optimización Sensorial' : '01. Sensor Optimization'}</h2>
                    <h3>{language === 'es' ? 'Telemetría Seca de Alta Fidelidad' : 'High-Fidelity Monitoring'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Este vanguardista estudio consolida una arquitectura de Gemelo Digital restringiendo la instrumentación. La algoritmia infiere tensores dinámicos valiéndose puramente de "sensores secos" embarcados en cubierta (registrando el TOM o Movimiento Superior), o acoplando un ridículo y austero único sensor en la cruda bajada de curvatura (sag bend).'
                            : 'The study validates a Digital Twin methodology using minimal sensors. Reliable monitoring is feasible using primarily "dry" sensors on the vessel (Top Oscillation Model) or adding just one sensor at the sag bend.'}
                    </p>
                </div>
                <div className="article-card">
                    <h2>{language === 'es' ? '02. Redes de Inferencia (ML)' : '02. Machine Learning'}</h2>
                    <h3>{language === 'es' ? 'Predicción Estocástica y Corrientes' : 'Environmental Prediction'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Aprovechando la majestuosa capacidad predictiva de una cascada de Redes Neuronales Artificiales (ANN), el modelo invierte el problema: estima ciegamente perfiles de corrientes tridimensionales decodificando las simples aceleraciones reactivas del FPSO en superficie. Adiós a la costosísima e imprecisa perfilación Doppler submarina.'
                            : 'An Artificial Neural Network inversely estimates 3D current profiles based on vessel motion. This eliminates the need for expensive acoustic Doppler current profilers (ADCPs) while maintaining high accuracy.'}
                    </p>
                </div>
            </div>

            <HybridArchitectureVisual />

            <h2 className="article-subtitle">{language === 'es' ? 'Precisión Matemática Robusta y Probada' : 'Proven Accuracy & Robustness'}</h2>
            <p className="article-text-content">
                {language === 'es'
                    ? 'Con el afán de llevar este pipeline a la redline, se sometió al brutal castigo de un "Full Field Model" matemático reproduciendo rigurosamente huracanes oceánicos en la costa profunda de Guyana y condiciones ciclo-estocásticas apocalípticas en el turbulento Golfo de México.'
                    : 'The model was rigorously validated against a "Full Field Model" simulating conditions in the Guyana Sea and extreme storms in the Gulf of Mexico.'}
            </p>

            <div className="article-highlight-box">
                <h3>5% - 10%</h3>
                <div className="label">{language === 'es' ? 'Mínima Tasa Computacional de Error' : 'Error Rate'}</div>
                <p>
                    {language === 'es'
                        ? 'Comparando esta algoritmia desnuda contra la artillería pesada del software hidrodinámico oficial de referencia, el margen de error acumulativo en daño de "hotspots" críticos colapsó asombrosamente entre un virtuoso 5% y 10%. Exactitud médica.'
                        : 'The estimated accumulated fatigue damage showed remarkably low error rates compared to reference models, successfully identifying critical "hotspots" at the top connection and touchdown point.'}
                </p>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'Conclusión Magistral' : 'Conclusion'}</h2>
            <p className="article-text-content-large">
                {language === 'es'
                    ? 'Esta elegante fusión teórica y práctica demuestra palpablemente que transvasar inteligencia predictiva de machine learning supera la dependencia sensorial táctil bruta. Los armadores pueden virtualizar una sala de rayos X en tiempo real del umbilical de acero bajo el abismo, logrando una reducción tectónica del OPEX de perforación e inyectando un escudo digital inquebrantable a las métricas de seguridad.'
                    : 'This research presents a cost-effective, real-time solution for riser health monitoring. By leveraging digital twins and machine learning, operators can estimate fatigue life with high precision using standard vessel motion sensors, reducing OPEX and enhancing safety for deep-water energy production.'}
            </p>

            <div className="article-reference" style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                <strong>{language === 'es' ? 'Referencia Académica:' : 'Reference:'}</strong> Lee, Y., Jin, C., Kim, M., & Xu, W. (2024). Digital twin approach with minimal sensors for Riser’s fatigue-damage estimation. <em>International Journal of Naval Architecture and Ocean Engineering</em>, 16, 100603.
            </div>

            <div className="article-tags">
                <span className="tag">{language === 'es' ? 'Gemelo Digital' : 'Digital Twin'}</span>
                <span className="tag">{language === 'es' ? 'Offshore Safety' : 'Offshore Safety'}</span>
                <span className="tag">{language === 'es' ? 'Machine Learning' : 'Machine Learning'}</span>
                <span className="tag">{language === 'es' ? 'Fatiga en Risers' : 'Riser Monitoring'}</span>
                <span className="tag">{language === 'es' ? 'Dinámica Computacional' : 'Fatigue Analysis'}</span>
            </div>
        </div>
    )
}

export default RiserFatigueArticle
