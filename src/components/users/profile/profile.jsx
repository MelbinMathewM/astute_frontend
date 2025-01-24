import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfilePart = () => {
    const user = useSelector((state) => state.user) || {};
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        setUserData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || ''
        });
    }, [user]);

    const handleLogout = () => {
        userContext.logout();
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <div className="text-center">
                    {/* User Avatar */}
                    <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-full text-3xl font-semibold">
                            {userData.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    </div>

                    {/* User Details */}
                    <h1 className="text-2xl font-bold mb-2 text-gray-800">{userData.name}</h1>
                    <p className="text-gray-600 mb-1">{userData.email}</p>
                    <p className="text-gray-600 mb-4">{userData.phone}</p>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePart;
