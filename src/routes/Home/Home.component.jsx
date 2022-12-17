import "./Home.styles.scss";
import HeroImg from "../../Images/HeroSection.png"
import DescImg from "../../Images/Description.png"
import HabitsImg from "../../Images/Habits.png"
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <div className="section gray hero">
                <div className="left text center">
                    <h1>Create and Manage Personal Tasks</h1>
                    <p>Make managing tasks easier</p>
                </div>
                <div className="right">
                    <img src={HeroImg} alt="Hero" />
                </div>
            </div>
            <div className="section descriptionRegion">
                <div className="left">
                    <img src={DescImg} alt="Hero" />
                </div>
                <div className="right text center">
                    <h1>Add Descriptions</h1>
                    <p>To provide a concise and clear summary of your tasks</p>
                </div>
            </div>
            <div className="section gray midRegion">
                <div className="left text center">
                    <h1>Create Habits</h1>
                    <p>To keep your daily routine on track</p>
                </div>
                <div className="right">
                    <img src={HabitsImg} alt="Hero" />
                </div>
            </div>
            <div className="end">
                <h1>First website made using React by Dinesh</h1>
                <Link to='/Sign-up'><div className="custom-button">Sign up now</div></Link>
            </div>
        </div>
    )
}

export default Home;