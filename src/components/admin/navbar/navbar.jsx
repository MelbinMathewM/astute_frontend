import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import astute_logo from '../../../assets/astute-logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="w-full fixed top-0 left-0 bg-gray-900 text-white z-50 shadow-lg">
            <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img src={astute_logo} className="w-32 h-auto" alt="Astute Logo" />
                </div>



                {/* Menu for Larger Screens */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link
                        to="/admin/dashboard"
                        className={`text-lg hover:text-purple-400 ${location.pathname.startsWith("/admin/dashboard")
                            ? "text-purple-500 font-bold"
                            : ""
                            }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/courses"
                        className={`text-lg hover:text-purple-400 ${location.pathname.startsWith("/admin/courses")
                            ? "text-purple-500 font-bold"
                            : ""
                            }`}
                    >
                        Courses
                    </Link>
                    <Link
                        to="/admin/notes"
                        className={`text-lg hover:text-purple-400 ${location.pathname.startsWith("/admin/notes")
                            ? "text-purple-500 font-bold"
                            : ""
                            }`}
                    >
                        Notes
                    </Link>
                    <Link
                        to="/admin/profile"
                        className={`text-lg hover:text-purple-400 ${location.pathname.startsWith("/admin/profile")
                            ? "text-purple-500 font-bold"
                            : ""
                            }`}
                    >
                        Profile
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <div
                    className="md:hidden text-2xl cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 text-white py-4 px-6 space-y-4">
                    <Link
                        to="/admin/dashboard"
                        className={`block text-lg hover:text-purple-400 ${location.pathname.startsWith("/admin/dashboard")
                            ? "text-purple-500 font-bold"
                            : ""
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/courses"
                        className={`block text-lg hover:text-purple-400 ${location.pathname.startsWith("/admin/courses")
                            ? "text-purple-500 font-bold"
                            : ""
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Courses
                    </Link>
                    <Link
                        to="/admin/notes"
                        className={`block text-lg hover:text-purple-400 ${location.pathname.startsWith("/admin/notes")
                            ? "text-purple-500 font-bold"
                            : ""
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Notes
                    </Link>
                    <Link
                        to="/admin/profile"
                        className={`block text-lg hover:text-purple-400 ${location.pathname.startsWith("/admin/profile")
                            ? "text-purple-500 font-bold"
                            : ""
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Profile
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
