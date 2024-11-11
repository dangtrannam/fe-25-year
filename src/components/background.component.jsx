import React from 'react';

const BackgroundVideo = ({ src, type = "video/mp4" }) => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden flex justify-center items-center">
            <video
                className="absolute w-full h-full object-cover object-center"
                playsInline={true}
                muted={true}
                autoPlay={true}
                loop={true}
                controls={false}
                preload="auto"
            >
                <source src={src} type={type} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default BackgroundVideo;
