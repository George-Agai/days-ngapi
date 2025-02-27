import { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
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
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

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
                transition={{ type: "spring", stiffness: 50 }}
            >
                {/* Header */}
                <div className="bottom-sheet-header">
                    <h2>Step {step} of 2</h2>
                    {/* <img src={avatar1} alt="Hourglass" className="close-icon" onClick={onClose} /> */}
                    <X className="close-icon" onClick={onClose} />
                </div>

                {/* Step 1: Form */}
                {step === 1 && (
                    <div className="bottom-sheet-content">
                        <img src={avatar1} alt="Hourglass" className="hourglass" />
                        <p className="instruction">Please provide the following information</p>

                        <form className="flex-column-align-center width100" style={{border: "1px solid red"}}>
                            <label>Username*</label>
                            <input type="text" placeholder="Enter your username" />

                            <label>What are you trying to stop?</label>
                            <input type="text" placeholder="Alcohol/Smoking" />

                            <label>Target Period</label>
                            <div className="target-period">
                                <input type="number" placeholder="6" />
                                <select defaultValue="Months">
                                    <option>Days</option>
                                    <option>Weeks</option>
                                    <option>Months</option>
                                    <option>Years</option>
                                </select>
                            </div>

                            <button type="button" onClick={() => setStep(2)}>Next</button>
                        </form>
                    </div>
                )}

                {/* Step 2: Avatar Selection */}
                {step === 2 && (
                    <div className="bottom-sheet-content">
                        <img src={avatar6} alt="User" className="user-icon" />
                        <p className="instruction">Please select your avatar</p>
                        {/* <button type="button" onClick={() => setStep(3)}>Finish</button> */}
                        <div className="avatar-grid">
                            {avatars.map((avatar, index) => (
                                <div key={index} className={`avatar ${selectedAvatar === avatar ? "selected" : ""}`} onClick={() => setSelectedAvatar(avatar)}>
                                    <img src={avatar} alt={`Avatar ${index + 1}`} className="avatar-image"/>
                                    {selectedAvatar === avatar && <CheckCircle className="checkmark" />}
                                </div>
                            ))}
                        </div>

                        <button type="button" onClick={() => setStep(3)}>Finish</button>
                    </div>
                )}

                {/* Step 3: Success Message */}
                {step === 3 && (
                    <div className="bottom-sheet-content">
                        {/* <img src={avatar6} alt="User" className="success-icon" /> */}
                        <CheckCircle className="success-icon" />
                        <h2>Congratulations</h2>
                        <p>You just made the first step towards freedom.</p>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default BottomSheet;
