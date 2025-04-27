import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timeOut = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timeOut);
    };
  }, [onTimeout, timeout]);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevoiusTime) => prevoiusTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id="question-time" max={timeout} value={remainingTime}></progress>
  );
}
