"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconArrowRight,
  IconBuilding,
  IconCalculator,
  IconCart,
  IconCertificate,
  IconChevronDown,
  IconCheck,
  IconDiamond,
  IconDocumentLines,
  IconExternal,
  IconGraduationCap,
  IconLaptop,
  IconMax,
  IconMenu,
  IconMonitor,
  IconPhone,
  IconPin,
  IconScale,
  IconShield,
  IconTarget,
  IconTelegram,
  IconUserCircle,
  IconUsers,
  IconVk,
  type IconProps,
} from "@/components/icons";
import { IpbLockup, LogoLockup } from "@/components/logo";
import { HeaderSearch } from "@/components/header-search";
import { VisionModeToggle } from "@/components/vision-mode-toggle";
import { orderLabel, useCart } from "@/lib/cart-context";

type Icon = (props: IconProps) => React.ReactElement;
type NavChild = { label: string; href: string; icon?: Icon };
type NavColumn = { title: string; children: NavChild[] };
type NavPromo = { title: string; text: string; cta: string; href: string };
type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  columns?: NavColumn[];
  promo?: NavPromo;
};

const PHONE_DISPLAY = "8 800 250-41-91";
const PHONE_HREF = "tel:88002504191";
const ADDRESS = "г. Тюмень, ул. Республики, 142";
/* Адрес прежнего сайта: подставить реальный, когда будет известен. */
const OLD_SITE_URL = "#";

/* Верхняя полоса: служебные ссылки, как в референсе. */
const utilityLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Новости", href: "/news" },
  { label: "Документы", href: "/about/documents" },
  { label: "Вопросы и ответы", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
  { label: "Старая версия сайта", href: OLD_SITE_URL, external: true },
];

const socialLinks: { label: string; href: string; icon: Icon }[] = [
  { label: "ВКонтакте", href: "#", icon: IconVk },
  { label: "Telegram", href: "#", icon: IconTelegram },
  { label: "MAX", href: "#", icon: IconMax },
];

/* Основное меню: Обучение ▾ · Расписание · О центре ▾ · Услуги ▾.
   «Контакты» и «Корпоративное обучение» здесь не дублируются: контакты — в верхней
   полосе, корпоративное обучение — внутри «Услуг». */
const navItems: NavItem[] = [
  {
    label: "Обучение",
    columns: [
      {
        title: "Форматы",
        children: [
          { label: "Семинары", href: "/training/seminars", icon: IconCertificate },
          { label: "Вебинары", href: "/training/webinars", icon: IconMonitor },
          { label: "Курсы", href: "/training/courses", icon: IconGraduationCap },
          { label: "Дистанционное обучение", href: "/training/distance", icon: IconLaptop },
        ],
      },
      {
        title: "Направления",
        children: [
          { label: "Бухгалтерский учёт и налоги", href: "/schedule?q=бухгалтер#programs", icon: IconCalculator },
          { label: "Кадровое дело", href: "/schedule?q=кадров#programs", icon: IconUsers },
          { label: "Юристам", href: "/schedule?q=юрис#programs", icon: IconScale },
          { label: "Руководителям", href: "/schedule?q=руководител#programs", icon: IconTarget },
        ],
      },
    ],
    promo: {
      title: "С чего начать?",
      text: "Ближайшие семинары и вебинары уже открыты для записи",
      cta: "Смотреть расписание",
      href: "/schedule",
    },
  },
  { label: "Расписание", href: "/schedule" },
  {
    label: "О центре",
    children: [
      { label: "О нас", href: "/about" },
      { label: "Преподаватели", href: "/about/teachers" },
      { label: "Документы", href: "/about/documents" },
      { label: "Отзывы", href: "/reviews" },
      { label: "Новости", href: "/news" },
      { label: "Вопросы и ответы", href: "/faq" },
      { label: "ИПБ России", href: "/ipb-russia" },
    ],
  },
  {
    label: "Услуги",
    columns: [
      {
        title: "Аттестация ИПБ",
        children: [
          { label: "Пройти аттестацию", href: "/attestation", icon: IconShield },
          { label: "Продлить аттестат", href: "/attestation/renewal", icon: IconDocumentLines },
          { label: "Результаты аттестации", href: "/attestation/results", icon: IconCheck },
        ],
      },
      {
        title: "Компаниям",
        children: [
          { label: "Корпоративное обучение", href: "/corporate", icon: IconBuilding },
          { label: "Профессиональный конкурс", href: "/attestation/contest", icon: IconDiamond },
        ],
      },
    ],
    promo: {
      title: "Нужна консультация?",
      text: "Подскажем, какая услуга подходит, и поможем с документами",
      cta: "Связаться с нами",
      href: "/contacts",
    },
  },
];

