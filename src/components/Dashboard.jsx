import React, { useState } from 'react';
import { Plus, Sparkles, TrendingUp, ShieldCheck, Zap, ArrowRight, Check, Star, RefreshCw, BarChart2, Layers } from 'lucide-react';

export default function Dashboard({ activeColor, onOpenModal }) {
  const [activeChip, setActiveChip] = useState('All');
  const [sliderVal, setSliderVal] = useState(70);
  const [toggleState, setToggleState] = useState(true);

  const chips = ['All', 'In Progress', 'Completed', 'Starred', 'Material Express'];

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-8 max-w-7xl mx-auto w-full">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-[var(--md-ref-palette-surface-container-high)] border border-[var(--md-ref-palette-outline-variant)]/30 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-white/10 backdrop-blur-sm border border-[var(--md-ref-palette-outline-variant)]/30" style={{ color: activeColor }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Material Design 3 Showcase</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--md-ref-palette-on-surface)] mb-3">
            Welcome to Material Express
          </h1>
          <p className="text-sm md:text-base text-[var(--md-ref-palette-on-surface-variant)] leading-relaxed mb-6">
            A cohesive web application designed with Google’s Material You design philosophy. Enjoy adaptive color palettes, expressive motion, dynamic shapes, and tactile surfaces.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenModal('Material 3 Dynamic Theming', 'Material You dynamic color extracting algorithm transforms palette colors dynamically to create a personalized UI hierarchy.')}
              className="px-5 py-2.5 rounded-full text-white font-medium text-sm shadow-md transition-all hover:shadow-lg active:scale-95 cursor-pointer flex items-center space-x-2"
              style={{ backgroundColor: activeColor }}
            >
              <span>Explore Guidelines</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenModal('System Design Specs', 'Built using Tailwind CSS, React, and Google Sans typography tokens conforming to Material 3 specification.')}
              className="px-5 py-2.5 rounded-full font-medium text-sm border border-[var(--md-ref-palette-outline)] hover:bg-[var(--md-ref-palette-surface-container)] transition-colors cursor-pointer text-[var(--md-ref-palette-on-surface)]"
            >
              View Specifications
            </button>
          </div>
        </div>
      </section>

      {/* Action Chips */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wider text-[var(--md-ref-palette-outline)] uppercase">
          Filter Category
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeChip === chip
                  ? 'text-white shadow-xs font-semibold'
                  : 'bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface-variant)] hover:bg-[var(--md-ref-palette-surface-container)]'
              }`}
              style={{ backgroundColor: activeChip === chip ? activeColor : undefined }}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* M3 Cards Grid (Elevated, Filled, Outlined) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Elevated Card */}
        <div className="bg-[var(--md-ref-palette-surface-container-high)] rounded-3xl p-6 shadow-md border border-[var(--md-ref-palette-outline-variant)]/20 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[var(--md-ref-palette-surface-container)] text-[var(--md-ref-palette-on-surface)]">
              <TrendingUp className="w-6 h-6" style={{ color: activeColor }} />
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              +28%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[var(--md-ref-palette-on-surface)] mb-1">
            Performance Index
          </h3>
          <p className="text-xs text-[var(--md-ref-palette-on-surface-variant)] mb-4">
            Responsive, fast loading and clean layout rendering.
          </p>
          {/* M3 Linear Progress Indicator */}
          <div className="w-full bg-[var(--md-ref-palette-surface-container)] rounded-full h-2 overflow-hidden mb-2">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: '78%', backgroundColor: activeColor }} />
          </div>
          <span className="text-xs font-medium text-[var(--md-ref-palette-outline)]">78% Optimized</span>
        </div>

        {/* Filled Card */}
        <div className="bg-[var(--md-ref-palette-surface-container)] rounded-3xl p-6 border border-[var(--md-ref-palette-outline-variant)]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[var(--md-ref-palette-surface-container-high)]">
              <ShieldCheck className="w-6 h-6" style={{ color: activeColor }} />
            </div>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--md-ref-palette-on-surface)] mb-1">
            Material Security
          </h3>
          <p className="text-xs text-[var(--md-ref-palette-on-surface-variant)] mb-4">
            Enterprise grade accessibility and design standards.
          </p>
          <div className="flex items-center justify-between text-xs font-medium text-[var(--md-ref-palette-on-surface-variant)]">
            <span>Status</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active & Compliant</span>
          </div>
        </div>

        {/* Outlined Card */}
        <div className="bg-transparent rounded-3xl p-6 border-2 border-[var(--md-ref-palette-outline-variant)] hover:border-[var(--md-ref-palette-outline)] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[var(--md-ref-palette-surface-container-high)]">
              <Zap className="w-6 h-6" style={{ color: activeColor }} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface)]">
              v3.0
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[var(--md-ref-palette-on-surface)] mb-1">
            Express Component Suite
          </h3>
          <p className="text-xs text-[var(--md-ref-palette-on-surface-variant)] mb-4">
            Interactive widgets, inputs, and Material You controls.
          </p>
          <button
            onClick={() => onOpenModal('Express Suite', 'Components follow Google Material Design 3 spacing, shape radius (rounded-3xl), elevation, and state layers.')}
            className="w-full py-2 rounded-full border text-xs font-semibold transition-colors cursor-pointer"
            style={{ borderColor: activeColor, color: activeColor }}
          >
            Inspect Components
          </button>
        </div>
      </section>

      {/* Interactive Controls & Sliders Showcase */}
      <section className="bg-[var(--md-ref-palette-surface-container-high)] rounded-3xl p-6 border border-[var(--md-ref-palette-outline-variant)]/30">
        <h3 className="text-lg font-semibold mb-4 text-[var(--md-ref-palette-on-surface)]">
          Material 3 Interactive Controls
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Slider Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[var(--md-ref-palette-on-surface-variant)]">Elevation Level</span>
              <span style={{ color: activeColor }}>{sliderVal}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(e.target.value)}
              className="w-full h-2 bg-[var(--md-ref-palette-surface-container)] rounded-lg appearance-none cursor-pointer accent-[var(--md-ref-palette-primary)]"
              style={{ accentColor: activeColor }}
            />
          </div>

          {/* Switch Control */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--md-ref-palette-surface-container)]">
            <span className="text-xs font-medium text-[var(--md-ref-palette-on-surface)]">
              Enable Material You Motion
            </span>
            <button
              onClick={() => setToggleState(!toggleState)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer flex items-center ${
                toggleState ? 'justify-end' : 'justify-start bg-[var(--md-ref-palette-outline-variant)]'
              }`}
              style={{ backgroundColor: toggleState ? activeColor : undefined }}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => onOpenModal('New Material Action', 'Create a new task, project, or custom Material Design 3 token element.')}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 px-5 py-4 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer font-medium"
        style={{ backgroundColor: activeColor }}
        aria-label="Create New"
      >
        <Plus className="w-6 h-6" />
        <span className="hidden sm:inline text-sm font-semibold">New Express Item</span>
      </button>
    </div>
  );
}
