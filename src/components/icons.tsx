type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconMonitor({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
      <path d="M7 17h6M10 13.5V17" />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 18s6-5.2 6-9.8A6 6 0 0 0 4 8.2C4 12.8 10 18 10 18Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 6v4l3 2" />
    </svg>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="6.5" r="3" />
      <path d="M3.5 17c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    </svg>
  );
}

export function IconCertificate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="7" r="4.25" />
      <path d="m7.3 10.6-1 6.4 3.7-2 3.7 2-1-6.4" />
    </svg>
  );
}

export function IconFile({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M5 2.5h6.5L16 7v10.5H5V2.5Z" />
      <path d="M11.5 2.5V7H16" />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="9" cy="9" r="6" />
      <path d="m17 17-3.5-3.5" />
    </svg>
  );
}

export function IconReset({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M4 10a6 6 0 1 1 1.9 4.4" />
      <path d="M4 14.5V10h4.5" />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="m7 5 5.5 5L7 15" />
    </svg>
  );
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="m12 5-5.5 5L12 15" />
    </svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M4 10h12M11 5.5 16 10l-5 4.5" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M4 3.5h2.6l1.2 4-1.8 1.3a9 9 0 0 0 5.2 5.2l1.3-1.8 4 1.2V16c0 .9-.8 1.6-1.7 1.5-8-1-11-4-12-12-.1-.9.6-1.7 1.5-1.7Z" />
    </svg>
  );
}

export function IconUserCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.5" />
      <circle cx="10" cy="8.2" r="2.3" />
      <path d="M5.3 15.4c.8-2 2.6-3.2 4.7-3.2s3.9 1.2 4.7 3.2" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="m3.5 6 6.5 5 6.5-5" />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3 4.5h14v9H8l-3.5 3v-3H3v-9Z" />
    </svg>
  );
}

export function IconList({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M7 5.5h10M7 10h10M7 14.5h10M3.3 5.5h.02M3.3 10h.02M3.3 14.5h.02" />
    </svg>
  );
}

export function IconGrid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  );
}

export function IconRefresh({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M4 10a6 6 0 0 1 10.2-4.3M16 10a6 6 0 0 1-10.2 4.3" />
      <path d="M14.5 3.5v3h-3M5.5 16.5v-3h3" />
    </svg>
  );
}

export function IconCart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M2.5 3.5h2l1.6 9.4a1.5 1.5 0 0 0 1.5 1.3h6.4a1.5 1.5 0 0 0 1.5-1.2l1.3-6.5H5.3" />
      <circle cx="8" cy="17" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="17" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTrash({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M4 5.5h12M8 5.5v-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M6 5.5 6.7 16a1 1 0 0 0 1 .9h4.6a1 1 0 0 0 1-.9l.7-10.5" />
    </svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="4" y="2.5" width="8" height="15" rx="1" />
      <path d="M12 8.5h3.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H12" />
      <path d="M7 6h2M7 9h2M7 12h2" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" />
    </svg>
  );
}

export function IconHeart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor">
      <path d="M10 17.3 3.5 11c-2-2-1.8-5.3.5-6.9 1.8-1.3 4.1-.9 5.5.8l.5.6.5-.6c1.4-1.7 3.7-2.1 5.5-.8 2.3 1.6 2.5 4.9.5 6.9L10 17.3Z" />
    </svg>
  );
}

export function IconHeartOutline({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 17.3 3.5 11c-2-2-1.8-5.3.5-6.9 1.8-1.3 4.1-.9 5.5.8l.5.6.5-.6c1.4-1.7 3.7-2.1 5.5-.8 2.3 1.6 2.5 4.9.5 6.9L10 17.3Z" />
    </svg>
  );
}

export function IconShare({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="15" cy="5" r="2" />
      <circle cx="15" cy="15" r="2" />
      <circle cx="5" cy="10" r="2" />
      <path d="m6.8 9 6.4-3.2M6.8 11l6.4 3.2" />
    </svg>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.5" y="4" width="15" height="13.5" rx="1.5" />
      <path d="M2.5 8h15M6.5 2.5v3M13.5 2.5v3" />
    </svg>
  );
}

export function IconTag({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M11 3h4.5A1.5 1.5 0 0 1 17 4.5V9a1 1 0 0 1-.3.7l-7 7a1 1 0 0 1-1.4 0l-4.5-4.5a1 1 0 0 1 0-1.4l7-7A1 1 0 0 1 11 3Z" />
      <circle cx="13.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTarget({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.25" />
      <circle cx="10" cy="10" r="3.75" />
      <circle cx="10" cy="10" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

export function IconDownload({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 3v9.5M6.5 9l3.5 3.5L13.5 9" />
      <path d="M3.5 15.5h13" />
    </svg>
  );
}

export function IconPercent({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M15 5 5 15" />
      <circle cx="6.3" cy="6.3" r="1.8" />
      <circle cx="13.7" cy="13.7" r="1.8" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="7.2" cy="7" r="2.7" />
      <path d="M2.5 16c.5-2.8 2.3-4.5 4.7-4.5s4.2 1.7 4.7 4.5" />
      <circle cx="14" cy="7.5" r="2.1" />
      <path d="M13 11.8c1.9.2 3.3 1.7 3.7 4.2" />
    </svg>
  );
}

export function IconChevronUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="m5 12.5 5-5 5 5" />
    </svg>
  );
}

export function IconCalculator({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="4" y="2.5" width="12" height="15" rx="1.5" />
      <path d="M6.5 5.5h7M6.5 9h.01M10 9h.01M13.5 9h.01M6.5 12h.01M10 12h.01M13.5 12h.01M6.5 15h.01M10 15h.01M13.5 15h.01" />
    </svg>
  );
}

export function IconScale({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.5v15M6 17.5h8" />
      <path d="M10 4.5 4 6l3 6.5a3 3 0 0 0 6 0L10 6Z" />
      <path d="M4 6 3 8.5M4 6l1 2.5M16 6l-1 2.5M16 6l1 2.5" />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.5 16 4.5v5c0 4.2-2.6 6.9-6 8-3.4-1.1-6-3.8-6-8v-5L10 2.5Z" />
      <path d="m7.2 9.8 1.9 1.9 3.7-4" />
    </svg>
  );
}

export function IconCoins({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <ellipse cx="7.2" cy="6" rx="4.2" ry="2.3" />
      <path d="M3 6v3c0 1.3 1.9 2.3 4.2 2.3S11.4 10.3 11.4 9V6" />
      <path d="M3 9v3c0 1.3 1.9 2.3 4.2 2.3.7 0 1.4-.1 2-.3" />
      <ellipse cx="12.8" cy="10.5" rx="4.2" ry="2.3" />
      <path d="M8.6 10.5v3c0 1.3 1.9 2.3 4.2 2.3S17 14.8 17 13.5v-3" />
    </svg>
  );
}

export function IconGraduationCap({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M2 7.5 10 4l8 3.5-8 3.5-8-3.5Z" />
      <path d="M5.5 9.3v3.4c0 1.2 2 2.3 4.5 2.3s4.5-1.1 4.5-2.3V9.3M17 7.5V13" />
    </svg>
  );
}
