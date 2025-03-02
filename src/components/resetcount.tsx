import { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, ChevronLeft } from "lucide-react";
import Dotlottieanimation from "../components/dotlottieanimation.tsx"
const dog = "/animations/dog.lottie"

interface ResetCountProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResetCount: React.FC<ResetCountProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);

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
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
                <div className="bottom-sheet-header">
                    <ChevronLeft className="close-icon" onClick={() => setStep(1)} style={{ opacity: 0 }} />
                    <p className="DMsans" style={{ fontSize: "15px", color: 'grey', fontWeight: 400 }}>Oops</p>
                    <X className="close-icon" onClick={onClose} />
                </div>

                {step === 1 && (
                    <div className="bottom-sheet-content">
                        <Dotlottieanimation animationPath={dog} speed={1.2}/>

                        <h2 className="DMsans">Slight setback😔</h2>
                        <p className="DMsans"
                            style={{ lineHeight: 1.5, fontSize: "17px", color: "gray" }}
                        >
                            Even superheroes trip on their capes sometimes. Shake it off and keep going!
                        </p>

                        <div>
                            <h1 className="number" style={{marginTop: '30px'}}>0</h1>
                            <p className="days">Seconds</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default ResetCount;
