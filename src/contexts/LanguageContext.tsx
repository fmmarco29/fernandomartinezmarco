'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
    language: 'en',
    setLanguage: () => { },
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    // Inicializamos en inglés para SSR y luego cambiamos en el cliente si hay otro guardado
    const [language, setLanguageState] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem('lang') as Language;
        if (savedLang) {
            setLanguageState(savedLang);
        } else if (typeof navigator !== 'undefined') {
            const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
            setLanguageState(browserLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('lang', lang);
        }
    };

    if (!mounted) {
        return (
            <LanguageContext.Provider value={{ language, setLanguage }}>
                <div style={{ visibility: 'hidden' }}>{children}</div>
            </LanguageContext.Provider>
        ); // Avoid hydration mismatch
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
