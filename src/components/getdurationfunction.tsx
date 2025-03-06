interface DurationPart {
    value: number;
    label: string;
  }
  
  export function getCleanDuration(startDate: Date): DurationPart[] {
    const now = new Date();
    let diffSeconds = Math.floor((now.getTime() - startDate.getTime()) / 1000);
    
    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_WEEK = 604800; // 7 days
    const SECONDS_IN_MONTH = 2592000; // 30 days
    
    let parts: DurationPart[] = [];
    
    if (diffSeconds >= SECONDS_IN_MONTH) {
      // Calculate months, weeks, and days
      const months = Math.floor(diffSeconds / SECONDS_IN_MONTH);
      diffSeconds -= months * SECONDS_IN_MONTH;
      const weeks = Math.floor(diffSeconds / SECONDS_IN_WEEK);
      diffSeconds -= weeks * SECONDS_IN_WEEK;
      const days = Math.floor(diffSeconds / SECONDS_IN_DAY);
      
      parts.push({ value: months, label: months === 1 ? "month" : "months" });
      if (weeks > 0) parts.push({ value: weeks, label: weeks === 1 ? "week" : "weeks" });
      if (days > 0) parts.push({ value: days, label: days === 1 ? "day" : "days" });
    } else if (diffSeconds >= SECONDS_IN_DAY) {
      // Calculate days, hours, and minutes
      const days = Math.floor(diffSeconds / SECONDS_IN_DAY);
      diffSeconds -= days * SECONDS_IN_DAY;
      const hours = Math.floor(diffSeconds / SECONDS_IN_HOUR);
      diffSeconds -= hours * SECONDS_IN_HOUR;
      const minutes = Math.floor(diffSeconds / SECONDS_IN_MINUTE);
      
      parts.push({ value: days, label: days === 1 ? "day" : "days" });
      if (hours > 0) parts.push({ value: hours, label: hours === 1 ? "hour" : "hours" });
      if (minutes > 0) parts.push({ value: minutes, label: minutes === 1 ? "minute" : "minutes" });
    } else if (diffSeconds >= SECONDS_IN_HOUR) {
      // Calculate hours, minutes, and seconds
      const hours = Math.floor(diffSeconds / SECONDS_IN_HOUR);
      diffSeconds -= hours * SECONDS_IN_HOUR;
      const minutes = Math.floor(diffSeconds / SECONDS_IN_MINUTE);
      diffSeconds -= minutes * SECONDS_IN_MINUTE;
      const seconds = diffSeconds;
      
      parts.push({ value: hours, label: hours === 1 ? "hour" : "hours" });
      if (minutes > 0) parts.push({ value: minutes, label: minutes === 1 ? "minute" : "minutes" });
      if (seconds > 0) parts.push({ value: seconds, label: seconds === 1 ? "second" : "seconds" });
    } else if (diffSeconds >= SECONDS_IN_MINUTE) {
      // Calculate minutes and seconds
      const minutes = Math.floor(diffSeconds / SECONDS_IN_MINUTE);
      diffSeconds -= minutes * SECONDS_IN_MINUTE;
      const seconds = diffSeconds;
      
      parts.push({ value: minutes, label: minutes === 1 ? "minute" : "minutes" });
      if (seconds > 0) parts.push({ value: seconds, label: seconds === 1 ? "second" : "seconds" });
    } else {
      // Less than a minute: show seconds
      parts.push({ value: diffSeconds, label: diffSeconds === 1 ? "second" : "seconds" });
    }
    
    // Return only the first three parts
    return parts.slice(0, 3);
  }
  