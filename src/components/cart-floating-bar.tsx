"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { IconArrowRight, IconCart, IconX } from "@/components/icons";

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

function pluralizePrograms(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "программу";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "программы";
  return "программ";
}

export function CartFloatingBar() {
  const pathname = usePathname();
  const { itemIds, total, bumpToken, clear } = useCart();

  const hidden = pathname === "/cart" || pathname === "/checkout";
  const visible = !hidden && itemIds.length > 0;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div className="flex max-w-full items-center gap-2 rounded-full border border-border bg-surface py-2 pl-2 pr-2 shadow-[0_8px_24px_rgba(16,24,40,0.14)] sm:gap-4 sm:pl-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue">
          <IconCart className="h-4 w-4" />
        </span>

        <p className="hidden whitespace-nowrap text-sm text-ink sm:block">
          Вы выбрали {itemIds.length} {pluralizePrograms(itemIds.length)} на сумму{" "}
          <span key={bumpToken} className="tabular inline-block font-extrabold animate-cart-bump">
            {formatPrice(total)}
          </span>
        </p>
        <span key={bumpToken} className="tabular whitespace-nowrap text-sm font-extrabold text-ink animate-cart-bump sm:hidden">
          {formatPrice(total)}
        </span>

        <Link
          href="/checkout"
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
        >
          <span className="hidden sm:inline">Перейти к оформлению</span>
          <span className="sm:hidden">Оформить</span>
          <IconArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          onClick={clear}
          aria-label="Убрать все программы из заказа"
          title="Убрать все"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-page hover:text-ink"
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
