import Link from "next/link";
import { IconChevronRight, IconFile } from "@/components/icons";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  showDisclosureLink = false,
}: {
  items: Crumb[];
  /** Показать справа ссылку на «Сведения об образовательной организации». */
  showDisclosureLink?: boolean;
}) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3 lg:px-10">
        <nav
          aria-label="Хлебные крошки"
          className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm text-muted"
        >
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <IconChevronRight className="h-3.5 w-3.5 text-border" />
              )}
              {item.href ? (
                <Link href={item.href} className="hover:text-blue">
                  {item.label}
                </Link>
              ) : (
                <span className="max-w-[40ch] truncate text-ink">
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {showDisclosureLink && (
          <Link
            href="/disclosure"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-blue bg-blue-tint px-3 py-1 text-sm font-medium text-blue transition-colors hover:bg-blue hover:text-white"
          >
            <IconFile className="h-4 w-4 shrink-0" />
            Сведения об образовательной организации АНО ДПО ТМУЦ &quot;Дом науки
            и техники&quot;
          </Link>
        )}
      </div>
    </div>
  );
}
