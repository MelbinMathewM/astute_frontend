import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { courseId, universityId } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editableDetails, setEditableDetails] = useState(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    //Fetch course details
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/c/course/${universityId}/${courseId}`
                );
                setCourseDetails(response.data[0]);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };
        fetchCourseDetails();
    }, [courseId, universityId]);

    const openEditModal = () => {
        setEditableDetails({ ...courseDetails });
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const handleInputChange = (e, semesterIndex, subjectIndex) => {
        const { name, value } = e.target;
        const updatedDetails = { ...editableDetails };

        if (name === "courseName") {
            updatedDetails.course = value;
        } else if (name === "semesterName") {
            updatedDetails.semesters[semesterIndex].semester = value;
        } else if (name === "subjectName") {
            updatedDetails.semesters[semesterIndex].subjects[subjectIndex] = value;
        }

        setEditableDetails(updatedDetails);
    };

    const addSemester = () => {
        const updatedDetails = { ...editableDetails };
        updatedDetails.semesters.push({ semester: ``, subjects: [] });
        setEditableDetails(updatedDetails);
    };

    const removeSemester = (semesterIndex) => {
        const updatedDetails = { ...editableDetails };
        updatedDetails.semesters.splice(semesterIndex, 1);
        setEditableDetails(updatedDetails);
    };

    const addSubject = (semesterIndex) => {
        const updatedDetails = { ...editableDetails };
        updatedDetails.semesters[semesterIndex].subjects.push(``);
        setEditableDetails(updatedDetails);
    };

    const removeSubject = (semesterIndex, subjectIndex) => {
        const updatedDetails = { ...editableDetails };
        updatedDetails.semesters[semesterIndex].subjects.splice(subjectIndex, 1);
        setEditableDetails(updatedDetails);
    };

    //Save the details
    const saveChanges = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/c/course/${universityId}/${courseId}`, editableDetails);

            if (response.status === 200) {
                setCourseDetails(editableDetails);
                setEditModalOpen(false);
            } else {
                console.error('Unexpected response:', response.data);
                setError(response.data.message || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Error saving course details:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An unexpected error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-20">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-12">
                <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">
                    Course Details
                </h1>

                {courseDetails ? (
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <button
                            onClick={() => navigate('/admin/courses')}
                            className="mb-4 inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back
                        </button>

                        <h2 className="text-2xl font-bold text-purple-700 mb-4 italic">
                            {courseDetails.course}
                        </h2>
                        <button
                            onClick={openEditModal}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
                        >
                            Edit Details
                        </button>

                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
                                Semesters
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courseDetails.semesters.map((semester, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <h4 className="text-lg font-semibold text-purple-600 mb-2">
                                            Semester {semester.semester}
                                        </h4>
                                        <ul className="list-disc list-inside text-gray-700">
                                            {semester.subjects.map((subject, subIndex) => (
                                                <li key={subIndex}>{subject}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading course details...</p>
                )}


                {editModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-3/4 overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">Edit Course Details</h2>
                            {error && <p className="text-red-700 text-center py-2">{error}</p>}
                            <input
                                type="text"
                                name="courseName"
                                value={editableDetails.course}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full mb-4"
                                placeholder="Course Name"
                            />

                            {editableDetails.semesters.map((semester, index) => (
                                <div
                                    key={index}
                                    className="mb-4 border p-4 rounded-md bg-gray-50"
                                >
                                    <input
                                        type="text"
                                        name="semesterName"
                                        value={semester.semester}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="border border-gray-300 rounded-md p-2 w-full mb-2"
                                        placeholder="Semester Name"
                                    />
                                    <ul>
                                        {semester.subjects.map((subject, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className="flex items-center mb-2"
                                            >
                                                <input
                                                    type="text"
                                                    name="subjectName"
                                                    value={subject}
                                                    onChange={(e) =>
                                                        handleInputChange(e, index, subIndex)
                                                    }
                                                    className="border border-gray-300 rounded-md p-2 flex-grow"
                                                />
                                                <button
                                                    onClick={() =>
                                                        removeSubject(index, subIndex)
                                                    }
                                                    className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => addSubject(index)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                                    >
                                        Add Subject
                                    </button>
                                    <button
                                        onClick={() => removeSemester(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 ml-2"
                                    >
                                        Remove Semester
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={addSemester}
                                className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                            >
                                Add Semester
                            </button>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={saveChanges}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md mr-4"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={closeEditModal}
                                    className="bg-gray-500 text-white px-6 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetails;
