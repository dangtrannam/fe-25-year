import { fabric } from 'fabric';
import { useEffect } from "react";
const FRAME_SIZE = 17.5 * 16; // 17.5rem
const USER_WIDTH = 17.5 * 16; // 17.5rem

const frameEng = "/images/avatar/ENG-FRAMEAVA.png"
const frameVi = "/images/avatar/VIET-FRAMEAVA.png"

export const useInitCanvas = (canvasRef, setCanvas, language) => {
    useEffect(() => {
        const initCanvas = new fabric.Canvas(canvasRef.current, {
            width: FRAME_SIZE,
            height: FRAME_SIZE,
            preserveObjectStacking: true,
        });

        // Add border radius
        const clipPath = new fabric.Rect({
            width: FRAME_SIZE,
            height: FRAME_SIZE,
            rx: 24,
            ry: 24,
            absolutePositioned: true,
        });

        initCanvas.clipPath = clipPath;

        setCanvas(initCanvas);

        const loadFrameImage = async () => {
            const frameImage = await new Promise((resolve) => {
                fabric.Image.fromURL(
                    language === 'vi' ? frameVi : frameEng, (img) => {
                    img.scaleToWidth(FRAME_SIZE);
                    img.scaleToHeight(FRAME_SIZE);
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
                initCanvas.dispose(); // Dispose of the Fabric.js canvas
            }
        };
    }, [language]);
};

const CARD_FRAME_WIDTH = 500;
const ratio = 500 / 900;
const CARD_FRAME_HEIGHT = 900 * ratio;
const cardVI = "/images/card/ecardviet.png";
const cardEN = "/images/card/ecardeng.png";
export const useInitCardCanvas = (canvasRef, setCanvas, language) => {
    useEffect(() => {
        const initCanvas = new fabric.Canvas(canvasRef.current, {
            width: CARD_FRAME_WIDTH,
            height: 900,
            preserveObjectStacking: true,
        });

        // Add border radius
        const clipPath = new fabric.Rect({
            width: CARD_FRAME_WIDTH,
            height: 900,
            rx: 24,
            ry: 24,
            absolutePositioned: true,
        });

        initCanvas.clipPath = clipPath;

        setCanvas(initCanvas);

        const loadFrameImage = async () => {
            const frameImage = await new Promise((resolve) => {
                fabric.Image.fromURL(
                    language === 'vi' ? cardVI : cardEN
                    , (img) => {
                    img.scaleToWidth(CARD_FRAME_WIDTH);
                    img.scaleToHeight(900);
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
                initCanvas.dispose(); // Dispose of the Fabric.js canvas
            }
        };
    }, [language]);
};