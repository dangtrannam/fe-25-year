import React, { useState, useEffect } from 'react';

const BackgroundVideo = ({ src, type = "video/mp4", fallbackImage }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLoadedData = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    if (isMobile && fallbackImage) {
        return (
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${fallbackImage})` }}
            />
        );
    }

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {isLoading && (
                <div className="absolute inset-0 bg-gray-900" />
            )}
            <video
                className="absolute w-full h-full object-cover object-center"
                preload="auto"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                controls={false}
                onLoadedData={handleLoadedData}
                onError={handleError}
                poster={fallbackImage}
            >
                <source src={src} type={type} />
                {hasError && "Video playback error"}
            </video>
        </div>
    );
};

export default BackgroundVideo;