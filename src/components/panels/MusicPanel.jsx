import React from 'react';
import { IconMusic, IconExternal } from '../icons.jsx';

/* Curated rotation. Artwork is pulled from Spotify's public image CDN.
   To override with a local file, drop it in /public and point `art` at it. */
const TRACKS = [
  {
    title: 'Good Morning, Captain',
    artist: 'Slint',
    album: 'Spiderland',
    url: 'https://open.spotify.com/track/1BNZMXjqqULiV0DmFU1B8S',
    art: 'https://i.scdn.co/image/ab67616d0000b273ca727fc0809fb501506ce413',
    c: '#7b8087',
  },
  {
    title: 'minipops 67 [120.2][source field mix]',
    artist: 'Aphex Twin',
    album: 'Syro',
    url: 'https://open.spotify.com/track/00xFfMsOn9TbRe3sZcdABm',
    art: 'https://i.scdn.co/image/ab67616d0000b2736ea96ba633bead24af562890',
    c: '#c97b56',
  },
  {
    title: 'Never Know',
    artist: 'Jack Johnson',
    album: 'In Between Dreams',
    url: 'https://open.spotify.com/track/3dKFxCpVtK3g9KAB8S1FwY',
    art: 'https://i.scdn.co/image/ab67616d0000b273628dba01c669d89586967dc5',
    c: '#cda07c',
  },
  {
    title: 'Neverending Math Equation',
    artist: 'Sun Kil Moon',
    album: 'Tiny Cities',
    url: 'https://open.spotify.com/track/47MLKnVQpYNzHQps6EfULG',
    art: 'https://i.scdn.co/image/ab67616d0000b2735b2e4e5f4f13c263ad282a80',
    c: '#a8c09a',
  },
];

function AlbumCard({ title, artist, album, url, art, c }) {
  return (
    <div className="group border border-ink-900 bg-cream-100 overflow-hidden hover:shadow-hard-sm hover:-translate-y-0.5 transition">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open "${title}" by ${artist} on Spotify`}
        className="block relative aspect-square border-b border-ink-900"
        style={{
          background: `linear-gradient(135deg, ${c}, color-mix(in oklab, ${c} 50%, #1e1c1a))`,
        }}
      >
        {art ? (
          <img
            src={art}
            alt={`${album} — ${artist}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-cream-100/70">
            <IconMusic size={28} />
          </span>
        )}
        <span className="absolute top-2 right-2 w-7 h-7 grid place-items-center bg-ink-900 text-cream-100 opacity-0 group-hover:opacity-100 transition">
          <IconExternal size={13} />
        </span>
      </a>

      <div className="px-3 py-3">
        <div className="font-serif text-lg text-ink-900 leading-tight line-clamp-2">{title}</div>
        <div className="text-sm text-ink-700 mt-0.5">{artist}</div>
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink-700/80 mt-1.5">
          {album}
        </div>
      </div>
    </div>
  );
}

export default function MusicPanel() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-5xl text-ink-900 leading-none">music</h2>
        <p className="text-ink-700 mt-3 max-w-md">
           some songs i like. currently making music to be posted soon
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {TRACKS.map((tr) => (
          <AlbumCard key={tr.url} {...tr} />
        ))}
      </div>
    </div>
  );
}
