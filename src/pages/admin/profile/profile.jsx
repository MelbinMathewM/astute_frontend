import Navbar from '../../../components/admin/navbar/navbar';
import Footer from '../../../components/admin/footer/footer'
import ProfilePart from '../../../components/admin/profilepart/profilepart';

const AProfile = () => {
    return (
        <div>
            <Navbar />
            <div className='pt-10'>
                <ProfilePart />
            </div>
            <Footer />
        </div>
    )
}

export default AProfile;