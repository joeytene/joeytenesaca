import React from 'react';
import { IconBook, IconCode, IconCpu, IconExternal, IconGithub, IconHeart } from '../icons.jsx';
import { Pill, Placeholder, Tabs } from './shared.jsx';

export default function ComputerPanel() {
  const [tab, setTab] = React.useState('hardware');

  return (
    <div>
      <div className="flex items-start justify-between gap-6 mb-6 flex-wrap">
        <div>
          <h2 className="font-serif text-5xl text-ink-900 leading-none">Technical Work</h2>
          <p className="text-ink-700 mt-3 max-w-md">
            Where electrons meet — hardware tinkering, software repos, and coursework that shaped
            how I think.
          </p>
        </div>
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'hardware', label: 'Hardware', icon: <IconCpu size={14} /> },
            { id: 'software', label: 'Software', icon: <IconCode size={14} /> },
            { id: 'academic', label: 'Academic', icon: <IconBook size={14} /> },
          ]}
        />
      </div>

      {tab === 'hardware' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              t: 'Modular Eurorack VCO',
              d: 'Through-hole analog oscillator with exponential FM input. KiCad + handmade enclosure.',
              tags: ['KiCad', 'Analog', 'PCB'],
            },
            {
              t: 'Tactile Haptic Glove',
              d: 'Five-finger ERM array driven by an STM32; latency under 6ms over BLE.',
              tags: ['STM32', 'BLE', 'C++'],
            },
            {
              t: 'RF Distance Sensor',
              d: '2.4GHz CW phase-shift ranging; sub-cm accuracy at 4m.',
              tags: ['RF', 'DSP', 'Matlab'],
            },
            {
              t: 'Solar Battery Logger',
              d: 'Off-grid MPPT logger w/ LoRaWAN backhaul. 14 months uptime.',
              tags: ['LoRa', 'Power', 'Rust'],
            },
          ].map((p, i) => (
            <div
              key={i}
              className="p-4 bg-cream-100 border border-ink-900 hover:shadow-hard-sm hover:-translate-y-0.5 transition"
            >
              <Placeholder label={`schematic — ${p.t.toLowerCase()}`} h="h-28" tone="slate" />
              <div className="mt-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-serif text-2xl leading-tight text-ink-900">{p.t}</div>
                  <button className="text-ink-700 hover:text-ink-900">
                    <IconExternal size={15} />
                  </button>
                </div>
                <p className="text-sm text-ink-700 mt-1.5">{p.d}</p>
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {p.tags.map((t) => (
                    <Pill key={t} tone="slate">
                      {t}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'software' && (
        <div className="space-y-3">
          {[
            { t: 'crumb', d: 'Tiny static site generator written in Go. Markdown in, opinionated HTML out.', stars: '412', lang: 'Go' },
            { t: 'sonogram.py', d: 'Numpy-only spectrogram with adjustable windowing. Used in three labs.', stars: '87', lang: 'Python' },
            { t: 'pcb-snap', d: 'Browser tool for tracing schematic photos into KiCad netlists.', stars: '214', lang: 'TypeScript' },
            { t: 'lightpaper', d: 'Notion-style editor with offline-first sync. WIP, but daily-driven.', stars: '56', lang: 'Rust' },
          ].map((r, i) => (
            <a
              key={i}
              className="flex items-center gap-4 p-4 bg-cream-100 border border-ink-900 hover:shadow-hard-sm hover:-translate-y-0.5 transition cursor-pointer"
            >
              <div className="w-10 h-10 rounded-none bg-ink-900 text-cream-100 grid place-items-center">
                <IconGithub size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono font-medium text-ink-900">{r.t}</span>
                  <span className="text-xs text-ink-700">{r.lang}</span>
                </div>
                <p className="text-sm text-ink-700 truncate">{r.d}</p>
              </div>
              <div className="text-sm text-ink-700 flex items-center gap-1.5">
                <IconHeart size={14} />
                {r.stars}
              </div>
            </a>
          ))}
        </div>
      )}

      {tab === 'academic' && (
        <div className="grid md:grid-cols-3 gap-3">
          {[
            ['EE 168', 'Digital Image Processing', 'A'],
            ['EE 226', 'Random Processes', 'A−'],
            ['CS 229', 'Machine Learning', 'A'],
            ['EE 264', 'Digital Signal Processing', 'A'],
            ['MUS 101', 'Theory & Composition', '—'],
            ['EE 372', 'Microwave Eng.', 'B+'],
          ].map(([code, title, grade], i) => (
            <div key={i} className="p-4 bg-cream-100 border border-ink-900">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-ink-700">{code}</span>
                <span className="font-mono text-xs text-terra-600">{grade}</span>
              </div>
              <div className="font-serif text-xl text-ink-900 mt-1">{title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

