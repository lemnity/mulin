import type { Metadata } from "next";
import { CartProvider } from "@/lib/cart-context";
import { CartFloatingBar } from "@/components/cart-floating-bar";
import { RouteTransitionLoader } from "@/components/page-loader";
import { ScrollTopButton } from "@/components/scroll-top-button";
import "./globals.css";
import "./page-loader.css";

export const metadata: Metadata = {
  title: "Программы и расписание — Дом науки и техники",
  description:
    "Семинары, курсы и вебинары повышения квалификации для бухгалтерии, кадровой службы, юристов и руководителей.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-page text-ink font-sans">
        <CartProvider>
          {children}
          <CartFloatingBar />
          <ScrollTopButton />
          <RouteTransitionLoader />
        </CartProvider>
      </body>
    </html>
  );
}
