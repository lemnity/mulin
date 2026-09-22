import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Вопросы и ответы — Дом науки и техники" };

export default function FaqPage() {
  return (
    <PlaceholderPage
      crumbs={[{ label: "Главная", href: "/" }, { label: "Вопросы и ответы" }]}
      title="Вопросы и ответы"
      description="Как записаться, оплатить обучение и получить документы об окончании."
      comingItems={[
        "Порядок записи и оплаты",
        "Какие документы выдаются по итогам обучения",
        "Условия переноса и возврата",
      ]}
    />
  );
}
