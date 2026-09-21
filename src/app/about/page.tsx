import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "О центре — Дом науки и техники" };

export default function AboutPage() {
  return (
    <PlaceholderPage
      crumbs={[{ label: "Главная", href: "/" }, { label: "О центре" }]}
      title="О центре"
      description="Дом науки и техники — площадка дополнительного профессионального образования с 1998 года."
      comingItems={["История и миссия центра", "Лицензии и аккредитации", "Команда и партнёры"]}
    />
  );
}
