import { useContext, useEffect, useRef, useState } from 'react';
import LanguageContext from '../../components/LanguageContext';
import { isMobile } from '../../utils';
import { useCardUploadImage, useInitCanvas, useInitCardCanvas, usePinPanImage, useUploadImage } from './hooks';

const CreateAvatarPage = ({ setNextPage }) => {
    const { text, language } = useContext(LanguageContext);
    const [userImageSrc, setUserImageSrc] = useState(null);
    const [avatarCanvas, setAvatarCanvas] = useState(null);
    const userImageRef = useRef(null);
    const hammerRef = useRef(null);
    const avatarCanvasRef = useRef(null);

    useInitCanvas(avatarCanvasRef, setAvatarCanvas, language);
    useUploadImage(avatarCanvas, userImageRef, userImageSrc, [userImageSrc, avatarCanvasRef]);
    usePinPanImage(avatarCanvas, userImageRef, hammerRef, [userImageSrc, avatarCanvas]);
    
    const cardCanvasRef = useRef(null);
    const [cardCanvas, setCardCanvas] = useState(null);
    const cardUserImageRef = useRef(null);
    const cardHammerRef = useRef(null);

    useInitCardCanvas(cardCanvasRef, setCardCanvas, language);
    useCardUploadImage(cardCanvas, cardUserImageRef, userImageSrc, [userImageSrc, cardCanvasRef]);
    usePinPanImage(cardCanvas, cardUserImageRef, cardHammerRef, [userImageSrc, cardCanvas]);

    const handleImageUpload = (event) => {
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
        const originalWidth = canvas.width;
        const originalHeight = canvas.height;
        const scaleFactor = isMobile()
            ? Math.max(2048 / originalWidth, 2048 / originalHeight)
            : Math.max(1080 / originalWidth, 1080 / originalHeight);

        const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1.0,
            multiplier: scaleFactor
        });

        localStorage.setItem(name, dataURL);
    };

    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleDateChange = (e) => setDate(e.target.value);

    const renderTextOnCanvas = () => {
        if (!cardCanvas) return;
        const PIXEL_RATIO = 2;
        const fontSizeHoursText = isMobile() ? 14 * PIXEL_RATIO : 24 * PIXEL_RATIO; // Smaller font size for mobile
    
        if (name) {
            const existingText = cardCanvas.getObjects().filter(obj => obj.name === 'nameText');
            if (existingText.length > 0) existingText.forEach(obj => cardCanvas.remove(obj));
            
            const nameText = new fabric.Textbox(name, {
                left: cardCanvas.width / 1.70,
                top: cardCanvas.height / 1.76,
                fontSize: 16 * PIXEL_RATIO,
                fontFamily: 'Inter', 
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
                fontSize: fontSizeHoursText, // Responsive font size
                fontFamily: 'Inter',
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
    
            hoursText.set({
                shadow: {
                    color: 'rgba(89, 80, 197, 0.5)',
                    blur: 10,
                    offsetX: -5,
                    offsetY: -5
                }
            });
    
            cardCanvas.add(hoursText);
            cardCanvas.bringToFront(hoursText);
        }
    
        cardCanvas.renderAll();
    }
    

    useEffect(() => {
        renderTextOnCanvas();
    }, [name, date, cardCanvas]);

    return (
        <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-0">
            <div className="p-6 flex flex-col items-center w-full  md:max-w-[584px]">
                <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                    <canvas ref={avatarCanvasRef} id="avatarCanvas" />
                </div>
                <div className="mt-4 text-center w-full">
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2">
                        <label className="flex items-center w-full cursor-pointer justify-between text-[20px] md:text-[24px]">
                            <span className="mr-2">{text?.page4?.upload}</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 20h14v-2H5v2zm7-18l-5 5h3v4h4v-4h3l-5-5zM5 16h14v-2H5v2z" />
                            </svg>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2">
                        <input
                            type="text"
                            placeholder={text?.page4?.namePlaceholder}
                            className="bg-transparent outline-none text-white w-full placeholder-white text-[20px] md:text-[24px]"
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2 text-[20px] md:text-[24px]">
                        <input
                            type="date"
                            placeholder={text?.page4?.datePlaceholder}
                            min="1999-01-01"
                            max={new Date().toISOString().split("T")[0]}
                            className="bg-transparent outline-none text-white w-full placeholder-white"
                            onChange={handleDateChange}
                        />
                    </div>
                    {
                        !isMobile() && (
                            <button
                                onClick={handleFinish}
                                className="mt-6 px-4 py-2 w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full text-[20px] md:text-[24px]"
                            >
                                {text?.page4?.finish}
                            </button>
                        )
                    }
                </div>
            </div>

            <div className="flex flex-col items-center w-full md:w-auto p-4 md:p-6">
                <div className="flex flex-col items-center w-full max-w-[509px]">
                    <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                        <canvas ref={cardCanvasRef} id="cardCanvasRef" />
                    </div>
                </div>
            </div>
            {
                        isMobile() && (
                            <button
                                onClick={handleFinish}
                                className="mt-6 px-4 py-2 w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full text-[20px] md:text-[24px]"
                            >
                                {text?.page4?.finish}
                            </button>
                        )
                    }
        </div>
    );
};

export default CreateAvatarPage;
