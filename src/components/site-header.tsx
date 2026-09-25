"use client";

import { useEffect, useState } from "react";
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
  IconMenu,
  IconMonitor,
  IconPhone,
  IconPin,
  IconScale,
  IconShield,
  IconTarget,
  IconUserCircle,
  IconUsers,
  type IconProps,
} from "@/components/icons";
import { SocialLinks } from "@/components/social-links";
import { IpbLockup, LogoLockup } from "@/components/logo";
import { AccountMenu } from "@/components/account-menu";
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
const ADDRESS = "г. Тюмень, ул. Максима Горького, д. 59/3";
/* Адрес прежнего сайта: подставить реальный, когда будет известен. */
const OLD_SITE_URL = "#";

/* Верхняя полоса: служебные ссылки, как в референсе. */
const utilityLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Новости", href: "/news" },
  { label: "Контакты", href: "/contacts" },
  { label: "Старая версия сайта", href: OLD_SITE_URL, external: true },
];

/* Основное меню: Обучение ▾ · Расписание · О центре ▾ · Услуги ▾.
   «Контакты» и «Корпоративное обучение» здесь не дублируются: контакты — в верхней
   полосе, корпоративное обучение — внутри «Услуг». */
/* «О центре» живёт в верхней полосе; в мобильном меню — вместе с основными пунктами. */
const aboutNav: NavItem = {
  label: "О центре",
  children: [
    { label: "О нас", href: "/about" },
    { label: "Преподаватели", href: "/about/teachers" },
    { label: "Документы", href: "/about/documents" },
    { label: "Отзывы", href: "/reviews" },
    { label: "Вопросы и ответы", href: "/faq" },
    { label: "ИПБ России", href: "/ipb-russia" },
  ],
};

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
const mobileNavItems: NavItem[] = [...navItems.slice(0, -1), aboutNav, ...navItems.slice(-1)];

const topLevelPaths = new Set(navItems.filter((i) => i.href).map((i) => pathOf(i.href!)));

function isNavItemActive(pathname: string, item: NavItem) {
  if (item.href) return isLinkActive(pathname, item.href);
  return itemChildren(item).some(
    (child) => !topLevelPaths.has(pathOf(child.href)) && isLinkActive(pathname, child.href),
  );
}

/* ---------- Верхняя полоса ---------- */

function SocialButtons({ size = "h-7 w-7" }: { size?: string }) {
  return <SocialLinks size={size} />;
}

/** Английская версия ещё не готова: кнопка видна, но неактивна и честно говорит «скоро». */
/** Выбор языка. inline — список раскрывается в потоке (для прокручиваемого мобильного меню). */
function LanguageSwitch({ inline = false }: { inline?: boolean }) {
  return (
    <details name="desktop-nav" className="group relative">
      <summary
        aria-label="Язык сайта: русский"
        className="inline-flex h-10 cursor-pointer list-none select-none items-center gap-1.5 rounded-full bg-surface px-4 text-[0.88rem] font-semibold tracking-wide text-ink transition-colors hover:text-blue [&::-webkit-details-marker]:hidden"
      >
        RU
        <IconChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <div
        className={`menu-panel z-40 w-56 rounded-xl border border-border bg-surface p-2 shadow-lg ${
          inline ? "mt-2" : "absolute right-0 top-[calc(100%+0.5rem)]"
        }`}
      >
        <span className="flex items-center justify-between rounded-md bg-blue-tint px-3 py-2.5 text-sm font-medium text-blue">
          Русский
          <IconCheck className="h-4 w-4" />
        </span>
        <span
          aria-disabled="true"
          className="flex cursor-default items-center justify-between rounded-md px-3 py-2.5 text-sm text-muted"
        >
          Английский
          <span className="rounded-full bg-gold/25 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-gold-dark">
            скоро
          </span>
        </span>
      </div>
    </details>
  );
}

