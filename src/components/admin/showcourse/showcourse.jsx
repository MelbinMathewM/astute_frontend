import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";


const ShowCourse = () => {
    
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    
    const navigate = useNavigate();
    
    const [universities, setUniversities] = useState([]);
    const [universityId, setUniversityId] = useState("");
    const [courses, setCourses] = useState([]);

    // Fetch universities
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/c/ucity`);
                setUniversities(response.data);
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        };
        fetchUniversities();
    }, []);

    // Fetch courses based on selected university
    useEffect(() => {
        const fetchCourses = async () => {
            if (!universityId) return;
            try {
                const response = await axios.get(`${BASE_URL}/c/course/${universityId}`);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, [universityId]);

    //Redirect to details page
    const handleCourseClick = (courseId) => {
        navigate(`/admin/courses/details/${universityId}/${courseId}`);
    };

    //Delete confirmation
    const handleDeleteConfirm = (courseId) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this course? This will remove all associated notes.",
            buttons: [
                {
                    label: "Yes, Delete",
                    onClick: () => handleDeleteCourse(courseId),
                    style: { backgroundColor: "#d32f2f", color: "white", borderRadius: "5px", padding: "8px 16px" },
                },
                {
                    label: "Cancel",
                    style: { backgroundColor: "#4caf50", color: "white", borderRadius: "5px", padding: "8px 16px" },
                },
            ],
        });
    };

    // Delete course
    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/c/course/${courseId}`);
    
            if (response.data.success) {
                setCourses(courses.filter((course) => course._id !== courseId));
                toast.success("Course and all related notes deleted successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.error("Failed to delete course.");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("⚠️ An error occurred while deleting the course.");
        }
    };
    

    // Redirect to add course page
    const handleAddCourse = () => {
        navigate(`/admin/courses/add`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">
                    Manage Courses
                </h1>
                <h3 className="text-lg text-gray-600 text-center mb-8">
                    View and manage Courses
                </h3>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex-1 mr-4">
                        <label
                            htmlFor="universities"
                            className="block text-lg font-medium text-gray-700 mb-3"
                        >
                            Select University
                        </label>
                        <select
                            name="universities"
                            id="universities"
                            value={universityId}
                            onChange={(e) => setUniversityId(e.target.value)}
                            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select University</option>
                            {universities.map((ucity) => (
                                <option key={ucity._id} value={ucity._id}>
                                    {ucity.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleAddCourse}
                        className="bg-green-500 mt-10 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                    >
                        Add Course
                    </button>
                </div>

                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="p-5 bg-purple-100 rounded-lg shadow hover:shadow-lg cursor-pointer relative group"
                                onClick={() => handleCourseClick(course._id)}
                            >
                                <h4 className="text-xl font-semibold text-purple-700 group-hover:text-purple-900">
                                    {course.course}
                                </h4>
                                <p className="text-sm text-gray-600 mt-2">
                                    Click to view details
                                </p>
                                
                                <button
                                    className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteConfirm(course._id);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-8">
                        {universityId
                            ? "No courses available for this university."
                            : "Please select a university to view courses."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ShowCourse;
