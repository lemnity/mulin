"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Число, которое «набегает» от нуля до значения, когда попадает на экран.
 * value — строка вида «1976», «85 000+», «№ 053»: анимируется числовая часть, префикс/суффикс
 * и ведущие нули сохраняются. В разметке сервера сразу итоговое значение (без JS и при
 * prefers-reduced-motion оно и остаётся), сброс к нулю — до первой отрисовки, без мигания.
 */
export function CountUp({
  value,
  durationMs = 1600,
  delayMs = 0,
  className = "",
}: {
  value: string;
  durationMs?: number;
  delayMs?: number;
  className?: string;
}) {
  const match = value.match(/^(\D*)([\d\s ]+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const digits = (match?.[2] ?? "").replace(/[\s ]/g, "");
  const suffix = match?.[3] ?? "";
  const target = Number(digits) || 0;
  const pad = digits.startsWith("0") ? digits.length : 0;
  const grouped = /[\s ]/.test(match?.[2] ?? "");

  const ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const format = (n: number) => {
    if (grouped) return new Intl.NumberFormat("ru-RU").format(n);
    return pad ? String(n).padStart(pad, "0") : String(n);
  };

  useLayoutEffect(() => {
    const el = ref.current;
    const textEl = textRef.current;
    if (!el || !textEl || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Прямая запись в DOM: анимация чисто визуальная, без лишних ререндеров React.
    const show = (n: number) => {
      textEl.textContent = `${prefix}${format(n)}${suffix}`;
    };
    show(0);
    let frame = 0;
    let timer = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        show(Math.round(target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(run, delayMs);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- запускаем один раз для исходного значения
  }, []);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span ref={textRef} aria-hidden="true">
        {prefix}
        {format(target)}
        {suffix}
      </span>
    </span>
  );
}
