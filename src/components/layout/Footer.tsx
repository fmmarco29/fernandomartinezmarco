'use client'
import { Linkedin, Github, Globe, CircleDot, Mail } from 'lucide-react'

const Footer = () => {
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
        {[
          { term: 'Bayesian Networks', def: 'Probabilistic models that represent variables and dependencies via a Directed Acyclic Graph (DAG).' },
          { term: 'Transformers', def: 'Deep learning architectures based on self-attention mechanisms for processing sequential data.' },
          { term: 'Digital Twins', def: 'Virtual replicas of physical systems, synchronized via real-time data for simulation and analysis.' },
          { term: 'Structural Fatigue', def: 'Progressive structural damage occurring when a material is subjected to cyclic loading.' },
          { term: 'Naval Architecture', def: 'Engineering discipline dealing with the design, construction and operation of marine vessels.' }
        ].map((item, i) => (
          <div key={i} className="glossary-item">
            {item.term}
            <div className="glossary-tooltip">{item.def}</div>
          </div>
        ))}
      </div>
      <p className="footer-text">
        © 2026 Fernando Martínez Marco <br /> Engineering & Artificial Intelligence
      </p>
    </footer>
  )
}

export default Footer
