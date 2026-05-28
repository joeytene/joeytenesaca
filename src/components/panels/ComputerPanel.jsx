import React from 'react';
import { IconExternal } from '../icons.jsx';
import { PROJECTS } from '../../data/projects.js';
import { Pill } from './shared.jsx';

export default function ComputerPanel() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-5xl text-ink-900 leading-none">Technical Work</h2>
        <p className="text-ink-700 mt-3 max-w-md">
          Where electrons meet — hardware tinkering, software repos, and coursework that shaped
          how I think.
        </p>
      </div>

      <div className="max-h-[min(60vh,520px)] overflow-y-auto nice-scroll space-y-3 pr-1">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="p-4 bg-cream-100 border border-ink-900 hover:shadow-hard-sm hover:-translate-y-0.5 transition"
          >
            {p.image && (
              <img
                src={p.image}
                alt=""
                className="w-full h-40 object-cover border border-ink-900 mb-3"
              />
            )}
            <div className="flex items-start justify-between gap-2">
              <div className="font-serif text-2xl leading-tight text-ink-900">{p.title}</div>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-700 hover:text-ink-900 shrink-0"
                  aria-label={`Open ${p.title}`}
                >
                  <IconExternal size={15} />
                </a>
              )}
            </div>
            <p className="text-sm text-ink-700 mt-1.5">{p.description}</p>
            {p.tags?.length > 0 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {p.tags.map((t) => (
                  <Pill key={t} tone="slate">
                    {t}
                  </Pill>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
