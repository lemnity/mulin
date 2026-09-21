import Link from "next/link";
import { IconChat, IconHeart, IconMail, IconPhone, IconPin } from "@/components/icons";
import { LogoLockup } from "@/components/logo";

const columns = [
  {
    title: "Обучение",
    links: [
      { label: "Семинары", href: "/training/seminars" },
      { label: "Курсы", href: "/training/courses" },
      { label: "Вебинары", href: "/training/webinars" },
      { label: "Корпоративное обучение", href: "/corporate" },
      { label: "Расписание", href: "/#programs" },
    ],
  },
  {
    title: "О центре",
    links: [
      { label: "О нас", href: "/about" },
      { label: "Преподаватели", href: "/about/teachers" },
      { label: "Документы", href: "/about/documents" },
      { label: "Отзывы", href: "/reviews" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
];

function SocialIcon({ label, path }: { label: string; path: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-footer-line text-footer-text transition-colors hover:border-white hover:text-white"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-footer-bg text-footer-text">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:px-10">
        <div>
          <LogoLockup variant="light" textClassName="text-base" />
          <p className="mt-4 max-w-[30ch] text-sm text-footer-text">
            Профессиональное образование для специалистов и бизнеса. С 1998 года.
          </p>
          <div className="mt-5 flex gap-2.5">
            <SocialIcon
              label="ВКонтакте"
              path="M10.5 15.2c-5 0-7.9-3.4-8-9.2h2.6c.1 4.2 2 6 3.4 6.4V6h2.5v3.6c1.4-.2 2.9-1.8 3.4-3.6h2.4c-.4 2.2-2 3.8-3.1 4.5 1.1.5 3 1.9 3.7 4.7h-2.7c-.6-1.8-2-3.2-3.7-3.4v3.4h-.3Z"
            />
            <SocialIcon
              label="Telegram"
              path="m3 9.8 13.4-5c.6-.2 1.2.2 1 1l-2.3 11c-.2.8-.7 1-1.3.6l-3.6-2.7-1.7 1.7c-.2.2-.4.3-.7.3l.2-3.6 6.6-6-8.2 5.1-3.2-1c-.7-.2-.7-1 .2-1.4Z"
            />
            <SocialIcon
              label="YouTube"
              path="M17.5 6.6a2.3 2.3 0 0 0-1.6-1.6C14.4 4.6 10 4.6 10 4.6s-4.4 0-5.9.4A2.3 2.3 0 0 0 2.5 6.6 24 24 0 0 0 2 10a24 24 0 0 0 .5 3.4c.2.8.8 1.4 1.6 1.6 1.5.4 5.9.4 5.9.4s4.4 0 5.9-.4a2.3 2.3 0 0 0 1.6-1.6c.3-1.1.5-2.3.5-3.4a24 24 0 0 0-.5-3.4ZM8.4 12.6V7.4L12.9 10Z"
            />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <span className="text-sm font-semibold text-white">{col.title}</span>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-footer-text hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="flex items-start justify-between gap-3">
            <span className="text-sm font-semibold text-white">Контакты</span>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-footer-text">
            <li className="flex items-start gap-2">
              <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <span>
                <a href="tel:88002504191" className="block font-medium text-white hover:underline">
                  8 800 250-41-91
                </a>
                <span className="text-xs text-footer-text">Звонок по России бесплатный</span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0 text-white" />
              <a href="mailto:info@tumtipb.ru" className="hover:text-white hover:underline">
                info@tumtipb.ru
              </a>
            </li>
            <li className="flex items-start gap-2">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <span>г. Тюмень, ул. Республики, 142</span>
            </li>
            <li>Время работы: Пн–Пт 9:00–18:00 (Мск)</li>
          </ul>
          <a
            href="#"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-footer-line px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white"
          >
            <IconChat className="h-4 w-4" />
            Написать нам
          </a>
        </div>
      </div>

      <div className="border-t border-footer-line px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-footer-text sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 ООО «Дом науки и техники». Все права защищены.</span>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="underline underline-offset-2 hover:text-white">
              Политика конфиденциальности
            </a>
            <a href="#" className="underline underline-offset-2 hover:text-white">
              Пользовательское соглашение
            </a>
            <a href="#" className="underline underline-offset-2 hover:text-white">
              Карта сайта
            </a>
            <span className="flex items-center gap-1.5">
              <IconHeart className="h-3.5 w-3.5 text-blue" />
              Создано с заботой о профессионалах
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
