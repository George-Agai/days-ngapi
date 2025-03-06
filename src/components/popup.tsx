import { motion } from "framer-motion";
// import Clock from "./clock"
import Duration from "./duration.tsx";

interface TargetPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const TargetPopup: React.FC<TargetPopupProps> = ({ onClose, isOpen }) => {
    
    const journeyStart = new Date(new Date().getTime() - (1 * 86400 + 2 * 3600 + 15 * 60) * 1000);
    return (
        <>
            {isOpen && <div className="overlay" onClick={onClose}></div>}

            <motion.div
                className="target-popup"
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
            >
                <span className="flex-justify-end duration-span">
                    {/* <h1 className="popup-number">2</h1>
                    <p className="days">Hours</p>
                    <h1 className="popup-number">12</h1>
                    <p className="days">Minutes</p> */}

                    {/* <Clock/> */}

                    <Duration startDate={journeyStart} />
                </span>

                <p>🎯 Target Days: 30</p>
                <p>📅 Start Date: Jan 1, 2024</p>
                <button onClick={onClose} className="close-button">Close</button>
            </motion.div>
        </>
    );
};

export default TargetPopup;