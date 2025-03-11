// import React, { useState, useEffect } from 'react';
// import { formatDistanceToNow } from 'date-fns';

// const CleanClock: React.FC = () => {
//   const [startTime, setStartTime] = useState<Date | null>(null);

//   // Load start time from localStorage when the component mounts
//   useEffect(() => {
//     const savedStartTime = localStorage.getItem('cleanStartTime');
//     if (savedStartTime) {
//       setStartTime(new Date(savedStartTime));
//     }
//   }, []);

//   // Function to start/reset the timer
//   const handleStart = () => {
//     const newStartTime = new Date();
//     setStartTime(newStartTime);
//     localStorage.setItem('cleanStartTime', newStartTime.toISOString()); // Save to localStorage
//   };

//   return (
//     <div>
//       {!startTime ? (
//         <button onClick={handleStart}>Start Clean Journey</button>
//       ) : (
//         <>
//           <p>Time Clean: {formatDistanceToNow(startTime, { addSuffix: false })}</p>
//           <button onClick={handleStart}>Reset</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CleanClock;

import React, { useState, useEffect } from 'react';
// import { formatDistanceToNow } from 'date-fns';
import { splitTimeClean } from "../constants/functions.tsx";

interface CleanClockProps {
    timeClean: string;
}

const CleanClock: React.FC<CleanClockProps> = ({ timeClean }) => {

    const { value, unit } = splitTimeClean(timeClean);
    // const [startTime, setStartTime] = useState<Date | null>(null);
    // const [timeClean, setTimeClean] = useState('');

    // Load start time from localStorage when the component mounts
    // useEffect(() => {
    //     const savedStartTime = localStorage.getItem('cleanStartTime');
    //     if (savedStartTime) {
    //         setStartTime(new Date(savedStartTime));
    //     }
    // }, []);

    // Function to start/reset the timer
    // const handleStart = () => {
    //     const newStartTime = new Date();
    //     setStartTime(newStartTime);
    //     localStorage.setItem('cleanStartTime', newStartTime.toISOString());
    // };

    // Update the displayed time every second
    // useEffect(() => {
    //     if (!startTime) return;
    //     const interval = setInterval(() => {
    //         const now = new Date();
    //         const diffSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);

    //         if (diffSeconds < 60) {
    //             setTimeClean(`${diffSeconds} second${diffSeconds === 1 ? '' : 's'}`);
    //         } else {
    //             let distance = formatDistanceToNow(startTime, { addSuffix: false });
    //             // Remove words: about, over, almost
    //             distance = distance.replace(/\b(about|over|almost)\s*/gi, '');
    //             setTimeClean(distance);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [startTime]);

    return (
        <div>
            <p>Time Clean: {value}{" "}{unit}</p>
            {/* <button onClick={handleStart}>Reset</button> */}
        </div>
    );
};

export default CleanClock;
