import Link from "next/link";
import { IconChevronRight } from "@/components/icons";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-6 py-3 text-sm text-muted lg:px-10">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <IconChevronRight className="h-3.5 w-3.5 text-border" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-blue">
                {item.label}
              </Link>
            ) : (
              <span className="max-w-[40ch] truncate text-ink">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
