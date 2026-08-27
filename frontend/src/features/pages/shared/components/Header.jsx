import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';
import MobileMenu from '../components/mobile_menu';
import { navigation } from "../../data/navigation";
import Button from "./Button";

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
     const navigate = useNavigate();
    
    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const [isOpen, setIsOpen] = useState(false);
    return (

        <header className="fixed top-0 left-0 w-full lg:bg-linear-to-r from-[#053450] via-[#053450] to-[#c6c6c6] mobile-bg-header shadow-lg z-20">

        <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between bg-red-600 w-[85%] rounded-br-3xl">
                    <div className="flex items-center justify-between lg:bg-linear-to-l from-[#053450] via-[#035B8A] to-[#053450] shadow-lg w-[99.5%] rounded-br-3xl px-8">
            
                        {/*<!-- DESKTOP MENU -->*/}
                        {/*<!-- LEFT: LOGO -->*/}
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center">
                                <div className="w-6 h-6 bg-cover bg-center select-none pointer-events-none" style={{backgroundImage:"url('/images/new_logo.png')"}}></div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white/85">
                                    Himalaya Tech
                                </h2>

                                <p className="tracking-[1px] text-[8px] text-yellow-300 leading-1.5">
                                    Information Technology
                                </p>
                            </div>
                        </div>
                        <nav className="hidden lg:flex items-center h-18">
                            <ul className="flex items-center">
                                {navigation.map((item) => (
                                    <li key={item.id} className="mx-6">
                                        <Link
                                            to={item.path}
                                            className="relative font-semibold text-white transition-colors duration-300 hover:text-yellow-400
                                                    after:absolute after:left-0 after:-bottom-1 after:h-0.5
                                                    after:w-0 after:bg-yellow-400
                                                    after:transition-all after:duration-300
                                                    hover:after:w-full"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
                
                
                <div className="hidden lg:flex justify-end">
                    <Button
                        icon={!isAuthenticated}
                        onClick={() =>
                            navigate(isAuthenticated ? "/dashboard" : "/login")
                        }
                        className="btn-consult flex items-center gap-2"
                    >
                       

                        <span>
                            {isAuthenticated
                                ? `${user?.firstName ?? ""} ... !`.trim() || "Dashboard"
                                : "Login"}
                        </span>
                    </Button>
                </div>
            </div>
        </div>

                {/* MOBILE MENU */}
                <MobileMenu />
        

        {/*<!-- Bottom Accent Lines -->*/}
        <div className="absolute left-0 w-full z-50">
            <div className="h-0.5 bg-white"></div>
            <div className="h-1.5 bg-red-600"></div>
            <div className=" bg-gray-200 shadow-lg"></div>
        </div>
    </header>

    )
}
export default Header;