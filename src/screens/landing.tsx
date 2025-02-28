import { useState } from "react";
import BottomSheet from "../components/bottomsheet";
import Dotlottieanimation from "../components/dotlottieanimation.tsx"
const animals = "/animations/animals.lottie"
import logo from "../assets/images/logo.svg"
import avatar from "../assets/avatars/avatar6.png"

function Landing() {
    const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

    return (
        <div className="flex-column-align-center-justify-between main-container">

            <div className="flex-justify-between width100 navbar">
                <img src={logo} alt="image" style={{ width: "55px" }} />
                <img src={avatar} alt="image" style={{ width: "38px", border: "2px solid #867070", borderRadius: '50%' }} />
            </div>

            <div className="animal-animation-container flex-align-center">
                <Dotlottieanimation animationPath={animals} speed={1.8}/>
            </div>

            <div className="flex-column-align-center">
                <h1 className="number">2</h1>
                <p className="days">Hours</p>
                <p className="description">Alcohol free</p>
            </div>

            <div className="flex-column-align-center width100">
                <button onClick={() => setBottomSheetOpen(true)}>Start</button>
                <button className="reset-button">Reset</button>
            </div>

            <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setBottomSheetOpen(false)} />
        </div>
    )
}

export default Landing