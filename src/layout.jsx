import { Outlet } from "react-router-dom";
import HeaderComponent from "./components/header.component";

export const Layout = () => {
    return (
        <div className="app">
            <HeaderComponent />
            <Outlet />
        </div>
    );
};