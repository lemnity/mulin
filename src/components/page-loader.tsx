"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* ---------- Состояние перехода: крошечный внешний стор ----------
   Показ включает клик по внутренней ссылке (перехватывается на документе) или явный вызов
   beginPageTransition() из кода, который зовёт router.push. Выключает смена pathname. */

/* Страницы статические и подгружаются заранее, поэтому сам переход почти мгновенный.
   Лоадер показывается сразу по клику и держится MIN_VISIBLE_MS — как фирменная заставка
   между страницами, а не индикатор реальной задержки. */
const MIN_VISIBLE_MS = 700;
const SAFETY_TIMEOUT_MS = 8000; // переход не состоялся (ошибка, отмена) — не висим вечно

type Listener = () => void;
const listeners = new Set<Listener>();
let pending = false;
let pendingSince = 0;

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function isDifferentPage(href: string) {
  try {
    const target = new URL(href, window.location.href);
    if (target.origin !== window.location.origin) return false;
    return target.pathname !== window.location.pathname;
  } catch {
    return false;
  }
}

/** Сообщить лоадеру о начале программного перехода (перед router.push). */
export function beginPageTransition(href: string) {
  if (!isDifferentPage(href)) return;
  pending = true;
  pendingSince = Date.now();
  emit();
}

function endPageTransition() {
  if (!pending) return;
  pending = false;
  emit();
}

/* ---------- Визуал: книга с перелистывающимися страницами ---------- */

export function BookLoader({ label = "Загружаем страницу…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-7">
      <div className="book" aria-hidden="true">
        <div className="inner">
          <div className="left" />
          <div className="middle" />
          <div className="right" />
        </div>
        <ul>
          {Array.from({ length: 18 }, (_, i) => (
            <li key={i} />
          ))}
        </ul>
      </div>
      <p className="page-loader__text">{label}</p>
    </div>
  );
}

/* ---------- Оверлей между страницами ---------- */

export function RouteTransitionLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Перехват кликов по внутренним ссылкам на документе в фазе ЗАХВАТА: <Link> вызывает
  // preventDefault в своём обработчике, и на всплытии клик уже помечен отменённым.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      beginPageTransition(anchor.href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Страница сменилась — переход завершён.
  useEffect(() => {
    endPageTransition();
  }, [pathname]);

  // Подписка на стор: показ сразу, минимальное время показа и страховка по времени.
  useEffect(() => {
    let hideTimer: number | undefined;
    let safetyTimer: number | undefined;
    let shownAt = 0;

    const clearAll = () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(safetyTimer);
    };

    const sync = () => {
      clearAll();
      if (pending) {
        if (!shownAt) shownAt = pendingSince;
        setVisible(true);
        safetyTimer = window.setTimeout(endPageTransition, SAFETY_TIMEOUT_MS);
      } else {
        const rest = shownAt ? Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt)) : 0;
        hideTimer = window.setTimeout(() => {
          shownAt = 0;
          setVisible(false);
        }, rest);
      }
    };

    const unsubscribe = subscribe(sync);
    sync();
    return () => {
      unsubscribe();
      clearAll();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="page-loader" aria-hidden={false}>
      <BookLoader />
    </div>
  );
}
