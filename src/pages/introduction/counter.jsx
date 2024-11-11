import { gsap } from 'gsap';
import { TimelineMax } from 'gsap/gsap-core';
import { useEffect, useRef } from 'react';
import './style.css';

const CircularProgress = ({ currentPage, setNextPage }) => {
    const intervalRef = useRef(null);
    const yearRef = useRef(1999);
    const targetYear = 2024;
    const years = Array.from({ length: targetYear - 1998 }, (_, i) => 1999 + i);

    // Function to play the sound
    const playSound = () => {
        // const audio = new Audio('/year-run.mp3');
        console.log('Playing sound');
        // audio.play();
        const audio = document.getElementById('yearRunSound');
        //forward 2s
        audio.currentTime = 1.95;
        //slow down the speed
        audio.playbackRate = 0.75;
        if (audio) audio.play();
    };

    const runAnimation = () => {
        let i = 0;

        // Set up the GSAP timeline
        const timeline = gsap.timeline({
            repeat: -1,
            duration: 0.2,
            delay: 1,
        });

        timeline.play();

        // Initiate sound play
        playSound();

        // Timeline for animating each year element
        const interval = new TimelineMax({ repeat: -1 }).call(() => {
            if (yearRef.current <= targetYear) {
                const yearElements = document.querySelectorAll('.year div');
                const yearElement = yearElements[i];
                
                // Scale up the current year element
                gsap.to(yearElement, {
                    scale: 5,
                    duration: 3,
                    onComplete: () => {
                        // Reset the scale after zooming in
                        gsap.to(yearElement, {
                            scale: 1,
                            duration: 4,
                        });
                    },
                });

                // Animate the vertical scroll for year list
                gsap.to('.year', {
                    y: -(100 + 68.1) * i,
                    duration: 2,
                    delay: 0.5,
                });

                yearRef.current++;
                i++;
            } else {
                // Stop the animation and switch page
                interval.kill();
                setTimeout(() => {
                    setNextPage();
                    clearInterval(intervalRef.current);
                    timeline.kill();
                }, 3000);
            }
        }, null, null, 2000);
    };

    useEffect(() => {
        // Trigger the animation if the current page is 2
        if (currentPage === 2) {
            setTimeout(runAnimation, 500);
        }

        return () => clearInterval(intervalRef.current);
    }, [currentPage]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="relative justify-center items-center my-auto top-16">
                <audio id="yearRunSound" src="/year_run.mp3"></audio>
                <div className="flex items-center">
                    <div className="flex flex-col year gap-[128px] w-[1000px]">
                        <span></span>
                        {years.map((year) => (
                            <div
                                key={year}
                                className="text-[24px] antialiased text-transparent bg-clip-text bg-gradient-to-r from-[#5950C5] to-[#DF885B] font-extrabold text-center items-center justify-center flex text-stroke-white"
                            >
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
