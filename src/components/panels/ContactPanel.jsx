import React from 'react';
import { IconGithub, IconLinkedin, IconMail } from '../icons.jsx';
import { EMAIL_MAILTO, GITHUB_URL, LINKEDIN_URL } from '../../siteLinks.js';

const SOCIAL_LINKS = [
  { icon: <IconGithub size={16} />, label: 'github/joeytene', href: GITHUB_URL },
  {
    icon: <IconLinkedin size={16} />,
    label: 'linkedin/in/joey-tenesaca',
    href: LINKEDIN_URL,
  },
];

export default function ContactPanel() {
  return (
    <div className="text-center max-w-xl mx-auto py-8">
      <h2 className="font-serif text-6xl text-ink-900 leading-none">get in touch</h2>
      <p className="text-ink-700 mt-4">always happy to chat about anything</p>
      <a
        href={EMAIL_MAILTO}
        className="mt-7 inline-flex items-center gap-3 px-7 py-4 rounded-none bg-ink-900 text-cream-100 border border-ink-900 hover:shadow-hard hover:-translate-y-0.5 transition font-medium"
      >
        <IconMail size={18} /> joeytene [at] stanford [dot] edu
      </a>
      <div className="mt-8 flex gap-3 justify-center">
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-cream-100 border border-ink-900 hover:shadow-hard-sm hover:-translate-y-0.5 transition text-sm text-ink-900"
          >
            {s.icon}
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
