import Footer from "../../../components/users/footer/footer"
import Navbar from "../../../components/users/navbar/navbar"
import ViewNotes from "../../../components/users/viewnotes/viewnotes";

const ViewPdf = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <ViewNotes />
            </div>
            <Footer />
        </div>
    )
}

export default ViewPdf;