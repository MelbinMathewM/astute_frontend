import React from "react";
import astute_logo from "../../../assets/astute-logo.png";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Logo Section */}
                    <div className="mb-4 md:mb-0">
                        <img
                            src={astute_logo}
                            alt="Astute Logo"
                            className="w-32 h-auto"
                        />
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a
                            href="#about"
                            className="hover:text-white transition duration-200"
                        >
                            About Us
                        </a>
                        <a
                            href="#services"
                            className="hover:text-white transition duration-200"
                        >
                            Services
                        </a>
                        <a
                            href="#contact"
                            className="hover:text-white transition duration-200"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition duration-200"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition duration-200"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition duration-200"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-6 text-center border-t border-gray-700 pt-4">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Astute. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
