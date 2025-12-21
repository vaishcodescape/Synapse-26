"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 md:gap-3">
        <TimeCard value="--" label="DAYS" />
        <Separator />
        <TimeCard value="--" label="HOURS" />
        <Separator />
        <TimeCard value="--" label="MINS" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <TimeCard value={formatNumber(timeLeft.days)} label="DAYS" />
      <Separator />
      <TimeCard value={formatNumber(timeLeft.hours)} label="HOURS" />
      <Separator />
      <TimeCard value={formatNumber(timeLeft.minutes)} label="MINS" />
    </div>
  );
}

function TimeCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="p-0 flex flex-col items-center">
        <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter font-mono tabular-nums">
          {value}
        </span>
        <Badge 
          variant="secondary" 
          className="mt-1 bg-transparent text-white/60 hover:bg-transparent text-[10px] md:text-xs tracking-[0.3em] font-normal border-none"
        >
          {label}
        </Badge>
      </CardContent>
    </Card>
  );
}

function Separator() {
  return (
    <span className="text-4xl md:text-6xl lg:text-7xl font-light text-white/40">
      :
    </span>
  );
}
