import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Новости — Дом науки и техники" };

export default function NewsPage() {
  return (
    <PlaceholderPage
      crumbs={[{ label: "Главная", href: "/" }, { label: "Новости" }]}
      title="Новости"
      description="Изменения в законодательстве, новые программы и события центра."
      comingItems={[
        "Обзоры изменений в учёте и налогах",
        "Анонсы новых семинаров и курсов",
        "Фотоотчёты с мероприятий",
      ]}
    />
  );
}
