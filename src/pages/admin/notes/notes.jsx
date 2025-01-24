import Footer from "../../../components/admin/footer/footer";
import Navbar from "../../../components/admin/navbar/navbar";
import NotesPart from "../../../components/admin/notespart/notespart";
import { ToastContainer } from "react-toastify";

const ANotes = () => {
    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="pt-10 pb-10">
                <NotesPart />
            </div>
            <Footer />
        </div>
    )
}

export default ANotes;