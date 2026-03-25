import { Link, useLocation } from 'react-router';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import ctnLogo from '../assets/ctn-logo.avif';
import type { Theme } from '../hooks/useTheme';

interface NavbarProps {
  onSearchClick: () => void;
  theme: Theme;
  onThemeToggle: () => void;
}

export function Navbar({ onSearchClick, theme, onThemeToggle }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/packages', label: 'Packages' },
    { path: '/business', label: 'Business' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b shadow-lg transition-colors ${
        theme === 'dark'
          ? 'bg-white/20 border-white/20'
          : 'bg-white/90 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={ctnLogo}
              alt="CTN Logo"
              className="h-12 w-auto object-contain"
              style={{ maxHeight: '48px' }}
            />
            <span
              className={`font-bold text-xl hidden sm:inline transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              CTN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  isActive(item.path)
                    ? 'text-[#a4d65e]'
                    : theme === 'dark'
                      ? 'text-white/80 hover:text-white'
                      : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={onSearchClick}
              className={`transition-colors ${
                theme === 'dark'
                  ? 'text-white/80 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onThemeToggle}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={onSearchClick}
              className={`transition-colors ${
                theme === 'dark'
                  ? 'text-white/80 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onThemeToggle}
              className={`transition-colors ${
                theme === 'dark'
                  ? 'text-white/90 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={theme === 'dark' ? 'text-white' : 'text-slate-900'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'text-[#a4d65e] bg-white/10'
                    : theme === 'dark'
                      ? 'text-white/80 hover:bg-white/5'
                      : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
