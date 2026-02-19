'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
    title: string
    description: string
    stack: string[]
    link?: string
    preview?: React.ReactNode
    expandedContent?: React.ReactNode
    status?: 'online' | 'offline'
}

const InteractiveProjectCard = ({
    title,
    description,
    stack,
    link,
    preview,
    expandedContent,
    status = 'offline'
}: ProjectCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <>
            <motion.div
                layout
                onClick={() => setIsExpanded(true)}
                className="interactive-project-card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
            >
                {/* Status Indicator */}


                {/* Preview Area */}
                <div className="card-preview">
                    {preview || (
                        <div className="placeholder-preview">
                            <div className="preview-grid" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-description">{description}</p>

                    {/* Technical Stack Tags */}
                    <div className="tech-stack">
                        {stack.map((tech, i) => (
                            <span key={i} className="tech-tag">
                                {tech}
                            </span>
                        ))}
                    </div>


                </div>
            </motion.div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="project-modal-overlay"
                        onClick={() => setIsExpanded(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="project-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setIsExpanded(false)}
                            >
                                <X size={24} />
                            </button>

                            <div className="modal-header">
                                <h2>{title}</h2>

                            </div>

                            <div className="modal-body">
                                {expandedContent || (
                                    <div className="expanded-placeholder">
                                        <p>Vista expandida para {title}</p>
                                        <p className="text-muted">
                                            Aquí se cargará la aplicación interactiva completa
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default InteractiveProjectCard
