'use client'
import { Linkedin, Github, Globe, CircleDot, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const getGlossary = (language: 'en' | 'es') => [
  {
    term: language === 'es' ? 'Redes Neuronales' : 'Neural Networks',
    def: language === 'es' ? 'Sistemas informáticos inspirados en redes biológicas de cerebros animales.' : 'Computing systems inspired by the biological neural networks that constitute animal brains.'
  },
  {
    term: language === 'es' ? 'Deep Learning' : 'Deep Learning',
    def: language === 'es' ? 'Subconjunto de machine learning basado en redes neuronales con múltiples capas ocultas.' : 'A subset of machine learning based on artificial neural networks with multiple layers.'
  },
  {
    term: language === 'es' ? 'Redes Bayesianas' : 'Bayesian Networks',
    def: language === 'es' ? 'Modelos probabilísticos que representan variables y dependencias mediante un Grafo Acíclico Dirigido (DAG).' : 'Probabilistic models that represent variables and dependencies via a Directed Acyclic Graph (DAG).'
  },
  {
    term: language === 'es' ? 'Transformadores' : 'Transformers',
    def: language === 'es' ? 'Arquitecturas de aprendizaje profundo basadas en auto-atención para procesar secuencias de datos.' : 'Deep learning architectures based on self-attention mechanisms for processing sequential data.'
  },
  {
    term: language === 'es' ? 'Gemelos Digitales' : 'Digital Twins',
    def: language === 'es' ? 'Réplicas virtuales de sistemas físicos, sincronizadas vía datos en tiempo real para análisis.' : 'Virtual replicas of physical systems, synchronized via real-time data for simulation and analysis.'
  },
  {
    term: language === 'es' ? 'Estabilidad de Buques' : 'Ship Stability',
    def: language === 'es' ? 'Capacidad de la nave de volver a la posición de equilibrio tras inclinarse por olas o viento.' : "A vessel's ability to return to an upright position after being inclined by external forces like wind or waves."
  },
  {
    term: language === 'es' ? 'Fatiga Estructural' : 'Structural Fatigue',
    def: language === 'es' ? 'Daño estructural progresivo que ocurre cuando el material es sometido a cargas cíclicas.' : 'Progressive structural damage occurring when a material is subjected to cyclic loading.'
  },
  {
    term: language === 'es' ? 'Arquitectura Naval' : 'Naval Architecture',
    def: language === 'es' ? 'Ingeniería especializada en diseño, construcción y operatividad de embarcaciones marinas.' : 'Engineering discipline dealing with the design, construction and operation of marine vessels.'
  }
];

const Footer = () => {
  const { language } = useLanguage();
  const glossary = getGlossary(language);

  return (
    <footer id="contact" className="footer">
      <div className="footer-socials">
        <a href="https://www.linkedin.com/in/fernando-mart%C3%ADnez-marco-a8127328/" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <Linkedin size={24} />
        </a>
        <a href="https://github.com/fmmarco29" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="GitHub">
          <Github size={24} />
        </a>
        <a href="https://fmmarco29.github.io/#blog" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="AI Project Lab">
          <Globe size={24} />
        </a>
        <a href="https://huggingface.co/fmcsihe2929" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="Hugging Face">
          <CircleDot size={24} />
        </a>
        <a href="mailto:fmmarco29@outlook.com" className="footer-social-link" title="Email">
          <Mail size={24} />
        </a>
      </div>
      <div className="glossary-container">
        {glossary.map((item, i) => (
          <div key={i} className="glossary-item">
            {item.term}
            <div className="glossary-tooltip">{item.def}</div>
          </div>
        ))}
      </div>
      <p className="footer-text">
        © 2026 Fernando Martínez Marco <br /> {language === 'es' ? 'Ingeniería e Inteligencia Artificial' : 'Engineering & Artificial Intelligence'}
      </p>
    </footer>
  )
}

export default Footer
