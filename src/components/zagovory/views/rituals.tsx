"use client";

import { useMemo, useState } from "react";
import type { AppData, RitualDTO } from "@/lib/zagovory";
import { OrnamentDivider } from "../ornaments";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Clock, MapPin, Compass, ChevronRight, ScrollText } from "lucide-react";

const KIND_FILTERS = ["все", "лечение", "присуха", "отсуда", "оберег"] as const;

export function RitualsView({
  data,
  onOpenRitual,
}: {
  data: AppData;
  onOpenRitual: (slug: string) => void;
}) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<string>("все");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return data.rituals.filter((r) => {
      if (kind !== "все" && r.kind !== kind) return false;
      if (!query) return true;
      const haystack = `${r.name} ${r.kind} ${r.goal} ${r.summary} ${r.timeShort} ${r.placeShort} ${r.essence}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [data.rituals, q, kind]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <OrnamentDivider />
      <div className="mt-4">
        <h1 className="font-display text-4xl font-semibold text-ink">Ритуальная практика</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Заговор не читали — его совершали. Слово опиралось на время, место, предметы и порядок
          действий: убрать любую из этих опор — и сила уходила. Ниже — канон проведения обрядов и
          десять полных описаний с предметами, часом и местом; каждый обряд привязан к своему
          слову — заговору или шептанию, которое в нём произносили.
        </p>
      </div>

      {/* ---------- Канон проведения ---------- */}
      <section className="mt-10" aria-label="Канон проведения">
        <h2 className="font-display text-2xl font-semibold text-ink">Канон проведения</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
          Шесть устоев, общих для всех обрядов — от шептания на воду до полевого обхода.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.ritualRules.map((rule) => (
            <Card key={rule.id} className="border-border/70 bg-card/70">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">{rule.title}</h3>
                    <p className="text-xs uppercase tracking-wider text-terra mt-0.5">{rule.shortText}</p>
                  </div>
                  <span className="font-display text-3xl text-ochre/70 leading-none select-none" aria-hidden="true">
                    {rule.glyph ?? "◈"}
                  </span>
                </div>
                <ul className="mt-3.5 space-y-2">
                  {rule.details.map((d, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-muted-foreground">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-ochre/70" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <OrnamentDivider className="my-10" />

      {/* ---------- Обряды ---------- */}
      <section aria-label="Обряды">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Обряды</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
              Десять полных описаний проведения: кто и где стоит, что лежит на столе, что делают
              на каждом шаге и чего никогда не делают. Внутри каждого обряда — его слово, целиком.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Найти обряд…"
              className="pl-9 bg-background/70"
              aria-label="Поиск обряда"
            />
          </div>
        </div>

        {/* Фильтры по роду действия */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Фильтр по роду действия">
          {KIND_FILTERS.map((k) => (
            <Button
              key={k}
              size="sm"
              variant={kind === k ? "secondary" : "outline"}
              onClick={() => setKind(k)}
              className={`h-8 text-[13px] capitalize ${
                kind === k ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
              }`}
              aria-pressed={kind === k}
            >
              {k}
            </Button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RitualCard key={r.id} ritual={r} onOpen={() => onOpenRitual(r.slug)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">
            Ничего не найдено — попробуйте «вода», «соль» или «перекрёсток».
          </p>
        )}
      </section>
    </div>
  );
}

function RitualCard({ ritual, onOpen }: { ritual: RitualDTO; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group text-left rounded-lg border border-border/70 bg-card/70 p-5 hover:shadow-md hover:border-ochre/40 transition-all focus-visible:outline-2 focus-visible:outline-ochre"
      aria-label={`Обряд: ${ritual.name}`}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="secondary" className="text-[11px]">
          {ritual.kind}
        </Badge>
        <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-ochre transition-colors" />
      </div>
      <h3 className="font-display text-2xl font-semibold text-ink mt-3 leading-tight group-hover:text-ochre transition-colors">
        {ritual.name}
      </h3>
      <p className="font-old italic text-xs text-terra/80 mt-1">{ritual.goal}</p>
      <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed line-clamp-3">{ritual.summary}</p>
      {ritual.charm && (
        <p className="flex items-start gap-1.5 text-[13px] mt-2.5 text-foreground/80">
          <ScrollText className="h-3.5 w-3.5 shrink-0 mt-0.5 text-ochre" />
          <span>
            Слово обряда: <span className="font-semibold">«{ritual.charm.title}»</span>
          </span>
        </p>
      )}
      <div className="mt-3.5 space-y-1.5 border-t border-border/60 pt-3">
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5 text-ochre" />
          {ritual.timeShort}
        </p>
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-ochre" />
          {ritual.placeShort}
        </p>
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Compass className="h-3.5 w-3.5 shrink-0 mt-0.5 text-ochre" />
          {ritual.orientation}
        </p>
      </div>
    </button>
  );
}
