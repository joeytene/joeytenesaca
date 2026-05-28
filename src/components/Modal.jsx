import React from 'react';
import { IconX } from './icons.jsx';

export default function Modal({ open, onClose, children, size = 'wide' }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 anim-fade" onClick={onClose}>
      <div className="absolute inset-0 glass-dim" />
      <div className="absolute inset-0 grid place-items-center p-4 md:p-8 overflow-y-auto nice-scroll">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`glass anim-slide rounded-2xl w-full ${
            size === 'wide' ? 'max-w-5xl' : 'max-w-3xl'
          } my-auto`}
        >
          <div className="px-7 md:px-9 py-7 md:py-8 relative">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-cream-100/80 border border-ink-800/15 grid place-items-center text-ink-800 hover:bg-cream-100 transition"
            >
              <IconX size={16} />
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

