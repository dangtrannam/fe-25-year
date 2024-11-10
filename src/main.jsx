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
    path: "/fptedu25",
    element: <Layout />,
    children: [
      {
        path: "/fptedu25",
        element: <App />,
      },
      {
        path: "/fptedu25/start",
        element: <StartPage />,
      },
      {
        path: "/fptedu25/introduction",
        element: <IntroductionPage />
      },
      {
        path: "/fptedu25/clip-introduction",
        element: <ClipIntroductionPage />
      },
      {
        path: "/fptedu25/create-avatar",
        element: <CreateAvatarPage />
      },
      {
        path: "/fptedu25/avatar-result",
        element: <AvatarResultPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);