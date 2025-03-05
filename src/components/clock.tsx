import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const CleanClock: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Load start time from localStorage when the component mounts
  useEffect(() => {
    const savedStartTime = localStorage.getItem('cleanStartTime');
    if (savedStartTime) {
      setStartTime(new Date(savedStartTime));
    }
  }, []);

  // Function to start/reset the timer
  const handleStart = () => {
    const newStartTime = new Date();
    setStartTime(newStartTime);
    localStorage.setItem('cleanStartTime', newStartTime.toISOString()); // Save to localStorage
  };

  return (
    <div>
      {!startTime ? (
        <button onClick={handleStart}>Start Clean Journey</button>
      ) : (
        <>
          <p>Time Clean: {formatDistanceToNow(startTime, { addSuffix: false })}</p>
          <button onClick={handleStart}>Reset</button>
        </>
      )}
    </div>
  );
};

export default CleanClock;
