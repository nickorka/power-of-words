"use client";

import { useMemo, useState } from "react";
import type { AppData } from "@/lib/zagovory";
import { OrnamentDivider } from "../ornaments";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export function GlossaryView({ data }: { data: AppData }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return data.glossary;
    return data.glossary.filter((t) =>
      `${t.term} ${t.definition} ${t.example ?? ""}`.toLowerCase().includes(query)
    );
  }, [data.glossary, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <OrnamentDivider />
      <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink">Глоссарий терминов и архаизмов</h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Словарь читателя корпуса: жанровые термины фольклористики, названия болезней народной
            медицины и устаревшие слова, встречающиеся в оригинальных текстах.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Найти слово…"
            className="pl-9 bg-background/70"
            aria-label="Поиск термина"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2 max-w-5xl">
        {filtered.map((t, i) => (
          <Card key={t.id} className="border-border/70 bg-card/60">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2.5">
                <span className="font-display text-sm text-ochre/80 w-6 shrink-0" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl font-semibold text-ink">{t.term}</h2>
              </div>
              <p className="text-sm text-foreground/85 mt-2 leading-relaxed">{t.definition}</p>
              {t.example && (
                <p className="font-old italic text-[13px] text-terra/85 mt-2">Напр.: {t.example}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center mt-10">
          <Badge variant="outline" className="text-muted-foreground">Ничего не найдено</Badge>
        </div>
      )}
    </div>
  );
}
