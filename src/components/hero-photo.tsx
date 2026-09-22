import Image from "next/image";
import heroPhoto from "../../public/hero-photo.jpg";

export function HeroPhoto({
  className = "rounded-2xl",
  objectPosition = "center",
  priority = true,
}: {
  className?: string;
  /** Какую часть кадра показывать при обрезке (значение CSS object-position). */
  objectPosition?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative h-full min-h-[300px] w-full overflow-hidden ${className}`}>
      <Image
        src={heroPhoto}
        alt="Специалист за ноутбуком в светлом офисе"
        fill
        sizes="(min-width: 1024px) 560px, 90vw"
        className="object-cover"
        style={{ objectPosition }}
        priority={priority}
      />
    </div>
  );
}
