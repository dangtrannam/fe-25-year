import { useContext } from 'react';
import VideoPlayer from "./videoPlayer";
import LanguageContext from '../../components/LanguageContext';
import { isMobile } from '../../utils';
import { videoMobile, videoWeb } from './video.constant';

const videoUrl = isMobile() ? videoMobile : videoWeb;
const videoAspectClass = isMobile() ? 'aspect-[9/16]' : 'aspect-[16/9]';
const ClipIntroductionPage = ({ currentPage, setNextPage, play, setPlayVideo }) => {
    const { text } = useContext(LanguageContext);

    const videoJsOptions = {
        controls: false,
        responsive: true,
        fluid: true,
        autoplay: false,
        muted: false,
        playsinline: true,
        sources: [{
            src: videoUrl,
            type: 'video/mp4'
        }]
    };

    return (
        <div className="h-screen">
            <div className="flex items-center justify-center h-full relative">
                <div className={`h-full ${videoAspectClass}`}>
                    <VideoPlayer play={play} options={videoJsOptions} onEnded={setNextPage} />
                </div>
                <button
                    onClick={() => {
                        setPlayVideo(false);
                        setNextPage();
                    }}
                    className="absolute bottom-4 right-4 outline  text-white px-4 py-2 rounded-md transition-colors font-bold sm:px-3 sm:py-1 sm:text-sm"
                >
                    {text?.page3?.skip}
                </button>
            </div>
        </div>
    );
};

export default ClipIntroductionPage;
