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
            // centeredScaling: true,
            preserveObjectStacking: true,
        });

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