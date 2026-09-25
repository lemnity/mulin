import Image from "next/image";
import ipbLogo from "../../public/ipb-logo.png";
import logoMark from "../../public/logo-mark.png";

/** Фирменный знак «Дом науки и техники» (public/logo-mark.png, вертикальный 4:5). */
export function LogoMark({ className = "h-12 w-auto" }: { className?: string }) {
  return <Image src={logoMark} alt="" aria-hidden="true" className={className} priority />;
}

export function LogoLockup({
  variant = "brand",
  textClassName = "text-[0.84rem] 3xl:text-[0.95rem]",
  markClassName = "h-11 w-auto 3xl:h-12",
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
