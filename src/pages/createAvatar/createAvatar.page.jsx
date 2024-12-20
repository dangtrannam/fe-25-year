import { useContext, useEffect, useRef, useState } from 'react';
import LanguageContext from '../../components/LanguageContext';
import { isMobile } from '../../utils';
import { useCardUploadImage, useInitCanvas, useInitCardCanvas, usePinPanImage, useUploadImage } from './hooks';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fabric } from 'fabric';

const CreateAvatarPage = ({ setNextPage }) => {
    const { text, language } = useContext(LanguageContext);
    const [userImageSrc, setUserImageSrc] = useState(null);
    const [avatarCanvas, setAvatarCanvas] = useState(null);
    const userImageRef = useRef(null);
    const hammerRef = useRef(null);
    const avatarCanvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

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
        try {
            setIsLoading(true);
            exportImage(avatarCanvas, "avatarImage");
            exportImage(cardCanvas, "cardImage");
            setNextPage();
        } catch (error) {
            console.error('Error during finish:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const exportImage = (canvas, name = "avatarImage") => {
        const originalWidth = canvas.width;
        const originalHeight = canvas.height;
        const scaleFactor = isMobile()
            ? Math.max(2048 / 2.5 / originalWidth, 2048 / 2.5 / originalHeight)
            : Math.max(1080 / originalWidth, 1080 / originalHeight);

        console.log("exportImage -> scaleFactor", name, scaleFactor);


        const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1.0,
            multiplier: scaleFactor
        });

        localStorage.setItem(name, dataURL);
    };

    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleNameChange = (e) => {
        if (e.target.value.length > 26) return;
        setName(e.target.value)
    }
    const handleDateChange = (e) => setDate(e.target.value);

    const calculateFontSize = (text, baseFontSize) => {
        if (!isMobile()) return baseFontSize;
        if (text.length > 20) return baseFontSize * 0.45;
        if (text.length > 18) return baseFontSize * 0.6;
        if (text.length > 14) return baseFontSize * 0.7;
        if (text.length > 11) return baseFontSize * 0.85;
        return baseFontSize;
    };

    const renderTextOnCanvas = () => {
        if (!cardCanvas) return;
        const PIXEL_RATIO = 2;
        const fontSizeHoursText = isMobile() ? 14 * PIXEL_RATIO : 24 * PIXEL_RATIO; // Smaller font size for mobile

        if (name) {
            const existingText = cardCanvas.getObjects().filter(obj => obj.name === 'nameText');
            if (existingText.length > 0) existingText.forEach(obj => cardCanvas.remove(obj));

            const baseFontSize = 16 * PIXEL_RATIO;
            const fontSize = calculateFontSize(name, baseFontSize);

            const nameText = new fabric.Textbox(name, {
                left: cardCanvas.width / 1.5,
                top: cardCanvas.height / 1.76,
                fontSize: fontSize,
                fontFamily: 'SVN Gilroy Bold',
                fill: '#ffffff',
                textAlign: 'left',
                originX: 'center',
                originY: 'center',
                lineHeight: 1,
                fontWeight: 'bold',
                fontStyle: 'italic',
                name: 'nameText',
                width: cardCanvas.width / 1.5,
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
            const fullText = `${hours} ${language === 'en' ? 'hours' : 'giờ'}
            `;

            const hoursText = new fabric.Textbox(fullText, {
                left: cardCanvas.width / 1.85,
                top: cardCanvas.height / 1.40,
                fontSize: fontSizeHoursText, // Responsive font size
                fontFamily: 'SVN Gilroy Bold',
                fill: '#ffffff',
                textAlign: 'center',
                originX: 'center',
                originY: 'center',
                lineHeight: 1,
                fontWeight: 'bold',
                fontStyle: 'italic',
                name: 'hoursText',
                width: cardCanvas.width / 1.6,
                selectable: false,
            });

            hoursText.set({
                shadow: {
                    color: 'rgba(0, 0, 0, 0.5)',
                    blur: 10,
                    offsetX: -5,
                    offsetY: -5
                }
            });
            // Highlight the word "hours" or "giờ" in the text
            const boldStartIndex = fullText.indexOf(
                language === 'en' ? 'hours' : 'giờ'
            );
            const boldEndIndex = boldStartIndex + (
                language === 'en' ? 'hours' : 'giờ'
            ).length;
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
    }


    useEffect(() => {
        renderTextOnCanvas();
    }, [name, date, cardCanvas]);

    return (
        <div className="flex flex-col xl:flex-row justify-center items-center p-4 md:p-0">
            <div className="p-6 flex flex-col items-center w-full  md:max-w-[584px]">
                <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                    <canvas ref={avatarCanvasRef} id="avatarCanvas" />
                </div>
                <div className="mt-4 text-center w-full">
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2">
                        <label className="flex items-center w-full cursor-pointer justify-between text-[20px]">
                            <span className="mr-2 font-unbounded font-light">{text?.page4?.upload}</span>
                            <svg
                                className="cursor-pointer w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
                                <title>Upload</title>
                            </svg>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="flex items-center mt-2 text-white border-b border-white w-full px-2">
                        <input
                            type="text"
                            placeholder={text?.page4?.namePlaceholder}
                            className="bg-transparent font-light outline-none text-white w-full placeholder-white placeholder:text-[20px] font-unbounded pr-10"
                            onChange={handleNameChange}
                        />
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="min-w-[32px]"
                        >
                            <path d="M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8 1.79-8 4v2h16v-2c0-2.21-3.59-4-8-4z" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center mt-2 justify-between ">
                        <div className='flex flex-row justify-between text-white border-b border-white w-full px-2 cursor-pointer'>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                placeholderText={text?.page4?.datePlaceholder || "Select a date"}
                                dateFormat="yyyy/MM/dd"
                                minDate={new Date(1999, 0, 1)}
                                maxDate={new Date()}
                                className="bg-transparent outline-none text-white w-full placeholder-white placeholder:text-[19px] font-unbounded font-light"
                            />
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="min-w-[32px]"
                            >
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                            </svg>
                        </div>
                        <div className='text-left text-sm w-full text-white font-unbounded font-light p-2'>yyyy/mm/dd</div>
                    </div>
                    <button
                        onClick={handleFinish}
                        disabled={isLoading}
                        className={`font-unbounded font-light justify-center hidden xl:flex mt-6 px-4 py-2 w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full text-[20px] md:text-[24px] ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </div>
                        ) : (
                            text?.page4?.finish
                        )}
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center w-full md:w-auto p-4 md:p-6">
                <div className="flex flex-col items-center w-full max-w-[509px]">
                    <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                        <canvas ref={cardCanvasRef} id="cardCanvasRef" />
                    </div>
                </div>
            </div>
            <button
                onClick={handleFinish}
                disabled={isLoading}
                className={`font-unbounded font-light justify-center flex xl:hidden mt-6 px-4 py-2 w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full text-[20px] md:text-[24px] md:max-w-[584px] mb-5 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
            >
                {isLoading ? (
                    <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </div>
                ) : (
                    text?.page4?.finish
                )}
            </button>
        </div>
    );
};

export default CreateAvatarPage;
