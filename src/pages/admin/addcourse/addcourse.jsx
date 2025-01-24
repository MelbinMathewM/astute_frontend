import CourseForm from "../../../components/admin/addcourse/addcourse"
import Footer from "../../../components/admin/footer/footer";
import Navbar from "../../../components/admin/navbar/navbar"

const AddCourse = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <CourseForm />
            </div>
            <Footer />
        </div>
    )
}

export default AddCourse;