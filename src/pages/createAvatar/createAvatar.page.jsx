import React, { useState, useRef, useEffect } from 'react';
import { useUploadImage, useCardUploadImage, useInitCanvas, useInitCardCanvas , usePinPanImage } from './hooks';
import { isMobile, dataUrlToFile, convertToFileList, shareImage, isShareable } from '../../utils';

const CreateAvatarPage = ({ setNextPage }) => {
    const [userImageSrc, setUserImageSrc] = useState(null);
    const [avatarCanvas, setAvatarCanvas] = useState(null);
    const userImageRef = useRef(null);
    const hammerRef = useRef(null);

    const avatarCanvasRef = useRef(null);

    useInitCanvas(avatarCanvasRef, setAvatarCanvas);
    useUploadImage(avatarCanvas, userImageRef, userImageSrc, [userImageSrc, avatarCanvasRef]);
    usePinPanImage(avatarCanvas, userImageRef, hammerRef, [userImageSrc, avatarCanvas]);
    
    const cardCanvasRef = useRef(null);
    const [cardCanvas, setCardCanvas] = useState(null);
    const cardUserImageRef = useRef(null);
    const cardHammerRef = useRef(null);

    useInitCardCanvas(cardCanvasRef, setCardCanvas);
    useCardUploadImage(cardCanvas, cardUserImageRef, userImageSrc, [userImageSrc, cardCanvasRef]);
    usePinPanImage(cardCanvas, cardUserImageRef, cardHammerRef, [userImageSrc, cardCanvas]);

    const handleImageUpload = (event) => {
        console.log("handleImageUpload");
        const file = event.target.files[0];
        if (file) {
            setUserImageSrc(URL.createObjectURL(file));
        }
    };

    const handleFinish = () => {
        exportImage(avatarCanvas, "avatarImage");
        exportImage(cardCanvas, "cardImage");
        setNextPage();
    };

    const exportImage = (canvas, name = "avatarImage") => {
        // Save the original canvas dimensions
        const originalWidth = canvas.width;
        const originalHeight = canvas.height;

        // Calculate the scale factor
        let scaleFactor;
        if (isMobile()) {
            scaleFactor = Math.max(2048 / originalWidth, 2048 / originalHeight);
        } else {
            scaleFactor = Math.max(1080 / originalWidth, 1080 / originalHeight);
        }

        const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1.0, // Maximum quality
            multiplier: scaleFactor // Adjust the resolution without resizing the canvas
        });

        
        localStorage.setItem(name, dataURL);
    }

    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const renderTextOnCanvas = () => {
        if (!cardCanvas) return;
        const PIXEL_RATIO = 2;
        if (name) {
            const existingText = cardCanvas.getObjects().filter(obj => obj.name === 'nameText');
        
            if (existingText.length > 0) existingText.forEach(obj => cardCanvas.remove(obj));
            
            const nameText = new fabric.Textbox(name, {
                left: cardCanvas.width / 1.70,
                top: cardCanvas.height / 1.76,
                fontSize: 16 * PIXEL_RATIO,
                fontFamily: 'Inter', // TODO: Change to SVN Gilroy font
                fill: '#ffffff',
                textAlign: 'left',
                originX: 'center',
                originY: 'center',
                lineHeight: 1,
                fontWeight: 'bold',
                fontStyle: 'italic',
                name: 'nameText',
                width: cardCanvas.width / 2,
                selectable: false,
            });

            cardCanvas.add(nameText);
            cardCanvas.bringToFront(nameText);
        }

        if (date) {
            const existingHours = cardCanvas.getObjects().filter(obj => obj.name === 'hoursText');
        
            if (existingHours.length > 0) existingHours.forEach(obj => cardCanvas.remove(obj));
    
            const selectedDate = new Date(date);
            const now = new Date();
            const diffInMs = now - selectedDate;
            const hours = Math.floor(diffInMs / (1000 * 60 * 60));
            const fullText = `${hours} hours`;
    
            const hoursText = new fabric.Textbox(fullText, {
                left: cardCanvas.width / 2,
                top: cardCanvas.height / 1.45,
                fontSize: 24 * PIXEL_RATIO,
                fontFamily: 'Inter', // TODO: Change to SVN Gilroy font
                fill: '#ffffff',
                textAlign: 'center',
                originX: 'center',
                originY: 'center',
                lineHeight: 1,
                fontWeight: 'bold',
                name: 'hoursText',
                width: cardCanvas.width / 2,
                selectable: false,
            });

            const boldStartIndex = fullText.indexOf("hours");
            const boldEndIndex = boldStartIndex + "hours".length;

            hoursText.setSelectionStyles(
                {
                    fontStyle: 'italic',
                },
                boldStartIndex,
                boldEndIndex
            );
    
            cardCanvas.add(hoursText);
            cardCanvas.bringToFront(hoursText);
        }
        

        
        cardCanvas.renderAll();
        console.log("renderTextOnCanvas");
        
    }

    useEffect(() => {
        renderTextOnCanvas();
    
    }, [name, date, cardCanvas])
    

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 flex flex-col items-center w-[584px]">
                <div className="overflow-hidden flex items-center justify-center rounded-[23px]">
                    <canvas ref={avatarCanvasRef} className={``} id='avatarCanvas' />
                </div>
                <div className="mt-4 text-center">
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2">
                        <label className="flex items-center w-full cursor-pointer justify-between text-[24px]">
                            <span className="mr-2">Upload ảnh</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 20h14v-2H5v2zm7-18l-5 5h3v4h4v-4h3l-5-5zM5 16h14v-2H5v2z" />
                            </svg>
                            <input
                                type="file"
                                onChange={(event) => {
                                    console.log("onChange");

                                    handleImageUpload(event);
                                }}
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2">
                        <input
                            type="text"
                            placeholder="Tên của bạn"
                            className="bg-transparent outline-none text-white w-full placeholder-white text-[24px]"
                            onChange={handleNameChange}
                        />
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
                        </svg>
                    </div>
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2 text-[24px]  ">
                        <input
                            type="date"
                            icon={null}
                            placeholder="Ngày gia nhập"
                            min={"1999-01-01"}
                            max={new Date().toISOString().split("T")[0]}
                            className="bg-transparent outline-none text-white w-full placeholder-white"
                            onChange={handleDateChange}
                        />
                        {/* <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2c5.52 0 10 4  .48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 10h-5v2h7V7h-2v5z" />
                        </svg> */}
                    </div>
                    <button
                        onClick={handleFinish}
                        className="mt-6 px-4 py-2 w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full"
                    >
                        Hoàn thành
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="p-6 flex flex-col items-center w-[509px]">
                    <div className="overflow-hidden flex items-center justify-center rounded-[23px]">
                        <canvas ref={cardCanvasRef} className={``} id='cardCanvasRef' />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CreateAvatarPage;