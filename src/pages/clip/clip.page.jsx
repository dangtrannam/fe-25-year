import { useContext } from 'react';
import VideoPlayer from "./videoPlayer";
import LanguageContext from '../../components/LanguageContext';

const ClipIntroductionPage = ({ currentPage, setNextPage }) => {
    const { text } = useContext(LanguageContext);

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
            <div className="flex items-center justify-center h-full relative">
                <div className="w-full aspect-video">
                    <VideoPlayer options={videoJsOptions} onEnded={setNextPage} />
                </div>
                <button
                    onClick={setNextPage}
                    className="absolute bottom-4 right-4 outline  text-white px-4 py-2 rounded-md transition-colors font-bold sm:px-3 sm:py-1 sm:text-sm"
                >
                    {text?.page3?.skip}
                </button>
            </div>
        </div>
    );
};

export default ClipIntroductionPage;
