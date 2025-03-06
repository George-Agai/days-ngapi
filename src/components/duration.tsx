import React, { useEffect, useState } from 'react';
import { getCleanDuration } from './getdurationfunction';

interface CleanDurationProps {
  startDate: Date;
}

const CleanDuration: React.FC<CleanDurationProps> = ({ startDate }) => {
  const [durationParts, setDurationParts] = useState<{ value: number; label: string }[]>([]);

  // Update the duration every second
  useEffect(() => {
    const updateDuration = () => {
      const parts = getCleanDuration(startDate);
      setDurationParts(parts);
    };

    updateDuration(); // Initial update
    const interval = setInterval(updateDuration, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
      {durationParts.map((part, index) => (
        <div key={index} style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>{part.value}</span>
          <span style={{ fontSize: "14px", marginLeft: "2px" }}>{part.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CleanDuration;
