import Footer from "../../../components/admin/footer/footer";
import Navbar from "../../../components/admin/navbar/navbar";
import ShowCourse from "../../../components/admin/showcourse/showcourse";
import { ToastContainer } from "react-toastify";

const Course = () => {
    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="pt-10">
                <ShowCourse />
            </div>
            <Footer />
        </div>
    )
}

export default Course;