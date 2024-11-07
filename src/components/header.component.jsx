import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
        <header className="p-4">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                <div className="text-white font-semibold flex flex-col items-start">
                    <span>
                        Chọn ngôn ngữ
                    </span>
                    <button>
                        Vn/Eng
                    </button>
                </div>

                <div className="flex gap-6 items-center">
                    <Link to="#" target="_blank">
                        <img
                            src="/images/logo_fptu.png"
                            alt="FPT University Logo"
                            className="w-20 md:w-28 lg:w-32 h-auto"
                        />
                    </Link>
                    <Link to="#" target="_blank">
                        <img
                            src="/images/logo_25year.png"
                            alt="25 Years Logo"
                            className="w-20 md:w-24 lg:w-28 h-auto"
                        />
                    </Link>
                </div>
                <div className="w-24"></div>
            </div>
        </header>
    );
}

export default HeaderComponent;
