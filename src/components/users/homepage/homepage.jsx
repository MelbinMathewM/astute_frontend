import { FaArrowRight } from 'react-icons/fa';
import study_home from '../../../assets/study-home.png';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                {/* Content Section */}
                <div className="flex flex-col justify-center space-y-4">
                    <h1 className="text-4xl text-black font-inria-serif italic">
                        All <strong>Notes</strong> in one place
                    </h1>
                    <p className="text-lg text-black font-inria-serif italic">
                        Astute offers notes from a wide variety of courses and universities. You can get notes of all semesters and chapters in one place.
                    </p>
                    <button onClick={ () => navigate('/notes')} className="flex items-center w-fit bg-[#683EFF] text-white px-4 py-2 rounded-md hover:bg-[#5728d7] transition-colors">
                        <p className="mr-2 font-inria-serif italic">Notes</p>
                        <FaArrowRight />
                    </button>
                </div>

                {/* Image Section */}
                <div className="flex justify-center md:justify-end">
                    <img src={study_home} alt="Study" className="max-w-full h-auto rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
