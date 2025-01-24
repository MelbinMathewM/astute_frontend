import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import astute_logo from '../../../assets/astute-logo.png';

const Register = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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
        const { name, email, phone, password } = formData;

        if (!name || !email || !phone || !password) {
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

        if (phone.length !== 10 || isNaN(phone)) {
            setMessage("Phone number must be 10 digits!");
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
                const response = await fetch(`${BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                const resData = await response.json();
    
                if (response.status === 201) {
                    setMessage(resData.message || "Registration successful!");
                    setIsError(false);
    
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    setMessage(resData.message || "Registration failed!");
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
                    Register
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
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded px-3 py-2 hover:ring-2 hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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

                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
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
                <p className="mt-2">Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-700">Login here!</Link></p>
            </div>
        </div>
    );
};

export default Register;
