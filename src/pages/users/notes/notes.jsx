import Footer from "../../../components/users/footer/footer"
import Navbar from "../../../components/users/navbar/navbar"
import NotesPage from "../../../components/users/notespage/notespage";

const Notes = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <NotesPage />
            </div>
            <Footer />
        </div>
    )
}

export default Notes;