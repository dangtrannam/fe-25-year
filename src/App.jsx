// App.js
import './index.css';
import 'video.js/dist/video-js.css';
import { useState } from "react";
import StartPage from './pages/start.page';
import AvatarResultPage from './pages/avatarResult.page';
import CreateAvatarPage from './pages/createAvatar/createAvatar.page';
import BackgroundVideo from './components/background.component';
import IntroductionPage from './pages/introduction/introduction.page';
import ClipIntroductionPage from "./pages/clip/clip.page.jsx";
import { LanguageProvider } from './components/LanguageContext.jsx';
import { videoBackground } from './pages/clip/video.constant.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [playVideo, setPlayVideo] = useState(false);

  const getClassName = (page) => {
    return `transition-opacity duration-700 ease-in-out absolute inset-0 ${currentPage === page ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`;
  }

  return (
    <LanguageProvider>
      <div className="relative overflow-hidden w-screen min-h-screen">
        <BackgroundVideo src={videoBackground} />
        <div className={getClassName(1)}>
          <StartPage setNextPage={() => setCurrentPage(2)} />
        </div>
        <div className={getClassName(2)}>
          <IntroductionPage currentPage={currentPage} setNextPage={() => {
            setCurrentPage(3);
            setPlayVideo(true);
          }} />
        </div>
        <div className={getClassName(3)}>
          <ClipIntroductionPage currentPage={currentPage} setNextPage={() => setCurrentPage(4)} play={playVideo} setPlayVideo={setPlayVideo} />
        </div>
        <div className={`${getClassName(4)} overflow-y-scroll md:overflow-y-hidden`}>
          <CreateAvatarPage setNextPage={() => setCurrentPage(5)} />
        </div>
        <div className={`${getClassName(5)} overflow-y-scroll md:overflow-y-hidden`}>
          <AvatarResultPage setNextPage={() => setCurrentPage(4)} />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
