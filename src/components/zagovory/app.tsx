"use client";

import { useMemo, useState } from "react";
import type { AppData, CharmDTO } from "@/lib/zagovory";
import { OrnamentDivider, DiamondBand } from "./ornaments";
import { HomeView } from "./views/home";
import { CatalogView } from "./views/catalog";
import { AnalysisView } from "./views/analysis";
import { SymbolsView } from "./views/symbols";
import { GlossaryView } from "./views/glossary";
import { SourcesView } from "./views/sources";
import { CharmDialog } from "./charm-dialog";
import { ScrollText, BookOpen, FlaskConical, Eye, BookMarked, LibraryBig, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export type ViewKey = "home" | "catalog" | "analysis" | "symbols" | "glossary" | "sources";

const NAV: { key: ViewKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "home", label: "Главная", icon: ScrollText },
  { key: "catalog", label: "Каталог заговоров", icon: BookOpen },
  { key: "analysis", label: "Разбор традиции", icon: FlaskConical },
  { key: "symbols", label: "Символы", icon: Eye },
  { key: "glossary", label: "Глоссарий", icon: BookMarked },
  { key: "sources", label: "Источники", icon: LibraryBig },
];

export function ZagovoryApp({ data }: { data: AppData }) {
  const [view, setView] = useState<ViewKey>("home");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedCharm: CharmDTO | null = useMemo(
    () => data.charms.find((c) => c.slug === selectedSlug) ?? null,
    [data.charms, selectedSlug]
  );

  const openCharm = (slug: string) => {
    setSelectedSlug(slug);
  };
  const closeCharm = () => setSelectedSlug(null);

  const go = (v: ViewKey) => {
    setView(v);
    setMenuOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col parchment-texture">
      {/* ---------- Шапка ---------- */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-[oklch(0.947_0.024_84.5)]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            <button
              onClick={() => go("home")}
              className="group flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-ochre rounded"
              aria-label="На главную"
            >
              <svg width="34" height="34" viewBox="0 0 40 40" className="text-ochre shrink-0" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="11.5" y="11.5" width="17" height="17" transform="rotate(45 20 20)" />
                  <rect x="15.5" y="15.5" width="9" height="9" transform="rotate(45 20 20)" fill="currentColor" stroke="none" opacity="0.85" />
                  <path d="M20 1v6M20 33v6M1 20h6M33 20h6" />
                </g>
              </svg>
              <span className="leading-tight">
                <span className="block font-display text-lg sm:text-xl font-semibold tracking-wide text-ink">
                  Слово оберегающее
                </span>
                <span className="block text-[11px] sm:text-xs text-muted-foreground tracking-wide">
                  Заговорная традиция Древней Руси
                </span>
              </span>
            </button>

            {/* Десктопная навигация */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
              {NAV.map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={view === key ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => go(key)}
                  className={`gap-1.5 text-[13px] ${
                    view === key ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </nav>

            {/* Мобильное меню */}
            <div className="lg:hidden">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Открыть меню">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" aria-describedby={undefined} className="w-72 bg-card">
                  <SheetTitle className="font-display text-lg text-ink">Разделы</SheetTitle>
                  <nav className="mt-4 flex flex-col gap-1" aria-label="Мобильная навигация">
                    {NAV.map(({ key, label, icon: Icon }) => (
                      <Button
                        key={key}
                        variant={view === key ? "secondary" : "ghost"}
                        onClick={() => go(key)}
                        className="justify-start gap-2.5"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <DiamondBand className="opacity-40" />
      </header>

      {/* ---------- Содержимое ---------- */}
      <main className="flex-1">
        {view === "home" && <HomeView data={data} onNavigate={go} onOpenCharm={openCharm} />}
        {view === "catalog" && <CatalogView data={data} onOpenCharm={openCharm} />}
        {view === "analysis" && <AnalysisView data={data} />}
        {view === "symbols" && <SymbolsView data={data} />}
        {view === "glossary" && <GlossaryView data={data} />}
        {view === "sources" && <SourcesView data={data} />}
      </main>

      {/* ---------- Подвал ---------- */}
      <footer className="mt-auto border-t border-border/80 bg-[oklch(0.925_0.03_82)]">
        <DiamondBand className="opacity-30" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-8">
          <OrnamentDivider className="opacity-70" />
          <div className="grid gap-4 sm:grid-cols-3 items-start text-sm text-muted-foreground">
            <div>
              <p className="font-display text-base text-ink mb-1">Слово оберегающее</p>
              <p>Образовательный корпус русских целительных заговоров: {data.charms.length} записей, {data.categories.length} категорий хворей.</p>
            </div>
            <div>
              <p className="font-display text-base text-ink mb-1">О назначении</p>
              <p>Материал носит историко-культурный характер и не является медицинской рекомендацией. Тексты приводятся по сводам XIX века.</p>
            </div>
            <div>
              <p className="font-display text-base text-ink mb-1">Навигация</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {NAV.map(({ key, label }) => (
                  <button key={key} onClick={() => go(key)} className="hover:text-foreground underline-offset-2 hover:underline">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------- Диалог ---------- */}
      <CharmDialog charm={selectedCharm} onClose={closeCharm} />
    </div>
  );
}
