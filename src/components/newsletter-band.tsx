import { IconMail } from "@/components/icons";

export function NewsletterBand() {
  return (
    <section className="mt-16 rounded-2xl bg-gradient-to-r from-hero-band to-surface p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="flex items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-blue shadow-sm">
            <IconMail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">Будьте в курсе</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Подпишитесь на обновления</h2>
            <p className="mt-2 max-w-[52ch] text-body">
              Получайте новые программы, специальные предложения и приглашения на мероприятия.
            </p>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col gap-2 lg:w-auto">
          <form className="flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Ваш e-mail</span>
              <input
                type="email"
                required
                placeholder="Ваш e-mail"
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-blue sm:w-64"
              />
            </label>
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-blue px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
            >
              Подписаться
            </button>
          </form>
          <p className="text-xs text-muted">
            Нажимая «Подписаться», вы соглашаетесь с{" "}
            <a href="#" className="text-blue underline underline-offset-2 hover:text-blue-dark">
              политикой конфиденциальности
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
