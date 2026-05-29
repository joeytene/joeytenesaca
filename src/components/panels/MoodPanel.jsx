import React from 'react';

const PHOTOS = [
  { src: '/contrast.jpg',   caption: 'cool colors' },
  { src: '/kidsuper.jpg',   caption: 'greatest runway design oat' },
  { src: '/shadows.jpg',    caption: 'these shadows are so cool' },
  { src: '/voss.jpg',       caption: 'mcqueen ss01: such a powerful thematic runway show' },
  { src: '/screenshot.png', caption: 'heritage' },
];

function PhotoCard({ src, caption }) {
  return (
    <div className="mb-4 break-inside-avoid bg-cream-50 border border-ink-900 rounded-none overflow-hidden hover:shadow-hard-sm hover:-translate-y-0.5 transition">
      <img
        src={src}
        alt={caption}
        className="w-full h-auto block"
        loading="lazy"
      />
      <div className="px-3 py-2 min-h-[28px]">
        <span className="font-serif-it text-xs text-ink-700">{caption}</span>
      </div>
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
