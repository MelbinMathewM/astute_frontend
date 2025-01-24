import { useContext, useEffect, useState } from "react";
import { FaUniversity, FaCalendar, FaBook, FaFileAlt, FaSearch, FaBookDead, FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/userContext";

const NotesPage = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const userContext = useContext(UserContext);

    const [universities, setUniversities] = useState([]);
    const [universityId, setUniversityId] = useState('');
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [courseId, setCourseId] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [semester, setSemester] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState('');
    const [chapters, setChapters] = useState([]);
    const [chapter, setChapter] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/c/ucity`);
                setUniversities(response.data);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        };
        fetchUniversities();
    }, []);

    useEffect(() => {
        if (!universityId) return;
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/c/course/${universityId}`);
                setCourses(response.data);
                setFilteredCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [universityId]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter((course) =>
                course.course.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
    }, [searchTerm, courses]);

    const handleCourseSelect = (course) => {
        setSearchTerm(course.course);
        setCourseId(course._id);
        setFilteredCourses([]);
        setDropdownVisible(false);
    };

    useEffect(() => {
        if (!courseId) return;
        const fetchSemesters = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/c/course/${courseId}/semesters`);
                setSemesters(response.data);
            } catch (error) {
                console.error('Error fetching semesters:', error);
            }
        };
        fetchSemesters();
    }, [courseId]);

    useEffect(() => {
        if (!semester) return;
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/c/course/${courseId}/semesters/${semester}/subjects`);
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchSubjects();
    }, [semester, courseId]);

    useEffect(() => {
        if (!subject) return;
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/c/course/${courseId}/semesters/${semester}/subjects/${subject}/chapters`);
                setChapters(response.data);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };
        fetchChapters();
    }, [subject, semester, courseId]);

    const viewPdf = async () => {

        if (!userContext.isAuth) {
            setAlertVisible(true);
            return;
        }

        try {
            const response = await axios.get(
                `${BASE_URL}/c/universities/${universityId}/courses/${courseId}/semesters/${semester}/subjects/${subject}/chapters/${chapter}`
            );
            const pdfUrl = response.data.pdf_url;
            console.log(pdfUrl)

            navigate('/notes/view', { state: { pdfUrl, subject, chapter } });
        } catch (error) {
            console.error('Error fetching PDF URL:', error);
        }
    };

    return (
        <div className="w-full py-16 px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 text-center mt-6 mb-12">Notes</h2>
                
                {/* Form Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Select University */}
                    <div className="border-2 border-red-300 rounded-lg p-4 flex items-center justify-between space-x-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Select University
                            </label>
                            <select className="w-full text-gray-600 border-none outline-none" value={universityId} onChange={(e) => setUniversityId(e.target.value)} required>
                                <option>Select university</option>
                                {universities.map((uni) => (
                                    <option key={uni._id} value={uni._id}>
                                        {uni.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <FaUniversity className="text-red-500 text-lg" />
                    </div>

                    {/* Select Course */}
                    <div className="border-2 border-green-300 rounded-lg p-4 flex items-center justify-between space-x-3 relative">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Select Course
                            </label>
                            <div className="relative w-full max-w-md">
                                {/* Input Field */}
                                <input
                                type="text"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setDropdownVisible(true);
                                }}
                                className="w-full pl-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

                                {/* Search Icon */}
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>                          
                            {filteredCourses.length > 0 && searchTerm && dropdownVisible && (
                                <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-10">
                                    {filteredCourses.map((course) => (
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
                        </div>
                        <FaBookOpen className="text-green-500 text-lg" />
                    </div>

                    {/* Select Semester */}
                    <div className="border-2 border-pink-300 rounded-lg p-4 flex items-center justify-between space-x-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Select Semester
                            </label>
                            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full text-gray-600 border-none outline-none" required disabled={!courseId}>
                                <option>Select semester</option>
                                { semesters.map((sem) => (
                                    <option key={sem.semester} value={sem.semester}>
                                        Semester {sem.semester}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <FaCalendar className="text-pink-500 text-lg" />
                    </div>

                    {/* Select Subject */}
                    <div className="border-2 border-purple-300 rounded-lg p-4 flex items-center justify-between space-x-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Select Subject
                            </label>
                            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full text-gray-600 border-none outline-none" required disabled={!semester}>
                                <option>Select subject</option>
                                {subjects.map((subj, index) => (
                                    <option key={index} value={subj}>
                                        {subj}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <FaBook className="text-purple-500 text-lg" />
                    </div>

                    {/* Select Chapter */}
                    <div className="border-2 border-teal-300 rounded-lg p-4 flex items-center justify-between space-x-3">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Select Chapter
                            </label>
                            <select value={chapter} onChange={(e) => setChapter(e.target.value)} className="w-full text-gray-600 border-none outline-none" required disabled={!subject}>
                                <option>Select chapter</option>
                                {chapters.map((chap, index) => (
                                    <option key={index} value={chap}>
                                        {chap}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <FaFileAlt className="text-teal-500 text-lg" />
                    </div>
                </div>

                {/* Get Notes Button */}
                <div className="flex justify-center mt-8">
                    <AlertBar
                    message="Please log in first."
                    show={alertVisible}
                    onClose={() => setAlertVisible(false)}
                    />
                    <button onClick={viewPdf} className="flex items-center px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all" disabled={!chapter}>
                        <span className="mr-2">Get Notes</span>
                        <FaSearch />
                    </button>
                </div>
            </div>
        </div>
    );
};

const AlertBar = ({ message, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-4 shadow-lg z-50">
            <div className="flex justify-between items-center px-4 max-w-4xl mx-auto">
                <span className="text-sm">{message}</span>
                <button
                    className="text-sm font-bold hover:underline"
                    onClick={onClose}
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
};

export default NotesPage;
