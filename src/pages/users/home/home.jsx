import Footer from "../../../components/users/footer/footer";
import HomePage from "../../../components/users/homepage/homepage";
import Navbar from "../../../components/users/navbar/navbar";



const Home = () => {
    console.log('kk')
    return (
        <>
            <Navbar />
            <div className="pt-20">
                <HomePage />
            </div>
            <Footer />
        </>
    )
}

export default Home;