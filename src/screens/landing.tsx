import Dotlottieanimation from "../components/dotlottieanimation.tsx"
const animals = "/animations/animals.lottie"
import logo from "../assets/images/logo.svg"

function Landing() {
    return (
        <div className="flex-column-align-center-justify-between main-container">

            <div className="flex-justify-between width100 navbar">
                <img src={logo} alt="image" style={{width: "55px"}}/>
                <p>Logo</p>
            </div>

            <Dotlottieanimation animationPath={animals} />

            <div  className="flex-column-align-center">
                <h1 className="number">2</h1>
                <p className="days">hours</p>
                <p className="description">Alcohol free</p>
            </div>

            <div className="flex-column-align-center width100">
                <button>Start</button>
                <button className="reset-button">Reset</button>
            </div>
        </div>
    )
}

export default Landing