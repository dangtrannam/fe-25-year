import { fabric } from 'fabric';
import { useEffect } from "react";

const FRAME_SIZE_BASE = 17.5 * 16; // Base size, will be adjusted based on screen
const USER_WIDTH_BASE = 17.5 * 16; // Base size

const frameEng = "/images/avatar/ENG-FRAMEAVA.png";
const frameVi = "/images/avatar/VIET-FRAMEAVA.png";

export const useInitCanvas = (canvasRef, setCanvas, language) => {
    useEffect(() => {
        // Responsive frame size
        const frameSize = window.innerWidth < 768 ? window.innerWidth * 0.8 : FRAME_SIZE_BASE;

        const initCanvas = new fabric.Canvas(canvasRef.current, {
            width: frameSize,
            height: frameSize,
            preserveObjectStacking: true,
        });

        // Add border radius for rounded corners
        const clipPath = new fabric.Rect({
            width: frameSize,
            height: frameSize,
            rx: 24,
            ry: 24,
            absolutePositioned: true,
        });

        initCanvas.clipPath = clipPath;
        setCanvas(initCanvas);

        const loadFrameImage = async () => {
            const frameImage = await new Promise((resolve) => {
                fabric.Image.fromURL(language === 'vi' ? frameVi : frameEng, (img) => {
                    img.scaleToWidth(frameSize);
                    img.scaleToHeight(frameSize);
                    img.set({
                        selectable: false,
                        evented: false,
                        name: 'frame',
                    });
                    resolve(img);
                });
            });

            initCanvas.add(frameImage);
            initCanvas.sendToBack(frameImage);
            initCanvas.renderAll();
        };

        loadFrameImage();

        // Cleanup function
        return () => {
            if (initCanvas) {
                initCanvas.getObjects()?.forEach(obj => {
                    initCanvas.remove(obj);
                    obj.dispose();
                });
                initCanvas.dispose();
            }
        };
    }, [language]);
};

const CARD_FRAME_BASE_WIDTH = 500;
const CARD_FRAME_BASE_HEIGHT = 900;
const cardVI = "/images/card/ecardviet.png";
const cardEN = "/images/card/ecardeng.png";

export const useInitCardCanvas = (canvasRef, setCanvas, language) => {
    useEffect(() => {
        // Responsive card size
        const cardFrameWidth = window.innerWidth < 768 ? window.innerWidth * 0.8 : CARD_FRAME_BASE_WIDTH;
        const cardFrameHeight = (CARD_FRAME_BASE_HEIGHT / CARD_FRAME_BASE_WIDTH) * cardFrameWidth;

        const initCanvas = new fabric.Canvas(canvasRef.current, {
            width: cardFrameWidth,
            height: cardFrameHeight,
            preserveObjectStacking: true,
        });

        // Add border radius
        const clipPath = new fabric.Rect({
            width: cardFrameWidth,
            height: cardFrameHeight,
            rx: 24,
            ry: 24,
            absolutePositioned: true,
        });

        initCanvas.clipPath = clipPath;
        setCanvas(initCanvas);

        const loadFrameImage = async () => {
            const frameImage = await new Promise((resolve) => {
                fabric.Image.fromURL(language === 'vi' ? cardVI : cardEN, (img) => {
                    img.scaleToWidth(cardFrameWidth);
                    img.scaleToHeight(cardFrameHeight);
                    img.set({
                        selectable: false,
                        evented: false,
                        name: 'cardframe',
                    });
                    resolve(img);
                });
            });

            initCanvas.add(frameImage);
            initCanvas.sendToBack(frameImage);
            initCanvas.renderAll();
        };

        loadFrameImage();

        // Cleanup function
        return () => {
            if (initCanvas) {
                initCanvas.getObjects()?.forEach(obj => {
                    initCanvas.remove(obj);
                    obj.dispose();
                });
                initCanvas.dispose();
            }
        };
    }, [language]);
};
