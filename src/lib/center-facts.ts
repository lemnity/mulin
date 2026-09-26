import { programs } from "@/lib/programs";

/* «Более 25 лет» было вписано числом в четырёх местах — на обложке, в карточке поверх
   фото, в блоке «Почему выбирают нас» и впечатано в program-hero-photo.jpg. Центр работает
   с 1998 года, то есть в 2026-м это уже 28 лет: надпись устарела и продолжала бы устаревать
   каждый год. Считаем от года основания. */
export const FOUNDED_YEAR = 1998;

export function yearsOnMarket(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDED_YEAR;
}

/** «28 лет» / «21 год» / «22 года» — для подписи рядом с числом. */
export function yearsWord(years: number): string {
  const mod10 = years % 10;
  const mod100 = years % 100;
  if (mod10 === 1 && mod100 !== 11) return "год";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "года";
  return "лет";
}

/** Сколько программ в расписании — вместо расплывчатого «сотни программ ежегодно». */
export const programCount = programs.length;
