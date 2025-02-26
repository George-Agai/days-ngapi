import Dotlottieanimation from "../components/dotlottieanimation.tsx"
const animals = "/animations/animals.lottie"

function Landing() {
    return (
        <div className="flex-column-align-center-justify-between main-container">

            <div>
                <p>Logo</p>
            </div>

            <Dotlottieanimation animationPath={animals} />

            <div  className="flex-column-align-center">
                <h1>2</h1>
                <p>Days</p>
                <p>Description</p>
            </div>

            <div className="flex-column-align-center width100">
                <button>Start</button>
                <button className="reset-button">Reset</button>
            </div>
        </div>
    )
}

export default Landing