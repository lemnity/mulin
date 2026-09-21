import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Курсы — Дом науки и техники" };

export default function CoursesPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Обучение" },
        { label: "Курсы" },
      ]}
      title="Курсы"
      description="Многодневные программы повышения квалификации с итоговой аттестацией и удостоверением."
      comingItems={[
        "Программы курсов по направлениям",
        "Расписание модулей и итоговых экзаменов",
        "Личный кабинет слушателя курса",
      ]}
    />
  );
}
