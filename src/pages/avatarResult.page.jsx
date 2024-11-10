import React, { useRef, useState } from 'react';
import { useInitCanvas } from './createAvatar/hooks';

const AvatarResultPage = ({ setNextPage }) => {
    const [avatarCanvas, setAvatarCanvas] = useState(null);
    const avatarCanvasRef = useRef(null);

    useInitCanvas(avatarCanvasRef, setAvatarCanvas);

    return (
        <div className="flex container items-center h-screen mx-auto justify-center space-x-40">
            {/* Avatar Section */}
            <div className="p-9 flex flex-col items-center w-auto mt-56">
                <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                    <canvas ref={avatarCanvasRef} id="avatarCanvas" className="w-full h-full" />
                </div>
                <div className="mt-4 text-center space-y-4 w-full">
                    <div className="flex justify-center mt-2">
                        <button className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            Lưu về máy
                        </button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => setNextPage()}
                            className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            Tạo ảnh khác
                        </button>
                    </div>
                </div>
            </div>

            {/* E-Card Section */}
            <div className="p-6 flex flex-col items-center w-[320px]">
                <div className="overflow-hidden flex items-center justify-center rounded-[23px] w-full">
                    <img src="/images/card/ecardviet.png" alt="E-Card" className="w-full h-auto rounded-lg" />
                </div>
                <div className="mt-4 text-center space-y-4 w-full">
                    <div className="flex justify-center mt-2">
                        <button className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            Lưu về máy
                        </button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => setNextPage()}
                            className="text-white w-full max-w-[200px] bg-gradient-to-r from-[#5950C5] to-[#DF885B] border-2 border-white rounded-full hover:opacity-90 transition-opacity py-4">
                            Tạo ảnh khác
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarResultPage;
