import { IconCheck, IconTarget } from "@/components/icons";

export function AudienceBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl bg-blue-tint/60 p-5">
      {/* Заголовок приходит извне: на странице вебинара «Для кого этот семинар» читалось
          как чужой текст, вставленный по ошибке. */}
      <p className="flex items-center gap-2.5 text-[0.95rem] font-semibold text-ink">
        <IconTarget className="h-5 w-5 text-blue" />
        {title}
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
