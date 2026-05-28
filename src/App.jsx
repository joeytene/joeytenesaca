import React from 'react';
import Room from './components/Room.jsx';
import Modal from './components/Modal.jsx';
import { IconGithub, IconMail } from './components/icons.jsx';
import {
  ComputerPanel,
  PaperPanel,
  MusicPanel,
  MoodPanel,
  ContactPanel,
} from './components/panels/index.js';

const PANELS = {
  computer: { Comp: ComputerPanel, size: 'wide' },
  paper: { Comp: PaperPanel, size: 'wide' },
  music: { Comp: MusicPanel, size: 'wide' },
  moodboard: { Comp: MoodPanel, size: 'wide' },
  contact: { Comp: ContactPanel, size: 'narrow' },
};

const FOOT_ITEMS = [
  { id: 'computer', label: 'projects' },
  { id: 'paper', label: 'resume' },
  { id: 'music', label: 'music' },
  { id: 'moodboard', label: 'thoughts' },
  { id: 'contact', label: 'contact' },
];

export default function App() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [hovered, setHovered] = React.useState(null);
  const Panel = activeModal ? PANELS[activeModal] : null;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="px-6 md:px-12 pt-6 flex items-start justify-between gap-6 shrink-0">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-900 leading-none mt-2">
            joey tenesaca
          </h1>
          <p className="text-ink-700 mt-1.5 max-w-md text-sm md:text-base">
            i grew up in carmel, ny and study electrical engineering at stanford
          </p>
        </div>
      </header>

      <main className="flex-1 min-h-0 flex items-center justify-center px-2 md:px-6 py-2 relative">
        <div className="w-full h-full max-w-[1100px] relative">
          <Room
            onHotspot={(id) => setActiveModal(id)}
            hovered={hovered}
            setHovered={setHovered}
          />
        </div>
      </main>

      <footer className="px-6 md:px-12 pb-6 pt-2 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-x-7 gap-y-2 items-center">
            {FOOT_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModal(item.id)}
                className={`footlink text-sm md:text-base font-medium text-ink-800 hover:text-ink-900 transition ${
                  activeModal === item.id ? 'active' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-xs font-mono text-ink-700">
            <span>© 2026 — handmade in HTML</span>
            <a className="hover:text-ink-900 cursor-pointer inline-flex items-center gap-1.5">
              <IconGithub size={14} /> github
            </a>
            <a className="hover:text-ink-900 cursor-pointer inline-flex items-center gap-1.5">
              <IconMail size={14} /> email
            </a>
          </div>
        </div>
      </footer>

      <Modal
        open={!!activeModal}
        onClose={() => setActiveModal(null)}
        size={Panel?.size}
      >
        {Panel && <Panel.Comp />}
      </Modal>
    </div>
  );
}

