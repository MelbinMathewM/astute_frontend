import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../../context/adminContext";
import Cookies from 'js-cookie';
import { setAdminToken } from "../../../redux/store";
import astute_logo from '../../../assets/astute-logo.png';

const ALogin = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const dispatch = useDispatch();
    const adminContext = useContext(AdminContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessage("");
        setIsError(false)
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { email, password } = formData;

        if (!email || !password) {
            setMessage("All fields are required!");
            setIsError(true);
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("Invalid email format!");
            setIsError(true);
            return false;
        }

        if (password.length < 6) {
            setMessage("Password must be at least 6 characters!");
            setIsError(true);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            setMessage("");
            setIsError(false);
    
            try {
                const response = await fetch(`${BASE_URL}/admin/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                const resData = await response.json();
                if (response.status === 200) {
                    setMessage(resData.message || "Login successful!");
                    setIsError(false);
                    Cookies.set('adminAccessToken',resData.accessToken);
                    Cookies.set('adminRefreshToken',resData.refreshToken);
                    dispatch(setAdminToken(resData.accessToken));
                    adminContext?.setIsAuth(true);
    
                    setTimeout(() => {
                        navigate("/admin/dashboard");
                    }, 500);
                } else {
                    setMessage(resData.message || "Login failed!");
                    setIsError(true);
                }
            } catch (error) {
                setMessage("An error occurred. Please try again later.");
                setIsError(true);
                console.error("Error during registration:", error);
            }
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <img src={astute_logo} alt='astute-logo' className='w-32 h-auto' />
                <h1 className="text-xl font-semibold text-gray-700 text-center mb-6">
                    Admin Login
                </h1>

                {message && (
                    <div
                        className={`text-center p-2 mb-4 rounded ${
                            isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded px-3 py-2 hover:ring-2 hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded px-3 py-2 hover:ring-2 hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ALogin;