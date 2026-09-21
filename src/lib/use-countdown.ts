"use client";

import { useEffect, useState } from "react";

export const SPECIAL_PRICE_DEADLINE = "2026-10-01T00:00:00+03:00";

export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getRemaining(deadline: number): Remaining {
  const diff = deadline - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

export function useCountdown(deadlineISO: string) {
  const deadline = new Date(deadlineISO).getTime();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return remaining;
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function regularPriceFor(specialPrice: number) {
  return Math.round((specialPrice * 1.2) / 100) * 100;
}
