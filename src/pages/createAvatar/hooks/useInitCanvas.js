import { useEffect } from "react";
import { fabric } from 'fabric';
import { isMobile } from "../../../utils";
const FRAME_SIZE = 17.5 * 16; // 17.5rem
const USER_WIDTH = 17.5 * 16; // 17.5rem

const frame = "/images/frame-avatar-25.png"

export const useInitCanvas = (canvasRef, setCanvas) => {
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
                fabric.Image.fromURL(frame, (img) => {
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
    }, []);
};

const CARD_FRAME_WIDTH = 500;
const ratio = 500 / 900;
const CARD_FRAME_HEIGHT = 900 * ratio;
const card = "/images/card/ecardviet.png";
export const useInitCardCanvas = (canvasRef, setCanvas) => {
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
                fabric.Image.fromURL(card, (img) => {
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
    }, []);
};