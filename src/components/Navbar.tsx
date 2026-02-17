'use client'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="glass-header">
      <div className="nav-container">
        <Link href="/" className="logo">
          FM
        </Link>
        <nav className="nav-links">
          <a href="#projects" className="nav-link">Portfolio</a>
          <a href="/cv_v3.html" className="nav-link">Résumé</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
