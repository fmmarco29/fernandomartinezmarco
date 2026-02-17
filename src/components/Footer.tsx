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
        <a href="https://fmmarco29.github.io/AI/" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="AI Project Lab">
          <Globe size={24} />
        </a>
        <a href="https://huggingface.co/fmcsihe2929" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="Hugging Face">
          <CircleDot size={24} />
        </a>
        <a href="mailto:fmmarco29@outlook.com" className="footer-social-link" title="Email">
          <Mail size={24} />
        </a>
      </div>
      <p className="footer-text">
        © 2026 Fernando Martínez Marco <br /> Engineering & Artifical Intelligence
      </p>
    </footer>
  )
}

export default Footer
