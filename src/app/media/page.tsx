'use client'
import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/styles/media-showcase.css'
import { useLanguage } from '@/contexts/LanguageContext'

const MediaPage = () => {
    const { language } = useLanguage();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cards = document.querySelectorAll('.media-card');
            cards.forEach(card => {
                const rect = (card as HTMLElement).getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const glow = card.querySelector('.card-glow') as HTMLElement;
                if (glow) {
                    glow.style.left = `${x}px`;
                    glow.style.top = `${y}px`;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const mediaItems = [
        {
            name: "Laprovincia",
            url: "https://www.laprovincia.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127434011.html",
            logo: "/logos/media/laprovincia.es_logo.svg"
        },
        {
            name: "Eldia",
            url: "https://www.eldia.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127433998.html",
            logo: "/logos/media/eldia.es_logo.svg"
        },
        {
            name: "El Periódico",
            url: "https://www.elperiodico.com/es/tendencias21/20260302/ingeniero-canario-fernando-martinez-marco-127433994",
            logo: "/logos/media/elperiodico.com_logo.svg"
        },
        {
            name: "EPE España",
            url: "https://www.epe.es/es/tendencias21/20260302/ingeniero-canario-fernando-martinez-marco-127433991",
            logo: "/logos/media/epe.es_logo.svg"
        },
        {
            name: "Faro de Vigo",
            url: "https://www.farodevigo.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127434003.html",
            logo: "/logos/media/farodevigo.es_logo.svg"
        },
        {
            name: "Levante-EMV",
            url: "https://www.levante-emv.com/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127433983.html",
            logo: "/logos/media/levante-emv.com_logo.svg"
        },
        {
            name: "Diario Córdoba",
            url: "https://www.diariocordoba.com/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127434014.html",
            logo: "/logos/media/diariocordoba.com_logo.svg"
        },
        {
            name: "Diario de Ibiza",
            url: "https://www.diariodeibiza.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127434001.html",
            logo: "/logos/media/diariodeibiza.es_logo.svg"
        },
        {
            name: "Mediterráneo",
            url: "https://www.elperiodicomediterraneo.com/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127433996.html",
            logo: "/logos/media/elperiodicomediterraneo.com_logo.svg"
        },
        {
            name: "La Opinión",
            url: "https://www.laopinioncoruna.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127433997.html",
            logo: "/logos/media/laopinioncoruna.es_logo.svg"
        },
        {
            name: "Correo Gallego",
            url: "https://www.elcorreogallego.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127434007.html",
            logo: "/logos/media/elcorreogallego.es_logo.svg"
        },
        {
            name: "Zamora",
            url: "https://www.laopiniondezamora.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127434002.html",
            logo: "/logos/media/laopiniondezamora.es_logo.svg"
        },
        {
            name: "Aragón",
            url: "https://www.elperiodicodearagon.com/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127433986.html",
            logo: "/logos/media/elperiodicodearagon.com_logo.svg"
        },
        {
            name: "Extremadura",
            url: "https://www.elperiodicoextremadura.com/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127433984.html",
            logo: "/logos/media/elperiodicoextremadura.com_logo.svg"
        },
        {
            name: "Murcia",
            url: "https://www.laopiniondemurcia.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127434000.html",
            logo: "/logos/media/laopiniondemurcia.es_logo.svg"
        },
        {
            name: "Información",
            url: "https://www.informacion.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127434012.html",
            logo: "/logos/media/informacion.es_logo.svg"
        },
        {
            name: "Mallorca",
            url: "https://www.diariodemallorca.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127433990.html",
            logo: "/logos/media/diariodemallorca.es_logo.svg"
        },
        {
            name: "Málaga",
            url: "https://www.laopiniondemalaga.es/tendencias21/2026/03/02/ingeniero-canario-fernando-martinez-marco-127433992.html",
            logo: "/logos/media/laopiniondemalaga.es_logo.svg"
        }
    ];

    return (
        <div className="media-showcase-page">
            <Navbar />

            <div className="media-background-gradients"></div>
            <div className="ambient-blob blob-1"></div>
            <div className="ambient-blob blob-2"></div>

            <main className="media-wrapper">
                <header className="media-header">
                    <h1>{language === 'es' ? 'Visibilidad en Medios' : 'Media Visibility'}</h1>
                    <p className="media-subtitle">
                        {language === 'es' ? (
                            <>Agradecimiento a <span className="media-highlight">Tendencias 21</span> Revista Electrónica de Ciencia, Tecnología, Sociedad y Cultura.</>
                        ) : (
                            <>Special thanks to <span className="media-highlight">Tendencias 21</span> Electronic Magazine of Science, Technology, Society and Culture.</>
                        )}
                    </p>

                    <a href="https://www.epe.es/es/tendencias21/" target=" _blank" rel="noopener noreferrer" className="tendencias-feature">
                        <img src="/logos/media/tendencias21.es_logo.jpg" alt="Tendencias 21" />
                    </a>
                </header>

                <div className="media-grid">
                    {mediaItems.map((item, index) => (
                        <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="media-card">
                            <div className="card-glow"></div>
                            <div className="card-content">
                                <img src={item.logo} alt={item.name} />
                                <div className="media-name">{item.name}</div>
                            </div>
                        </a>
                    ))}
                </div>

                <Footer />
            </main>
        </div >
    );
};

export default MediaPage;
