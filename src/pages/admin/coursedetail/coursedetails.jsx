import CourseDetails from "../../../components/admin/coursedetailpart/coursedetailpart"
import Footer from "../../../components/admin/footer/footer";
import Navbar from "../../../components/admin/navbar/navbar"

const CourseDetail = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-10">
                <CourseDetails />
            </div>
            <Footer />
        </div>
    )
}

export default CourseDetail;
