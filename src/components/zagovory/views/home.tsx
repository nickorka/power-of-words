"use client";

import type { AppData, ViewKey } from "@/lib/zagovory";
import { OrnamentDivider, DiamondBand, SunIcon, TreeIcon } from "../ornaments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FlaskConical, ArrowRight, Flame } from "lucide-react";

const STRUCTURE = [
  {
    label: "Зачин",
    color: "#7a5c2e",
    example: "«Встану я, раб Божий, благословясь, пойду перекрестясь…»",
    text: "Выход из обыденного мира в сакральный: изба — двор — чистое поле. Зачин настраивает слово, как ладонь — ложку: держит его правильно.",
  },
  {
    label: "Эпический центр",
    color: "#8a6a2f",
    example: "«На море на Окияне, на острове на Буяне стоит дуб…»",
    text: "Картина сакрального места и его жителей: Буян, дуб, заря, святой целитель. Здесь сила «присутствует» — и потому может быть упрошена.",
  },
  {
    label: "Заклинание",
    color: "#9c3f2a",
    example: "«Как у дуба сучья не кровоточат — так бы и у раба кровь не лилась…»",
    text: "Сердце текста: приказ, уподобление («как… так бы…») или перенос болезни. Слово здесь равно действию.",
  },
  {
    label: "Закрепка",
    color: "#4a6b3f",
    example: "«Будьте, слова, крепки и лепки: ключ — небо, замок — земля. Аминь»",
    text: "Печать формулы: слова «привязываются» к вечным опорам мироздания, чтобы сила не рассеялась.",
  },
];

const VIEWS = [
  {
    title: "Лингвистический разбор",
    text: "Композиция формулы, параллелизм и отрицательный параллелизм, постоянные эпитеты, архаизмы («лепки», «скредета», «потягота»), ритм и аллитерация, перформативность слова.",
    icon: BookOpen,
    tint: "text-ochre",
  },
  {
    title: "Исторический контекст",
    text: "От дохристианских истоков через церковную полемику XI–XVII веков к рукописным лечебникам и этнографическому сбору XIX века: кто лечил, где записывали, как менялись имена силы.",
    icon: FlaskConical,
    tint: "text-terra",
  },
  {
    title: "Символическая логика",
    text: "Почему именно Буян, дуб, заря и месяц? Магия подобия и переноса, сакральные числа, договорные формулы и печати слова — внутренняя механика заговорного мира.",
    icon: ArrowRight,
    tint: "text-moss",
  },
];

