import React from 'react';
import { IconGithub, IconLinkedin, IconMail, IconMusic } from '../icons.jsx';

export default function ContactPanel() {
  return (
    <div className="text-center max-w-xl mx-auto py-8">
      <h2 className="font-serif text-6xl text-ink-900 leading-none">get in touch</h2>
      <p className="text-ink-700 mt-4">always happy to chat about anything</p>
      <a
        href="mailto:you@email.com"
        className="mt-7 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-ink-800 text-cream-100 hover:bg-ink-900 transition font-medium"
      >
        <IconMail size={18} /> joeytene [at] stanford [dot] edu
      </a>
      <div className="mt-8 flex gap-3 justify-center">
        {[
          { i: <IconGithub size={16} />, l: 'github/joeytene' },
          { i: <IconLinkedin size={16} />, l: 'linkedin/in/joey-tenesaca' },
          { i: <IconMusic size={16} />, l: 'bandcamp' },
        ].map((s, i) => (
          <a
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-100/80 border border-ink-800/15 hover:bg-cream-100 transition text-sm text-ink-800 cursor-pointer"
          >
            {s.i}
            {s.l}
          </a>
        ))}
      </div>
    </div>
  );
}

