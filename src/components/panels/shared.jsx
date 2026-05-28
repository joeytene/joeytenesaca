import React from 'react';

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex gap-1 p-1 rounded-full bg-cream-200/70 border border-ink-800/10 w-fit">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-2 ${
            value === t.id
              ? 'bg-ink-800 text-cream-100 shadow-sm'
              : 'text-ink-700 hover:bg-cream-100/60'
          }`}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function Pill({ children, tone = 'sage' }) {
  const tones = {
    sage: 'bg-sage-300/50 text-ink-800 border-sage-500/30',
    wood: 'bg-wood-300/40 text-ink-800 border-wood-500/30',
    terra: 'bg-terra-400/30 text-ink-800 border-terra-500/30',
    slate: 'bg-slate2-400/30 text-ink-800 border-slate2-600/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Placeholder({ label, h = 'h-32', tone = 'sage' }) {
  const bg =
    { sage: '#a8c09a', wood: '#cda07c', terra: '#c97b56', slate: '#7b8087', cream: '#e1d2b3' }[
      tone
    ] ?? '#a8c09a';
  return (
    <div
      className={`${h} w-full rounded-md border border-ink-800/15 relative overflow-hidden`}
      style={{
        background: `repeating-linear-gradient(45deg, ${bg} 0 8px, color-mix(in oklab, ${bg} 80%, #3a2d22) 8px 14px)`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[11px] tracking-wide bg-cream-100/90 text-ink-800 px-2 py-0.5 rounded border border-ink-800/10">
          {label}
        </span>
      </div>
    </div>
  );
}

