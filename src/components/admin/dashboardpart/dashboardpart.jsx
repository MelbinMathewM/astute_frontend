import { useState, useEffect } from "react";
import axios from "axios";

const DashboardPart = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [stats, setStats] = useState([
        { title: "Registered Users", value: 0, icon: "👤" },
        { title: "Courses Published", value: 0, icon: "📘" },
        { title: "Uploaded Notes", value: 0, icon: "📄" },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const responses = await Promise.allSettled([
                    axios.get(`${BASE_URL}/admin/users/count`),
                    axios.get(`${BASE_URL}/c/courses/count`),
                    axios.get(`${BASE_URL}/c/notes/count`),
                ]);

                setStats((prevStats) => prevStats.map((stat, index) => ({
                    ...stat,
                    value: responses[index].status === "fulfilled" ? responses[index].value.data : stat.value,
                })));
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="text-4xl mr-4">{stat.icon}</div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">
                                {stat.title}
                            </h2>
                            <p className="text-xl font-bold text-purple-600">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPart;
