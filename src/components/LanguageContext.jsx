// LanguageContext.js
import { createContext, useState, useEffect } from 'react';
import vi from '../assets/vi.json';
import en from '../assets/en.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'vi');
  const [text, setText] = useState(language === 'vi' ? vi : en);

  useEffect(() => {
    localStorage.setItem('lang', language);
    setText(language === 'vi' ? vi : en);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'vi' ? 'en' : 'vi'));
  };

  return (
    <LanguageContext.Provider value={{ language, text, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
