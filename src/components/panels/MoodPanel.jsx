import React from 'react';
import { Pill, Placeholder } from './shared.jsx';

export default function MoodPanel() {
  return (
    <div>
      <div className="mb-6">
        <div className="font-serif-it text-ink-700 text-lg"></div>
        <h2 className="font-serif text-5xl text-ink-900 leading-none">thoughts</h2>
        <p className="text-ink-700 mt-3 max-w-2xl">things that i think are cool</p>
      </div>

      <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        <div className="mb-4 break-inside-avoid p-5 bg-cream-50 border border-ink-800/10 rounded-lg shadow-sm tilt-l">
          <p className="font-serif-it text-2xl text-ink-900 leading-snug">
            "A tool should disappear into the hand of the person using it."
          </p>
          <div className="mt-3 text-xs font-mono uppercase tracking-wider text-ink-700">
            — note, jan '25
          </div>
        </div>

        <div className="mb-4 break-inside-avoid bg-cream-50 border border-ink-800/10 rounded-md p-3 shadow-sm tilt-r">
          <Placeholder label="north window, 7am" h="h-40" tone="sage" />
          <div className="mt-2 font-serif-it text-sm text-ink-700 text-center">
            light I keep coming back to
          </div>
        </div>

        <div className="mb-4 break-inside-avoid p-5 bg-sage-300/30 border border-sage-500/25 rounded-none">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-ink-700">
            principle 01
          </div>
          <div className="font-serif text-3xl text-ink-900 leading-tight mt-2">
            Make the smallest thing that works. Then live with it for a month.
          </div>
        </div>

        <div className="mb-4 break-inside-avoid p-4 bg-cream-50 border border-ink-800/10 rounded-lg">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-ink-700 mb-3">
            working palette
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {['#2a2825', '#6b8e8a', '#9e9a94', '#cac6c0', '#6a6864'].map((c) => (
              <div key={c} className="aspect-square rounded" style={{ background: c }} />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1.5 mt-1.5 text-[9px] font-mono text-ink-700 text-center">
            <div>void</div>
            <div>teal</div>
            <div>raw</div>
            <div>plaster</div>
            <div>slate</div>
          </div>
        </div>

        <div className="mb-4 break-inside-avoid bg-cream-50 border border-ink-800/10 rounded-md p-3 tilt-xl shadow-sm">
          <Placeholder label="UI sketch — knob layout" h="h-32" tone="cream" />
        </div>

        <div className="mb-4 break-inside-avoid p-5 bg-cream-50 border border-ink-800/10 rounded-lg">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-ink-700">
            currently reading
          </div>
          <ul className="mt-3 space-y-2 text-ink-900">
            <li className="flex gap-2">
              <span className="text-terra-600">·</span>
              <span>
                <i>The Mezzanine</i> — Nicholson Baker
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-terra-600">·</span>
              <span>
                <i>The Inner Game of Tennis</i>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-terra-600">·</span>
              <span>
                <i>How Music Works</i> — David Byrne
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-4 break-inside-avoid p-5 bg-cream-200/60 border border-ink-800/10 rounded-none">
          <p className="font-serif text-xl text-ink-900 leading-relaxed">
            I'd rather build one thing slowly than ship five things on autopilot.{' '}
            <span className="font-serif-it">Patience is a creative practice.</span>
          </p>
        </div>

        <div className="mb-4 break-inside-avoid bg-cream-50 border border-ink-800/10 rounded-md p-3 shadow-sm tilt-r">
          <Placeholder label="oscilloscope, lab 3" h="h-32" tone="slate" />
        </div>

        <div className="mb-4 break-inside-avoid p-5 bg-cream-50 border border-ink-800/10 rounded-lg">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-ink-700 mb-3">
            influences
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Bauhaus',
              'Dieter Rams',
              'Donald Judd',
              'Bridget Riley',
              'Brian Eno',
              'Le Corbusier',
              'Tadao Ando',
              'Hiroshi Yoshimura',
              'Olafur Eliasson',
            ].map((n) => (
              <Pill key={n} tone="wood">
                {n}
              </Pill>
            ))}
          </div>
        </div>

        <div className="mb-4 break-inside-avoid bg-cream-50 border border-ink-800/10 rounded-md p-3 shadow-sm tilt-l">
          <Placeholder label="bench setup" h="h-24" tone="terra" />
        </div>

        <div className="mb-4 break-inside-avoid p-5 bg-cream-50 border border-ink-800/10 rounded-lg">
          <p className="font-serif-it text-xl text-ink-900 leading-snug">
            "Constraints are a kind of generosity."
          </p>
        </div>
      </div>
    </div>
  );
}

