'use client'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const Navbar = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="glass-header">
      <div className="nav-container">
        <Link href="/" className="logo">
          FM
        </Link>
        <nav className="nav-links">
          <a href="/#lab" className="nav-link">{language === 'es' ? 'Laboratorio' : 'Lab'}</a>
          <a href="/#projects" className="nav-link">{language === 'es' ? 'Proyectos' : 'Insights'}</a>
          <a href="/media" className="nav-link">Media</a>
          <a href="/cv_v3.html" className="nav-link">Résumé</a>
          <a href="/#contact" className="nav-link">{language === 'es' ? 'Contacto' : 'Contact'}</a>
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="lang-toggle"
          >
            {language === 'en' ? 'EN' : 'ES'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
