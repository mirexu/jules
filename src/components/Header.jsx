import React from 'react';
import { Menu, Search, Moon, Sun, Palette, Bell, Settings, User } from 'lucide-react';

export default function Header({ isDark, toggleDark, activeColor, onOpenThemeCustomizer, toggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[var(--md-ref-palette-surface-container)] transition-colors duration-200 border-b border-[var(--md-ref-palette-outline-variant)]/30">
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="p-2.5 rounded-full hover:bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface)] transition-colors cursor-pointer"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-sm" style={{ backgroundColor: activeColor }}>
            G
          </div>
          <span className="font-medium text-xl tracking-tight text-[var(--md-ref-palette-on-surface)]">
            Material <span className="font-semibold" style={{ color: activeColor }}>Express</span>
          </span>
        </div>
      </div>

      {/* M3 Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4 px-4 py-2.5 rounded-full bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface-variant)] focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-[var(--md-ref-palette-primary)] transition-all">
        <Search className="w-5 h-5 mr-3 text-[var(--md-ref-palette-outline)]" />
        <input
          type="text"
          placeholder="Search apps, files, or settings..."
          className="bg-transparent border-none outline-none w-full text-sm placeholder-[var(--md-ref-palette-outline)] text-[var(--md-ref-palette-on-surface)]"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={onOpenThemeCustomizer}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full hover:bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface-variant)] text-xs font-medium border border-[var(--md-ref-palette-outline-variant)]/50 transition-colors cursor-pointer"
          title="Customize Theme"
        >
          <Palette className="w-4 h-4" style={{ color: activeColor }} />
          <span className="hidden sm:inline">Theme</span>
        </button>

        <button
          onClick={toggleDark}
          className="p-2.5 rounded-full hover:bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface)] transition-colors cursor-pointer"
          aria-label="Toggle Theme Mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>

        <button
          className="p-2.5 rounded-full hover:bg-[var(--md-ref-palette-surface-container-high)] text-[var(--md-ref-palette-on-surface)] transition-colors cursor-pointer relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: activeColor }} />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm ml-2 cursor-pointer shadow-sm">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
