import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function ModalDialog({ isOpen, onClose, title, children, activeColor }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface)] rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[var(--md-ref-palette-outline-variant)]/40">
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-xl font-medium tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--md-ref-palette-surface-container)] text-[var(--md-ref-palette-on-surface-variant)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-3 text-sm text-[var(--md-ref-palette-on-surface-variant)] leading-relaxed">
          {children}
        </div>

        <div className="pt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium rounded-full hover:bg-[var(--md-ref-palette-surface-container)] transition-colors cursor-pointer text-[var(--md-ref-palette-on-surface-variant)]"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium rounded-full text-white cursor-pointer shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: activeColor }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
