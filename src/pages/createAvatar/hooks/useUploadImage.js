import { useEffect } from "react";
import { isMobile } from "../../../utils";
const FRAME_SIZE = 584; // 17.5rem
const USER_WIDTH = 584; // 17.5rem

export const useUploadImage = (canvasRef, userImageRef, userImageSrc, dependencies) => {
    useEffect(() => {
        if (!canvasRef) return;

        const userImage = async () => {
            if (userImageRef.current) {
                canvasRef.remove(userImageRef.current);
                userImageRef.current = null;
            }
            if (userImageSrc) {
                const img = await new Promise((resolve) => {
                    fabric.Image.fromURL(userImageSrc, (img) => {
                        img.scale(FRAME_SIZE / img.width);
                        img.set({
                            left: 0,
                            bottom: 0,
                            lockRotation: true,
                            hasControls: !isMobile(),
                            hasBorders: false, // Ensure no borders on user image
                            shadow: 'rgba(0,0,0,0.6) 5px 5px 5px',
                            name: 'userImage',
                            lockScalingFlip: true,
                            lockSkewingX: true,
                            lockSkewingY: true,
                        });
                        resolve(img);
                    });
                });

                // Add scaling event listener to enforce uniform scaling
                img.on('scaling', function (event) {
                    const { transform } = event;
                    if (transform) {
                        const target = transform.target;
                        const scale = Math.max(target.scaleX, target.scaleY);
                        target.scaleX = scale;
                        target.scaleY = scale;
                    }
                });

                userImageRef.current = img;
                canvasRef.add(img);

                // Đảm bảo hình ảnh người dùng nằm dưới frame
                const frameImage = canvasRef.getObjects().find(obj => obj.name === 'frame');
                if (frameImage) {
                    canvasRef.sendToBack(img);
                    canvasRef.bringToFront(frameImage);
                }

                canvasRef.renderAll();
            }
        };

        userImage();
    }, [...dependencies]);
};