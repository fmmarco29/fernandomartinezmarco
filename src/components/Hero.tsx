'use client'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="hero-section">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-pretitle"
      >
        Engineering Intelligence
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="hero-title"
      >
        Navigating AI-driven engineering systems
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="hero-description"
      >
        Analyzing the emergence of Artificial Intelligence to architect scalable, resilient, and intelligent engineering infrastructures.
      </motion.p>
    </section>
  )
}

export default Hero
