import React from 'react';
import SVGLogo from '../components/svg-logo.component';
import HeaderComponent from '../components/header.component';

const StartPage = ({ setNextPage }) => {
    return (
        <div className="overflow-x-hidden min-h-screen flex flex-col">
            <HeaderComponent />
            <div className="flex flex-col items-center justify-center xl:justify-start w-full px-4 flex-1 self-start">
                {/* SVG Logo */}
                <div className="flex flex-col items-center text-center mt-4 md:mt-6 w-full max-w-[90vw]">
                    <SVGLogo />
                </div>

                {/* Responsive Button */}
                <button
                    className="text-white font-bold 
                             py-2 px-12 sm:py-3 sm:px-16 md:py-4 md:px-32 
                             text-lg sm:text-xl md:text-2xl 
                             flex items-center justify-center 
                             bg-gradient-to-r from-[#5950C5] to-[#DF885B] 
                             border-[4px] sm:border-[5px] border-white/[0.66] 
                             rounded-[20px] sm:rounded-[30px] md:rounded-[39px] 
                             mt-6"
                    onClick={() => setNextPage()}
                >
                    Start
                </button>
            </div>
        </div>
    );
};

export default StartPage;