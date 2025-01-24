import { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import astute_logo from '../../../assets/astute-logo.png';

const Navbar = () => {
    const userContext = useContext(UserContext);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-full fixed top-0 left-0 py-3 bg-gradient-to-b from-[#93EBFF] to-[#EEFFFF] z-50 shadow-md">
            <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                {/* Logo Section */}
                <img src={astute_logo} alt='astute-logo' className='w-32 h-auto' />

                {/* Hamburger Icon for Mobile */}
                <div className="sm:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-black focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Navigation Links for Larger Screens */}
                <div className="hidden sm:flex items-center space-x-12">
                    <Link
                        to="/"
                        className={`text-lg cursor-pointer hover:text-red-600 ${
                            location.pathname === "/" ? "text-red-500 font-bold" : "text-black"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/notes"
                        className={`text-lg cursor-pointer hover:text-red-600 ${
                            location.pathname.startsWith("/notes") ? "text-red-500 font-bold" : "text-black"
                        }`}
                    >
                        Notes
                    </Link>
                    {userContext?.isAuth ? (
                        <Link
                            to="/profile"
                            className={`text-lg cursor-pointer hover:text-red-600 ${
                                location.pathname === "/profile" ? "text-red-500 font-bold" : "text-black"
                            }`}
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className={`text-lg cursor-pointer hover:text-blue-600 ${
                                location.pathname === "/login" ? "text-blue-500 font-bold" : "text-black"
                            }`}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Dropdown Menu for Smaller Screens */}
            {isMenuOpen && (
                <div className="sm:hidden bg-gradient-to-b from-[#93EBFF] to-[#EEFFFF] py-4 shadow-md">
                    <Link
                        to="/"
                        className={`block px-6 py-2 hover:text-red-600 ${
                            location.pathname === "/" ? "text-red-500 font-bold" : "text-black"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/notes"
                        className={`block px-6 py-2 hover:text-red-600 ${
                            location.pathname.startsWith("/notes") ? "text-red-500 font-bold" : "text-black"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Notes
                    </Link>
                    {userContext?.isAuth ? (
                        <Link
                            to="/profile"
                            className={`block px-6 py-2 hover:text-red-600 ${
                                location.pathname === "/profile" ? "text-red-500 font-bold" : "text-black"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className={`block px-6 py-2 hover:text-blue-600 ${
                                location.pathname === "/login" ? "text-blue-500 font-bold" : "text-black"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
