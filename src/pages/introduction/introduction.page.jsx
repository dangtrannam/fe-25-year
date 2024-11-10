import { useContext } from 'react';
import HeaderComponent from '../../components/header.component';
import CircularProgress from './counter';
import LanguageContext from '../../components/LanguageContext';

const IntroductionPage = ({ currentPage, setNextPage }) => {
    const { text } = useContext(LanguageContext);

    return (
        <div className='flex flex-col h-screen'>
            <HeaderComponent />
            <div className="flex flex-1 flex-col justify-center xl:justify-start items-center mt-6 px-4">
                <div className="flex flex-col gap-4 md:gap-6 items-center text-center">
                    <div className="flex flex-col gap-2 items-center text-center font-unbounded text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                        <span>{text?.page2?.welcome}</span>
                        <span>{text?.page2?.journey}</span>
                    </div>
                    <div className='w-[60%] bg-transparent rounded-lg mt-4 h-72 relative overflow-hidden'>
                        <CircularProgress currentPage={currentPage} setNextPage={setNextPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroductionPage;
