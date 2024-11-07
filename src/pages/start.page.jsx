import React from 'react';
import HeaderComponent from '../components/header.component';
import SVGLogo from '../components/svg-logo.component';

const StartPage = ({ setNextPage }) => {
    return (
        <>
            <HeaderComponent />
            <div
                className="flex flex-col items-center justify-center h-screen"
            >
                <div className="absolute top-4 left-4">
                    <button className="text-white font-semibold">Chọn ngôn ngữ Vn/Eng</button>
                </div>

                <div className="flex flex-col items-center text-center mb-10">
                    <SVGLogo />
                </div>

                <button
                    className="text-white font-bold py-4 px-16 text-[32px] flex items-center justify-center bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-[5px] border-white/[0.66] rounded-[39px]"
                    onClick={() => setNextPage()}
                >
                    Start
                </button>
            </div>
        </>
    );
};

export default StartPage;
