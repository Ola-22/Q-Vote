import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;

  const startTimer = () => {
    const countDownDate = new Date("May 30,2022 ").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  });
  return (
    <div>
      <span>{timerDays}</span>
      <span>Days</span>
      <span>{timerHours}</span>
      <span>hours</span>
      <span>{timerMinutes}</span>
      <span>minutes</span>
      <span>{timerSeconds}</span>
      <span>seconds</span>
    </div>
  );
}

CountdownTimer.defaultProps = {
  timerDays: 10,
  timerHours: 10,
  timerMinutes: 10,
  timerSeconds: 10,
};
