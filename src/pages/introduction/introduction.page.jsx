import React from 'react'
import HeaderComponent from '../../components/header.component';
import CircularProgress from './counter';

const IntroductionPage = ({ setNextPage }) => {
    return (
        <div>
            <HeaderComponent />
            <div className="flex flex-col items-center justify-center mt-6 px-4">
                <div className="flex flex-col gap-4 md:gap-6 items-center text-center">
                    <div className="flex flex-col gap-2 items-center text-center font-unbounded text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                        <span>CHÀO MỪNG ĐẾN VỚI</span>
                        <span>HÀNH TRÌNH 25 NĂM</span>
                    </div>
                    <div className='w-[60%] bg-gradient-to-t from-[#D9D9D9] to-[#191182] rounded-lg mt-4 h-72 relative overflow-hidden'>
                        {/* Gradient overlays for fade effect */}


                        <CircularProgress />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroductionPage