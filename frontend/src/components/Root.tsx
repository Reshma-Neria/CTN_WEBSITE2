import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { NetworkBackground } from './NetworkBackground';
import { SearchModal } from './SearchModal';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

export function Root() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-[60vh] md:min-h-screen relative overflow-x-hidden transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#0a1929] via-[#1e3a5f] to-[#0a1929]'
          : 'light-mode bg-white'
      }`}
    >
      <NetworkBackground theme={theme} />
      <div className="relative z-10">
        <Navbar
          onSearchClick={() => setIsSearchOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        <main className="min-h-[60vh] md:min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
