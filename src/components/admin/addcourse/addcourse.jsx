import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CourseForm = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();

    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [courseName, setCourseName] = useState("");
    const [semesters, setSemesters] = useState([{ semester: "", subjects: [""] }]);
    const [error, setError] = useState("");

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

    const handleSemesterChange = (index, value) => {
        const updatedSemesters = [...semesters];
        updatedSemesters[index].semester = value;
        setSemesters(updatedSemesters);
    };

    const handleSubjectChange = (semesterIndex, subjectIndex, value) => {
        const updatedSemesters = [...semesters];
        updatedSemesters[semesterIndex].subjects[subjectIndex] = value;
        setSemesters(updatedSemesters);
    };

    const addSemester = () => {
        setSemesters([...semesters, { semester: "", subjects: [""] }]);
    };

    const removeSemester = (index) => {
        const updatedSemesters = semesters.filter((_, i) => i !== index);
        setSemesters(updatedSemesters);
    };

    const addSubject = (semesterIndex) => {
        const updatedSemesters = [...semesters];
        updatedSemesters[semesterIndex].subjects.push("");
        setSemesters(updatedSemesters);
    };

    const removeSubject = (semesterIndex, subjectIndex) => {
        const updatedSemesters = [...semesters];
        updatedSemesters[semesterIndex].subjects = updatedSemesters[semesterIndex].subjects.filter((_, i) => i !== subjectIndex);
        setSemesters(updatedSemesters);
    };

    const validateForm = () => {
        if (!selectedUniversity || !courseName || semesters.length === 0) {
            setError("Please fill all required fields and add at least one semester.");
            return false;
        }
        for (let sem of semesters) {
            if (!sem.semester.trim() || sem.subjects.some(sub => !sub.trim())) {
                setError("Ensure all semesters and subjects are properly filled.");
                return false;
            }
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const courseData = {
            ucity_id: selectedUniversity,
            course: courseName,
            semesters,
        };

        try {
            await axios.post(`${BASE_URL}/c/course/add`, courseData);
            setSelectedUniversity("");
            setCourseName("");
            setSemesters([{ semester: "", subjects: [""] }]);
            navigate("/admin/courses");
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 border border-gray-300">

                <div className="flex justify-between items-center mb-4">
                    <button
                        className="text-blue-500 px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-500 hover:text-white transition duration-200"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>
                    <h1 className="text-3xl font-semibold text-purple-600 text-center flex-1">
                        Add Course
                    </h1>
                </div>
    
                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded-lg font-semibold text-center mb-4">
                        {error}
                    </p>
                )}
    
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                            <select
                                value={selectedUniversity}
                                onChange={(e) => setSelectedUniversity(e.target.value)}
                                className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-300"
                            >
                                <option value="">Select a University</option>
                                {universities.map((uni) => (
                                    <option key={uni._id} value={uni._id}>
                                        {uni.name}
                                    </option>
                                ))}
                            </select>
                        </div>
    
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                            <input
                                type="text"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-300"
                            />
                        </div>
                    </div>
    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Semesters</label>
                        {semesters.map((semester, index) => (
                            <div key={index} className="mb-3 p-4 border-2 rounded-lg bg-gray-50">
                                
                                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                                <input
                                    type="text"
                                    value={semester.semester}
                                    onChange={(e) => handleSemesterChange(index, e.target.value)}
                                    className="w-full p-2 border-2 rounded-lg"
                                />
    
                                <div className="mt-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                                    <div className="flex gap-4 flex-wrap">
                                        {semester.subjects.map((subject, subIndex) => (
                                            <div key={subIndex} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={subject}
                                                    onChange={(e) => handleSubjectChange(index, subIndex, e.target.value)}
                                                    className="w-1/3 p-2 border-2 rounded-lg mb-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubject(index, subIndex)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => addSubject(index)}
                                        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition duration-200"
                                    >
                                        + Add Subject
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeSemester(index)}
                                    className="mt-3 text-red-600 hover:text-red-800"
                                >
                                    ❌ Remove Semester
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addSemester}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-600 transition duration-200"
                    >
                        + Add Semester
                    </button>
    
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-purple-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );    
};

export default CourseForm;
