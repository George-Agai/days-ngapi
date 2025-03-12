import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";
import { splitTimeClean } from "../constants/functions.tsx";
import Dotlottieanimation from "../components/dotlottieanimation.tsx"
const dog = "/animations/dog.lottie"

interface ResetCountProps {
    isOpen: boolean;
    onClose: () => void;
    timeClean: string;
    startDateFound?: boolean;
    resetButtonClicked: boolean;
}

const ResetCount: React.FC<ResetCountProps> = ({ isOpen, onClose, startDateFound, timeClean, resetButtonClicked }) => {
    const { value, unit } = splitTimeClean(timeClean);

    const [step, setStep] = useState<number>(1);
    const [count, setCount] = useState<number>(Number(value));
    console.log("resetButtonClicked", resetButtonClicked)
    console.log("count", count)
    console.log("value", value)

    useEffect(() => {
        if (value) {
            setCount(Number(value));
        }
    }, [value]);

    useEffect(() => {
        if (count > 0 && resetButtonClicked) {
            console.log("Timer running:", count)
            const timer = setTimeout(() => setCount(count - 1), 20); // Decrease every second
            return () => clearTimeout(timer);
        }
    }, [count, resetButtonClicked]);

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
                <div className="bottom-sheet-header">
                    <ChevronLeft className="close-icon" onClick={() => setStep(1)} style={{ opacity: 0 }} />
                    <p className="DMsans" style={{ fontSize: "15px", color: 'grey', fontWeight: 400 }}>Oops</p>
                    <X className="close-icon" onClick={onClose} />
                </div>

                {step === 1 && (
                    <div className="bottom-sheet-content">
                        <Dotlottieanimation animationPath={dog} speed={1.2} />

                        <h2 className="DMsans">Slight setback😔</h2>
                        <p className="DMsans"
                            style={{ lineHeight: 1.5, fontSize: "17px", color: "gray" }}
                        >
                            Even superheroes trip on their capes sometimes. Shake it off and keep going!
                        </p>

                        {startDateFound ?
                            <div>
                                <h1 className="number" style={{ marginTop: '30px' }}>{count}</h1>
                                <p className="days">{count == 0 ? "seconds" : `${unit}`}</p>
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

export default ResetCount;
