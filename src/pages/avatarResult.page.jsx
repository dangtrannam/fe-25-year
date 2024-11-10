import React, { useRef, useState, useEffect, useContext } from 'react';
import { isMobile, dataUrlToFile, convertToFileList, shareImage, isShareable } from '../utils';
import LanguageContext from '../components/LanguageContext';

const AvatarResultPage = ({ setNextPage }) => {
    const { text } = useContext(LanguageContext);
    const avatarDataURLLocalStorage = localStorage.getItem("avatarImage");
    const [avatarDataURL, setAvatarDataURL] = useState(avatarDataURLLocalStorage);

    const cardDataURLLocalStorage = localStorage.getItem("cardImage");
    const [cardDataURL, setCardDataURL] = useState(cardDataURLLocalStorage);

    useEffect(() => {
        const handleStorageChange = () => {
            setAvatarDataURL(localStorage.getItem("avatarImage"));
            setCardDataURL(localStorage.getItem("cardImage"));
        };

        window.addEventListener("storage", handleStorageChange);

        const intervalId = setInterval(() => {
            setAvatarDataURL(localStorage.getItem("avatarImage"));
            setCardDataURL(localStorage.getItem("cardImage"));
        }, 1000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(intervalId);
        };
    }, []);
    
    const handleDownload = (dataUrl) => { 
        const file = dataUrlToFile(dataUrl, "fe-25years.png");
        const files = convertToFileList(file);

        if (isShareable() && isMobile() && files.length > 0) {
            shareImage(files);
        } else {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "fe-25years.png";
            link.click();
        }
    };

    const handleShare = (dataUrl) => {
        const file = dataUrlToFile(dataUrl, "fe-25years.png");
        const files = convertToFileList(file);

        if (isShareable() && isMobile() && files.length > 0) {
            shareImage(files);
        } else {
            window.open('https://www.facebook.com', '_blank');
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "fe-25years.png";
            link.click();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 md:gap-10 py-8 md:py-[5vh] px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full max-w-[80vw] md:max-w-[60vw]">
                <div className="overflow-hidden flex items-center justify-center w-full">
                    {avatarDataURL &&
                        <img src={avatarDataURL} alt="Avatar" className="w-[50vw] md:w-[35vh]" />
                    }
                </div>
                <div className="flex md:hidden flex-col items-center w-full space-y-4">
                    <button
                        onClick={() => handleDownload(avatarDataURL)}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.download}
                    </button>
                    <button
                        onClick={() => handleShare(avatarDataURL)}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.share}
                    </button>
                    <button
                        onClick={() => setNextPage()}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.createAnother}
                    </button>
                </div>

                <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                    {cardDataURL && 
                        <img src={cardDataURL} alt="Card" className="w-[50vw] md:w-[35vh]" />
                    }
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full max-w-[80vw] md:max-w-[60vw]">
                <div className="hidden md:flex flex-col items-center w-full space-y-4">
                    <button
                        onClick={() => handleDownload(avatarDataURL)}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.download}
                    </button>
                    <button
                        onClick={() => handleShare(avatarDataURL)}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.share}
                    </button>
                    <button
                        onClick={() => setNextPage()}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.createAnother}
                    </button>
                </div>

                <div className="flex flex-col items-center w-full space-y-4">
                    <button
                        onClick={() => handleDownload(cardDataURL)}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.download}
                    </button>
                    <button
                        onClick={() => handleShare(cardDataURL)}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.share}
                    </button>
                    <button
                        onClick={() => setNextPage()}
                        className="text-white w-full md:w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-3 md:py-4">
                        {text?.page5?.createAnother}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarResultPage;
