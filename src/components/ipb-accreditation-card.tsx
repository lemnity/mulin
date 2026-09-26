import Image from "next/image";
import { LogoMark } from "@/components/logo";
import { IconExternal } from "@/components/icons";
import ttipbLogo from "../../public/ipb-logo.png";

const CERT_URL = "https://tumtipb.ru/upload/file/svid053-2026.pdf";

/** Круглая печать «УМЦ ИПБ России № 053» — текст по окружности, номер в центре. */
function Seal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id="seal-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text fill="currentColor" fontSize="13.5" fontWeight="700" letterSpacing="2.2">
        <textPath href="#seal-ring" startOffset="0">
          УЧЕБНО-МЕТОДИЧЕСКИЙ ЦЕНТР ★ ИПБ РОССИИ ★
        </textPath>
      </text>
      <text x="100" y="90" textAnchor="middle" fill="currentColor" fontSize="15" fontWeight="600" letterSpacing="1">
        УМЦ
      </text>
      <text x="100" y="124" textAnchor="middle" fill="currentColor" fontSize="29" fontWeight="800">
        № 053
      </text>
    </svg>
  );
}

/** Карточка-«свидетельство» об аккредитации центра при ИПБ России. */
export function IpbAccreditationCard() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-blue/10 blur-2xl" />
      <div aria-hidden="true" className="absolute -bottom-8 -left-6 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />

      <article
        className="relative overflow-hidden rounded-[1.75rem] bg-white p-3 shadow-[0_24px_60px_-28px_rgba(20,34,74,0.45)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(30,99,221,0.035) 0 1px, transparent 1px 11px), repeating-linear-gradient(-45deg, rgba(30,99,221,0.035) 0 1px, transparent 1px 11px)",
        }}
      >
        <div className="rounded-[1.35rem] border border-[#C9D8F3] p-1">
          <div className="rounded-[1.1rem] border border-dashed border-[#D8E3F6] bg-white/85 px-6 py-7 sm:px-8">
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
              <Seal className="mx-auto h-36 w-36 -rotate-[8deg] text-blue sm:mx-0 sm:h-40 sm:w-40" />
              <div>
                <p className="text-xs font-semibold text-blue">Институт профессиональных бухгалтеров и аудиторов России</p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-ink">
                  Свидетельство об аккредитации
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  «Дом науки и техники» — учебно-методический центр ИПБ России: готовит, аттестует и повышает
                  квалификацию профессиональных бухгалтеров.
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-[0.85rem]">
                  <div className="rounded-xl bg-page px-3 py-2 ring-1 ring-inset ring-border">
                    <dt className="text-xs text-muted">Аккредитован</dt>
                    <dd className="font-semibold text-ink">с октября 1996</dd>
                  </div>
                  <div className="rounded-xl bg-page px-3 py-2 ring-1 ring-inset ring-border">
                    <dt className="text-xs text-muted">Членство</dt>
                    <dd className="font-semibold text-ink">корпоративное</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#E3EAF6] pt-5">
              <div className="flex items-center gap-4">
                <LogoMark className="h-9 w-auto" />
                <span aria-hidden="true" className="h-7 w-px bg-border" />
                <Image src={ttipbLogo} alt="Тюменский территориальный институт профессиональных бухгалтеров" className="h-8 w-auto" />
              </div>
              <a
                href={CERT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-blue-dark"
              >
                Открыть свидетельство
                <IconExternal className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
