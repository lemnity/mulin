import Image, { type StaticImageData } from "next/image";
import cover1 from "../../public/hero-cover.webp";
import cover2 from "../../public/hero-cover-2.webp";
import cover3 from "../../public/hero-cover-3.webp";

/**
 * Кадры обложки. position — какую часть широкого снимка оставить при обрезке
 * (для квадратной рамки на главной: лицо остаётся в правой части кадра).
 */
const slides: { src: StaticImageData; alt: string; position: string }[] = [
  { src: cover1, alt: "Специалист с ноутбуком в светлом офисе с видом на город", position: "95% center" },
  { src: cover2, alt: "Специалист изучает документ за рабочим столом", position: "65% center" },
  { src: cover3, alt: "Специалист разговаривает по телефону в офисе", position: "55% center" },
];

/**
 * Обложка-слайдер: бесконечная плавная смена кадров с медленным наездом камеры.
 * Только CSS (классы hero-slide / hero-dot в globals.css), без JS. При prefers-reduced-motion
 * показывается первый кадр без анимации.
 */
export function HeroPhoto({
  className = "rounded-2xl",
  priority = true,
  showIndicators = true,
}: {
  className?: string;
  priority?: boolean;
  showIndicators?: boolean;
}) {
  return (
    <div
      className={`relative h-full min-h-[300px] w-full overflow-hidden ${className}`}
      style={{ ["--hero-slides" as string]: slides.length }}
    >
      {slides.map((s, i) => (
        <div
          key={s.src.src}
          className="hero-slide absolute inset-0"
          style={{ ["--hero-i" as string]: i }}
          aria-hidden={i > 0 ? true : undefined}
        >
          <Image
            src={s.src}
            alt={i === 0 ? s.alt : ""}
            fill
            sizes="(min-width: 1024px) 640px, 90vw"
            className="object-cover"
            style={{ objectPosition: s.position }}
            priority={priority && i === 0}
          />
        </div>
      ))}

      {showIndicators && (
        <div aria-hidden="true" className="absolute bottom-4 left-4 z-10 flex gap-1.5">
          {slides.map((s, i) => (
            <span
              key={s.src.src}
              className="h-1.5 w-8 overflow-hidden rounded-full bg-ink/25 backdrop-blur-sm"
            >
              <span className="hero-dot block h-full w-full rounded-full bg-blue" style={{ ["--hero-i" as string]: i }} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
