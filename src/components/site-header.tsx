"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconCart, IconChevronDown, IconPhone, IconUserCircle } from "@/components/icons";
import { LogoLockup } from "@/components/logo";
import { orderLabel, useCart } from "@/lib/cart-context";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const navItems: NavItem[] = [
  {
    label: "Обучение",
    children: [
      { label: "Семинары", href: "/training/seminars" },
      { label: "Вебинары", href: "/training/webinars" },
      { label: "Курсы", href: "/training/courses" },
      { label: "Дистанционное обучение", href: "/training/distance" },
      { label: "Корпоративное обучение", href: "/corporate" },
    ],
  },
  { label: "Расписание", href: "/schedule" },
  {
    label: "Аттестация",
    children: [
      { label: "Аттестация", href: "/attestation" },
      { label: "Конкурс", href: "/attestation/contest" },
      { label: "Заявление на продление аттестата", href: "/attestation/renewal" },
      { label: "Результаты аттестации", href: "/attestation/results" },
    ],
  },
  {
    label: "О центре",
    children: [
      { label: "О нас", href: "/about" },
      { label: "Преподаватели", href: "/about/teachers" },
      { label: "Документы", href: "/about/documents" },
      { label: "Отзывы", href: "/reviews" },
      { label: "ИПБ России", href: "/ipb-russia" },
    ],
  },
  { label: "Контакты", href: "/contacts" },
];

function isLinkActive(pathname: string, href: string) {
  return href !== "/" && (pathname === href || pathname.startsWith(`${href}/`));
}

function isNavItemActive(pathname: string, item: NavItem) {
  if (item.href) return isLinkActive(pathname, item.href);
  return item.children?.some((child) => isLinkActive(pathname, child.href)) ?? false;
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
      <path
        d="M3 5.5h14M3 10h14M3 14.5h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartButton() {
  const { itemIds, bumpToken } = useCart();
  const count = itemIds.length;
  const justAdded = bumpToken > 0;

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `${orderLabel(count)}, программ: ${count}` : "Ваш заказ"}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-ink transition-colors hover:border-blue hover:text-blue"
    >
      <span key={bumpToken} className={`flex ${justAdded ? "animate-cart-bump" : ""}`}>
        <IconCart className="h-4.5 w-4.5" />
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

function DesktopNavLink({ item, active }: { item: NavItem; active: boolean }) {
  if (!item.children) {
    return (
      <Link
        href={item.href!}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[0.9rem] transition-colors ${
          active ? "font-medium text-blue" : "text-ink/85 hover:text-ink"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <details name="desktop-nav" className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[0.9rem] text-ink/85 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
        {item.label}
        <IconChevronDown className="h-3.5 w-3.5 text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="absolute left-0 top-[calc(100%+0.5rem)] z-40 w-64 rounded-xl border border-border bg-surface p-2 shadow-lg">
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block rounded-md px-3 py-2.5 text-sm text-ink/85 transition-colors hover:bg-blue-tint hover:text-blue"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function MobileNavLink({ item, active }: { item: NavItem; active: boolean }) {
  if (!item.children) {
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
        {item.children.map((child) => (
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

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 py-3.5 lg:px-10">
        <Link href="/" className="shrink-0">
          <LogoLockup />
        </Link>

        <p className="hidden w-40 shrink-0 border-l border-border pl-4 text-xs leading-snug text-muted 2xl:block">
          Профессиональные знания для реальных результатов
        </p>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => (
            <DesktopNavLink key={item.label} item={item} active={isNavItemActive(pathname, item)} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <a href="tel:88002504191" className="hidden items-center gap-2 sm:flex">
            <IconPhone className="h-5 w-5 text-blue" />
            <span className="text-left">
              <span className="block text-[0.9rem] font-semibold text-ink">8 800 250-41-91</span>
              <span className="block text-[0.7rem] text-muted">Звонок по России бесплатный</span>
            </span>
          </a>
          <a
            href="#"
            className="hidden items-center gap-1.5 rounded-lg border border-blue px-4 py-2 text-sm font-medium text-blue transition-colors hover:bg-blue-tint sm:flex"
          >
            <IconUserCircle className="h-4 w-4" />
            Войти
          </a>

          <CartButton />

          <details className="group relative lg:hidden">
            <summary
              aria-label="Открыть меню"
              className="flex h-10 w-10 list-none items-center justify-center rounded-lg border border-border text-ink [&::-webkit-details-marker]:hidden"
            >
              <MenuIcon />
            </summary>
            <nav className="absolute right-0 top-[calc(100%+0.75rem)] max-h-[75vh] w-72 overflow-y-auto rounded-xl border border-border bg-surface p-2 shadow-lg">
              {navItems.map((item) => (
                <MobileNavLink key={item.label} item={item} active={isNavItemActive(pathname, item)} />
              ))}
              <div className="mt-1 border-t border-border px-3 pb-1 pt-3">
                <a href="tel:88002504191" className="block text-sm font-semibold text-ink">
                  8 800 250-41-91
                </a>
                <a href="#" className="mt-2 block text-sm font-medium text-blue">
                  Войти
                </a>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
