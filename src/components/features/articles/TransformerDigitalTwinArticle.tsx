'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const TransformerDigitalTwinArticle = () => {
    const { language } = useLanguage()

    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    {language === 'es'
                        ? 'Trazando el Futuro de la Navegación Autónoma: Cómo los Modelos Transformer están Revolucionando los Gemelos Digitales Marítimos'
                        : 'Charting the Future of Autonomous Shipping: How Transformer Models are Revolutionizing Maritime Digital Twins'}
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                {language === 'es'
                    ? 'La industria marítima se dirige rápidamente hacia la era de los Buques de Superficie Autónomos Marítimos (MASS). Un paso crítico en esta transición es el desarrollo de "gemelos digitales" robustos: réplicas virtuales capaces de imitar con precisión el comportamiento físico de un buque en tiempo real.'
                    : 'The maritime industry is rapidly steering towards the era of Maritime Autonomous Surface Ships (MASS). A critical stepping stone in this transition is the development of robust "digital twins"—virtual replicas capable of accurately mimicking a vessel\'s physical behavior in real-time.'}
            </p>

            <blockquote className="article-quote">
                {language === 'es'
                    ? '"Los mecanismos de atención de múltiples cabezales inherentes a los Transformers capturan las dependencias complejas y a largo plazo de los movimientos de maniobra de un buque mejor que los modelos tradicionales."'
                    : '"The multi-head attention mechanisms inherent in Transformers capture the complex, long-term dependencies of a ship\'s maneuvering motions better than traditional time-series models."'}
            </blockquote>

            <p className="article-text-content">
                {language === 'es'
                    ? 'Un reciente avance publicado en la revista "Ocean Engineering" explora un enfoque puramente impulsado por datos para modelar la dinámica de los barcos, mostrando progresos predictivos significativos que podrían redefinir la navegación autónoma en aguas abiertas.'
                    : 'A recent breakthrough published in the journal "Ocean Engineering" explores a purely data-driven approach to modeling ship dynamics, showcasing significant predictive advancements that could redefine open-water autonomous navigation.'}
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>{language === 'es' ? '01. Datos Reales' : '01. Real-World Data'}</h2>
                    <h3>{language === 'es' ? 'Datos Transoceánicos' : 'Transoceanic Foundation'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Utilizando datos de un granelero Kamsarmax en una travesía real de Brasil a China, el estudio capturó variables críticas como viento, olas, corrientes y posiciones del timón para entrenar los algoritmos de aprendizaje profundo con un realismo sin precedentes.'
                            : 'Utilizing data from a Kamsarmax bulk carrier on a genuine transoceanic voyage from Brazil to China, the study captured critical variables—wind, waves, currents, and rudder positions—to train deep learning algorithms with unprecedented realism.'}
                    </p>
                </div>
                <div className="article-card">
                    <h2>{language === 'es' ? '02. Transformer vs LSTM' : '02. Transformer vs LSTM'}</h2>
                    <h3>{language === 'es' ? 'Atención vs Recurrencia' : 'Attention vs Recurrence'}</h3>
                    <p>
                        {language === 'es'
                            ? 'El codificador Transformer superó significativamente al modelo LSTM tradicional. Al predecir los movimientos de avance (surge) y deriva (sway), el Transformer logró un Error Absoluto Medio (MAE) notablemente inferior, capturando mejor las dependencias de largo alcance.'
                            : 'The Transformer encoder significantly outperformed the traditional LSTM model. When predicting surge and sway motions, the Transformer achieved a noticeably lower Mean Absolute Error (MAE) by better capturing long-range dependencies.'}
                    </p>
                </div>
            </div>

            <div className="article-image-container">
                <img src="/transformer.png" alt="Transformer Architecture Infografía" className="article-main-image" />
                <p className="image-caption">
                    {language === 'es'
                        ? 'Figura 1: Arquitectura del codificador Transformer adaptado para la predicción de la dinámica del buque.'
                        : 'Figure 1: Transformer encoder architecture adapted for ship dynamics prediction.'}
                </p>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'Precisión sin Precedentes en la Trayectoria' : 'Unprecedented Precision in Trajectory Prediction'}</h2>
            <p className="article-text-content">
                {language === 'es'
                    ? 'Lo más impresionante fue la precisión del Transformer al modelar la trayectoria geográfica. Mientras que el LSTM solo podía aproximar la tendencia general, el modelo Transformer fue capaz de mapear la posición exacta del buque con una fidelidad asombrosa durante toda la maniobra.'
                    : 'Most impressive was the Transformer’s precision in modeling the geographic trajectory. While the LSTM could only approximate the general trend, the Transformer model was able to accurately map the exact position of the vessel with stunning fidelity throughout the maneuver.'}
            </p>

            <div className="article-highlight-box">
                <h3>1.43 MB</h3>
                <div className="label">{language === 'es' ? 'Huella Computacional del Modelo' : 'Model Computational Footprint'}</div>
                <p>
                    {language === 'es'
                        ? 'A pesar de ser tres veces más grande que el modelo LSTM, el Transformer sigue siendo extremadamente ligero. Esta eficiencia garantiza su viabilidad para ser desplegado en tiempo real en dispositivos periféricos (edge) a bordo sin sobrecargar los recursos.'
                        : 'Despite being three times larger than the LSTM model, the Transformer remains exceptionally lightweight. This efficiency ensures viability for real-time deployment on edge devices without overwhelming on-board computational resources.'}
                </p>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'Conclusión y Referencia' : 'Summary & Reference'}</h2>
            <p className="article-text-content-large">
                {language === 'es'
                    ? 'Este logro representa un salto sustancial hacia la navegación marítima totalmente autónoma. La superioridad de los codificadores Transformer para capturar dinámicas intrincadas allana el camino para gemelos digitales de alta precisión, esenciales para la toma de decisiones inteligente en alta mar.'
                    : 'This achievement represents a substantial leap toward fully autonomous maritime navigation. The superiority of Transformer encoders in capturing intricate ship dynamics paves the way for high-fidelity digital twins, essential for intelligent decision-making on the open seas.'}
            </p>

            <div className="article-tags">
                <span className="tag">Transformer</span>
                <span className="tag">Digital Twin</span>
                <span className="tag">{language === 'es' ? 'Navegación Autónoma' : 'Autonomous Shipping'}</span>
                <span className="tag">Deep Learning</span>
                <span className="tag">3-DOF Maneuvering</span>
            </div>

            <p style={{ marginTop: '40px', fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                {language === 'es' ? 'Referencia Académica:' : 'Academic Reference:'} Shehata, A., Zhang, M., Tsoulakos, N., & Kujala, P. (2025). A Transformer based task execution digital twin of 3-DOF maneuvering of Bulk Carrier for autonomous maritime systems. Ocean Engineering, 341, 122797.
            </p>
        </div>
    )
}

export default TransformerDigitalTwinArticle
