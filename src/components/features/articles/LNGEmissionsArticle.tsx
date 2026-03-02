'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const LNGEmissionsArticle = () => {
  const { language } = useLanguage()

  return (
    <div className="article-container">
      <header className="article-header">
        <h1 className="article-title">
          {language === 'es'
            ? 'De Reactivo a Proactivo: Cómo los Modelos Data-Driven Pueden Reducir Emisiones en Transporte GNL'
            : 'From Reactive to Proactive: How Data-Driven Models Can Slash Emissions in LNG Shipping'}
        </h1>
        <div className="article-divider"></div>
      </header>

      <p className="article-lead">
        {language === 'es'
          ? 'El Gas Natural Licuado (GNL) suele ser aclamado como el combustible puente hacia un futuro más verde, sin embargo, los buques que lo transportan se enfrentan a un desafío paradójico: para mantener la seguridad, a veces deben quemar la misma carga que intentan entregar. Este proceso, que involucra a la Unidad de Combustión de Gas (GCU), crea emisiones innecesarias de gases de efecto invernadero (GHG).'
          : 'Liquefied Natural Gas (LNG) is often hailed as a bridge fuel for a greener future, yet the vessels transporting it face a paradoxical challenge: to maintain safety, they sometimes have to burn the very cargo they are trying to deliver. This process, involving the Gas Combustion Unit (GCU), creates unnecessary greenhouse gas (GHG) emissions.'}
      </p>

      <blockquote className="article-quote">
        {language === 'es'
          ? '"Al hacer la transición de una gestión reactiva a una proactiva de la presión de carga, los barcos pueden reducir significativamente su huella de carbono."'
          : '"By transitioning from reactive to proactive management of cargo pressure, ships can significantly reduce their carbon footprint."'}
      </blockquote>

      <p className="article-text-content">
        {language === 'es'
          ? 'Sin embargo, un fascinante nuevo estudio publicado en la revista científica International Journal of Naval Architecture and Ocean Engineering por Hyun Soo Kim y Myung-Il Roh sugiere que la clave para resolver esto reside en el modelado predictivo. Al pasar de una gestión reactiva de las presiones de carga a una intervención proactiva calculada, las flotas logran reducir drásticamente su huella de carbono sin comprometer la seguridad.'
          : 'However, a fascinating new study published in the International Journal of Naval Architecture and Ocean Engineering by Hyun Soo Kim and Myung-Il Roh suggests that the key to solving this lies in predictive modeling. By transitioning from reactive to proactive management of cargo pressure, ships can significantly reduce their carbon footprint.'}
      </p>

      <div className="article-section-grid">
        <div className="article-card">
          <h2>{language === 'es' ? '01. El Problema' : '01. The Problem'}</h2>
          <h3>{language === 'es' ? 'El Dilema del Boil-Off Gas' : 'The Boil-Off Gas Dilemma'}</h3>
          <p>
            {language === 'es'
              ? 'El GNL debe mantenerse a temperaturas criogénicas (-163°C). El calor externo y el chapoteo (sloshing) generan Boil-Off Gas (BOG). Cuando los sistemas de relicuefacción alcanzan sus límites durante temporales con mar gruesa, el gas excedente se desvía a la Unidad de Combustión de Gas (GCU) y es incinerado para evitar catastróficas sobrepresiones.'
              : 'LNG must be kept at cryogenic temperatures (-163°C). External heat and sloshing cause Boil-Off Gas (BOG). When reliquefaction systems reach their limits during rough seas, surplus gas is diverted to the Gas Combustion Unit (GCU) and incinerated.'}
          </p>
        </div>
        <div className="article-card">
          <h2>{language === 'es' ? '02. La Solución' : '02. The Solution'}</h2>
          <h3>{language === 'es' ? 'Predecir el Futuro' : 'Predicting the Future'}</h3>
          <p>
            {language === 'es'
              ? 'Kim y Roh construyeron un modelo termodinámico inteligente (ML) capaz de predecir la presión en los tanques de carga contabilizando variables dinámicas del entorno marítimo como el estado del mar. Conocer los picos de presión antes de que sucedan permite una intervención proactiva operativa del jefe de máquinas.'
              : 'Kim and Roh built an ML model capable of predicting cargo tank pressure by accounting for real-world variables like sea states. Knowing pressure rises before they happen allows for proactive intervention.'}
          </p>
        </div>
      </div>

      <h2 className="article-subtitle">{language === 'es' ? 'La Estrategia "Proactiva"' : 'The "Proactive" Strategy'}</h2>
      <p className="article-text-content">
        {language === 'es'
          ? 'En lugar de esperar a que salte una alarma de presión, el modelo predictivo lee y analiza el pronóstico meteorológico futuro en el océano. Si prevé un incremento destructivo de presión por oleaje en unas horas, el operador puede encender el avanzado sistema de relicuefacción a plena potencia de manera preventiva. Esta ventaja temporal evita que el tanque alcance remotamente los umbrales de quemado obligatorio de la GCU.'
          : 'Instead of waiting for an alarm, the predictive model analyzes upcoming weather. If it forecasts a pressure increase, the operator can activate the reliquefaction system at "full-load mode" preemptively. This head start prevents the pressure from hitting the trigger threshold for the GCU.'}
      </p>

      <div className="article-highlight-box">
        <h3>{language === 'es' ? '579 Toneladas' : '579 Tons'}</h3>
        <div className="label">{language === 'es' ? 'Emisiones Ahorradas por Viaje' : 'Saved Emissions per Voyage'}</div>
        <p>
          {language === 'es'
            ? 'Datos históricos del "Viaje 1" mostraron más de 673 toneladas de GNL devoradas por la antorcha. El riguroso estudio validó empíricamente que con este modelado de gemelos digitales proactivos, 579 toneladas de ese brutal desperdicio hubiesen sido evitadas íntegramente.'
            : 'Historical data from "Voyage 1" showed 673 tons of LNG consumed. The study concluded that with proactive modeling, 579 tons of that waste could have been avoided entirely.'}
        </p>
      </div>

      <h2 className="article-subtitle">{language === 'es' ? 'Conclusión' : 'Conclusion'}</h2>
      <p className="article-text-content-large">
        {language === 'es'
          ? 'La investigación liderada demuestra categóricamente que el camino inminente hacia la descarbonización en el masivo mundo marítimo y el transporte de gases licuados, no radica únicamente en forjar revolucionarios e hipotéticos nuevos motores de propulsión de amoníaco o baterías; sino también — y con inmensurables retornos financieros a nulo coste CAPEX — en la utilización más inteligente y estocástica y predictiva del gemelo digital. Implementando un modesto algoritmo de Machine Learning de regresiones multilineales, o algo tan revolucionario como un motor físico ST-GNN Bayesiano, el armador transmuta instantáneamente una postura pasiva a proactiva y determinista.'
          : 'This study demonstrates that the path to decarbonization in shipping isn\'t just about building new engines; it is also about smarter data utilization. By leveraging predictive algorithms like Multiple Linear Regression (MLR), ship operators can move from a defensive stance to an offensive one, smoothing out inefficiencies before they become emissions.'}
      </p>

      <div className="article-tags">
        <span className="tag">Machine Learning</span>
        <span className="tag">{language === 'es' ? 'Transporte GNL' : 'LNG Shipping'}</span>
        <span className="tag">{language === 'es' ? 'Modelos Predictivos' : 'Predictive Modeling'}</span>
        <span className="tag">{language === 'es' ? 'Sostenibilidad' : 'Sustainability'}</span>
        <span className="tag">{language === 'es' ? 'Descarbonización' : 'Decarbonization'}</span>
      </div>
    </div>
  )
}

export default LNGEmissionsArticle
