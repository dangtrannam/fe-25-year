import { useContext } from 'react';
import { Link } from "react-router-dom";
import LanguageContext from './LanguageContext';

const HeaderComponent = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <header className="p-4 relative">
      <div className="absolute left-4 top-4 text-white font-semibold flex flex-col items-start">
        <span className="text-sm sm:text-base">
          {language === 'en' ? 'Select Language' : 'Chọn Ngôn Ngữ'}
        </span>
        <button
          onClick={toggleLanguage}
          className="hover:bg-white/10 px-2 py-1 rounded transition-colors"
        >
          {language.toUpperCase()}
        </button>
      </div>
      <div className="flex justify-center max-w-screen-xl mx-auto">
        <div className="flex gap-4 sm:gap-6 items-center">
          <Link to="#" target="_blank">
            <img
              src="/images/logo_fptu.png"
              alt="FPT University Logo"
              className="w-16 sm:w-20 md:w-28 lg:w-32 h-auto"
            />
          </Link>
          <Link to="#" target="_blank">
            <img
              src="/images/logo_25year.png"
              alt="25 Years Logo"
              className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