/** Выпадающий пункт верхней полосы («О центре») — в стиле служебных ссылок. */
function UtilityDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item);
  return (
    <details name="desktop-nav" className="group relative">
      <summary
        className={`flex cursor-pointer list-none items-center gap-1 whitespace-nowrap text-[0.9rem] transition-colors hover:text-blue group-open:text-blue [&::-webkit-details-marker]:hidden ${
          active ? "font-medium text-blue" : "text-ink"
        }`}
      >
        {item.label}
        <IconChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="menu-panel absolute left-0 top-[calc(100%+0.75rem)] z-40 w-64 rounded-xl border border-border bg-surface p-2 shadow-lg">
        {item.children!.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="flex items-center rounded-md px-3 py-2.5 text-sm text-ink transition-colors hover:bg-blue-tint hover:text-blue"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function UtilityBar() {
  const oldSite = utilityLinks.find((l) => l.external)!;
  return (
    <div data-utility-bar className="hidden border-b border-border bg-hero-band md:block">
      <div data-vision-wrap className="mx-auto flex h-14 max-w-[1680px] items-center gap-4 px-6 2xl:gap-6 3xl:px-8">
        <a
          href="https://yandex.ru/maps/?text=Тюмень, ул. Максима Горького, 59/3"
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 items-center gap-2 text-[0.9rem] text-ink transition-colors hover:text-blue md:max-lg:flex wide:flex"
        >
          <IconPin className="h-[1.1rem] w-[1.1rem] text-ink" />
          {ADDRESS}
        </a>

        <span aria-hidden="true" className="hidden h-7 w-px shrink-0 bg-muted/45 wide:block" />

        <nav aria-label="Служебное меню" className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          <UtilityDropdown item={aboutNav} />
          {utilityLinks
            .filter((l) => !l.external)
            .map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-[0.9rem] text-ink transition-colors hover:text-blue"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <a
            href={oldSite.href}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-xl bg-blue-tint px-4 text-[0.88rem] font-medium text-blue transition-colors hover:bg-blue hover:text-white xl:inline-flex"
          >
            {oldSite.label}
            <IconExternal className="h-4 w-4" />
          </a>
          <div className="hidden lg:block">
            <SocialButtons size="h-7 w-7" />
          </div>
          <span aria-hidden="true" className="hidden h-7 w-px bg-muted/45 lg:block" />
          <div className="hidden lg:block">
            <HeaderSearch labelClassName="hidden 2xl:inline" />
          </div>
          <LanguageSwitch />
          <VisionModeToggle className="h-10! px-5! text-[0.88rem]!" />
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
  /* Счётчик добавлений живёт в модуле и переживает переходы между страницами, а шапка
     на каждой странице монтируется заново. Сравниваем с тем, что было на монтировании,
     иначе «Добавлено» всплывало бы при каждом переходе. */
  const [tokenAtMount] = useState(bumpToken);
  const justAdded = bumpToken > tokenAtMount;

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
                  className="group/link flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-ink transition-colors hover:bg-blue-tint hover:text-blue"
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
              className="group/link flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-ink transition-colors hover:bg-blue-tint hover:text-blue"
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
  return <AccountMenu className="hidden sm:block" />;
}

/* ---------- Мобильное меню ---------- */

function MobileNavLink({ item, active }: { item: NavItem; active: boolean }) {
  if (!item.children && !item.columns) {
    return (
      <Link
        href={item.href!}
        aria-current={active ? "page" : undefined}
        className={`block rounded-md px-3 py-2.5 text-[0.95rem] ${
          active ? "font-medium text-blue" : "text-ink hover:text-ink"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <details className="group/sub">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-2.5 text-[0.95rem] text-ink [&::-webkit-details-marker]:hidden">
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
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink hover:text-ink"
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
                className="block rounded-md px-3 py-2 text-sm text-ink hover:text-ink"
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
        {mobileNavItems.map((item) => (
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
          <p className="mt-3 flex items-start gap-2 text-sm text-ink">
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
            <div className="flex flex-wrap items-start gap-2 md:hidden">
              <LanguageSwitch inline />
              <VisionModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </details>
  );
}

/* ---------- Шапка ---------- */

/** Раскрытые <details> шапки и верхней полосы закрываются по клику в любом месте вне них и по Esc. */
function useCloseMenusOutside() {
  useEffect(() => {
    const openMenus = () =>
      document.querySelectorAll<HTMLDetailsElement>(
        "[data-site-header] details[open], [data-utility-bar] details[open]",
      );
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
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-6 lg:px-10 3xl:h-[5.5rem]">
          {/* Оба логотипа выровнены по нижнему краю. */}
          <div className="flex shrink-0 items-end gap-3">
            <Link href="/" aria-label="Дом науки и техники, на главную" className="flex shrink-0">
              <LogoLockup />
            </Link>

            <div data-vision-hide className="hidden shrink-0 items-end gap-3 xl:flex">
              <span aria-hidden="true" className="h-14 w-px self-center bg-border" />
              <IpbLockup />
            </div>
          </div>

          <nav aria-label="Основное меню" className="relative hidden flex-1 items-center justify-center gap-1 lg:flex">
            {navItems.map((item) => (
              <DesktopNavLink key={item.label} item={item} active={isNavItemActive(pathname, item)} />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
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
