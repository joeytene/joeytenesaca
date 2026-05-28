import React from 'react';
import { IconDownload, IconMail } from '../icons.jsx';

export default function PaperPanel() {
  return (
    <div className="grid md:grid-cols-[1fr_1.4fr] gap-8">
      <div>
        <div className="font-serif-it text-ink-700 text-lg"></div>
        <h2 className="font-serif text-5xl text-ink-900 leading-none">resume</h2>
        <p className="text-ink-700 mt-3"></p>
        <div className="mt-6 flex flex-col gap-2">
          <a
            href="#"
            download
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-none bg-ink-800 text-cream-100 hover:bg-ink-900 transition font-medium"
          >
            <IconDownload size={16} /> download pdf
          </a>
          <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cream-100/80 text-ink-800 border border-ink-800/15 hover:bg-cream-100 transition font-medium">
            <IconMail size={16} /> Email me a copy
          </button>
        </div>
        <dl className="mt-8 space-y-3 text-sm">
          {[
            ['Based in', 'stanford, ca'],
            ['Tools', 'ableton'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <dt className="text-ink-700 w-24 font-mono text-xs uppercase tracking-wider pt-0.5">
                {k}
              </dt>
              <dd className="text-ink-900 flex-1">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className="bg-cream-50 rounded-md border border-ink-800/10 shadow-[0_30px_60px_-20px_rgba(42,40,37,.22)] p-8 text-ink-900 relative"
        style={{ aspectRatio: '8.5/11', maxHeight: '70vh', overflow: 'hidden' }}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-sage-500"></div>
        <div className="flex justify-between items-baseline border-b border-ink-800/20 pb-3">
          <div>
            <div className="font-serif text-3xl leading-none">Your Name</div>
            <div className="text-xs text-ink-700 mt-1 font-mono">
              Electrical Engineer · Audio · Designer
            </div>
          </div>
          <div className="text-xs text-ink-700 font-mono text-right leading-relaxed">
            you@email.com
            <br />
            yoursite.com
            <br />
            @yourhandle
          </div>
        </div>

        <section className="mt-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-terra-600">
            Education
          </h4>
          <div className="mt-1.5 flex justify-between text-sm">
            <div>
              <b>B.S. Electrical Engineering</b>, University of Somewhere
            </div>
            <div className="text-ink-700 text-xs font-mono">2022 — 2026</div>
          </div>
          <div className="text-xs text-ink-700 mt-0.5">
            Minor in Music, Science & Tech · GPA 3.84
          </div>
        </section>

        <section className="mt-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-terra-600">
            Experience
          </h4>
          {[
            [
              'Hardware Intern — Specular Audio',
              'Summer 2025',
              'Designed analog front-end for low-noise contact microphone. Brought-up two PCB revs.',
            ],
            [
              'Research Asst. — Signal Processing Lab',
              '2024 — 2025',
              'Phase-vocoder pitch-shift evaluated against perceptual benchmarks. Co-author on workshop paper.',
            ],
            [
              'Studio Engineer — Campus Radio',
              '2023 — 2024',
              'Maintained live console + ATR-decks; trained 14 new DJs.',
            ],
          ].map(([t, d, desc], i) => (
            <div key={i} className="mt-2.5">
              <div className="flex justify-between text-sm">
                <b>{t}</b>
                <span className="font-mono text-xs text-ink-700">{d}</span>
              </div>
              <div className="text-xs text-ink-700 leading-relaxed">{desc}</div>
            </div>
          ))}
        </section>

        <section className="mt-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-terra-600">
            Selected Projects
          </h4>
          <ul className="text-xs text-ink-800 mt-1 space-y-1 list-disc pl-4 marker:text-terra-600">
            <li>
              <b>Modular VCO</b> — analog Eurorack oscillator with exponential FM.
            </li>
            <li>
              <b>Haptic Glove</b> — STM32 + BLE haptics array, sub-6ms latency.
            </li>
            <li>
              <b>crumb</b> — opinionated static site generator in Go.
            </li>
          </ul>
        </section>

        <div className="absolute bottom-3 right-4 text-[9px] font-mono text-ink-700/60 tracking-wider">
          — page 1 of 1 —
        </div>
      </div>
    </div>
  );
}

