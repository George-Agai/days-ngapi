import { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, ChevronLeft } from "lucide-react";
import Dotlottieanimation from "../components/dotlottieanimation.tsx"
const cat = "/animations/cat.lottie"
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
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(avatar6);

    return (
        <>
            {/* Background Blur */}
            {isOpen && <div className="overlay" onClick={onClose}></div>}

            {/* Bottom Sheet */}
            <motion.div
                className="bottom-sheet"
                initial={{ y: "100%" }}
                animate={{ y: isOpen ? "10%" : "110%" }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
                {/* Header */}
                <div className="bottom-sheet-header">
                    <ChevronLeft className="close-icon" onClick={() => setStep(1)} style={{ opacity: step === 2 ? 1 : 0 }} />
                    <p className="DMsans" style={{ fontSize: "15px", color: 'grey', fontWeight: 400 }}>{step === 3 ? "Yaaay" : `Step ${step} of 2`}</p>
                    <X className="close-icon" onClick={onClose} />
                </div>

                {/* Step 1: Form */}
                {step === 1 && (
                    <div className="bottom-sheet-content">

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

                            <button style={{ marginTop: '20px' }} type="button" onClick={() => setStep(2)}>Next</button>
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
                                <div key={index} className={`avatar ${selectedAvatar === avatar ? "selected" : ""}`} onClick={() => setSelectedAvatar(avatar)}>
                                    <img src={avatar} alt={`Avatar ${index + 1}`} className="avatar-image" style={{ border: "1px solid lightgrey", borderRadius: '50%' }} />
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
                        {/* <img src={avatar6} alt="User" className="success-icon" /> */}
                        {/* <CheckCircle className="success-icon" /> */}
                        <div className="hourglass-div">
                            <Dotlottieanimation animationPath={hourglass} />
                        </div>
                        <h2>Congratulations</h2>
                        <p>You did it! You just made the first step towards freedom.</p>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default BottomSheet;
