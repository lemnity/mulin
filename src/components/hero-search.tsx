"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IconSearch } from "@/components/icons";

export function HeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.push(`/?${params.toString()}#programs`);
    document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <label className="relative flex-1">
        <span className="sr-only">Поиск по названию, теме или лектору</span>
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Поиск по названию, теме или лектору"
          className="w-full rounded-full border border-border bg-surface py-3.5 pl-11 pr-4 text-sm text-ink shadow-sm placeholder:text-muted focus:border-blue"
        />
      </label>
      <button
        type="submit"
        className="whitespace-nowrap rounded-full bg-blue px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
      >
        Найти
      </button>
    </form>
  );
}
