import { IconArrowRight, IconCheck, IconMail } from "@/components/icons";
import { SocialTiles } from "@/components/social-links";
import { handwriting } from "@/lib/fonts";

const perks = [
  ["Актуальные", "мероприятия"],
  ["Новые программы", "обучения"],
  ["Полезные материалы", "и рекомендации"],
];

/** Объёмный полупрозрачный конверт — декоративный. */
function EnvelopeArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 230" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nl-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5F9FF" />
          <stop offset="1" stopColor="#CFDFFA" />
        </linearGradient>
        <linearGradient id="nl-flap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E4EDFD" />
        </linearGradient>
        <linearGradient id="nl-fold" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#C3D6F8" />
          <stop offset="1" stopColor="#EAF1FE" />
        </linearGradient>
        <filter id="nl-shadow" x="-40%" y="-80%" width="180%" height="260%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Тень */}
      <ellipse cx="160" cy="206" rx="104" ry="12" fill="#9DB8EA" opacity="0.35" filter="url(#nl-shadow)" />

      {/* Конверт */}
      <g transform="translate(46 30) rotate(-10 114 78)">
        <rect width="228" height="156" rx="22" fill="url(#nl-body)" />
        <path d="M8 146 L114 70 L220 146 Q220 156 204 156 H24 Q8 156 8 146Z" fill="url(#nl-fold)" opacity="0.9" />
        <path d="M6 16 Q6 0 22 0 H206 Q222 0 222 16 L129 90 Q114 102 99 90Z" fill="url(#nl-flap)" />
        <path d="M6 16 L99 90 Q114 102 129 90 L222 16" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.85" />
        <rect width="228" height="156" rx="22" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
      </g>

      {/* Акцентные штрихи */}
      <path d="M284 34 L298 14" stroke="#6FA2F4" strokeWidth="5" strokeLinecap="round" />
      <path d="M290 62 L312 60" stroke="#6FA2F4" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function NewsletterBand() {
  return (
    <section className="relative mt-16 rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] px-6 py-8 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)] sm:px-8 xl:px-10 xl:py-10">
      <div className="grid gap-8 xl:grid-cols-[auto_minmax(0,1fr)_22rem] xl:gap-0">
        {/* Значок */}
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#E8F0FD] text-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] xl:mr-8 xl:h-24 xl:w-24 xl:rounded-[1.75rem]">
          <IconMail className="h-10 w-10 [stroke-width:1.6] xl:h-12 xl:w-12" />
        </span>

        {/* Основной столбец: заголовок → подзаголовок → форма → что вы получите */}
        <div className="xl:pr-10">
          <p className="text-[0.72rem] font-medium tracking-[0.28em] text-muted uppercase">Будьте в курсе</p>
          <h2 className="mt-3 max-w-[30ch] text-[1.5rem] font-extrabold leading-[1.18] tracking-tight text-ink sm:text-[1.65rem]">
            Получайте последние новости, анонсы событий и специальные предложения
          </h2>
          <p className="mt-3 max-w-[56ch] text-[0.95rem] leading-relaxed text-body">
            Только самое важное о профессиональном обучении, мероприятиях и возможностях для вашего роста.
          </p>

          <form className="mt-6 flex w-full max-w-xl">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Ваш e-mail</span>
              <IconMail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
              <input
                type="email"
                required
                placeholder="Ваш e-mail"
                className="h-[3.25rem] w-full rounded-l-xl border border-r-0 border-[#D5DFEE] bg-surface pl-11 pr-3 text-[0.95rem] text-ink placeholder:text-muted focus:border-blue focus:outline-none sm:pl-12 sm:pr-4"
              />
            </label>
            <button
              type="submit"
              className="-ml-2 inline-flex h-[3.25rem] shrink-0 items-center gap-3 whitespace-nowrap rounded-xl bg-blue px-4 text-[0.95rem] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(30,99,221,0.6)] transition-colors hover:bg-blue-dark sm:px-6"
            >
              Подписаться
              <IconArrowRight className="hidden h-5 w-5 sm:block" />
            </button>
          </form>
          <p className="mt-2.5 text-[0.82rem] leading-relaxed text-body">
            Нажимая «Подписаться», вы соглашаетесь с{" "}
            <a href="#" className="text-blue underline underline-offset-2 hover:text-blue-dark">
              политикой конфиденциальности
            </a>
            .
          </p>

          <ul className="mt-7 flex flex-col gap-3 border-t border-[#DDE6F4] pt-6 sm:flex-row sm:gap-0 sm:divide-x sm:divide-[#DDE6F4]">
            {perks.map(([a, b]) => (
              <li key={a} className="flex items-center gap-2.5 sm:px-4 sm:first:pl-0 sm:last:pr-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E4EDFC] text-blue">
                  <IconCheck className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap text-[0.82rem] leading-snug text-ink">
                  {a}
                  <br />
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Другие способы подписки — с конвертом и пометкой */}
        <div className="flex flex-col justify-center border-t border-[#DDE6F4] pt-6 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
          <div className="relative mb-6 hidden xl:block">
            <EnvelopeArt className="ml-auto w-full max-w-[15.5rem]" />
            <p
              aria-hidden="true"
              className={`${handwriting.className} absolute -left-1 top-0 -rotate-[8deg] text-[1.3rem] leading-[1.05] text-blue-dark`}
            >
              Полезное
              <br />
              <span className="pl-2">каждую неделю</span>
              <svg viewBox="0 0 120 20" className="-ml-1 mt-0.5 h-3.5 w-24 text-blue" aria-hidden="true">
                <path d="M3 17C30 7 70 3 117 4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </p>
          </div>

          <p className="relative text-[0.95rem] text-body">Другие способы подписки</p>
          <SocialTiles className="relative mt-4" />
        </div>
      </div>
    </section>
  );
}
