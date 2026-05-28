import React from 'react';
import { IconHeadphone, IconPause, IconPlay } from '../icons.jsx';

export default function MusicPanel() {
  const [playing, setPlaying] = React.useState(null);

  const tracks = [
    { n: '01', t: 'Soft Rooms', dur: '3:42', tag: 'ambient', desc: 'felted piano + tape hiss' },
    { n: '02', t: 'Cassette Sunday', dur: '4:18', tag: 'lo-fi', desc: 'field recordings under a Rhodes' },
    { n: '03', t: 'North Light', dur: '2:55', tag: 'acoustic', desc: 'fingerstyle, one mic, one take' },
    { n: '04', t: 'Slow Modular', dur: '6:11', tag: 'electronic', desc: '40-minute patch, cut to fit' },
    { n: '05', t: 'Letter to a Friend', dur: '3:08', tag: 'voice', desc: 'demo, kept the breaths' },
    { n: '06', t: 'Static Bloom', dur: '5:47', tag: 'electronic', desc: 'granular textures + harp samples' },
  ];

  return (
    <div className="grid md:grid-cols-[1.4fr_1fr] gap-8">
      <div>
        <div className="font-serif-it text-ink-700 text-lg"></div>
        <h2 className="font-serif text-5xl text-ink-900 leading-none">music</h2>
        <p className="text-ink-700 mt-3 max-w-md">
          i love music. here is what i've made or am inspired by
        </p>

        <div className="mt-6 divide-y divide-ink-900/15 overflow-hidden border border-ink-900 bg-cream-100">
          {tracks.map((tr) => {
            const isPlaying = playing === tr.n;
            return (
              <div
                key={tr.n}
                className={`flex items-center gap-4 px-4 py-3 transition ${
                  isPlaying ? 'bg-sage-300/30' : 'hover:bg-cream-200/60'
                }`}
              >
                <button
                  onClick={() => setPlaying(isPlaying ? null : tr.n)}
                  className={`w-9 h-9 rounded-none grid place-items-center transition ${
                    isPlaying
                      ? 'bg-terra-500 text-cream-100'
                      : 'bg-ink-900 text-cream-100 hover:bg-ink-800'
                  }`}
                >
                  {isPlaying ? <IconPause size={14} /> : <IconPlay size={14} />}
                </button>
                <span className="font-mono text-xs text-ink-700 w-8">{tr.n}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl text-ink-900 truncate">{tr.t}</span>
                    <span className="text-xs font-mono uppercase tracking-wider text-ink-700">
                      {tr.tag}
                    </span>
                  </div>
                  <div className="text-xs text-ink-700">{tr.desc}</div>
                </div>
                <div className="font-mono text-xs text-ink-700">{tr.dur}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-serif-it text-ink-700 text-base">Currently in rotation</h3>
          <div className="mt-3 space-y-3">
            {[
              { t: 'Promises', a: 'Floating Points · Pharoah Sanders', c: '#a8c09a' },
              { t: 'Hyperion', a: 'Bartók — String Quartet 4', c: '#c97b56' },
              { t: 'Aerial', a: 'Hiroshi Yoshimura', c: '#cda07c' },
              { t: 'For Emma', a: 'Bon Iver', c: '#7b8087' },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div
                  className="w-12 h-12 rounded-none border border-ink-900 shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${s.c}, color-mix(in oklab, ${s.c} 55%, #1e1c1a))`,
                  }}
                />
                <div>
                  <div className="font-medium text-sm text-ink-900">{s.t}</div>
                  <div className="text-xs text-ink-700">{s.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-cream-100 border border-ink-900">
          <div className="flex items-center gap-2 mb-2 text-ink-700">
            <IconHeadphone size={14} />
            <span className="text-xs font-mono uppercase tracking-wider">Studio</span>
          </div>
          <ul className="text-sm space-y-1 text-ink-800">
            <li>· Sequential Take 5</li>
            <li>· Martin OM-21 (1996)</li>
            <li>· UA Apollo Twin</li>
            <li>· A Rhodes that mostly works</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

