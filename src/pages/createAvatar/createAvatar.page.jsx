import React, { useState, useRef } from 'react';
import { useUploadImage, useInitCanvas } from './hooks';

const CreateAvatarPage = ({ setNextPage }) => {
    const [userImageSrc, setUserImageSrc] = useState(null);
    const userImageRef = useRef(null);
    const [avatarCanvas, setAvatarCanvas] = useState(null);

    const avatarCanvasRef = useRef(null);

    useInitCanvas(avatarCanvasRef, setAvatarCanvas);
    useUploadImage(avatarCanvasRef, userImageRef, [userImageSrc, avatarCanvasRef]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center h-screen p-4">
            <div className="w-full md:w-80 p-6 bg-white bg-opacity-10 rounded-xl shadow-lg flex flex-col items-center mb-6 md:mb-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                    <canvas ref={avatarCanvasRef} id="avatarCanvas" className="w-full h-full" />
                </div>
                <div className="mt-4 text-center w-full">
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2">
                        <label className="flex items-center w-full cursor-pointer justify-between">
                            <span className="mr-2">Upload Ảnh</span>
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
                            placeholder="Tên Của Bạn"
                            className="bg-transparent outline-none text-white w-full placeholder-white"
                        />
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
                        </svg>
                    </div>
                    <div className="flex justify-center items-center mt-2 text-white border-b border-white w-full px-2">
                        <input
                            type="text"
                            placeholder="Ngày làm việc"
                            className="bg-transparent outline-none text-white w-full placeholder-white"
                        />
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 10h-5v2h7V7h-2v5z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="md:w-80 p-6 bg-white bg-opacity-10 rounded-xl shadow-lg flex flex-col items-center md:ml-8">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-200 overflow-hidden">
                    {userImageSrc ? (
                        <img src={userImageSrc} alt="User Image" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-500">No Image</span>
                    )}
                </div>
                <button
                    onClick={setNextPage}
                    className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full"
                >
                    Pick Your Ecard
                </button>
            </div>
        </div>
    );
};

export default CreateAvatarPage;
