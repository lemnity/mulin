import { IconDownload } from "@/components/icons";

function PdfIcon() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e94c4c] text-[0.6rem] font-bold text-white">
      PDF
    </div>
  );
}

export function DocumentItem({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
      <div className="flex items-center gap-3">
        <PdfIcon />
        <div>
          <p className="text-sm font-medium text-ink">{name}</p>
          <p className="text-xs text-muted">{size}</p>
        </div>
      </div>
      <a href="#" className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-blue hover:text-blue-dark">
        <IconDownload className="h-4 w-4" />
        Скачать
      </a>
    </div>
  );
}
