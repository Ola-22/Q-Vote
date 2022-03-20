import { useEffect, useState } from "react";
import "./style.css";

export default function CountdownTimer({ date, src }) {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  // const [timerSeconds, setTimerSeconds] = useState();

  let interval;

  const startTimer = () => {
    const countDownDate = new Date(date).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      // const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        // setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    const abortCont = new AbortController();
    startTimer();
    return () => abortCont.abort();
  });
  return (
    <div className="count-timer">
      <span>{timerDays}</span>
      <span>:</span>
      <span>{timerHours}</span>
      <span>:</span>
      <span>{timerMinutes}</span>
      <img src={src} alt="" />
    </div>
  );
}

CountdownTimer.defaultProps = {
  timerDays: 10,
  timerHours: 10,
  timerMinutes: 10,
  // timerSeconds: 10,
};
