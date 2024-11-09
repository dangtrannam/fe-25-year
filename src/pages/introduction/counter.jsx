import { useEffect, useRef, useState } from 'react';
import './style.css'; // Import the CSS file
import { gsap } from 'gsap';
import { TimelineMax } from 'gsap/gsap-core';

// eslint-disable-next-line react/prop-types
const CircularProgress = ({ currentPage, setNextPage }) => {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);
    const yearRef = useRef(1999);
    const targetYear = 2024;
    const years = Array.from({ length: targetYear - 1998 }, (_, i) => 1999 + i);

    const runAnimation = () => {
        let i = 0;
        let testProgress = 0;

        let timeline = gsap.timeline({
            onRepeat: () => {
                testProgress += 7;
                setProgress(testProgress)
            },
            repeat: -1,
            duration: 0.2,
            delay: 1,
        });
        timeline.play();

        const interval = new TimelineMax({ repeat: -1 }).call(function () {
            if (yearRef.current <= targetYear) {
                const yearElements = document.querySelectorAll('.year div');
                const yearElement = yearElements[i];
                gsap.to(yearElement, {
                    scale: 5,
                    duration: 2,
                    onComplete: () => {
                        gsap.to(yearElement, {
                            scale: 5,
                            duration: 2,
                        });
                    },
                });

                gsap.to('.year', {
                    y: -(100 + 64) * i,
                    duration: 3,
                    delay: 1,
                });

                yearRef.current++;
                i++;
            } else {
                interval.kill();

                setTimeout(() => {
                    setNextPage();
                    clearInterval(intervalRef.current);
                    timeline.kill();
                }, 4000);
            }
        }, null, null, 2000);
    };

    useEffect(() => {
        if (currentPage === 2) {
            setTimeout(runAnimation, 500)
        }

        return () => clearInterval(intervalRef.current);
    }, [currentPage]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="relative justify-center items-center my-auto top-16">
                <div className="flex items-center">
                    <div className="flex flex-col year gap-[128px]">
                        {years.map((year) => (
                            <div
                                key={year}
                                className='text-[24px] text-transparent bg-clip-text bg-gradient-to-r from-[#5950C5] to-[#DF885B] font-extrabold text-center items-center justify-center flex text-stroke-white'>
                                {year}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircularProgress;
