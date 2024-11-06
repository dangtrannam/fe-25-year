import './index.css';
import { useState } from "react";
import StartPage from './pages/start.page';
import IntroductionPage from './pages/introduction.page';
import ClipIntroductionPage from './pages/clip.page';
import AvatarResultPage from './pages/avatarResult.page';
import CreateAvatarPage from './pages/createAvatar.page';
import BackgroundVideo from './components/background.component';


function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to return class names for transition
  const getClassName = (page) => {
    return `transition-opacity duration-700 ease-in-out absolute inset-0 ${currentPage === page ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`;
  }

  return (
    <div className="relative">
      <BackgroundVideo src="../public/video/background.webm" />

      <div className={getClassName(1)}>
        <StartPage setNextPage={() => setCurrentPage(2)} />
      </div>
      <div className={getClassName(2)}>
        <IntroductionPage setNextPage={() => setCurrentPage(3)} />
      </div>
      <div className={getClassName(3)}>
        <ClipIntroductionPage setNextPage={() => setCurrentPage(4)} />
      </div>
      <div className={getClassName(4)}>
        <CreateAvatarPage setNextPage={() => setCurrentPage(5)} />
      </div>
      <div className={getClassName(5)}>
        <AvatarResultPage setNextPage={() => setCurrentPage(1)} />
      </div>
    </div>
  );
}

export default App;