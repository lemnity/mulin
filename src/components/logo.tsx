import Image from "next/image";
import ipbLogo from "../../public/ipb-logo.png";

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

/** Блок «Группа компаний» рядом с основным логотипом в шапке: подпись + фирменный знак ИПБ. */
export function IpbLockup() {
  return (
    <span className="inline-flex flex-col gap-1.5">
      <span className="text-[0.58rem] font-bold uppercase tracking-[0.07em] text-ink 3xl:text-[0.66rem]">
        Группа компаний
      </span>
      <Image
        src={ipbLogo}
        alt="Тюменский территориальный институт профессиональных бухгалтеров"
        className="h-10 w-auto 3xl:h-12"
        priority
      />
    </span>
  );
}
