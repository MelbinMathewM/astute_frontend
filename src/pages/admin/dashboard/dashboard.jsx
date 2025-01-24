import DashboardPart from "../../../components/admin/dashboardpart/dashboardpart";
import Footer from "../../../components/admin/footer/footer";
import Navbar from "../../../components/admin/navbar/navbar";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <DashboardPart />
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;