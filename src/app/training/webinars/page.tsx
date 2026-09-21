import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Вебинары — Дом науки и техники" };

export default function WebinarsPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Обучение" },
        { label: "Вебинары" },
      ]}
      title="Вебинары"
      description="Короткие практические вебинары в прямом эфире — без поездки в офис, с записью для тех, кто не успел."
      comingItems={[
        "Расписание ближайших эфиров",
        "Доступ к записям прошедших вебинаров",
        "Чат с лектором во время эфира",
      ]}
    />
  );
}
