import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Документы — Дом науки и техники" };

export default function DocumentsPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "О центре", href: "/about" },
        { label: "Документы" },
      ]}
      title="Документы"
      description="Лицензии, уставные документы и нормативные акты центра — в открытом доступе."
      comingItems={[
        "Лицензия на образовательную деятельность",
        "Политика конфиденциальности",
        "Образцы договоров и актов",
      ]}
    />
  );
}
