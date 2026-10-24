// SVG-орнаменты в духе русской народной графики (ромбическая кайма, разделители)

export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 py-2 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[oklch(0.7_0.06_65)] to-[oklch(0.7_0.06_65)]" />
      <svg width="120" height="14" viewBox="0 0 120 14" className="text-[oklch(0.52_0.09_62)]">
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="52" y="1" width="12" height="12" transform="rotate(45 58 7)" />
          <rect x="56" y="5" width="4" height="4" transform="rotate(45 58 7)" fill="currentColor" stroke="none" />
          <path d="M36 7h10M74 7h10" />
          <rect x="20" y="3.5" width="7" height="7" transform="rotate(45 23.5 7)" />
          <rect x="93" y="3.5" width="7" height="7" transform="rotate(45 96.5 7)" />
        </g>
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[oklch(0.7_0.06_65)] to-[oklch(0.7_0.06_65)]" />
    </div>
  );
}

export function DiamondBand({ className = "" }: { className?: string }) {
  const cells = 28;
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg width="100%" height="10" viewBox={`0 0 ${cells * 14} 10`} preserveAspectRatio="none" className="text-[oklch(0.62_0.075_62)]">
        {Array.from({ length: cells }).map((_, i) => (
          <rect
            key={i}
            x={i * 14 + 4}
            y="2.5"
            width="5"
            height="5"
            transform={`rotate(45 ${i * 14 + 6.5} 5)`}
            fill={i % 2 === 0 ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}

export function SunIcon({ size = 64, className = "" }: { size?: number; className?: string }) {
  // Координаты округлены детерминированно: Math.cos может отличаться
  // между движками JS (JSC на сервере / V8 в браузере) в последнем знаке.
  const r = (v: number) => Number(v.toFixed(3));
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="40" cy="40" r="14" />
        <circle cx="40" cy="40" r="9" strokeDasharray="3 3" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const x1 = r(40 + Math.cos(a) * 18);
          const y1 = r(40 + Math.sin(a) * 18);
          const x2 = r(40 + Math.cos(a) * 30);
          const y2 = r(40 + Math.sin(a) * 30);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6 + Math.PI / 12;
          const x = r(40 + Math.cos(a) * 34);
          const y = r(40 + Math.sin(a) * 34);
          return <circle key={i} cx={x} cy={y} r="1.6" fill="currentColor" stroke="none" />;
        })}
      </g>
    </svg>
  );
}

export function TreeIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M32 6 L44 24 L37 24 L48 40 L36 40 L36 56 M32 6 L20 24 L27 24 L16 40 L28 40 L28 56" />
        <path d="M24 56h16" />
        <circle cx="32" cy="6" r="2.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
