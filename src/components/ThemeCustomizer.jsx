import React from 'react';
import { Palette, Check, X, RefreshCw } from 'lucide-react';

const presetColors = [
  { name: 'Google Blue', hex: '#0b57d0' },
  { name: 'Material Teal', hex: '#006a6a' },
  { name: 'Deep Violet', hex: '#6750a4' },
  { name: 'Emerald Forest', hex: '#1b6d43' },
  { name: 'Warm Amber', hex: '#a23f00' },
  { name: 'Rose Red', hex: '#b3261e' },
];

export default function ThemeCustomizer({ isOpen, onClose, activeColor, setActiveColor, isDark, toggleDark }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface)] rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[var(--md-ref-palette-outline-variant)]/40 transition-transform transform scale-100">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--md-ref-palette-outline-variant)]/30">
          <div className="flex items-center space-x-2">
            <Palette className="w-6 h-6" style={{ color: activeColor }} />
            <h3 className="text-xl font-medium tracking-tight">Material You Express</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--md-ref-palette-surface-container)] text-[var(--md-ref-palette-on-surface-variant)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-6">
          {/* Preset Colors */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--md-ref-palette-outline)] block mb-3">
              Dynamic Color Seed (Tonal Palette)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {presetColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setActiveColor(color.hex)}
                  className={`flex items-center space-x-2 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                    activeColor === color.hex
                      ? 'border-2 border-[var(--md-ref-palette-on-surface)] bg-[var(--md-ref-palette-surface-container)] font-medium'
                      : 'border-[var(--md-ref-palette-outline-variant)]/50 hover:bg-[var(--md-ref-palette-surface-container)]'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-inner flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  >
                    {activeColor === color.hex && <Check className="w-3.5 h-3.5" />}
                  </span>
                  <span className="text-xs truncate">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker & Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--md-ref-palette-surface-container)]">
            <div>
              <span className="text-sm font-medium block">Appearance Theme</span>
              <span className="text-xs text-[var(--md-ref-palette-on-surface-variant)]">
                {isDark ? 'Dark Mode active' : 'Light Mode active'}
              </span>
            </div>
            <button
              onClick={toggleDark}
              className="px-4 py-2 text-xs font-medium rounded-full text-white cursor-pointer shadow-sm transition-transform active:scale-95"
              style={{ backgroundColor: activeColor }}
            >
              Switch to {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded-full hover:bg-[var(--md-ref-palette-surface-container)] transition-colors cursor-pointer text-[var(--md-ref-palette-on-surface)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
