import { useEffect, useRef } from 'react';
import { isMobile } from '../../../utils';
export const usePinPanImage = (canvas, userImageRef, hammerRef, dependencies) => {
    useEffect(() => {
        if (!hammerRef.current && canvas && isMobile()) {
            const canvasElement = canvas.upperCanvasEl;
            const mc = new Hammer.Manager(canvasElement);

            const pinch = new Hammer.Pinch();
            const pan = new Hammer.Pan();

            pinch.recognizeWith(pan);

            mc.add([pinch, pan]);


            let initialScale = 1;
            let initialDeltaX = 0;
            let initialDeltaY = 0;

            mc.on('pinchstart', () => {
                if (userImageRef.current) {
                    initialScale = userImageRef.current.scaleX;
                }
            });

            mc.on('pinchmove', (e) => {
                if (userImageRef.current) {
                    userImageRef.current.scale(initialScale * e.scale);
                    canvas.renderAll();
                }
            });

            mc.on('panstart', () => {
                if (userImageRef.current) {
                    initialDeltaX = userImageRef.current.left;
                    initialDeltaY = userImageRef.current.top;
                }
            });

            mc.on('panmove', (e) => {
                if (userImageRef.current) {
                    userImageRef.current.set({
                        left: initialDeltaX + e.deltaX,
                        top: initialDeltaY + e.deltaY,
                    });
                    canvas.renderAll();
                }
            });

            hammerRef.current = mc;
            console.log(hammerRef.current)
        }

        return () => {
            if (hammerRef.current) {
                hammerRef.current.destroy();
                hammerRef.current = null;
            }
        };
    }, [...dependencies]);
}