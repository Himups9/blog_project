import { useState } from "react";
import { navigation } from "../../data/navigation";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/*<!--Mobile Menu-->*/}
            <div className="lg:hidden flex items-center justify-between px-4">
                {/*<!-- LEFT: LOGO -->*/}
                <div>
                    <div className="flex items-center gap-2 m-2 px-2 h-12">
                        <div className="flex items-center gap-2">
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
                    </div>

                    

            
                    

                </div>

                {/*<!-- RIGHT: ACTIONS -->*/}
                <div className="flex items-center mx-6 gap-4">


                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        className="text-white"
                    >
                        {isOpen ? <X size={30} /> : <Menu size={30} />}
                    </button>
                </div>
            </div>

        
            {/*<!-- MOBILE MENU -->*/}
            <nav className={`lg:hidden transform ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"} bg-linear-to-l from-[#053450] via-[#035B8A] to-[#053450] leading-6 absolute top-full left-0 w-full z-50 transition-all duration-300`}>

                <ul className="flex flex-col items-center space-y-5 py-6">
                    {navigation.map((item) => (
                        <li key={item.id}>
                            <Link 
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                            
                                className="block py-2 font-semibold text-white transition-colors duration-300 hover:text-yellow-400
                               after:absolute after:left-0 after:-bottom-1 after:h-0.2
                               after:w-0 after:bg-yellow-400 backdrop-blur-md
                               after:transition-all after:duration-300
                               hover:after:w-full"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

        </>
    );}

export default MobileMenu;