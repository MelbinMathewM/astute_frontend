import { useContext } from "react";
import { AdminContext } from "../../../context/adminContext";
import { useNavigate } from "react-router-dom";

const ProfilePart = () => {
    const adminContext = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        adminContext.logout();
        navigate("/admin/login");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-purple-100 shadow-md rounded-lg px-6">
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                    A
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-purple-700">
                        Admin
                    </h2>
                    <p className="text-base text-gray-500">Administrator</p>
                </div>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 shadow-md transition duration-200"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePart;
