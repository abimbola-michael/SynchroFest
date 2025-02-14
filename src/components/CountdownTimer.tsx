import { useEffect, useState } from "react";
import { convertStringToDate, formatCountdown } from "../utils/date_utils";

export default function CountdownTimer({
  dateTime,
  onCompletedCountdown,
}: {
  dateTime: string;
  onCompletedCountdown: () => void;
}) {
  const [time, setTime] = useState<number | null>(null);
  useEffect(() => {
    function startTimer() {
      return setInterval(() => {
        const startDate = convertStringToDate(dateTime);
        if (startDate == null) return;
        const nowDate = new Date();
        const remainingSeconds = startDate.getTime() - nowDate.getTime();

        setTime(remainingSeconds);
        if (remainingSeconds <= 0) {
          onCompletedCountdown();
          clearInterval(timer);
        }
      }, 1000);
    }
    const timer = startTimer();

    return () => {
      clearInterval(timer);
    };
  }, [dateTime, onCompletedCountdown]);

  return <span>{time ? formatCountdown(time) : ""}</span>;
}
