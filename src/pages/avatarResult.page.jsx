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
            const newAvatarDataURL = localStorage.getItem("avatarImage");
            setAvatarDataURL(newAvatarDataURL);

            const newCardDataURL = localStorage.getItem("cardImage");
            setCardDataURL(newCardDataURL);
        };

        window.addEventListener("storage", handleStorageChange);

        const intervalId = setInterval(() => {
            const currentAvatarDataURL = localStorage.getItem("avatarImage");
            setAvatarDataURL(currentAvatarDataURL);

            const currentCardDataURL = localStorage.getItem("cardImage");
            setCardDataURL(currentCardDataURL);
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
        <div className="flex flex-col items-center justify-center gap-10 py-[5vh]">
            <div className='flex flex-row items-center gap-40'>
                <div className="overflow-hidden flex items-center justify-center w-full">
                    {avatarDataURL &&
                        <img src={avatarDataURL} alt="Avatar" className="w-[35vh]" />
                    }
                </div>
                <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                    {cardDataURL && 
                        <img src={cardDataURL} alt="Card" className="w-[35vh]" />
                    }
                </div>
            </div>
            
            <div className='flex flex-row items-center justify-center gap-40'>
                <div className="flex flex-col items-center w-full">
                    <div className="mt-2 w-full">
                        <button onClick={() => handleDownload(avatarDataURL)} className="text-white w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            {text?.page5?.download}
                        </button>
                    </div>
                    <div className="mt-2 w-full">
                        <button
                            onClick={() => handleShare(avatarDataURL)}
                            className="text-white w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            {text?.page5?.share}
                        </button>
                    </div>
                    <div className="mt-2 w-full">
                        <button
                            onClick={() => setNextPage()}
                            className="text-white w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            {text?.page5?.createAnother}
                        </button>
                    </div>
                </div>

                <div className="text-center space-y-4 w-full">
                    <div className="mt-2 w-full">
                        <button onClick={() => handleDownload(cardDataURL)}
                            className="text-white w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            {text?.page5?.download}
                        </button>
                    </div>
                    <div className="mt-2 w-full">
                        <button
                            onClick={() => handleShare(cardDataURL)}
                            className="text-white w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            {text?.page5?.share}
                        </button>
                    </div>
                    <div className="mt-2 w-full">
                        <button
                            onClick={() => setNextPage()}
                            className="text-white w-[35vh] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            {text?.page5?.createAnother}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarResultPage;
