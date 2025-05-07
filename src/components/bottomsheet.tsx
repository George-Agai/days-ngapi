import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, ChevronLeft } from "lucide-react";
import Dotlottieanimation from "../components/dotlottieanimation.tsx"
import { splitTimeClean } from "../constants/functions.tsx";
import axios from 'axios';
import { url } from "../constants/url"
const cat = "/animations/cat.lottie"
const confetti = "/animations/confetti.lottie"
const hourglass = "/animations/hourglass.lottie"
import avatar1 from "/avatars/avatar1.png";
import avatar2 from "/avatars/avatar2.png";
import avatar3 from "/avatars/avatar3.png";
import avatar4 from "/avatars/avatar4.png";
import avatar5 from "/avatars/avatar5.png";
import avatar6 from "/avatars/avatar6.png";
import avatar7 from "/avatars/avatar7.png";
import avatar8 from "/avatars/avatar8.png";
import avatar9 from "/avatars/avatar9.png";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

type userCallbackObject = {
    username: string,
    description: string,
    target: string,
    avatar: string,
    startDate: Date,
    token: string,
}

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated?: boolean;
    timeClean: string;
    startDateFound?: boolean;
    userCreatedCallback: (data: userCallbackObject) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, isAuthenticated, timeClean, startDateFound, userCreatedCallback }) => {
    const [step, setStep] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(avatar6);
    const [username, setUsername] = useState<string | "">("")
    const [description, setDescription] = useState<string | "">("")
    const [targetNumber, setTargetNumber] = useState<number | any>()
    const [targetPeriod, setTargetPeriod] = useState<string | "months">("months")

    const { value, unit } = splitTimeClean(timeClean);

    const saveToLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    useEffect(() => {
        if (!isAuthenticated) {
            setStep(1)
        }
        else setStep(3)
    }, [isAuthenticated])

    const handleCreateUser = async () => {
        try {
            const targetConcat = targetNumber.toString() + " " + targetPeriod;
            const user = {
                username,
                description,
                target: targetConcat,
                avatar: selectedAvatar
            }
            // console.log(user)
            // alert(`${user.username}${user.description}${user.target}${user.avatar}`)
            await axios.post(`${url}/createUser`, user)
                .then((response) => {
                    // console.log(response)
                    if (response.data.message == "User created") {
                        const startDate = new Date(response.data.savedUser.startDate);
                        const savedUser = {
                            username: response.data.savedUser.username,
                            description: response.data.savedUser.description,
                            target: response.data.savedUser.target,
                            avatar: response.data.savedUser.avatar,
                            startDate: startDate,
                            token: response.data.token
                        }

                        // console.log("savedUser-->", savedUser)

                        saveToLocalStorage('daysngapi_oxbz', savedUser);
                        userCreatedCallback(savedUser)
                        setStep(3)

                        // alert(`${savedUser.username} ${savedUser.description} ${savedUser.startDate} ${savedUser.target} ${savedUser.avatar} ${savedUser.token}`)
                    }
                })
                .catch(err => console.log(err))
            // setStep(3)
        } catch (error) {
            console.log(error)
        }
    }

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

                        <form className="flex-column-align-center width100 form DMsans" onSubmit={() => setStep(2)}>
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                className="input"
                                required={true}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <label>What are you trying to stop?</label>
                            <input
                                type="text"
                                placeholder="Example alcohol or smoking"
                                required={true}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <label>Target Period</label>
                            <div className="target-period flex-align-center">
                                <input
                                    type="number"
                                    placeholder="6"
                                    required={true}
                                    value={targetNumber}
                                    onChange={(e) => setTargetNumber(e.target.value)}
                                />
                                <select defaultValue="months" value={targetPeriod} onChange={(e) => setTargetPeriod(e.target.value)}>
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </select>
                            </div>

                            <button style={{ marginTop: '10px' }} type="submit">Next</button>
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

                        <button style={{ marginTop: '30px' }} type="button" onClick={handleCreateUser}>Finish</button>
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
                        <p className="DMsans" style={{ lineHeight: 1.5, fontSize: "17px", color: "gray", marginTop: '0px' }}>You've taken the first step towards freedom and a better you.</p>

                        {startDateFound ?
                            <div>
                                <h1 className="number" style={{ marginTop: '10px' }}>{value}</h1>
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
