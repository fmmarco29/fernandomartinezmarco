'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const ShipHullLoadArticle = () => {
    const { language } = useLanguage()

    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    {language === 'es'
                        ? 'Navegando el Futuro: Cómo el Deep Learning Revoluciona la Predicción de Cargas en el Casco en Tiempo Real'
                        : 'Navigating the Future: How Deep Learning is Revolutionizing Real-Time Ship Hull Load Predictions'}
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                {language === 'es'
                    ? 'Garantizar la integridad estructural de colosales buques portacontenedores en medio de temporales oceánicos complejos e impredecibles es el pilar absoluto de la seguridad marítima. Clásicamente, las sociedades de clasificación naviera (IACS) imponen verificaciones brutales de resistencia estructural exclusivamente en la fase de diseño, forzando a los buques modernos a depender ciegamente de Sistemas de Monitorización de Respuesta del Casco (HRMS) mecánicos anclados con galgas extensiométricas.'
                    : 'Ensuring the structural integrity of large container ships amidst complex and unpredictable sea conditions is paramount for maritime safety. Traditionally, classification societies mandate structural strength verification during the design phase, and modern vessels often rely on Hull Response Monitoring Systems (HRMS) using physical strain gauges.'}
            </p>

            <blockquote className="article-quote">
                {language === 'es'
                    ? '"Los datos del sistema de navegación inercial (IMU) ofrecen una arquitectura infinitamente más estable y universal para predecir las inmesas fuerzas dinámicas de las olas."'
                    : '"Ship motion data offers a far more accessible and stable alternative for assessing dynamic forces."'}
            </blockquote>

            <p className="article-text-content">
                {language === 'es'
                    ? 'En un adelanto científico radical, investigadores superiores publicaron un sublime artículo de ingeniería en el "International Journal of Naval Architecture and Ocean Engineering". Esta sagaz publicación instaura un salto tectónico de paradigma en la disciplina naval al emplear arquitecturas profundas de Redes Neuronales Recurrentes (RNNs) para predecir matemáticamente — y en crudo tiempo real — las titánicas y no-lineales cargas de viga-casco inducidas por el feroz oleaje.'
                    : 'In a recent breakthrough, researchers published an innovative article in the International Journal of Naval Architecture and Ocean Engineering. This publication represents a significant paradigm shift in maritime engineering by utilizing Recurrent Neural Networks (RNNs) to predict wave-induced hull girder loads in real time.'}
            </p>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>{language === 'es' ? '01. Modelos Robustos' : '01. Robust Models'}</h2>
                    <h3>{language === 'es' ? 'Keras RNNs y Cadenas Markovianas' : 'RNNs for Real-Time Prediction'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Aplicando sofisticadas arquitecturas bidireccionales de memoria LSTM y GRU, el algoritmo codifica todo el historial secuencial tridimensional (time-history) de las cargas en el casco. Las redes asimilan intuitivamente cómo los movimientos rotacionales previos del graneles y el espectro de ola definen la fatiga actual del navío en los tres ejes tensores (Momentos Flectores VBM, HBM y Momentos Torsores TM).'
                            : 'By applying LSTM and GRU architectures, the system accounts for the dynamic time-history of hull loads, capturing how previous ship motions influence current structural stress (VBM, HBM, and Torsional Moments).'}
                    </p>
                </div>
                <div className="article-card">
                    <h2>{language === 'es' ? '02. Optimización Topológica' : '02. Optimization'}</h2>
                    <h3>{language === 'es' ? 'Arquitecturas Heurísticas a Medida' : 'Tailored Architectures'}</h3>
                    <p>
                        {language === 'es'
                            ? 'El estudio de pesos sinápticos evidenció empíricamente que las diversas cargas estructurales demandan arquitecturas radicalmente distintas: una simple pero densa capa LSTM dominó el VBM (flexión de la viga-buque central), mientras que una red ultra profunda GRU de 3 enormes capas extraía magistralmente los esquivos features latentes del destructivo estrangulamiento torsor (TM) y flector horizontal (HBM).'
                            : 'The study discovered that different loads require distinct networks: a single-layer LSTM proved optimal for VBM, while a deeper 3-layer GRU was utilized to extract complex features for TM and HBM.'}
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'La Brillante Estrategia de Corrección de Errores (ECS)' : 'The Error Correction Strategy (ECS)'}</h2>
            <p className="article-text-content">
                {language === 'es' ? 'La contribución más sobresaliente del doctorado es el framework tri-partito paramétrico ECS (Error Correction Strategy):' : 'The most innovative contribution is a three-step ECS framework:'}
                <br /><br />
                {language === 'es' ? '1. Forjar un ' : '1. Establishing an '}<strong>{language === 'es' ? 'Modelo Original' : 'Original model'}</strong>{language === 'es' ? ' mapeando el movimiento crudo IMU hacia la regresión de esfuerzos flectores brutos.' : ' to map motions to loads.'}<br />
                {language === 'es' ? '2. Crear una IA adicional de ' : '2. Creating an '}<strong>{language === 'es' ? 'Modelo de Errores' : 'Error model'}</strong>{language === 'es' ? ' que aprenda a cazar e identificar el delta de error de inferencia de la primera matriz.' : ' mapping motions to prediction errors.'}<br />
                {language === 'es' ? '3. Ensamblar los tensores resultantes en milisegundos para auto-corregir el vector de predicción final durante temporales.' : '3. Combining outputs to continuously adjust and correct predictions in real-time.'}
            </p>

            <div className="article-highlight-box">
                <h3>48.08%</h3>
                <div className="label">{language === 'es' ? 'Explosión Relativa en la Precisión con Olas Oblicuas' : 'Accuracy Improvement in Oblique Seas'}</div>
                <p>
                    {language === 'es'
                        ? 'La integración maestra del sub-filtro algorítmico ECS cosechó asombrosos resultados: desplomó matemáticamente la métrica RMSE (Error Cuadrático Medio) en las vitales predicciones flectoras horizontales de la viga casco (HBM) de un paupérrimo 5.2% a un estruendoso 2.7%, en el idéntico estado atroz de mar (Sea State).'
                        : 'The implementation of the ECS yielded remarkable improvements, plummeting the RMSE for HBM predictions from 5.2% to 2.7% under identical sea state conditions.'}
                </p>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? 'Conclusión Magistral' : 'Conclusion'}</h2>
            <p className="article-text-content-large">
                {language === 'es'
                    ? 'Esta revolucionaria investigación certifica un grandioso salto sideral del siglo XXII en el sector telemétrico naval. Casando enormes algoritmos de Deep Learning y tensores bidireccionales con las corrientes inerciales nativas (IMU) y libres a bordo, los doctores proveen a los ingenieros una herramienta invencible para la simulación digital predictiva en vivo; desterrando las obsoletas alarmas y sensores desgastados, y dotando a los comandantes del superpoder clarividente para capitanear tormentas.'
                    : 'This research marks a monumental leap in ship monitoring. By marrying deep learning networks with accessible ship motion data, authors have provided a viable tool for real-time load monitoring, empowering captains to make informed navigational decisions.'}
            </p>

            <div className="article-tags">
                <span className="tag">{language === 'es' ? 'Deep Learning' : 'Deep Learning'}</span>
                <span className="tag">{language === 'es' ? 'Arquitectura Naval' : 'Naval Architecture'}</span>
                <span className="tag">RNN</span>
                <span className="tag">{language === 'es' ? 'Fatiga y Resistencia' : 'Structural Integrity'}</span>
                <span className="tag">LSTM/GRU</span>
            </div>

            <p style={{ marginTop: '40px', fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                {language === 'es' ? 'Referencia Académica:' : 'Reference:'} Wang, Q., et al. (2024). International Journal of Naval Architecture and Ocean Engineering.
            </p>
        </div>
    )
}

export default ShipHullLoadArticle
