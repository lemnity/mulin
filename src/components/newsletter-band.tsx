import { IconMail } from "@/components/icons";
import { socialLinks } from "@/components/social-links";

/** Мессенджеры для блока «Другие способы подписки» — те же знаки, что в шапке и подвале. */
const channels = socialLinks.filter((s) => s.label === "Telegram" || s.label === "MAX");

export function NewsletterBand() {
  return (
    <section className="mt-16 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="grid xl:grid-cols-[8rem_1fr_auto_auto] xl:items-stretch">
        {/* Светлая панель со значком письма */}
        <div className="hidden items-center justify-center rounded-r-[2.5rem] bg-blue-tint/70 xl:flex">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-blue shadow-[0_4px_14px_rgba(30,99,221,0.12)]">
            <IconMail className="h-6 w-6" />
          </span>
        </div>

        <div className="flex items-start gap-4 px-6 pt-6 xl:items-center xl:px-7 xl:py-8">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue xl:hidden">
            <IconMail className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[0.7rem] font-medium tracking-[0.08em] text-muted uppercase">Будьте в курсе</p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-ink xl:text-[1.1rem]">
              Получайте последние новости, <br className="hidden xl:block" />
              анонсы событий и специальные предложения
            </h2>
          </div>
        </div>

        <div className="px-6 pt-6 xl:w-[19rem] xl:px-0 xl:py-8 xl:pr-7">
          <form className="flex max-w-lg">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Ваш e-mail</span>
              <input
                type="email"
                required
                placeholder="Ваш e-mail"
                className="h-12 w-full rounded-l-xl border border-r-0 border-border bg-surface px-4 text-sm text-ink placeholder:text-muted focus:border-blue focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="h-12 shrink-0 whitespace-nowrap rounded-xl bg-blue px-6 text-sm font-medium text-white transition-colors hover:bg-blue-dark -ml-2"
            >
              Подписаться
            </button>
          </form>
          <p className="mt-2.5 text-xs leading-relaxed text-muted">
            Нажимая «Подписаться», вы соглашаетесь с{" "}
            <a href="#" className="text-blue underline underline-offset-2 hover:text-blue-dark">
              политикой конфиденциальности
            </a>
            .
          </p>
        </div>

        <div className="mx-6 mt-6 border-t border-border py-6 xl:mx-0 xl:mt-0 xl:border-l xl:border-t-0 xl:px-6 xl:py-8">
          <p className="text-xs text-muted">Другие способы подписки:</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {channels.map(({ label, href, bg, viewBox, d }) => (
              <a
                key={label}
                href={href}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-[0.82rem] font-medium text-ink shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:border-blue hover:text-blue"
              >
                <span
                  style={{ background: bg }}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                >
                  <svg viewBox={viewBox} style={{ width: "56%", height: "56%" }} fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d={d} />
                  </svg>
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
