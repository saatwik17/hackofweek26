import React, { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onSearch, isSearching }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.reload()}>
            <span className="font-serif text-2xl font-bold text-stone-900 tracking-tight">Aura.</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSubmit} className="w-full relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask our AI shopkeeper (e.g., 'gift for a creative friend')"
                className="w-full bg-stone-50 border-none rounded-full py-3 px-6 pl-12 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-sm"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-indigo-500 transition-colors">
                {isSearching ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                )}
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button 
              className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors"
              onClick={onCartClick}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search - Visible only on small screens */}
        <div className="md:hidden pb-4">
           <form onSubmit={handleSubmit} className="w-full relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI..."
                className="w-full bg-stone-50 border-none rounded-lg py-2 px-4 pl-10 text-sm text-stone-900 focus:ring-1 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
           </form>
        </div>
      </div>
    </header>
  );
};

export default Header;