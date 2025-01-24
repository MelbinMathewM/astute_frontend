import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AddNotesForm = () => {
    const [universities, setUniversities] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [universityId, setUniversityId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [message, setMessage] = useState({ open: false, text: '', severity: 'success' });
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/c/ucity`)
            .then(res => setUniversities(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!universityId) return;
        axios.get(`${BASE_URL}/c/course/${universityId}`)
            .then(res => {
                setCourses(res.data);
                setFilteredCourses(res.data);
            })
            .catch(err => console.error('Error fetching courses:', err));
    }, [universityId]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course =>
                course.course.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
    }, [searchTerm, courses]);

    const handleCourseSelect = (course) => {
        setSearchTerm(course.course);
        setCourseId(course._id);
        setDropdownVisible(false);
    };

    useEffect(() => {
        if (courseId) {
            axios.get(`${BASE_URL}/c/course/${courseId}/semesters`)
                .then(res => setSemesters(res.data))
                .catch(err => console.error(err));
        } else {
            setSemesters([]);
        }
    }, [courseId]);

    useEffect(() => {
        if (semester) {
            axios.get(`${BASE_URL}/c/course/${courseId}/semesters/${semester}/subjects`)
                .then(res => setSubjects(res.data))
                .catch(err => console.error(err));
        } else {
            setSubjects([]);
        }
    }, [semester]);

    const handleFileChange = (e) => setPdfFile(e.target.files[0] || null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pdfFile) {
            setMessage({ open: true, text: 'Please upload a PDF file.', severity: 'error' });
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('university_id', universityId);
        formData.append('course_id', courseId);
        formData.append('semester', semester);
        formData.append('subject', subject);
        formData.append('chapter', chapter);
        formData.append('pdf', pdfFile);

        try {
            await axios.post(`${BASE_URL}/c/upload_notes`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ open: true, text: 'Note uploaded successfully!', severity: 'success' });
            setTimeout(() => {
                navigate('/admin/notes');
            }, 1000);
        } catch (error) {
            setMessage({ open: true, text: 'Failed to upload note.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">Upload Notes</h2>
                <button className="flex items-center text-blue-600 hover:text-white hover:bg-blue-500 p-2 rounded font-semibold transition duration-300"
                    onClick={() => navigate('/admin/notes')}>
                    ← Back
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <select className="w-full p-2 border rounded" value={universityId} onChange={e => setUniversityId(e.target.value)} required>
                    <option value="">Select a University</option>
                    {universities.map(uni => <option key={uni._id} value={uni._id}>{uni.name}</option>)}
                </select>

                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search course..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setDropdownVisible(true);
                        }}
                        className="w-full pl-2 pr-10 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {filteredCourses.length > 0 && searchTerm && dropdownVisible && (
                    <div className="absolute bg-white border rounded-lg shadow-lg mt-1 z-10">
                        {filteredCourses.map(course => (
                            <div
                                key={course._id}
                                className="cursor-pointer hover:bg-gray-300 px-12 py-2"
                                onClick={() => handleCourseSelect(course)}
                            >
                                {course.course}
                            </div>
                        ))}
                    </div>
                )}

                <select className="w-full p-2 border rounded" value={semester} onChange={e => setSemester(e.target.value)} required disabled={!courseId}>
                    <option value="">Select a Semester</option>
                    {semesters.map(sem => <option key={sem.semester} value={sem.semester}>Semester {sem.semester}</option>)}
                </select>

                <select className="w-full p-2 border rounded" value={subject} onChange={e => setSubject(e.target.value)} required disabled={!semester}>
                    <option value="">Select a Subject</option>
                    {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                </select>

                <input type="text" placeholder="Chapter" className="w-full p-2 border rounded" value={chapter} onChange={e => setChapter(e.target.value)} required />

                <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full p-2 border rounded bg-gray-100" required />
                {message.open && (
                    <div className={`mt-4 p-2 text-center rounded ${message.severity === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50 flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    ) : (
                        "Upload Note"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddNotesForm;
