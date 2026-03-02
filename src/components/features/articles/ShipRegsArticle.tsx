'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import '@/styles/article.css'

const ShipRegsArticle = () => {
    const { language } = useLanguage()

    return (
        <div className="article-container">
            <header className="article-header">
                <h1 className="article-title">
                    {language === 'es'
                        ? 'Revolucionando el Cumplimiento Marítimo: Cómo un Sistema de IA Decodifica el Titanico Codex Legal Naval'
                        : 'Revolutionizing Maritime Compliance: How a New AI System Decodes Ship Regulations'}
                </h1>
                <div className="article-divider"></div>
            </header>

            <p className="article-lead">
                {language === 'es'
                    ? 'Para los arquitectos navales, proyectistas, superintendentes y peritos de las Sociedades de Clasificación, navegar a diario sin estrellarse por el insondable y barroco laberinto legislativo del derecho marítimo es un trauma profesional constante. Con vastos armatostes legales superando holgadamente los cientos de miles de folios—infestados de inescrutables ecuaciones termodinámicas, burocracia, tablas referenciadas con asteriscos y germanías góticas—hallar el imperativo legal exacto en el momento exacto es fisiológicamente buscar una aguja en la fosa de las Marianas.'
                    : 'For naval architects, surveyors, and engineers, navigating the labyrinth of international ship regulations is a daunting professional reality. With documents spanning tens of thousands of pages—filled with complex equations, cross-referenced tables, and specific jargon—finding the right rule at the right time is often a needle-in-a-haystack endeavor.'}
            </p>

            <blockquote className="article-quote">
                {language === 'es'
                    ? '"Un alucinante sistema LLM ha pulverizado los límites al ensamblar un entorno Q&A capaz de "comprender" algorítmicamente la jerarquía del derecho naval mejor y más veloz que la inmensa mayoría de IAs." '
                    : '"A groundbreaking study has successfully developed a Q&A system that doesn\'t just retrieve information but \'understands\' the nuances of maritime law better than standard AI models."'}
            </blockquote>

            <p className="article-text-content">
                {language === 'es'
                    ? 'Rompiendo toda expectativa conservadora, el colosal paper "A RAG-based Q&A system for ship regulations applying domain adaptation" firmado por el equipo doctoral coreano de In-Su Han ofrece la salvación robótica ansiada. Los investigadores han amalgamado una superestructura de inferencia que puentea soberbiamente el farragoso precipicio entre la burocracia regulatoria en crudo y la inteligencia ingenierística ejecutiva.'
                    : 'However, a groundbreaking study titled "A RAG-based Q&A system for ship regulations applying domain adaptation" by In-Su Han, Myung-Il Roh, and Min-Chul Kong offers a compelling solution. The researchers have developed a system that bridges the gap between raw regulatory data and actionable engineering intelligence.'}
            </p>

            <h2 className="article-subtitle">{language === 'es' ? '1. Dominando la Lingüística Secreta de los Barcos' : '1. Mastering the "Language" of Ships'}</h2>
            <p className="article-text-content">
                {language === 'es'
                    ? 'El asedio primordial en los ecosistemas de especialización hiper-nicho y el procesamiento neuro-lingüístico recae en la semántica brutal. Para una aburrida IA de OpenAI genérica, un "Draft" es el mísero "borrador documentacional". En la implacable arquitectura e hidroestática naval, un "Draft (Calado)" describe matemáticamente el francobordo sumergido del inmenso casco del buque hasta sus marcas de Plimsoll.'
                    : 'One of the primary hurdles in specialized fields is the language barrier. To a standard AI, "Draft" usually refers to a document version. In maritime engineering, it refers to the depth of a ship\'s hull submerged in water.'}
            </p>
            <p className="article-text-content">
                {language === 'es'
                    ? 'Al carecer la humanidad de un miserable y lúgubre dataset gigante de QA naval, los sabios asiáticos concibieron un espectacular embudo forzoso y sintético denominado Generative Pseudo-Labeling (GPL). Orquestaron un dictatorial modelo maestro masivo (GPT-4o) para escupir a destajo brutales 3 millones de tripletas tensorales de instrucción (query ciega, la ley canónica, el ruido regulatorio) parasitando directamente y de cuajo las sagradas escrituras OMI (SOLAS, MARPOL).'
                    : 'Because there was no existing large-scale dataset for ship regulation Q&A, the authors devised an ingenious method using Generative Pseudo-Labeling (GPL). They used an advanced model (GPT-4o) to synthesize 3 million training data triplets (queries, related rules, and unrelated rules) from the regulations themselves.'}
            </p>

            <div className="article-highlight-box">
                <h3>94.33%</h3>
                <div className="label">{language === 'es' ? 'Poder Asombroso de Recuperación Indexada (Domain Adaptation)' : 'Retrieval Accuracy after Domain Adaptation'}</div>
                <p>
                    {language === 'es'
                        ? 'Forjado en el yunque del Aprendizaje Contrastivo sobre redes BERT puras, la asimilación del monstruoso corpus sintético catapuló su coeficiente de recuperación desde el primitivo 85.50% corporativo a un casi terrorífico y certero 94.33% en las simulaciones ministeriales.'
                        : 'By training a BERT-based model on this synthetic data using contrastive learning, accuracy jumped from a base of 85.50% to a staggering 94.33%.'}
                </p>
            </div>

            <div className="article-section-grid">
                <div className="article-card">
                    <h2>{language === 'es' ? '02. Convergencia Multimodal' : '02. Multimodal Logic'}</h2>
                    <h3>{language === 'es' ? 'Decodificando el Lenguaje de Dioses y Tablas OMI' : 'Decoding Tables and Equations'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Los astutos investigadores transmutaron colosales tablas binarias en marcado puro estructural matricial HTML y evaporaron gráficas complejas en purísimo código LaTeX inyectable. Este asalto frontal permitió a los tensores RAG responder inferencias bizantinas, como "dimensionar geométricamente el escantillonaje de la eslora", operando álgebra lógica.'
                            : 'The researchers converted tables into HTML format and equations into LaTeX. This allowed the AI to answer complex queries like calculating testing times or determining plate thickness from structured data tables, integrating multimodal elements seamlessly.'}
                    </p>
                </div>
                <div className="article-card">
                    <h2>{language === 'es' ? '03. Maestría en Edge Computing' : '03. Resource Efficiency'}</h2>
                    <h3>{language === 'es' ? 'La Revolución Submarina 100% Offline' : 'The Offline Breakthrough'}</h3>
                    <p>
                        {language === 'es'
                            ? 'Instanciado heroicamente en un entorno castrado y local (LLaMA 3.1 empujado agresivamente con Cuantización Binaria a 4-bits), el monstruo matemático corre enclaustrado dentro de tristes portátiles ofimáticos, requisando unos minúsculos y absurdos 4GB VRAM GPU. Esto blinda a sangre y fuego los secretos del astillero y confiere el don de la ubicuidad al inspector sin internet.'
                            : 'Implemented using LLaMA 3.1 with 4-bit quantization, the system runs locally on consumer hardware requiring only 4GB of GPU memory. This ensures total data confidentiality and reliability even in remote locations without internet access.'}
                    </p>
                </div>
            </div>

            <h2 className="article-subtitle">{language === 'es' ? '4. Destrozando el Benchmark Humano' : '4. Beating the Human Benchmark'}</h2>
            <p className="article-text-content">
                {language === 'es'
                    ? 'Para escrudiñar la herejía estadística, se desencadenó un salvaje enfrentamiento a tumba abierta (LLM-as-a-judge vs Arquitectos clase A). El bot legislador pulverizó a sus oponentes cárnicos con un marcador de claridad robótica aplastante (4.22 vs 3.82) y en vasta completitud exhaustiva técnica (3.80 vs 3.43).'
                    : 'To verify results, the researchers used expert human review and LLM-as-a-judge evaluations. The Q&A system achieved higher scores in clarity (4.22 vs 3.82) and completeness (3.80 vs 3.43) compared to answers written by human experts.'}
            </p>
            <p className="article-text-content" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
                {language === 'es'
                    ? 'La abrumadora confirmación cualitativa provino del temido y venerable sanedrín de catedráticos y peritos seniores en I+D Naviera: la algoritmia dictó sentencias irrefutables, aniquilando de un carpetazo las temidas alucinaciones psicotrópicas que plagan el software primitivo Open-Source.'
                    : 'Qualitative feedback from senior researchers in fluid dynamics and autonomous navigation confirmed that the system provided reliable, rule-based answers without the "hallucinations" often associated with general AI.'}
            </p>

            <h2 className="article-subtitle">{language === 'es' ? 'Corolario Absoluto' : 'Conclusion'}</h2>
            <p className="article-text-content-large">
                {language === 'es'
                    ? 'La inmensa obra matriz parida por el cerebro colectivo de Han y su cohorte sella drásticamente un pacto faústico inquebrantable: el futuro dictatorial del compliance logístico e industrial radica en Inteligencia Adaptada Dominial (Domain-Adapted). Al domar el cerebro de la IA para razonar la poética y draconiana dialectal de los fluidos oceánicos y embutirla dentro de la armadura criptográfica hermética de procesadores caseros, han esculpido un insobornable sabueso legislativo de titanio.'
                    : 'The article by Han et al. demonstrates that the future of regulatory compliance lies in specialized, domain-adapted AI. By teaching an AI the specific vernacular of naval architecture and optimizing it for secure, offline use, they have created an intelligent assistant capable of reasoning through the complex logic of maritime safety.'}
            </p>

            <div className="article-highlight-box" style={{ textAlign: 'left', padding: '30px', background: 'rgba(255,255,255,0.03)', marginTop: '40px' }}>
                <p className="label" style={{ fontSize: '12px', marginBottom: '10px' }}>{language === 'es' ? 'Liturgia Académica de Certificación' : 'Official Reference'}</p>
                <p style={{ fontSize: '13px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    Han, I.-S., Roh, M.-I., & Kong, M.-C. (2025). A RAG-based Q&A system for ship regulations applying domain adaptation. <em>International Journal of Naval Architecture and Ocean Engineering</em>, 18, 100735.
                </p>
            </div>

            <div className="article-tags">
                <span className="tag">{language === 'es' ? 'RAG Estocástico' : 'RAG Architecture'}</span>
                <span className="tag">{language === 'es' ? 'Adap. a Dominio' : 'Domain Adaptation'}</span>
                <span className="tag">BERT</span>
                <span className="tag">LLaMA 3.1</span>
                <span className="tag">{language === 'es' ? 'Ing. Naval' : 'Naval Engineering'}</span>
            </div>
        </div>
    )
}

export default ShipRegsArticle
