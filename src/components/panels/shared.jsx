import React from 'react';

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex border border-ink-900 w-fit divide-x divide-ink-900">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition flex items-center gap-2 ${
            value === t.id
              ? 'bg-ink-900 text-cream-100'
              : 'text-ink-800 hover:bg-cream-200'
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
    sage: 'border-sage-600 text-ink-900 bg-sage-300/40',
    wood: 'border-wood-600 text-ink-900 bg-wood-300/40',
    terra: 'border-terra-600 text-ink-900 bg-terra-400/30',
    slate: 'border-slate2-600 text-ink-900 bg-slate2-400/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide border ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Placeholder({ label, h = 'h-32', tone = 'sage' }) {
  const bg =
    { sage: '#7d938d', wood: '#a17e64', terra: '#866850', slate: '#777b7d', cream: '#c7c6bf' }[
      tone
    ] ?? '#7d938d';
  return (
    <div
      className={`${h} w-full border border-ink-900 relative overflow-hidden`}
      style={{
        background: `repeating-linear-gradient(45deg, ${bg} 0 8px, color-mix(in oklab, ${bg} 78%, #211f1c) 8px 14px)`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[11px] tracking-wide bg-cream-100 text-ink-900 px-2 py-0.5 border border-ink-900">
          {label}
        </span>
      </div>
    </div>
  );
}
