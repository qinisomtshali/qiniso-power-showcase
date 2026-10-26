import { useEffect, useState } from "react";
import { SITE } from "@/data/site";

const format = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: SITE.timeZone,
  }).format(new Date());

/** Live Johannesburg time, e.g. "14:32 SAST". */
const LocalTime = ({ className = "" }: { className?: string }) => {
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {time} SAST
    </span>
  );
};

export default LocalTime;
