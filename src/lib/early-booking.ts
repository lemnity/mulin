import type { Program } from "@/lib/programs";

/* Раньше «горящая цена» держалась на двух допущениях, и оба были неверными.

   Первое: скидку показывали у programs[0] — то есть у той программы, которая случайно
   оказалась первой в выгрузке. При сортировке по цене или по дате плашка оставалась на
   ней же, хотя к сроку и стоимости это отношения не имело.

   Второе: «старую» цену считали как price × 1.2. Такой зачёркнутой цены никогда не
   существовало, а показывать выдуманную скидку — прямой путь под статью 14.3 КоАП
   (недостоверная реклама). Поэтому зачёркнутая цена показывается только там, где
   в данных есть настоящая прежняя цена; выдумывать её мы перестали.

   Что осталось: честный срок раннего бронирования, посчитанный от даты программы. */

/** За сколько дней до начала заканчивается цена раннего бронирования. */
const EARLY_BIRD_DAYS = 7;

/** Ближе этого срока к старту раннее бронирование уже не предлагаем. */
const MIN_LEAD_DAYS = 10;

export type EarlyBooking = {
  /** Последний день, когда действует цена. */
  deadline: Date;
  /** Сколько суток осталось на момент рендера (на сервере — от даты сборки). */
  daysLeft: number;
};

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseProgramDate(program: Program): Date | null {
  const [y, m, d] = program.dateISO.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

/**
 * Срок раннего бронирования — за неделю до начала, и только если до старта ещё далеко.
 * `now` передаётся явно: компонент считает его один раз, чтобы разметка на сервере и
 * на клиенте совпала и не возникло расхождения гидрации.
 */
export function getEarlyBooking(program: Program, now: Date): EarlyBooking | null {
  const eventDate = parseProgramDate(program);
  if (!eventDate) return null;

  const today = startOfDay(now);
  const leadDays = Math.round((eventDate.getTime() - today.getTime()) / 86_400_000);
  if (leadDays < MIN_LEAD_DAYS) return null;

  const deadline = new Date(eventDate);
  deadline.setDate(deadline.getDate() - EARLY_BIRD_DAYS);

  const daysLeft = Math.round((startOfDay(deadline).getTime() - today.getTime()) / 86_400_000);
  if (daysLeft <= 0) return null;

  return { deadline, daysLeft };
}

const dayMonth = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

/** «до 19 сентября» — дата вместо тикающих секунд: в каталоге счётчик выглядит навязчиво. */
export function earlyBookingLabel(booking: EarlyBooking): string {
  return `Цена действует до ${dayMonth.format(booking.deadline)}`;
}

/** «осталось 5 дней» — склонение для короткой подписи. */
export function daysLeftLabel(daysLeft: number): string {
  const mod10 = daysLeft % 10;
  const mod100 = daysLeft % 100;
  if (mod10 === 1 && mod100 !== 11) return `остался ${daysLeft} день`;
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `осталось ${daysLeft} дня`;
  return `осталось ${daysLeft} дней`;
}