function pathOf(href: string) {
  return href.split(/[?#]/)[0];
}

function isLinkActive(pathname: string, href: string) {
  const path = pathOf(href);
  return path !== "/" && (pathname === path || pathname.startsWith(`${path}/`));
}

function itemChildren(item: NavItem): NavChild[] {
  if (item.children) return item.children;
  if (item.columns) return item.columns.flatMap((c) => c.children);
  return [];
}

/* Пути, за которые отвечает пункт верхнего уровня («Расписание»): вложенные ссылки на них
   (направления в «Обучении») не должны подсвечивать ещё и родительское меню. */
const topLevelPaths = new Set(navItems.filter((i) => i.href).map((i) => pathOf(i.href!)));

function isNavItemActive(pathname: string, item: NavItem) {
  if (item.href) return isLinkActive(pathname, item.href);
  return itemChildren(item).some(
    (child) => !topLevelPaths.has(pathOf(child.href)) && isLinkActive(pathname, child.href),
  );
}

/* ---------- Верхняя полоса ---------- */

function SocialButtons({ size = "h-7 w-7" }: { size?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {socialLinks.map(({ label, href, icon: SocialIcon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className={`flex ${size} cursor-pointer items-center justify-center rounded-lg bg-ink text-white transition-colors hover:bg-blue`}
        >
          <SocialIcon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}

/** Английская версия ещё не готова: кнопка видна, но неактивна и честно говорит «скоро». */
function LanguageSwitch() {
  return (
    <span
      role="button"
      aria-disabled="true"
      title="Английская версия скоро"
      aria-label="English version, скоро"
      className="inline-flex h-9 cursor-default select-none items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-[0.8rem] font-semibold tracking-wide text-ink 2xl:pr-1.5"
    >
      EN
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-gold 2xl:hidden"
      />
      <span className="hidden rounded-full bg-gold/25 px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-gold-dark 2xl:inline">
        скоро
      </span>
    </span>
  );
}

function UtilityBar() {
  return (
    <div className="hidden border-b border-border bg-hero-band md:block">
      <div data-vision-wrap className="mx-auto flex h-11 max-w-[1680px] items-center gap-5 px-6 3xl:px-8">
        <a
          href="https://yandex.ru/maps/?text=Тюмень, ул. Республики, 142"
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 items-center gap-1.5 text-[0.84rem] text-ink transition-colors hover:text-blue md:max-lg:flex wide:flex"
        >
          <IconPin className="h-4 w-4 text-ink" />
          {ADDRESS}
        </a>

        <nav aria-label="Служебное меню" className="hidden items-center gap-4 xl:flex wide:ml-6 2xl:gap-5 3xl:ml-16 3xl:gap-6">
          {utilityLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-md bg-blue-tint px-2.5 text-[0.84rem] font-medium text-blue transition-colors hover:bg-blue hover:text-white"
              >
                {link.label}
                <IconExternal className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-[0.84rem] text-ink transition-colors hover:text-blue"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden lg:block">
            <SocialButtons />
          </div>
          <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-border lg:block" />
          <div className="hidden lg:block">
            <HeaderSearch labelClassName="hidden lg:max-xl:inline 2xl:inline" />
          </div>
          <LanguageSwitch />
          <VisionModeToggle />
        </div>
      </div>
    </div>
  );
}

/* ---------- Основная полоса ---------- */

/** Ссылка на заказ: кнопка в основной полосе справа от «Личного кабинета». */
function CartLink({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const { itemIds, bumpToken } = useCart();
  const count = itemIds.length;
  const justAdded = bumpToken > 0;

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `${orderLabel(count)}, программ: ${count}` : "Ваш заказ"}
      className={`relative shrink-0 cursor-pointer items-center justify-center transition-colors ${
        compact
          ? "h-7 w-7 rounded-md text-ink hover:text-blue"
          : "h-10 w-10 rounded-lg border border-border text-ink hover:border-blue hover:text-blue 3xl:h-11 3xl:w-11"
      } ${className}`}
    >
      <span key={bumpToken} className={`flex ${justAdded ? "animate-cart-bump" : ""}`}>
        <IconCart className={compact ? "h-4.5 w-4.5" : "h-5 w-5"} />
      </span>
      {count > 0 && (
        <span
          key={`badge-${bumpToken}`}
          className={`tabular absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue px-1 text-[0.7rem] font-semibold text-white ${
            justAdded ? "animate-cart-bump" : ""
          }`}
        >
          {count}
        </span>
      )}
      {justAdded && (
        <span
          key={`toast-${bumpToken}`}
          aria-hidden="true"
          className="animate-cart-toast pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-medium text-white shadow-lg"
        >
          Добавлено
        </span>
      )}
    </Link>
  );
}

function MegaMenuPanel({ columns, promo }: { columns: NavColumn[]; promo?: NavPromo }) {
  return (
    <div className="menu-panel absolute left-1/2 top-[calc(100%+0.25rem)] z-40 w-[42rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-2xl border border-border bg-surface p-2 shadow-xl">
      <div className={`grid ${promo ? "grid-cols-[1fr_1fr_13rem]" : "grid-cols-2"}`}>
        {columns.map((col, i) => (
          <div key={col.title} className={`p-3 ${i > 0 ? "border-l border-border" : ""}`}>
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              {col.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {col.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="group/link flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-ink/85 transition-colors hover:bg-blue-tint hover:text-blue"
                >
                  {child.icon && (
                    <child.icon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover/link:text-blue" />
                  )}
                  <span className="text-balance">{child.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {promo && (
          <div className="flex flex-col justify-between rounded-xl bg-blue-tint p-4">
            <div>
              <p className="text-sm font-semibold text-ink">{promo.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{promo.text}</p>
            </div>
            <Link
              href={promo.href}
              className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-dark"
            >
              {promo.cta}
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const desktopLinkBase =
  "relative flex h-10 cursor-pointer items-center gap-1 whitespace-nowrap px-2.5 text-[0.875rem] transition-colors 2xl:px-3 2xl:text-[0.95rem]";
/* Активный пункт: синий текст и подчёркивание, как «Расписание» в референсе. */
const desktopLinkActive =
  "font-medium text-blue after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-blue 2xl:after:inset-x-3";

function DesktopNavLink({ item, active }: { item: NavItem; active: boolean }) {
  if (!item.children && !item.columns) {
    return (
      <Link
        href={item.href!}
        aria-current={active ? "page" : undefined}
        className={`${desktopLinkBase} ${active ? desktopLinkActive : "text-ink hover:text-blue"}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <details name="desktop-nav" className={`group ${item.columns ? "" : "relative"}`}>
      <summary
        className={`${desktopLinkBase} list-none [&::-webkit-details-marker]:hidden ${
          active ? desktopLinkActive : "text-ink hover:text-blue"
        }`}
      >
        {item.label}
        <IconChevronDown className="h-3.5 w-3.5 text-muted transition-transform group-open:rotate-180" />
      </summary>

      {item.columns ? (
        <MegaMenuPanel columns={item.columns} promo={item.promo} />
      ) : (
        <div className="menu-panel absolute left-0 top-[calc(100%+0.5rem)] z-40 w-72 rounded-xl border border-border bg-surface p-2 shadow-lg">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="group/link flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-ink/85 transition-colors hover:bg-blue-tint hover:text-blue"
            >
              {child.icon && (
                <child.icon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover/link:text-blue" />
              )}
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </details>
  );
}

function PhoneBlock() {
  return (
    <a href={PHONE_HREF} className="group hidden items-center gap-2 xl:flex">
      <IconPhone className="h-4.5 w-4.5 shrink-0 text-ink transition-colors group-hover:text-blue" />
      <span className="text-left">
        <span className="tabular block whitespace-nowrap text-[1.05rem] font-bold leading-tight text-ink transition-colors group-hover:text-blue 3xl:text-[1.2rem]">
          {PHONE_DISPLAY}
        </span>
        <span className="block whitespace-nowrap text-[0.68rem] leading-tight text-body 3xl:text-[0.74rem]">
          Звонок по России бесплатный
        </span>
      </span>
    </a>
  );
}

function PhoneIconButton() {
  return (
    <a
      href={PHONE_HREF}
      aria-label={`Позвонить: ${PHONE_DISPLAY}, звонок по России бесплатный`}
      className="hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border text-ink transition-colors hover:border-blue hover:text-blue lg:flex xl:hidden"
    >
      <IconPhone className="h-5 w-5" />
    </a>
  );
}

function AccountButton() {
  return (
    <Link
      href="/account"
      aria-label="Личный кабинет"
      className="hidden h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue px-4 text-[0.875rem] font-medium text-white transition-colors hover:bg-blue-dark sm:flex 3xl:h-11 3xl:px-5 3xl:text-[0.95rem]"
    >
      <IconUserCircle className="h-4.5 w-4.5 shrink-0" />
      Личный кабинет
    </Link>
  );
}

/* ---------- Мобильное меню ---------- */

function MobileNavLink({ item, active }: { item: NavItem; active: boolean }) {
  if (!item.children && !item.columns) {
    return (
      <Link
        href={item.href!}
        aria-current={active ? "page" : undefined}
        className={`block rounded-md px-3 py-2.5 text-[0.95rem] ${
          active ? "font-medium text-blue" : "text-ink/85 hover:text-ink"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <details className="group/sub">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-2.5 text-[0.95rem] text-ink/85 [&::-webkit-details-marker]:hidden">
        {item.label}
        <IconChevronDown className="h-3.5 w-3.5 text-muted transition-transform group-open/sub:rotate-180" />
      </summary>
      <div className="ml-3 flex flex-col border-l border-border pl-3">
        {item.columns
          ? item.columns.map((col) => (
              <div key={col.title} className="mt-3 first:mt-0">
                <p className="px-3 pb-1 text-xs font-semibold text-ink">{col.title}</p>
                {col.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink/75 hover:text-ink"
                  >
                    {child.icon && <child.icon className="h-4 w-4 shrink-0 text-muted" />}
                    {child.label}
                  </Link>
                ))}
              </div>
            ))
          : item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-md px-3 py-2 text-sm text-ink/75 hover:text-ink"
              >
                {child.label}
              </Link>
            ))}
      </div>
    </details>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <details className="group relative lg:hidden">
      <summary
        aria-label="Открыть меню"
        className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-border text-ink [&::-webkit-details-marker]:hidden"
      >
        <IconMenu className="h-5 w-5" />
      </summary>
      <nav className="menu-panel absolute right-0 top-[calc(100%+0.75rem)] max-h-[75vh] w-80 overflow-y-auto rounded-xl border border-border bg-surface p-2 shadow-lg">
        <div className="px-1 pb-2 pt-1">
          <HeaderSearch variant="inline" />
        </div>
        {navItems.map((item) => (
          <MobileNavLink key={item.label} item={item} active={isNavItemActive(pathname, item)} />
        ))}

        <div className="mt-1 border-t border-border px-3 pb-2 pt-3">
          <a
            href="/account"
            className="flex items-center gap-2 rounded-lg bg-blue px-4 py-2.5 text-sm font-medium text-white sm:hidden"
          >
            <IconUserCircle className="h-4.5 w-4.5" />
            Личный кабинет
          </a>
          <a href={PHONE_HREF} className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink">
            <IconPhone className="h-4.5 w-4.5 text-blue" />
            {PHONE_DISPLAY}
          </a>
          <p className="ml-6.5 text-xs text-body">Звонок по России бесплатный</p>
          <p className="mt-3 flex items-start gap-2 text-sm text-ink/85">
            <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-blue" />
            {ADDRESS}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {utilityLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue hover:text-blue-dark"
                >
                  {link.label}
                  <IconExternal className="h-3.5 w-3.5" />
                </a>
              ) : (
                <Link key={link.label} href={link.href} className="text-sm text-body hover:text-blue">
                  {link.label}
                </Link>
              ),
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <SocialButtons size="h-9 w-9" />
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitch />
              <VisionModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </details>
  );
}

/* ---------- Шапка ---------- */

/** Раскрытые <details> шапки закрываются по клику в любом месте вне них и по Esc. */
function useCloseMenusOutside() {
  useEffect(() => {
    const openMenus = () =>
      document.querySelectorAll<HTMLDetailsElement>("[data-site-header] details[open]");
    const onPointerDown = (e: PointerEvent) => {
      openMenus().forEach((d) => {
        if (!d.contains(e.target as Node)) d.open = false;
      });
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") openMenus().forEach((d) => (d.open = false));
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}

export function SiteHeader() {
  const pathname = usePathname();
  useCloseMenusOutside();

  return (
    <>
      <a href="#main" className="skip-link">
        К содержанию
      </a>

      <UtilityBar />

      <header
        data-site-header
        className="sticky top-0 z-30 border-b border-border bg-surface shadow-[0_1px_0_rgba(16,24,40,0.02)]"
      >
        <div className="mx-auto flex h-20 max-w-[1680px] items-center gap-3 px-6 3xl:h-[5.5rem] 3xl:gap-5 3xl:px-8">
          <Link href="/" aria-label="Дом науки и техники, на главную" className="shrink-0">
            <LogoLockup />
          </Link>

          <div data-vision-hide className="hidden shrink-0 items-center gap-3 xl:flex 3xl:gap-5">
            <span aria-hidden="true" className="h-14 w-px bg-border" />
            <IpbLockup />
          </div>

          <nav aria-label="Основное меню" className="relative hidden flex-1 items-center justify-center gap-1 lg:flex 2xl:gap-2">
            {navItems.map((item) => (
              <DesktopNavLink key={item.label} item={item} active={isNavItemActive(pathname, item)} />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 3xl:gap-5">
            <PhoneBlock />
            <PhoneIconButton />
            <AccountButton />
            <CartLink className="flex" />
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </header>
    </>
  );
}
