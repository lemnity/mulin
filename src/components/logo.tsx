/**
 * Фирменный знак «Дом науки и техники»: две синие «грани» и жёлтое основание.
 * Рисуется SVG, чтобы масштабироваться без потерь и краситься через currentColor.
 */
export function LogoMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="var(--blue)" d="M5 14 22 5.5v7.2L11.4 18v12.6L5 33.8Z" />
      <path fill="var(--blue)" d="M43 14 26 5.5v7.2L36.6 18v12.6l6.4 3.2Z" />
      <path fill="var(--blue-dark)" d="M11.4 30.6 18 27.3v6.6l-6.6 3.3Z" opacity="0.55" />
      <path fill="var(--blue-dark)" d="M36.6 30.6 30 27.3v6.6l6.6 3.3Z" opacity="0.55" />
      <path fill="var(--gold)" d="m24 29 8.4 4.2v7.2L24 44.6l-8.4-4.2v-7.2Z" />
      <path fill="var(--gold-dark)" d="M24 36.4v8.2l-8.4-4.2v-7.2Z" opacity="0.5" />
    </svg>
  );
}

export function LogoLockup({
  variant = "brand",
  textClassName = "text-[0.84rem] 3xl:text-[0.95rem]",
  markClassName = "h-11 w-11 3xl:h-12 3xl:w-12",
}: {
  variant?: "brand" | "light";
  textClassName?: string;
  markClassName?: string;
}) {
  const textColor = variant === "light" ? "text-white" : "text-ink";

  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={`shrink-0 ${markClassName}`} />
      <span
        className={`whitespace-nowrap font-extrabold uppercase leading-[1.1] tracking-tight ${textColor} ${textClassName}`}
      >
        Дом науки
        <br />и техники
      </span>
    </span>
  );
}

/** Эмблема ИПБ: жёлтое кольцо и синий «взлёт» птицы внутри. */
export function IpbEmblem({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true">
      <circle cx="28" cy="28" r="25" fill="#fff" stroke="var(--gold)" strokeWidth="4" />
      <circle cx="28" cy="28" r="20" fill="none" stroke="var(--blue)" strokeWidth="1.2" opacity="0.35" />
      <path
        fill="var(--blue)"
        d="M14 34c6.2-1.6 11-5.4 14.6-11.3 1.6-2.6 3.6-4.6 6.6-5.7-1.2 3.4-2.9 6.2-5.3 8.6 4.2-1 8.3-.3 12.1 2.1-5.6 1.4-10.6 4.2-14.8 8.3-3.6 3.6-8.4 5-13.2 4.2Z"
      />
      <path fill="var(--gold)" d="M31.3 20.6c1.5-1.5 3.2-2.4 5.3-2.9-.6 2-1.6 3.7-3 5.1-.8-.8-1.6-1.5-2.3-2.2Z" />
    </svg>
  );
}

/** Блок «Группа компаний» рядом с основным логотипом в шапке. */
export function IpbLockup() {
  return (
    <span className="inline-flex flex-col gap-1">
      <span className="text-[0.58rem] font-bold uppercase tracking-[0.07em] text-ink 3xl:text-[0.66rem]">
        Группа компаний
      </span>
      <span className="inline-flex items-center gap-1.5 3xl:gap-2">
        <IpbEmblem className="h-10 w-10 shrink-0 3xl:h-13 3xl:w-13" />
        <span className="flex flex-col leading-none">
          <span className="text-[0.44rem] font-bold uppercase tracking-[0.04em] text-blue 3xl:text-[0.52rem]">
            Тюменский территориальный институт
          </span>
          <span className="mt-0.5 text-[0.68rem] font-extrabold uppercase leading-[1.05] tracking-tight text-gold-dark 3xl:mt-1 3xl:text-[0.86rem]">
            Профессиональных
            <br />
            бухгалтеров
          </span>
        </span>
      </span>
    </span>
  );
}
