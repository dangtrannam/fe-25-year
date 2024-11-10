// clip.page.jsx
import HeaderComponent from "../../components/header.component";
import VideoPlayer from "./videoPlayer";

const ClipIntroductionPage = ({ currentPage, setNextPage }) => {
    const videoJsOptions = {
        controls: false,
        responsive: true,
        fluid: true,
        autoplay: true,
        muted: true,
        playsinline: true,
        sources: [{
            src: '/video/video_final.mp4',
            type: 'video/mp4'
        }]
    };

    return (
        <div className="h-screen">
            <HeaderComponent />
            <div className="flex items-center justify-center h-[calc(90vh-6rem)] relative">
                <div className="w-full aspect-video">
                    <VideoPlayer
                        options={videoJsOptions}
                        onEnded={setNextPage}
                    />
                </div>
                <button
                    onClick={setNextPage}
                    className="absolute bottom-4 right-4 bg-orange-500 hover:bg-black/75 text-white px-4 py-2 rounded-md transition-colors font-bold"
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default ClipIntroductionPage;