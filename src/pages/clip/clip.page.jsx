// clip.page.jsx
import HeaderComponent from "../../components/header.component";
import VideoPlayer from "./videoPlayer";

const ClipIntroductionPage = ({ setNextPage }) => {
    const videoJsOptions = {
        controls: false, // Hide controls since we want autoplay
        responsive: true,
        fluid: true,
        autoplay: true,
        muted: true,
        playsinline: true,
        sources: [{
            src: '/video/video-example.mp4',
            type: 'video/mp4'
        }]
    };

    return (
        <div className="h-screen">
            <HeaderComponent />
            <div className="flex items-center justify-center h-[calc(90vh-6rem)]">
                <div className="w-full aspect-video">
                    <VideoPlayer
                        options={videoJsOptions}
                        onEnded={setNextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClipIntroductionPage;