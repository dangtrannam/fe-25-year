import React from 'react';
import SVGLogo from '../components/svg-logo.component';
import HeaderComponent from '../components/header.component';

const StartPage = ({ setNextPage }) => {
    return (
        <>
            <HeaderComponent />
            <div className="flex flex-col items-center justify-center">

                {/* SVG Logo with margin adjustments for alignment */}
                <div className="flex flex-col items-center text-center mt-4 md:mt-6">
                    <SVGLogo />
                </div>

                <button
                    className="text-white font-bold py-4 px-32 text-[32px] flex items-center justify-center bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-[5px] border-white/[0.66] rounded-[39px]"
                    onClick={() => setNextPage()}
                >
                    Start
                </button>
            </div>
        </>
    );
};

export default StartPage;
