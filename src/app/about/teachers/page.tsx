import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Преподаватели — Дом науки и техники" };

export default function TeachersPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "О центре", href: "/about" },
        { label: "Преподаватели" },
      ]}
      title="Преподаватели"
      description="Практикующие эксперты — аудиторы, юристы, налоговые консультанты и HR-директора — которые ведут наши программы."
      comingItems={[
        "Карточки преподавателей с регалиями",
        "Список программ каждого лектора",
        "Отзывы слушателей о лекторах",
      ]}
    />
  );
}
