import { motion } from "framer-motion";

interface TargetPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const TargetPopup: React.FC<TargetPopupProps> = ({ onClose, isOpen }) => {
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
                <h3>Target Details</h3>
                <p>🎯 Target Days: 30</p>
                <p>📅 Start Date: Jan 1, 2024</p>
                <button onClick={onClose} className="close-button">Close</button>
            </motion.div>
        </>
    );
};

export default TargetPopup;