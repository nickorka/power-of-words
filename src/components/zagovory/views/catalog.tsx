"use client";

import { useMemo, useState } from "react";
import type { AppData, CharmDTO } from "@/lib/zagovory";
import { OrnamentDivider } from "../ornaments";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, CalendarDays, ScrollText, Flame } from "lucide-react";

const KINDS = ["заговор", "присуха", "отсуда", "оберег"];

const ERAS = ["Этнографические записи"];

export function CatalogView({
  data,
  onOpenCharm,
}: {
  data: AppData;
  onOpenCharm: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [kind, setKind] = useState<string>("all");
  const [era, setEra] = useState<string>("all");

  const regions = useMemo(
    () => Array.from(new Set(data.charms.map((c) => c.region))).sort(),
    [data.charms]
  );
  const [region, setRegion] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.charms.filter((c) => {
      if (category !== "all" && c.category.slug !== category) return false;
      if (kind !== "all" && c.kind !== kind) return false;
      if (era !== "all" && c.era !== era) return false;
      if (region !== "all" && c.region !== region) return false;
      if (!q) return true;
      const hay = [c.title, c.purpose, c.summary, c.originalText, c.translation, c.keywords.join(" ")]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [data.charms, query, category, kind, era, region]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setKind("all");
    setEra("all");
    setRegion("all");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <OrnamentDivider />
      <h1 className="font-display text-4xl font-semibold text-ink mt-4">Каталог заговоров</h1>
      <p className="text-muted-foreground mt-2 max-w-3xl">
        Корпус устроен как исследовательская картотека: каждую запись можно найти по болезни,
        жанру, региону записи или слову внутри текста. Нажмите на карточку, чтобы открыть
        оригинал, перевод и полный разбор.
      </p>

      {/* ---------- Панель фильтров ---------- */}
      <div className="mt-6 rounded-lg border border-border/70 bg-card/60 p-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск: заря, кровь, Буян…"
              className="pl-9 bg-background/70"
              aria-label="Поиск по текстам"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-background/70" aria-label="Категория хвори">
              <SelectValue placeholder="Категория хвори" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {data.categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="bg-background/70" aria-label="Регион записи">
              <SelectValue placeholder="Регион записи" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все регионы</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={era} onValueChange={setEra}>
            <SelectTrigger className="bg-background/70" aria-label="Период">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все периоды</SelectItem>
              {ERAS.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">Жанр:</span>
          <Button
            size="sm"
            variant={kind === "all" ? "secondary" : "ghost"}
            onClick={() => setKind("all")}
            className="h-7 text-xs"
          >
            все
          </Button>
          {KINDS.map((k) => (
            <Button
              key={k}
              size="sm"
              variant={kind === k ? "secondary" : "ghost"}
              onClick={() => setKind(k)}
              className="h-7 text-xs"
            >
              {k}
            </Button>
          ))}
          <span className="flex-1" />
          <Button size="sm" variant="ghost" onClick={reset} className="h-7 text-xs text-muted-foreground">
            сбросить
          </Button>
        </div>
      </div>

      {/* ---------- Результаты ---------- */}
      <p className="text-sm text-muted-foreground mt-5 mb-3">
        Найдено записей: <span className="font-semibold text-ink">{filtered.length}</span> из {data.charms.length}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card/40 p-12 text-center">
          <ScrollText className="h-8 w-8 mx-auto text-muted-foreground/50" />
          <p className="mt-3 text-muted-foreground">
            По вашему запросу ничего не найдено. Попробуйте другое слово — например, «заря», «месяц» или «кровь».
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c: CharmDTO) => (
            <button
              key={c.slug}
              onClick={() => onOpenCharm(c.slug)}
              className="group flex flex-col text-left rounded-lg border border-border/70 bg-card/70 p-5 hover:shadow-md hover:border-ochre/40 transition-all focus-visible:outline-2 focus-visible:outline-ochre"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-[11px]">{c.kind}</Badge>
                <Badge variant="outline" className="text-[11px]">{c.category.name}</Badge>
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mt-3 group-hover:text-ochre transition-colors">
                {c.title}
              </h3>
              <p className="font-old italic text-[13px] text-foreground/70 mt-1.5 line-clamp-2">
                «{c.originalText.split("\n")[0]}…»
              </p>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">{c.summary}</p>
              {c.ritual && (
                <p className="flex items-center gap-1.5 text-xs text-ochre mt-2">
                  <Flame className="h-3 w-3 shrink-0" />
                  Ритуал: {c.ritual.name}
                </p>
              )}
              <div className="mt-3 pt-3 border-t border-border/60 space-y-1 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {c.region}
                </p>
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="h-3 w-3 shrink-0" />
                  {c.dating}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
