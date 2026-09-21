import Image from "next/image";
import heroPhoto from "../../public/hero-photo.jpg";

export function HeroPhoto() {
  return (
    <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-2xl">
      <Image
        src={heroPhoto}
        alt="«Знания сегодня — стабильность завтра». Более 25 лет развиваем профессионалов"
        fill
        sizes="(min-width: 1024px) 480px, 90vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
