import { useContext, useEffect, useState } from "react";
import { FaUniversity, FaCalendar, FaBook, FaBookOpen, FaSearch } from "react-icons/fa";
import axios from "axios";
import { AdminContext } from "../../../context/adminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotesPartPage = () => {
  const adminContext = useContext(AdminContext);
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [universityId, setUniversityId] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseId, setCourseId] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

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

  useEffect(() => {
    if (!universityId) return;
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/c/course/${universityId}`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [universityId]);

  useEffect(() => {
    if (!courseId) return;
    const fetchSemesters = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/c/course/${courseId}/semesters`);
        setSemesters(response.data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
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
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [subject, semester, courseId]);

  useEffect(() => {
    if (!subject) return;
    setNotes([])
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/c/course/${courseId}/semesters/${semester}/subjects/${subject}/notes`);
        setNotes(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, [subject, semester, courseId]);

  const viewPdf = async (chapter) => {

    if (!adminContext.isAuth) {
        setAlertVisible(true);
        return;
    }

    try {
        const response = await axios.get(
            `${BASE_URL}/c/universities/${universityId}/courses/${courseId}/semesters/${semester}/subjects/${subject}/chapters/${chapter}`
        );
        const pdfUrl = response.data.pdf_url;
        console.log(pdfUrl)

        navigate('/admin/notes/view', { state: { pdfUrl, subject, chapter } });
    } catch (error) {
        console.error('Error fetching PDF URL:', error);
    }
};

const deleteNote = async (chapter) => {
  try{
    await axios.delete(`${BASE_URL}/c/universities/${universityId}/courses/${courseId}/semesters/${semester}/subjects/${subject}/chapters/${chapter}`);
    setNotes(notes.filter(note => note.chapter !== chapter));
    toast.success(`Notes for the chapter ${chapter} deleted successfully!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }catch(err){
    console.error('Error deleting note')
  }
}

  return (
    <div className="w-full py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 mt-10">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Notes</h2>
                <button className="flex items-center text-blue-600 hover:text-white p-2 rounded hover:bg-blue-500 font-semibold transition duration-300"
                    onClick={() => navigate('/admin/notes/add')}>
                    Add Notes
                </button>
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <Dropdown label="Select University" value={universityId} onChange={(e) => setUniversityId(e.target.value)} options={universities.map((uni) => ({ value: uni._id, label: uni.name }))} icon={<FaUniversity className="text-red-500 text-lg" />} />

          <SearchDropdown
            label="Select Course"
            value={searchTerm}
            onSearch={(e) => setSearchTerm(e.target.value)}
            options={courses
              .filter(course => course.course.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((course) => ({ value: course._id, label: course.course }))}
            onSelect={(course) => {
              setSearchTerm(course.label);
              setCourseId(course.value);
            }}
            icon={<FaBookOpen className="text-green-500 text-lg" />}
          />

          <Dropdown label="Select Semester" value={semester} onChange={(e) => setSemester(e.target.value)} options={semesters.map((sem) => ({ value: sem.semester, label: `Semester ${sem.semester}` }))} icon={<FaCalendar className="text-pink-500 text-lg" />} disabled={!courseId} />

          <Dropdown label="Select Subject" value={subject} onChange={(e) => setSubject(e.target.value)} options={subjects.map((subj) => ({ value: subj, label: subj }))} icon={<FaBook className="text-purple-500 text-lg" />} disabled={!semester} />
        </div>
        {notes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Chapters</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Chapter</th>
                  <th className="px-4 py-2 border">PDF Link</th>
                  <th className="px-4 py-2 border">Delete Note</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {notes.map((note, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{note.chapter}</td>
                    <td className="px-4 py-2 border">
                      <AlertBar
                      message="Please log in first."
                      show={alertVisible}
                      onClose={() => setAlertVisible(false)} />
                      <a onClick={() => viewPdf(note.chapter)} className="text-blue-500 hover:text-red-800 cursor-pointer">View PDF</a>
                    </td>
                    <td>
                      <button className="text-red-500 hover:font-bold" onClick={() => deleteNote(note.chapter)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {subject && notes.length < 1 && (
          <div className="text-center pt-12">
            <p className="text-gray-700">No chapters for this subject</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPartPage;


const Dropdown = ({ label, value, onChange, options, icon, disabled }) => (
  <div className={`border-2 rounded-lg p-4 flex items-center justify-between space-x-3 ${disabled ? "border-gray-300" : "border-blue-300"}`}>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <select value={value} onChange={onChange} className="w-full py-2 px-2 text-gray-600 border rounded outline-none" disabled={disabled}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
    {icon}
  </div>
);

const SearchDropdown = ({ label, value, onSearch, options, onSelect, icon }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="border-2 border-green-300 rounded-lg p-4 flex items-center justify-between space-x-3 relative">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            value={value}
            onChange={(e) => {
              onSearch(e);
              setDropdownVisible(true);
            }}
            onFocus={() => setDropdownVisible(true)}
            className="w-full pl-2 pr-4 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {dropdownVisible && options.length > 0 && (
          <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-10 w-full">
            {options.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer hover:bg-gray-300 px-4 py-2"
                onClick={() => {
                  onSelect(option);
                  setDropdownVisible(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {icon}
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

