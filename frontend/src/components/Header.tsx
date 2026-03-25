import { useState, useEffect } from "react";
import { Menu, X, Search, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import ctnLogo from "../assets/ctn-logo.avif";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, implement search functionality
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Packages", path: "/packages" },
    { label: "Business", path: "/business" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/20 shadow-2xl backdrop-blur-xl border-b border-white/20" 
          : "bg-white/15 backdrop-blur-lg border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img src={ctnLogo} alt="CTN Logo" className="h-14 w-auto transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#a4d65e]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "text-[#a4d65e]"
                        : "text-white hover:text-[#a4d65e]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#a4d65e]/10 rounded-lg"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-[#a4d65e] transition-colors p-2"
            >
              <Search size={20} />
            </button>

            {/* Phone */}
            <a
              href="tel:+265981187766"
              className="flex items-center gap-2 text-white/90 hover:text-[#a4d65e] transition-colors"
            >
              <Phone size={18} />
              <span className="text-base md:text-lg">+265 981 187 766</span>
            </a>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#a4d65e]/50 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white p-2"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="pb-4 overflow-hidden"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search packages, services..."
                  className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:border-[#a4d65e]"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#1e3a5f] border-t border-white/10"
          >
            <nav className="px-4 py-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#a4d65e]/10 text-[#a4d65e]"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="tel:+265981187766"
                className="flex items-center gap-2 py-3 px-4 text-white hover:text-[#a4d65e] transition-colors"
              >
                <Phone size={18} />
                +265 981 187 766
              </a>
              <Link
                to="/contact"
                className="block w-full bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-white px-6 py-3 rounded-full text-center"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
