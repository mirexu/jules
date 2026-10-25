import React from 'react';
import { LayoutDashboard, CheckSquare, Layers, Sparkles, Settings, Folder, Heart, PieChart } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: '5' },
  { id: 'components', label: 'Components', icon: Layers, badge: 'New' },
  { id: 'analytics', label: 'Analytics', icon: PieChart, badge: null },
  { id: 'projects', label: 'Projects', icon: Folder, badge: null },
  { id: 'favorites', label: 'Favorites', icon: Heart, badge: null },
  { id: 'ai-tools', label: 'Gemini AI', icon: Sparkles, badge: 'AI' },
  { id: 'settings', label: 'Settings', icon: Settings, badge: null },
];

export default function Navigation({ activeTab, setActiveTab, sidebarOpen, activeColor }) {
  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-20 flex flex-col bg-[var(--md-ref-palette-surface-container)] transition-all duration-300 border-r border-[var(--md-ref-palette-outline-variant)]/30 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-full transition-all duration-200 cursor-pointer group relative ${
                isActive
                  ? 'bg-[var(--md-ref-palette-primary-container)] text-[var(--md-ref-palette-on-primary-container)] font-semibold'
                  : 'text-[var(--md-ref-palette-on-surface-variant)] hover:bg-[var(--md-ref-palette-surface-container-high)] hover:text-[var(--md-ref-palette-on-surface)]'
              }`}
            >
              {/* M3 Active Indicator Pill for Collapsed Mode */}
              <div
                className={`flex items-center justify-center p-2 rounded-full transition-colors ${
                  isActive ? 'text-white' : ''
                }`}
                style={{ backgroundColor: isActive ? activeColor : 'transparent' }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
              </div>

              {sidebarOpen && (
                <span className="ml-3 text-sm font-medium tracking-wide truncate flex-1 text-left">
                  {item.label}
                </span>
              )}

              {sidebarOpen && item.badge && (
                <span
                  className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full"
                  style={{
                    backgroundColor: isActive ? activeColor : 'var(--md-ref-palette-surface-container-high)',
                    color: isActive ? '#ffffff' : 'var(--md-ref-palette-on-surface-variant)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
