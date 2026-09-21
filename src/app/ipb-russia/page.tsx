import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "ИПБ России — Дом науки и техники" };

export default function IpbRussiaPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "О центре", href: "/about" },
        { label: "ИПБ России" },
      ]}
      title="ИПБ России"
      description="Дом науки и техники — аккредитованный учебно-методический центр Института профессиональных бухгалтеров России."
      comingItems={[
        "О партнёрстве с ИПБ России",
        "Программы, засчитываемые в ЧАС ИПБ",
        "Проверка членства в реестре ИПБ",
      ]}
    />
  );
}