export function HomeView({
  data,
  onNavigate,
  onOpenCharm,
}: {
  data: AppData;
  onNavigate: (v: ViewKey) => void;
  onOpenCharm: (slug: string) => void;
}) {
  const featured = ["baba-zmeyka-na-buyane", "mesyac-serebryanyi-rozhek", "zarya-zaryanica-son", "otsuda-garmon"]
    .map((s) => data.charms.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div>
      {/* ---------- Обложка ---------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-10 sm:pt-16 sm:pb-12 text-center">
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground">
            Образовательный корпус · этнолингвистика · фольклористика
          </p>
          <div className="flex justify-center my-4 text-terra/70">
            <SunIcon size={72} />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-ink">
            Слово оберегающее
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Заговоры, присушки и отсушки народных целителей Древней Руси: оригинальные тексты
            по сводам XIX века, современные переводы и трёхсторонний разбор — лингвистический,
            исторический и символический.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => onNavigate("catalog")} className="gap-2">
              <BookOpen className="h-4 w-4" />
              Открыть каталог
            </Button>
            <Button size="lg" variant="secondary" onClick={() => onNavigate("analysis")} className="gap-2">
              <Flame className="h-4 w-4" />
              Канон проведения обрядов
            </Button>
          </div>

          {/* Статистика */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { n: data.charms.length, label: "записей в корпусе" },
              { n: data.charms.filter((c) => c.ritual).length, label: "ритуалов проведения" },
              { n: data.categories.length, label: "категорий хворей" },
              { n: data.symbols.length, label: "символов мира" },
              { n: data.glossary.length, label: "терминов и архаизмов" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border/70 bg-card/70 px-3 py-4">
                <p className="font-display text-3xl font-semibold text-ochre">{s.n}</p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <DiamondBand className="opacity-50" />
      </section>

      {/* ---------- Что такое заговор ---------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <OrnamentDivider />
        <div className="grid gap-8 lg:grid-cols-5 mt-6">
          <div className="lg:col-span-3">
            <h2 className="font-display text-3xl font-semibold text-ink">Что такое заговор</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/90">
              <p className="drop-cap">
                Заговор — это ритмически организованная словесная формула, которой народная традиция
                приписывала способность непосредственно изменять мир: останавливать кровь, снимать
                лихорадку, усыплять младенца, зажигать и остужать сердца. Для человека древней Руси
                слово не описывало лечение — оно и было лечением. Это древнейший русский
                «перформативный» жанр: сказать «уходи, хворь» означало реально изгнать её.
              </p>
              <p>
                Исполнителем выступали знахари, бабы-шептухи, кузнецы и повитухи; формулы
                произносились шёпотом, на выдохе, над водой, воском и нитью — и почти всегда
                в строго определённое время: на утренней или вечерней заре, на молодой месяц,
                в Чистый четверг. Композиция заговора устойчива на протяжении веков и узнаётся
                от Пскова до Сибири — свидетельство тысячелетней устной дисциплины текста.
              </p>
              <p>
                Настоящий корпус собирает сорок семь образцовых записей из этнографических сводов
                XIX века — Сахарова, Даля, Майкова, Шейна, Бурцева — и снабжает каждую тремя слоями
                комментария: языковым разбором, исторической справкой и символическим ключом.
                Слово здесь неотделимо от дела: в каждой записи раскрыт её собственный ритуал
                проведения — в какой час, у какого окна, какие предметы клали на стол, в каком
                порядке шептать и какие запреты блюсти; общие устои канона собраны во вкладке
                «Канон обряда» раздела «Разбор традиции».
              </p>
            </div>
          </div>

          {/* Схема композиции */}
          <div className="lg:col-span-2">
            <div className="frame-double rounded-lg bg-card/80 p-4 sm:p-5">
              <p className="font-display text-xl font-semibold text-ink text-center">Композиция заговора</p>
              <p className="text-center text-xs text-muted-foreground mt-1 mb-4">
                четыре части, устойчивые тысячелетие
              </p>
              <div className="space-y-2.5">
                {STRUCTURE.map((s, i) => (
                  <div key={s.label} className="relative">
                    {i > 0 && <div className="mx-auto h-2 w-px bg-border" />}
                    <div className="rounded-md border bg-background/60 p-3" style={{ borderLeft: `3px solid ${s.color}` }}>
                      <p className="font-semibold text-sm" style={{ color: s.color }}>
                        {i + 1}. {s.label}
                      </p>
                      <p className="font-old text-[13px] italic text-foreground/80 mt-1 leading-snug">{s.example}</p>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Три взгляда ---------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {VIEWS.map((v) => (
            <Card key={v.title} className="border-border/70 bg-card/70 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <v.icon className={`h-6 w-6 ${v.tint}`} />
                <h3 className="font-display text-xl font-semibold text-ink mt-3">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- Избранные записи ---------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-12">
        <OrnamentDivider />
        <div className="flex items-end justify-between mt-6 mb-5">
          <h2 className="font-display text-3xl font-semibold text-ink">Из антологии</h2>
          <Button variant="ghost" onClick={() => onNavigate("catalog")} className="gap-1.5 text-sm">
            все {data.charms.length} записей
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((c) => (
            <button
              key={c.slug}
              onClick={() => onOpenCharm(c.slug)}
              className="group text-left rounded-lg border border-border/70 bg-card/70 p-5 hover:shadow-md hover:border-ochre/40 transition-all focus-visible:outline-2 focus-visible:outline-ochre"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-[11px]">{c.kind}</Badge>
                <Badge variant="outline" className="text-[11px]">{c.category.name}</Badge>
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink mt-3 group-hover:text-ochre transition-colors">
                {c.title}
              </h3>
              <p className="font-old italic text-sm text-foreground/75 mt-2 line-clamp-2">
                «{c.originalText.split("\n")[0]}…»
              </p>
              <p className="text-sm text-muted-foreground mt-2">{c.summary}</p>
              {c.ritual && (
                <p className="flex items-center gap-1.5 text-xs text-ochre mt-2.5">
                  <Flame className="h-3.5 w-3.5 shrink-0" />
                  Ритуал: {c.ritual.name}
                </p>
              )}
              <p className="text-xs text-muted-foreground/80 mt-3">{c.sourceRef}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ---------- Категории хворей ---------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
        <OrnamentDivider />
        <h2 className="font-display text-3xl font-semibold text-ink mt-6 mb-2">Категории хворей</h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-3xl">
          Народная медицина группировала недуги по «характеру» болезни — огненные, сверлящие,
          текучие, насланные. По этим же группам устроен каталог корпуса.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.categories.map((cat) => {
            const count = data.charms.filter((c) => c.categoryId === cat.id).length;
            return (
              <button
                key={cat.slug}
                onClick={() => onNavigate("catalog")}
                className="text-left rounded-lg border border-border/70 bg-card/60 p-4 hover:border-ochre/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{cat.name}</p>
                  <span className="font-display text-lg text-ochre">{count}</span>
                </div>
                {cat.oldName && <p className="font-old italic text-xs text-terra/80 mt-0.5">{cat.oldName}</p>}
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{cat.description}</p>
              </button>
            );
          })}
        </div>
        <div className="flex justify-center mt-8 text-moss/60">
          <TreeIcon size={48} />
        </div>
      </section>
    </div>
  );
}
