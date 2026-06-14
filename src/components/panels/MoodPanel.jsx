import React from 'react';

const PHOTOS = [
  { src: '/contrast.jpg' },
  { src: '/kidsuper.jpg' },
  { src: '/shadows.jpg' },
  { src: '/voss.jpg' },
  { src: '/screenshot.png' },
  { src: '/blueandorange.png' },
];

function PhotoCard({ src }) {
  return (
    <div className="mb-4 break-inside-avoid bg-cream-50 border border-ink-900 rounded-none overflow-hidden hover:shadow-hard-sm hover:-translate-y-0.5 transition">
      <img
        src={src}
        alt=""
        className="w-full h-auto block"
        loading="lazy"
      />
    </div>
  );
}

export default function MoodPanel() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-5xl text-ink-900 leading-none">thoughts</h2>
        <p className="text-ink-700 mt-3 max-w-2xl">things that i think are cool</p>
      </div>

      <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        {PHOTOS.map((photo) => (
          <PhotoCard key={photo.src} {...photo} />
        ))}
      </div>
    </div>
  );
}
