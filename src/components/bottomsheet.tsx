import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, ChevronLeft } from "lucide-react";
import Dotlottieanimation from "../components/dotlottieanimation.tsx"
import { splitTimeClean } from "../constants/functions.tsx";
const cat = "/animations/cat.lottie"
const confetti = "/animations/confetti.lottie"
const hourglass = "/animations/hourglass.lottie"
import avatar1 from "../assets/avatars/avatar1.png";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import avatar4 from "../assets/avatars/avatar4.png";
import avatar5 from "../assets/avatars/avatar5.png";
import avatar6 from "../assets/avatars/avatar6.png";
import avatar7 from "../assets/avatars/avatar7.png";
import avatar8 from "../assets/avatars/avatar8.png";
import avatar9 from "../assets/avatars/avatar9.png";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated?: boolean;
    timeClean: string;
    startDateFound?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, isAuthenticated, timeClean, startDateFound }) => {
    const [step, setStep] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(avatar6);

    const { value, unit } = splitTimeClean(timeClean);

    useEffect(() => {
        if (!isAuthenticated) {
            setStep(1)
        }
        else setStep(3)
    }, [])

    return (
        <>
            {isOpen && <div className="overlay" onClick={onClose}></div>}

            <motion.div
                className="bottom-sheet"
                initial={{ y: "100%" }}
                animate={{ y: isOpen ? "10%" : "110%" }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
                {/* Header */}
                <div className="bottom-sheet-header">
                    <ChevronLeft className="close-icon" onClick={() => setStep(1)} style={{ opacity: step === 2 ? 1 : 0 }} />
                    <p className="DMsans" style={{ fontSize: "15px", color: 'grey', fontWeight: 400 }}>{step === 3 ? "You did it🎉" : `Step ${step} of 2`}</p>
                    <X className="close-icon" onClick={onClose} />
                </div>

                {/* Step 1: Form */}
                {step === 1 && (
                    <div className="bottom-sheet-content">
                        <div id="emptyspace"></div>
                        <Dotlottieanimation animationPath={cat} speed={1.8} />

                        <p className="instruction DMsans">Please provide the following information</p>

                        <form className="flex-column-align-center width100 form DMsans">
                            <label>Username</label>
                            <input type="text" placeholder="Enter your username" className="input" />

                            <label>What are you trying to stop?</label>
                            <input type="text" placeholder="Alcohol/Smoking" />

                            <label>Target Period</label>
                            <div className="target-period flex-align-center">
                                <input type="number" placeholder="6" />
                                <select defaultValue="Months">
                                    <option>Days</option>
                                    <option>Weeks</option>
                                    <option>Months</option>
                                    <option>Years</option>
                                </select>
                            </div>

                            <button style={{ marginTop: '10px' }} type="button" onClick={() => setStep(2)}>Next</button>
                        </form>
                    </div>
                )}

                {/* Step 2: Avatar Selection */}
                {step === 2 && (
                    <div className="bottom-sheet-content">
                        <img src={selectedAvatar} alt="User" className="user-icon" style={{ border: "2px solid #867070", borderRadius: '50%' }} />
                        <p className="instruction DMsans">Please select your avatar</p>
                        <div className="avatar-grid">
                            {avatars.map((avatar, index) => (
                                <div key={index} className={`avatar flex-align-center ${selectedAvatar === avatar ? "selected" : ""}`} onClick={() => setSelectedAvatar(avatar)}>
                                    <img src={avatar} alt={`Avatar ${index + 1}`} className="avatar-image" />
                                    {selectedAvatar === avatar && <CheckCircle className="checkmark" />}
                                </div>
                            ))}
                        </div>

                        <button style={{ marginTop: '30px' }} type="button" onClick={() => setStep(3)}>Finish</button>
                    </div>
                )}

                {/* Step 3: Success Message */}
                {step === 3 && (
                    <div className="bottom-sheet-content">
                        <div className="floating-animation">
                            <Dotlottieanimation animationPath={confetti} speed={0.5} />
                        </div>
                        <div className="hourglass-div">
                            <Dotlottieanimation animationPath={hourglass} />
                        </div>

                        <h2 className="DMsans">Congratulations🎊</h2>
                        <p className="DMsans" style={{ lineHeight: 1.5, fontSize: "17px", color: "gray" }}>You've taken the first step towards freedom and a better you.</p>

                        {startDateFound ?
                            <div>
                                <h1 className="number" style={{ marginTop: '30px' }}>{value}</h1>
                                <p className="days">{unit}</p>
                            </div>
                            :
                            <div>
                                <h1 className="number" style={{ marginTop: '30px' }}>0</h1>
                                <p className="days">seconds</p>
                            </div>}
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default BottomSheet;
