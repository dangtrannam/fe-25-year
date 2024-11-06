import React from 'react';

const BackgroundVideo = ({ src, type = "video/mp4" }) => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <video className="w-full h-full object-cover" autoPlay loop muted>
                <source src={src} type={type} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default BackgroundVideo;
