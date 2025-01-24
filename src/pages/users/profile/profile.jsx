import Footer from "../../../components/users/footer/footer"
import Navbar from "../../../components/users/navbar/navbar"
import ProfilePart from "../../../components/users/profile/profile"

const Profile = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <ProfilePart />
            </div>
            <Footer />
        </div>
    )
}

export default Profile;