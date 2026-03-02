'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const LNGSloshingArticle = () => {
  const { language } = useLanguage()

  return (
    <div className="article-container">
      <header className="article-header">
        <h1 className="article-title">
          {language === 'es'
            ? 'Revolucionando el Diseño Naval de GNL: Cómo las Redes Neuronales Dominan las Cargas de Sloshing'
            : 'Revolutionizing LNG Ship Design: How Neural Networks are Taming Sloshing Loads'}
        </h1>
        <div className="article-divider"></div>
      </header>

      <p className="article-lead">
        {language === 'es'
          ? 'En el sofisticado mundo de la arquitectura naval y el diseño de artefactos marinos, muy pocos desafíos empíricos son tan intrincados e intratables como el fenómeno hidrodinámico de "sloshing" (chapoteo). Para los buques que transportan carga criogénica a granel —particularmente buques Gaseros GNL—, los monumentales impactos y movimientos hiper-violentos del fluido no-lineal dentro del tanque durante un temporal en altamar, pueden generar inmensurables daños estructurales.'
          : 'In the world of naval architecture, few challenges are as persistent and complex as sloshing. For ships carrying liquid cargo—particularly Liquefied Natural Gas (LNG) carriers and LNG-fueled vessels—the violent movement of liquid inside tanks can cause severe structural damage.'}
      </p>

      <p className="article-text-content">
        {language === 'es'
          ? 'Tradicionalmente, en la ingeniería oceánica, certificar el diseño y garantizar la integridad de estos imponentes tanques de membrana ha sido una empresa draconiana y profundamente costosa, requiriendo cientos de iteraciones y meses enteros de ensayos destructivos a escala en plataformas mecánicas tipo hexápodo de 6 grados de libertad. Sin embargo, un extraordinario artículo técnico (paper) publicado en la afamada revista Marine Structures por investigadores de élite (Yangjun Ahn y Yonghwan Kim, Universidad Nacional de Seúl) ofrece un atisbo empírico hacia un paradigma inexplorado y radicalmente más ágil.'
          : 'Traditionally, ensuring the safety of these tanks has been a costly and time-consuming endeavor involving months of physical model testing. However, a remarkable study published in Marine Structures by Yangjun Ahn and Yonghwan Kim from Seoul National University offers a glimpse into a more efficient future.'}
      </p>

      <blockquote className="article-quote">
        {language === 'es'
          ? '"Su publicación demuestra irrefutablemente cómo aplicar arquitectura Deep Learning moderna puede alterar permanentemente los fundamentos de predicción en impacto de cargas fluidodinámicas extremas."'
          : '"Their paper successfully demonstrates how machine learning can transform how we predict extreme loads."'}
      </blockquote>

      <p className="article-text-content">
        {language === 'es'
          ? 'El paper, meticulosamente titulado "Data mining in sloshing experiment database and application of neural network for extreme load prediction" logra mapear algoritmicamente por vez primera cómo los perceptrones multicapa y la inteligencia artificial pueden predecir distribuciones paramétricas extremas de Weibull. A continuación, detallamos las claves absolutas de su monumental investigación técnica.'
          : 'Their paper, "Data mining in sloshing experiment database and application of neural network for extreme load prediction", successfully demonstrates how machine learning can transform how we predict extreme loads. Here are the key achievements detailed in their research.'}
      </p>

      <div className="article-section-grid">
        <div className="article-card">
          <h2>{language === 'es' ? '01. La Base de Datos' : '01. The Foundation'}</h2>
          <h3>{language === 'es' ? 'Minería de un Dataset Titánico' : 'Mining a Massive Database'}</h3>
          <p>
            {language === 'es'
              ? 'Los autores exprimieron y procesaron arquitectónicamente la inmensa base empírica de pruebas (SNU DB), un colosal lago de datos estructurados albergando más de 540 terabytes de series temporales sensorizadas. Extrajeron variables latentes de 3.589 condiciones de estado de mar, traduciéndose en formidables 18.000 horas netas de simulaciones hidrodinámicas de 6-DOF (Grados de Libertad), vectorizando la topología del tanque contra las aceleraciones incidentales.'
              : 'The authors leveraged the Seoul National University Sloshing Model Test Database (SNU DB), containing over 540 terabytes of experimental data. They mined results from 3,589 conditions, representing nearly 18,000 hours of physical testing across tank dimensions, environmental conditions, and ship motion responses.'}
          </p>
        </div>
        <div className="article-card">
          <h2>{language === 'es' ? '02. La Arquitectura IA' : '02. The Architecture'}</h2>
          <h3>{language === 'es' ? 'Dominando las Ecuaciones No Lineales' : 'Overcoming Complexity'}</h3>
          <p>
            {language === 'es'
              ? 'Las presiones termofluidodinámicas de un impacto de GNL son de índole altamente caótica y no lineal (stochastic). Para sortear magistralmente la dimensionalidad de las Ecuaciones de Navier-Stokes, desplegaron una profunda Red Neuronal Artificial (ANN) de perceptrón muticapa, instanciando un algoritmo "Ensemble" iterativo. Promediar matemáticamente los tensores de probabilidad de las 5 mejores redes purgó definitivamente las colas estadísticas y desviaciones extremas.'
              : 'Sloshing is highly nonlinear. To solve this, they developed a deep Artificial Neural Network (ANN) with five hidden layers and applied an Ensemble Method. Averaging the predictions of the top five networks significantly improved reliability, smoothing out stochastic variances.'}
          </p>
        </div>
      </div>

      <h2 className="article-subtitle">{language === 'es' ? 'Validando la "Caja Negra" Computacional' : 'Validating the "Black Box"'}</h2>
      <p className="article-text-content">
        {language === 'es'
          ? 'El hito absoluto y coronación de este desgarrador artículo científico radica en su inferencia en el mundo real. El modelo computacional entrenado (la mal llamada "caja negra") fue directamente retado a escupir métricas exactas y predecir ciegamente diseños reales de ingeniería naviera empleados al milímetro por los astilleros titanes globales: Hyundai Heavy Industries (HHI) y Samsung Heavy Industries (SHI).'
          : 'The most impressive achievement of the study was the validation. The neural network was successfully challenged to predict the results of real-world tank designs used by major shipbuilders like Hyundai Heavy Industries (HHI) and Samsung Heavy Industries (SHI).'}
      </p>

      <div className="article-highlight-box">
        <h3>HHI & SHI</h3>
        <div className="label">{language === 'es' ? 'Certificación Comercial e Industrial' : 'Real-World Validation'}</div>
        <ul style={{ textAlign: 'left', marginTop: '1rem', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>{language === 'es' ? 'Tanques de Combustible (Hyundai HHI):' : 'Fuel Tanks (HHI):'}</strong> {language === 'es' ? 'La IA predijo magistral y analíticamente que la estricta alineación de tanque "de dos filas" absorbería una carga de fragmentación cinética (sloshing load) inmensamente menor contrastada contra el diseño central de pasillo único.' : 'Accurately predicted that a "two-row" tank arrangement would experience significantly lower sloshing loads compared to a "one-row" arrangement.'}</li>
          <li><strong>{language === 'es' ? 'Bodegas de Carga Membrana (Samsung SHI):' : 'Cargo Holds (SHI):'}</strong> {language === 'es' ? 'La red convolucionó e identificó con éxito inaudito cómo ínfimas iteraciones topológicas en el chaflán perimetral inferior ("lower chamfer geometry") deprimen exponencialmente la curva de picos de presión dinámica, señalando robóticamente el límite plástico óptimo.' : 'Successfully identified how subtle changes in tank geometry (like the lower chamfer height) mitigate impact pressures, predicting the "Optimum" model\'s superior performance.'}</li>
        </ul>
      </div>

      <h2 className="article-subtitle">{language === 'es' ? 'La Nueva Cúspide del Diseño Dinámico' : 'A New Tool for Efficient Design'}</h2>
      <p className="article-text-content">
        {language === 'es'
          ? 'La implementación end-to-end de topologías de Redes Neuronales constituye un salto evolutivo tectónico (game-changer) durante las exhaustivas y draconianas fases de Ingeniería Básica y Diseño Conceptual (FEED). Otorga a los doctores y arquitectos navales el sublime poder cibernético de cribar aceleradamente (screening pipeline) cientos de miles de paramétricas en la envolvente operativa del casco sin encender el laboratorio mecánico.'
          : 'This neural network approach is a game-changer for the preliminary design phase. It allows engineers to rapidly screen thousands of variations, identify critical conditions, and predict extreme loads with exceptional accuracy, saving immense time and resources.'}
      </p>

      <h2 className="article-subtitle">{language === 'es' ? 'Conclusión' : 'Conclusion'}</h2>
      <p className="article-text-content-large">
        {language === 'es'
          ? 'La investigación liderada por los doctores Ahn y Kim traza de facto las líneas maestras de la futura industria 4.0 naval. Al tender un elegante e inquebrantable puente entre bases de datos titánicas y la heurística analítica probabilística de las máquinas, proporcionan una heramienta incalculable en la prevención de la fatiga plástica para un comercio del gas mucho más seguro, rentable e implacablemente eficiente.'
          : 'Ahn and Kim’s work represents a significant step forward in maritime engineering. By successfully bridging the gap between massive physical datasets and advanced machine learning, they have provided a tool that enhances both the safety and efficiency of LNG ship design.'}
      </p>

      <div className="article-tags">
        <span className="tag">{language === 'es' ? 'Machine Learning' : 'Machine Learning'}</span>
        <span className="tag">{language === 'es' ? 'Arquitectura Naval' : 'Naval Architecture'}</span>
        <span className="tag">{language === 'es' ? 'Buques GNL' : 'LNG Carriers'}</span>
        <span className="tag">{language === 'es' ? 'Redes Neuronales' : 'Neural Networks'}</span>
        <span className="tag">{language === 'es' ? 'Simulación de Sloshing' : 'Sloshing Simulation'}</span>
      </div>
    </div>
  )
}

export default LNGSloshingArticle
