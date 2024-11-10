import { useContext } from 'react';
import Logo25YearEn from '/images/logo_25year_en.png';
import Logo25YearVi from '/images/logo_25year_vi.png';
import HeaderComponent from '../components/header.component';
import LanguageContext from '../components/LanguageContext';

const StartPage = ({ setNextPage }) => {
  const { text, language } = useContext(LanguageContext);
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col">
      <HeaderComponent />
      <div className="flex flex-col items-center justify-center xl:justify-start w-full px-4 flex-1 self-start">
        <div className="flex flex-col items-center text-center mt-4 md:mt-6 w-full max-w-[90vw]">
          {language === 'vi' ? (
            <div className="w-full h-full justify-center mx-auto items-center flex"
            >
              <img
                src={Logo25YearVi}
                className="w-[50vh] h-[20vh] sm:w-[50vh] sm:h-[25vh] md:w-[60vh] md:h-[30vh] lg:w-[70vh] lg:h-[35vh] xl:w-[80vh] xl:h-[40vh] 2xl:w-[90vh] 2xl:h-[45vh] object-contain"
                alt="25 Years Logo"
              />
            </div>
          ) : (
            <div className="w-full h-full justify-center mx-auto items-center flex"
            >
              <img
                src={Logo25YearEn}
                className="w-[50vh] h-[20vh] sm:w-[50vh] sm:h-[25vh] md:w-[60vh] md:h-[30vh] lg:w-[70vh] lg:h-[35vh] xl:w-[80vh] xl:h-[40vh] 2xl:w-[90vh] 2xl:h-[45vh] object-contain"
                alt="25 Years Logo"
              />
            </div>
          )}
        </div>
        <button
          className="text-white font-unbounded font-bold py-2 px-12 sm:py-3 sm:px-16 md:py-4 md:px-32 text-lg sm:text-xl md:text-2xl flex items-center justify-center bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-[4px] sm:border-[5px] border-white/[0.66] rounded-[20px] sm:rounded-[30px] md:rounded-[39px] mt-6"
          onClick={() => setNextPage()}
        >
          {text?.page1?.start}
        </button>
      </div>
    </div>
  );
};

export default StartPage;
