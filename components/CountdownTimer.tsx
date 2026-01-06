"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div
      className="
    countdown absolute
    bottom-[clamp(40px,7vw,55px)]
    left-[clamp(20px,5vw,50px)]
    flex
    gap-[clamp(12px,4vw,36px)]
  "
    >
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="relative flex flex-col gap-3 items-center"
        >
          <div
            className="
          font-joker
          leading-none
          tabular-nums
          text-[clamp(1.4rem,4.5vw,2.4rem)]
        "
          >
            {unit.value.toString().padStart(2, "0")}
          </div>
          <div
            className="
          font-joker
          opacity-85
          text-[clamp(0.65rem,2vw,1rem)]
        "
          >
            {unit.label}
          </div>
          {index !== timeUnits.length - 1 && (
            <span
              className="
            absolute
            left-full
            translate-x-[200%]
            font-joker
            leading-none
            text-[clamp(1.4rem,4.5vw,2.4rem)]
          "
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>

  );
}

