export function LogoLockup({
  variant = "brand",
  textClassName = "text-[0.9rem]",
}: {
  variant?: "brand" | "light";
  textClassName?: string;
}) {
  const textColor = variant === "light" ? "text-white" : "text-blue";

  return (
    <span
      className={`whitespace-nowrap font-extrabold uppercase leading-[1.15] tracking-tight ${textColor} ${textClassName}`}
    >
      Дом науки
      <br />и техники
    </span>
  );
}
