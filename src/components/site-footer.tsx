import Link from "next/link";
import { IconChat, IconHeart, IconMail, IconPhone, IconPin } from "@/components/icons";
import { LogoLockup } from "@/components/logo";
import { ContactButton } from "@/components/contact-dialog";
import { SocialLinks } from "@/components/social-links";

const columns = [
  {
    title: "Обучение",
    links: [
      { label: "Семинары", href: "/training/seminars" },
      { label: "Курсы", href: "/training/courses" },
      { label: "Вебинары", href: "/training/webinars" },
      { label: "Корпоративное обучение", href: "/corporate" },
      { label: "Расписание", href: "/schedule" },
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
      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-110"
    >
      <svg viewBox="2 2 16 16" style={{ width: "56%", height: "56%" }} fill="currentColor" aria-hidden="true">
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
            <SocialLinks size="h-9 w-9" className="gap-2.5" />
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
              <span>
                Адрес: г. Тюмень
                <br />
                ул. Максима Горького, дом 59/3
              </span>
            </li>
            <li>Время работы: Пн–Пт 9:00–18:00 (Мск)</li>
          </ul>
          <ContactButton className="mt-5 inline-flex items-center gap-2 rounded-lg border border-footer-line px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white">
            <IconChat className="h-4 w-4" />
            Написать нам
          </ContactButton>
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
