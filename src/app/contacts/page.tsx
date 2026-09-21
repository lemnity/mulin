import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Контакты — Дом науки и техники" };

export default function ContactsPage() {
  return (
    <PlaceholderPage
      crumbs={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
      title="Контакты"
      description="Свяжитесь с нами по телефону, почте или приезжайте в офис в Тюмени."
      comingItems={[
        "Карта проезда и режим работы",
        "Контакты по направлениям обучения",
        "Форма обратной связи",
      ]}
    />
  );
}
