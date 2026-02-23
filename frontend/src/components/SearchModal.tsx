import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
}

const searchableContent: SearchResult[] = [
  {
    title: 'Home',
    description: 'CTN - Converged Technology Networks main page with unlimited internet packages',
    path: '/',
    category: 'Page',
  },
  {
    title: '10Mbps Package',
    description: 'Unlimited internet at 10Mbps - Perfect for browsing and streaming',
    path: '/packages',
    category: 'Package',
  },
  {
    title: '20Mbps Package',
    description: 'Unlimited internet at 20Mbps - Great for families',
    path: '/packages',
    category: 'Package',
  },
  {
    title: '50Mbps Package',
    description: 'Unlimited internet at 50Mbps - Ideal for heavy users',
    path: '/packages',
    category: 'Package',
  },
  {
    title: '100Mbps Package',
    description: 'Unlimited internet at 100Mbps - Professional grade speed',
    path: '/packages',
    category: 'Package',
  },
  {
    title: '200Mbps Package',
    description: 'Unlimited internet at 200Mbps - Ultra-fast for power users',
    path: '/packages',
    category: 'Package',
  },
  {
    title: '300Mbps Package',
    description: 'Unlimited internet at 300Mbps - Maximum speed available',
    path: '/packages',
    category: 'Package',
  },
  {
    title: 'About Us',
    description: 'Learn about CTN and our mission to connect Malawi',
    path: '/about',
    category: 'Page',
  },
  {
    title: 'Business Solutions',
    description: 'Enterprise internet packages for businesses with dedicated support',
    path: '/business',
    category: 'Service',
  },
  {
    title: 'Contact',
    description: 'Get in touch with CTN customer support',
    path: '/contact',
    category: 'Page',
  },
  {
    title: 'Installation Service',
    description: 'Professional installation service available for all packages',
    path: '/contact',
    category: 'Service',
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all CTN customers',
    path: '/contact',
    category: 'Service',
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setResults([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[#1e3a5f]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
      >
        {/* Search Input */}
        <div className="flex items-center space-x-3 p-4 border-b border-white/10">
          <Search className="w-5 h-5 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search packages, services, or pages..."
            className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {searchQuery.trim() === '' ? (
            <div className="text-center py-12 text-white/40">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Start typing to search...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result, index) => (
                <Link
                  key={index}
                  to={result.path}
                  onClick={onClose}
                  className="block p-3 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-medium group-hover:text-[#a4d65e] transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">{result.description}</p>
                    </div>
                    <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-lg ml-3">
                      {result.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/40">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
