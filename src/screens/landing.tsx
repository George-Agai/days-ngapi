import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import BottomSheet from "../components/bottomsheet";
import ResetBottomSheet from "../components/resetcount";
import Popup from "../components/popup";
import Dotlottieanimation from "../components/dotlottieanimation.tsx"
import logo from "../assets/images/logo.svg"
import avatar from "../assets/avatars/avatar6.png"
import { splitTimeClean } from "../constants/functions.tsx";
const animals = "/animations/animals.lottie"

function Landing() {
    const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [isResetBottomSheetOpen, setResetBottomSheetOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [timeClean, setTimeClean] = useState('');
    const [startDateFound, setStartDateFound] = useState(false)
    const [resetButtonClicked, setResetButtonClicked] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    useEffect(() => {
        const savedStartTime = localStorage.getItem('cleanStartTime');
        if (savedStartTime) {
            setStartDateFound(true)
            setStartTime(new Date(savedStartTime));
        }
    }, []);

    const handleStart = () => {
        setIsAuthenticated(true)
        if (isAuthenticated && !startDateFound) {
            const newStartTime = new Date();
            setStartTime(newStartTime);
            localStorage.setItem('cleanStartTime', newStartTime.toISOString());
        }
        setBottomSheetOpen(true)
    };

    const handleReset = () => {
        setResetButtonClicked(true)
        setResetBottomSheetOpen(true)
        // localStorage.removeItem('cleanStartTime')
    }

    const handleResetBottomSheetClosed = () => {
        setResetButtonClicked(false)
        setResetBottomSheetOpen(false)
    }

    useEffect(() => {
        if (!startTime) return;
        const interval = setInterval(() => {
            const now = new Date();
            const diffSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);

            if (diffSeconds < 60) {
                setTimeClean(`${diffSeconds} second${diffSeconds === 1 ? '' : 's'}`);
            } else {
                let distance = formatDistanceToNow(startTime, { addSuffix: false });
                // Remove words: about, over, almost
                distance = distance.replace(/\b(about|over|almost)\s*/gi, '');
                setTimeClean(distance);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    const { value, unit } = splitTimeClean(timeClean);

    return (
        <div className="flex-column-align-center-justify-between main-container">

            <div className="flex-justify-between width100 navbar">
                <img src={logo} alt="image" style={{ width: "55px" }} />
                <img src={avatar} alt="image" style={{ width: "38px", border: "2px solid #867070", borderRadius: '50%' }} />
            </div>

            <div className="animal-animation-container flex-align-center">
                <Dotlottieanimation animationPath={animals} speed={1.8} />
            </div>

            {startDateFound ?
                <div className="flex-column-align-center duration-landing" onClick={() => setIsPopupOpen(true)}>
                    <h1 className="number">{value}</h1>
                    <p className="days">{unit}</p>
                    <p className="description">Alcohol free</p>
                </div>
                :
                <div className="flex-column-align-center duration-landing" onClick={() => setIsPopupOpen(true)}>
                    <h1 className="number">0</h1>
                    <p className="days">seconds</p>
                    <p className="description">Alcohol free</p>
                </div>}

            {isPopupOpen && <Popup isOpen={isPopupOpen} startDateFound={startDateFound} timeClean={timeClean} onClose={() => setIsPopupOpen(false)} />}

            <div className="flex-column-align-center width100">
                <button onClick={() => handleStart()}>Start</button>
                <button className="reset-button" onClick={handleReset}>Reset</button>
            </div>

            <BottomSheet isOpen={isBottomSheetOpen} startDateFound={startDateFound} timeClean={timeClean} isAuthenticated={isAuthenticated} onClose={() => setBottomSheetOpen(false)} />

            <ResetBottomSheet isOpen={isResetBottomSheetOpen} startDateFound={startDateFound} timeClean={timeClean} resetButtonClicked={resetButtonClicked} onClose={handleResetBottomSheetClosed} />
        </div>
    )
}

export default Landing