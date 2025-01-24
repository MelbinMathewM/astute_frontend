import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import astute_logo from '../../../assets/astute-logo.png';

const Footer = () => {
    return (
        <div className="w-full bg-gray-100 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
                {/* Brand Section */}
                <div className="space-y-6 px-6">
                    <img src={astute_logo} alt='astute-logo' className='w-32 h-auto' />
                    <p className="text-gray-600">
                        Astute provides you with the most relevant notes for every course in your college.
                    </p>
                    <div className="space-y-2">
                        <h6 className="text-sm font-semibold text-gray-800">Connect to us on:</h6>
                        <div className="flex space-x-4 text-gray-600">
                            <FaFacebook className="cursor-pointer hover:text-blue-600" />
                            <FaInstagram className="cursor-pointer hover:text-pink-600" />
                            <FaTwitter className="cursor-pointer hover:text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                    {/* Solutions Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Our Solutions</h3>
                        <div className="mt-4 space-y-2 text-gray-600">
                            <p className="cursor-pointer hover:text-gray-800">Universities</p>
                            <p className="cursor-pointer hover:text-gray-800">Courses</p>
                            <p className="cursor-pointer hover:text-gray-800">Notes</p>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Support</h3>
                        <div className="mt-4 space-y-2 text-gray-600">
                            <p className="cursor-pointer hover:text-gray-800">Contact</p>
                            <p className="cursor-pointer hover:text-gray-800">Help and Support</p>
                        </div>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Company</h3>
                        <div className="mt-4 space-y-2 text-gray-600">
                            <p className="cursor-pointer hover:text-gray-800">Privacy Policy</p>
                            <p className="cursor-pointer hover:text-gray-800">Terms</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
