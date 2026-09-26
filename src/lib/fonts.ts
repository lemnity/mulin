import localFont from "next/font/local";

/* Оба шрифта лежат в репозитории и не тянутся с fonts.googleapis.com.

   Inter объявлен в токенах (--font-sans), но раньше нигде не подключался: интерфейс
   отрисовывался системным шрифтом — SF Pro на macOS, Segoe UI на Windows, Roboto на
   Android. Метрики и рисунок знаков у них разные, поэтому вёрстка, выверенная на одной
   машине, на другой расходилась.

   Google Fonts убран по двум причинам. У российских посетителей запрос к нему регулярно
   не проходит, и шрифт молча подменялся бы системным — то есть ровно тем, от чего уходим.
   И сборка переставала собираться совсем, если у машины нет доступа к fonts.googleapis.com:
   next/font скачивает файлы на этапе build, а не в рантайме. */
export const inter = localFont({
  src: [
    { path: "../fonts/inter-latin.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/inter-cyrillic.woff2", weight: "100 900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
  // Метрики системного шрифта подгоняются под Inter, чтобы подмена на время загрузки
  // не двигала вёрстку (CLS).
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

/** Рукописный шрифт для пометок на полях («Полезное каждую неделю» и т. п.). */
export const handwriting = localFont({
  src: [
    { path: "../fonts/caveat-latin.woff2", weight: "600", style: "normal" },
    { path: "../fonts/caveat-cyrillic.woff2", weight: "600", style: "normal" },
  ],
  weight: "600",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["cursive"],
});
