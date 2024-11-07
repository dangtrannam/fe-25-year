import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div className="absolute top-0 left-0 right-0 md:min-h-[100px] px-4">
            <div className="flex justify-center items-center py-3 gap-6 w-auto max-w-screen-xl mx-auto">
                <Link
                    to="#"
                    target="_blank"
                >
                    <img
                        src="/images/logo_fptu.png"
                        alt="fptu-logo"
                        className="w-24 md:w-32 lg:w-40 h-auto"
                    />
                </Link>
                <Link
                    to="3"
                    target="_blank"
                >
                    <img
                        src="/images/logo_25year.png"
                        alt="Logo FTPU"
                        className="w-24 h-24"
                    />
                </Link>
            </div>
        </div>
    );
}

export default HeaderComponent;