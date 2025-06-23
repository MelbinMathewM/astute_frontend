import { FaArrowRight } from 'react-icons/fa';
import study_home from '../../../assets/study-home.png';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            <div className="w-full px-6 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                {/* Text Content */}
                <div className="flex flex-col justify-center space-y-6">
                    <h1 className="text-2xl md:text-3xl text-black font-inria-serif italic leading-tight">
                        All <strong>Notes</strong> in one place
                    </h1>
                    <p className="md:text-lg text-black font-inria-serif italic">
                        Astute offers notes from a wide variety of courses and universities.
                        You can get notes of all semesters and chapters in one place.
                    </p>
                    <button
                        onClick={() => navigate('/notes')}
                        className="flex items-center w-fit bg-[#683EFF] text-white px-4 py-2 rounded-md hover:bg-[#5728d7] transition-all"
                    >
                        <span className="mr-2 font-inria-serif italic">Notes</span>
                        <FaArrowRight />
                    </button>
                </div>

                {/* Image Section – Only on Medium Screens and Up */}
                <div className="hidden md:flex justify-end items-center">
                    <img
                        src={study_home}
                        alt="Study"
                        className="w-48 opacity-90 rounded-lg object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
