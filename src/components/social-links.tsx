/**
 * Соцсети центра. Знаки взяты из фирменных файлов в public/social и отрисованы единообразно:
 * круг в цвете бренда, белый знак одного визуального размера.
 */
export const socialLinks = [
  {
    label: "ВКонтакте",
    href: "https://vk.ru/dnttmn",
    bg: "#0077FF",
    viewBox: "18 18 56 56",
    d: "M72.4956 32.5968C72.8825 31.3864 72.4956 30.497 70.6541 30.497H64.5646C63.0163 30.497 62.3025 31.2653 61.9153 32.1125C61.9153 32.1125 58.8186 39.1932 54.4317 43.7925C53.0125 45.1238 52.3673 45.5475 51.5931 45.5475C51.2061 45.5475 50.6458 45.1238 50.6458 43.9136V32.5968C50.6458 31.1443 50.1964 30.497 48.906 30.497H39.3369C38.3693 30.497 37.7874 31.1711 37.7874 31.81C37.7874 33.1869 39.9807 33.5044 40.2068 37.3776V45.7896C40.2068 47.6339 39.8517 47.9683 39.0776 47.9683C37.0132 47.9683 31.9917 40.856 29.0134 32.7178C28.4298 31.136 27.8443 30.497 26.288 30.497H20.1986C18.4588 30.497 18.1108 31.2653 18.1108 32.1125C18.1108 33.6255 20.1752 41.1298 27.7232 51.0546C32.7552 57.8325 39.8449 61.5067 46.2962 61.5067C50.167 61.5067 50.6459 60.6906 50.6459 59.285V54.1623C50.6459 52.5302 51.0126 52.2045 52.2383 52.2045C53.1415 52.2045 54.6898 52.6281 58.3026 55.896C62.4314 59.7691 63.1121 61.5067 65.4345 61.5067H71.524C73.2638 61.5067 74.1338 60.6906 73.6319 59.0802C73.0827 57.4752 71.1115 55.1465 68.4957 52.386C67.0764 50.8126 64.9475 49.1181 64.3023 48.2707C63.3991 47.1815 63.6572 46.6973 64.3023 45.7291C64.3023 45.7291 71.7214 35.9252 72.4956 32.5968Z",
  },
  {
    label: "Telegram",
    href: "#",
    bg: "#2AABEE",
    viewBox: "7.2 9.9 28 28",
    d: "M29.3355 35.8843C31.013 36.6182 31.6421 35.0805 31.6421 35.0805L36.0805 12.7836C36.0455 11.2808 34.0185 12.1895 34.0185 12.1895L9.17042 21.94C9.17042 21.94 7.98218 22.3594 8.08703 23.0933C8.19187 23.8272 9.13547 24.1767 9.13547 24.1767L15.3912 26.2736C15.3912 26.2736 17.2784 32.4594 17.6628 33.6476C18.0123 34.8009 18.3268 34.8359 18.3268 34.8359C18.6763 34.9757 18.9908 34.731 18.9908 34.731L23.0448 31.0615L29.3355 35.8843ZM30.4189 16.7327C30.4189 16.7327 31.2926 16.2085 31.2576 16.7327C31.2576 16.7327 31.3974 16.8026 30.9431 17.2919C30.5237 17.7112 20.6334 26.5881 19.3054 27.7763C19.2005 27.8462 19.1306 27.951 19.1306 28.0908L18.7462 31.376C18.6763 31.7254 18.222 31.7604 18.1171 31.4459L16.4746 26.0638C16.4047 25.8542 16.4746 25.6095 16.6843 25.4697L30.4189 16.7327Z",
  },
  {
    label: "MAX",
    href: "#",
    bg: "linear-gradient(135deg, #44CCFF 0%, #5533EE 66%, #9933DD 100%)",
    viewBox: "1.2 1.5 16.6 16.6",
    d: "M9.66114 16.9572C8.18908 16.9572 7.50499 16.7414 6.31589 15.878C5.56374 16.8493 3.18195 17.6083 3.07808 16.3097C3.07808 15.3349 2.86318 14.5111 2.61962 13.6118C2.32951 12.5038 2 11.27 2 9.4822C2 5.21231 5.48854 2 9.62176 2C13.7585 2 17 5.37059 17 9.52176C17.0138 13.6087 13.7304 16.9354 9.66114 16.9572ZM9.72204 5.69073C7.70916 5.58642 6.14038 6.98574 5.79297 9.18003C5.50643 10.9966 6.01503 13.2089 6.44841 13.324C6.65614 13.3744 7.17907 12.9499 7.50499 12.6226C8.04394 12.9965 8.67154 13.2211 9.32449 13.2737C11.4102 13.3744 13.1923 11.7797 13.3323 9.68726C13.4139 7.59037 11.808 5.81434 9.72204 5.69434V5.69073Z",
  },
];

export function SocialLinks({ size = "h-7 w-7", className = "" }: { size?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {socialLinks.map(({ label, href, bg, viewBox, d }) => {
        const external = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            style={{ background: bg }}
            className={`flex ${size} shrink-0 items-center overflow-hidden justify-center rounded-full text-white transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-110`}
          >
            <svg viewBox={viewBox} style={{ width: "56%", height: "56%" }} fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d={d} />
            </svg>
          </a>
        );
      })}
    </div>
  );
}

/** Плитки соцсетей «значок над подписью» — для блоков подписки и связи. */
export function SocialTiles({ className = "" }: { className?: string }) {
  return (
    <div className={`grid max-w-xs grid-cols-3 gap-2.5 sm:flex sm:max-w-none ${className}`}>
      {socialLinks.map(({ label, href, bg, viewBox, d }) => {
        const external = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex h-[5.25rem] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-[#E1E9F5] bg-surface text-sm font-medium text-ink shadow-[0_2px_8px_-4px_rgba(16,24,40,0.08)] transition-colors hover:border-blue hover:text-blue sm:w-[5.75rem]"
          >
            <span style={{ background: bg }} className="flex h-8 w-8 items-center justify-center rounded-full text-white">
              <svg viewBox={viewBox} style={{ width: "56%", height: "56%" }} fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d={d} />
              </svg>
            </span>
            {label}
          </a>
        );
      })}
    </div>
  );
}
