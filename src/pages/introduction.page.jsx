import React from 'react'
import HeaderComponent from '../components/header.component';

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
                    <div className='w-3/4 max-w-4xl bg-white backdrop-blur-sm rounded-lg p-6 mt-4 border border-white/20 h-80'>
                        {/* Content counter */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroductionPage