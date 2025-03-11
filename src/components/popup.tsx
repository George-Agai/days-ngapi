import { motion } from "framer-motion";
import { splitTimeClean } from "../constants/functions.tsx";
import Clock from "./clock"
// import Duration from "./duration.tsx";

interface TargetPopupProps {
    isOpen: boolean;
    onClose: () => void;
    timeClean: string
    startDateFound?: boolean
}

const TargetPopup: React.FC<TargetPopupProps> = ({ onClose, isOpen, timeClean, startDateFound }) => {

    const { value, unit } = splitTimeClean(timeClean);

    // const journeyStart = new Date(new Date().getTime() - (1 * 86400 + 2 * 3600 + 15 * 60) * 1000);
    return (
        <>
            {isOpen && <div className="overlay" onClick={onClose}></div>}

            <motion.div
                className="target-popup"
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
                {startDateFound ?
                    <span className="flex-justify-end duration-span">
                        <h1 className="popup-number">{value}</h1>
                        <p className="days" style={{ marginLeft: '5px' }}>{unit} clean</p>
                    </span>
                    :
                    <span className="flex-justify-end duration-span">
                        <h1 className="popup-number">0</h1>
                        <p className="days" style={{ marginLeft: '3px' }}>days clean</p>
                    </span>}

                <p>🎯 Target Days: 30</p>
                <p>📅 Start Date: Jan 1, 2024</p>
                <button onClick={onClose} className="close-button">Close</button>
            </motion.div>
        </>
    );
};

export default TargetPopup;