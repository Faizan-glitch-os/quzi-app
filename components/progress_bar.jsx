import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, [onTimeout, timeout]);
  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prevoiusTime) => prevoiusTime - 10);
    }, 10);
  }, []);

  return (
    <progress id="question-time" max={timeout} value={remainingTime}></progress>
  );
}
