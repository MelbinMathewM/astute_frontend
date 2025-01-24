import AddNotesForm from "../../../components/admin/addnotes/addnotespart"
import Navbar from "../../../components/admin/navbar/navbar"
import Footer from "../../../components/admin/footer/footer";

const AddNotes = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20 pb-20">
                <AddNotesForm />
            </div>
            <Footer />
        </div>
    )
}

export default AddNotes;