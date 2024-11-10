import React, { useRef, useState, useEffect } from 'react';
import { isMobile, dataUrlToFile, convertToFileList, shareImage, isShareable } from '../utils';


const AvatarResultPage = ({ setNextPage }) => {
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

        // Polling to detect localStorage changes in the same window
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
        // Convert data URL to file
        const file = dataUrlToFile(dataUrl, "fe-25years.png");
        const files = convertToFileList(file);

        if (isShareable() && isMobile() && files.length > 0) {
            shareImage(files);
        } else {
            // Create a link to download the image if sharing is not supported
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "fe-25years.png";
            link.click();
        }
    }

    const handleShare = (dataUrl) => {
        // Convert data URL to file
        const file = dataUrlToFile(dataUrl, "fe-25years.png");
        const files = convertToFileList(file);

        if (isShareable() && isMobile() && files.length > 0) {
            shareImage(files);
        } else {
            window.open('https://www.facebook.com', '_blank');
            // Create a link to download the image if sharing is not supported
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "fe-25years.png";
            link.click();
        }
    }

    return (
        <div className="flex container items-start h-screen mx-auto justify-center space-x-40 mt-[10vh]">
            <div className=''></div>
            {/* Avatar Section */}
            <div className="p-9 flex flex-col items-center w-auto">
                <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                    {avatarDataURL &&
                        <img src={avatarDataURL} alt="Avatar" className="w-[40vh]" />
                    }
                </div>
                <div className="mt-4 text-center space-y-4 w-full">
                    <div className="flex justify-center mt-2">
                        <button onClick={() => handleDownload(avatarDataURL)} className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            TẢI VỀ
                        </button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => handleShare(avatarDataURL)}
                            className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            KHOE NGAY
                        </button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => setNextPage()}
                            className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            TẠO ẢNH KHÁC
                        </button>
                    </div>
                </div>
            </div>

            {/* E-Card Section */}
            <div className="p-6 flex flex-col items-center w-[40vh]">
                <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                    {cardDataURL && 
                        <img src={cardDataURL} alt="Card" />
                    }
                </div>
                <div className="mt-4 text-center space-y-4 w-full">
                    <div className="flex justify-center mt-2">
                        <button onClick={() => handleDownload(cardDataURL)}
                            className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            TẢI VỀ
                        </button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => handleShare(cardDataURL)}
                            className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            KHOE NGAY
                        </button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => setNextPage()}
                            className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            TẠO ẢNH KHÁC
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarResultPage;
