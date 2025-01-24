import Footer from "../../../components/admin/footer/footer";
import Navbar from "../../../components/admin/navbar/navbar";
import APdfViewerPage from "../../../components/admin/viewnotes/viewnotes";

const AViewPdf = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <APdfViewerPage />
            </div>
            <Footer />
        </div>
    )
}

export default AViewPdf;