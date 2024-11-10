import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout.jsx";
import StartPage from "./pages/start.page.jsx";
import CreateAvatarPage from "./pages/createAvatar/createAvatar.page.jsx";
import AvatarResultPage from "./pages/avatarResult.page.jsx";
import IntroductionPage from "./pages/introduction/introduction.page.jsx";
import ClipIntroductionPage from "./pages/clip/clip.page.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/start",
        element: <StartPage />,
      },
      {
        path: "/introduction",
        element: <IntroductionPage />
      },
      {
        path: "/clip-introduction",
        element: <ClipIntroductionPage />
      },
      {
        path: "/create-avatar",
        element: <CreateAvatarPage />
      },
      {
        path: "/avatar-result",
        element: <AvatarResultPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);