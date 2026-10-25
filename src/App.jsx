import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ThemeCustomizer from './components/ThemeCustomizer';
import ModalDialog from './components/ModalDialog';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeColor, setActiveColor] = useState('#0b57d0'); // Default Google Blue
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeCustomizerOpen, setThemeCustomizerOpen] = useState(false);

  // Modal State
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '' });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const openModal = (title, content) => {
    setModalData({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: '', content: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--md-ref-palette-surface)] text-[var(--md-ref-palette-on-surface)] transition-colors duration-200">
      {/* M3 Header */}
      <Header
        isDark={isDark}
        toggleDark={toggleDark}
        activeColor={activeColor}
        onOpenThemeCustomizer={() => setThemeCustomizerOpen(true)}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Rail / Drawer */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          activeColor={activeColor}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Dashboard
            activeColor={activeColor}
            onOpenModal={openModal}
          />
        </main>
      </div>

      {/* Material You Live Customizer Modal */}
      <ThemeCustomizer
        isOpen={themeCustomizerOpen}
        onClose={() => setThemeCustomizerOpen(false)}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        isDark={isDark}
        toggleDark={toggleDark}
      />

      {/* Standard M3 Modal Dialog */}
      <ModalDialog
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        activeColor={activeColor}
      >
        <p>{modalData.content}</p>
      </ModalDialog>
    </div>
  );
}
