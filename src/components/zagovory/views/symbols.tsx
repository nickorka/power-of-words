"use client";

import { useMemo, useState } from "react";
import type { AppData } from "@/lib/zagovory";
import { OrnamentDivider } from "../ornaments";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ICONS: Record<string, string> = {
  bujan: "◉",
  okiyan: "≈",
  dub: "✿",
  zarya: "☀",
  mesyac: "☾",
  "solnyshko": "☉",
  "syra-zemlya": "▲",
  reka: "≋",
  kuznec: "⚒",
  "kamень": "◈",
  chisla: "Ⅲ",
  vyshnitsa: "⧉",
};

export function SymbolsView({ data }: { data: AppData }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return data.symbols;
    return data.symbols.filter((s) =>
      `${s.name} ${s.shortMeaning} ${s.description}`.toLowerCase().includes(query)
    );
  }, [data.symbols, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <OrnamentDivider />
      <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink">Символы заговорного мира</h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Двенадцать образов, на которых держится поэтика заговора. Каждый возник в дохристианской
            картине мира и пережил тысячелетие, приняв новые имена и сохранив старую силу.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Найти символ…"
            className="pl-9 bg-background/70"
            aria-label="Поиск символа"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Card key={s.id} className="border-border/70 bg-card/70 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">{s.name}</h2>
                  <p className="text-xs uppercase tracking-wider text-terra mt-0.5">{s.shortMeaning}</p>
                </div>
                <span className="font-display text-3xl text-ochre/70 leading-none select-none" aria-hidden="true">
                  {ICONS[s.slug] ?? "◈"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">Ничего не найдено — попробуйте «Буян» или «заря».</p>
      )}
    </div>
  );
}
