import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Trash2, Book as BookIcon, Library, X, AlertCircle } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  color: string;
  imageUrl: string;
  description: string;
}

const MAX_CAPACITY = 100;

const BOOK_COLORS = [
  'bg-red-900',
  'bg-blue-900',
  'bg-emerald-900',
  'bg-purple-900',
  'bg-amber-900',
  'bg-stone-800',
];

const INITIAL_BOOKS: Book[] = [
  { id: '1', title: 'The Name of the Rose', author: 'Umberto Eco', year: '1980', color: 'bg-red-900', imageUrl: 'https://picsum.photos/seed/rose/400/600', description: 'A historical murder mystery set in an Italian monastery in the year 1327, an intellectual mystery combining semiotics in fiction, biblical analysis, medieval studies, and literary theory.' },
  { id: '2', title: 'Foucault\'s Pendulum', author: 'Umberto Eco', year: '1988', color: 'bg-stone-800', imageUrl: 'https://picsum.photos/seed/pendulum/400/600', description: 'A tale of three vanity publisher employees who invent a fictional conspiracy theory, only to find that it might be real, drawing them into a dangerous web of esoteric societies.' },
  { id: '3', title: 'The Shadow of the Wind', author: 'Carlos Ruiz Zafón', year: '2001', color: 'bg-blue-900', imageUrl: 'https://picsum.photos/seed/wind/400/600', description: 'Set in Barcelona in 1945, a young boy discovers a mysterious book in the Cemetery of Forgotten Books, leading him into a dark labyrinth of secrets, romance, and murder.' },
  { id: '4', title: 'If on a winter\'s night a traveler', author: 'Italo Calvino', year: '1979', color: 'bg-emerald-900', imageUrl: 'https://picsum.photos/seed/winter/400/600', description: 'A postmodernist novel about the reader trying to read a book called "If on a winter\'s night a traveler", which consists of the first chapters of ten different novels.' },
];

export default function App() {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  // New book form state
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newColor, setNewColor] = useState(BOOK_COLORS[0]);
  const [error, setError] = useState('');

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    const query = searchQuery.toLowerCase();
    return books.filter(book => book.title.toLowerCase().includes(query));
  }, [books, searchQuery]);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (books.length >= MAX_CAPACITY) {
      setError(`The archive is full. Maximum capacity is ${MAX_CAPACITY} volumes.`);
      return;
    }

    if (!newTitle.trim() || !newAuthor.trim()) {
      setError('Title and Author are required to catalogue a new volume.');
      return;
    }

    const newBook: Book = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      author: newAuthor.trim(),
      year: newYear.trim() || 'Unknown',
      color: newColor,
      imageUrl: `https://picsum.photos/seed/${newTitle.trim().replace(/\s+/g, '') || Date.now()}/400/600`,
      description: newDescription.trim() || 'No description provided for this volume.',
    };

    setBooks(prev => [...prev, newBook]);
    setIsAdding(false);
    setNewTitle('');
    setNewAuthor('');
    setNewYear('');
    setNewDescription('');
    setNewColor(BOOK_COLORS[0]);
  };

  const handleRemoveBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-amber-900/50 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://picsum.photos/seed/librarybooks/1920/1080" 
          alt="Library Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/80 to-stone-950" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-stone-800/50 bg-stone-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-amber-700/30 flex items-center justify-center bg-stone-900 overflow-hidden shrink-0">
              <img src="https://picsum.photos/seed/grandarchive/100/100" alt="Archive Crest" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h1 className="serif text-3xl md:text-4xl text-stone-100 tracking-wide">The Grand Archive</h1>
              <p className="text-stone-500 text-sm tracking-widest uppercase mt-1">Curated Collection</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-full py-2 pl-10 pr-4 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/50 transition-all"
              />
            </div>
            
            <button
              onClick={() => setIsAdding(true)}
              disabled={books.length >= MAX_CAPACITY}
              className="flex items-center gap-2 bg-amber-900 hover:bg-amber-800 disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed text-amber-50 px-5 py-2 rounded-full text-sm font-medium transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Acquire Volume</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Capacity Indicator */}
        <div className="mb-12 flex flex-col items-center">
          <div className="serif text-xl text-stone-400 mb-4">
            Archive Capacity: <span className="text-amber-500">{books.length}</span> / {MAX_CAPACITY}
          </div>
          <div className="w-full max-w-md h-1.5 bg-stone-800/80 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-amber-600 transition-all duration-500 relative"
              style={{ width: `${(books.length / MAX_CAPACITY) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* The Bookshelf */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className="relative group aspect-[2/3]"
              >
                <div 
                  onClick={() => setSelectedBook(book)}
                  className={`w-full h-full rounded-md shadow-xl shadow-black/50 overflow-hidden flex flex-col border border-white/5 relative transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-amber-900/20 cursor-pointer`}
                >
                  {/* Background Image */}
                  <img src={book.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" referrerPolicy="no-referrer" />
                  <div className={`absolute inset-0 ${book.color} opacity-80 mix-blend-multiply`} />
                  
                  {/* Book Spine Details */}
                  <div className="h-full w-full flex flex-col p-4 relative z-10">
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-black/20" />
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
                    
                    <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
                      <h3 className="serif text-lg font-semibold text-white/90 leading-tight mb-2 drop-shadow-md">
                        {book.title}
                      </h3>
                      <div className="w-8 h-px bg-amber-500/50 my-3" />
                      <p className="text-xs text-white/70 uppercase tracking-widest font-medium">
                        {book.author}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-4 flex justify-between items-end z-10">
                      <span className="text-[10px] text-white/40 font-mono">{book.year}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBook(book.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 bg-black/40 hover:bg-red-900/80 rounded-full text-white/70 hover:text-white transition-all"
                        title="Remove from archive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBooks.length === 0 && searchQuery && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <img 
              src="https://picsum.photos/seed/dustybooks/400/300" 
              alt="Empty Archive" 
              className="w-48 h-32 object-cover rounded-lg opacity-40 mx-auto mb-6 grayscale border border-stone-800" 
              referrerPolicy="no-referrer" 
            />
            <h3 className="serif text-2xl text-stone-400">No volumes found</h3>
            <p className="text-stone-600 mt-2">No texts match the query "{searchQuery}"</p>
          </motion.div>
        )}
      </main>

      {/* Add Book Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Modal Background Image */}
              <img src="https://picsum.photos/seed/oldpaper/800/800" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-stone-950/80" />
              
              <div className="relative z-10 p-6 border-b border-stone-800 flex justify-between items-center bg-stone-950/50">
                <h2 className="serif text-2xl text-stone-100">Catalogue New Volume</h2>
                <button 
                  onClick={() => setIsAdding(false)}
                  className="text-stone-500 hover:text-stone-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddBook} className="relative z-10 p-6 space-y-5">
                {error && (
                  <div className="bg-red-950/50 border border-red-900/50 text-red-200 px-4 py-3 rounded-lg text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1.5">Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-stone-200 focus:outline-none focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/50 transition-all"
                      placeholder="e.g. The Odyssey"
                      autoFocus
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1.5">Author</label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-stone-200 focus:outline-none focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/50 transition-all"
                      placeholder="e.g. Homer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1.5">Year of Publication</label>
                    <input
                      type="text"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-stone-200 focus:outline-none focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/50 transition-all font-mono"
                      placeholder="e.g. -800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1.5">Synopsis / Details</label>
                    <textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-stone-200 focus:outline-none focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/50 transition-all min-h-[80px] resize-none"
                      placeholder="A brief description of the volume..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Binding Color</label>
                    <div className="flex gap-3">
                      {BOOK_COLORS.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNewColor(color)}
                          className={`w-8 h-8 rounded-full ${color} border-2 transition-all ${
                            newColor === color ? 'border-amber-500 scale-110' : 'border-transparent hover:scale-105'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-stone-400 hover:text-stone-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg text-sm font-medium bg-amber-900 hover:bg-amber-800 text-amber-50 transition-colors"
                  >
                    Add to Archive
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Book Details Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Top side: Massive Central Book Cover Background */}
              <div className={`w-full h-64 md:h-80 relative flex items-center justify-center p-8 shadow-inner overflow-hidden shrink-0`}>
                {/* Background Image & Color */}
                <img src={selectedBook.imageUrl} alt={selectedBook.title} className="absolute inset-0 w-full h-full object-cover blur-md opacity-50 scale-110" referrerPolicy="no-referrer" />
                <div className={`absolute inset-0 ${selectedBook.color} opacity-80 mix-blend-multiply`} />
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                
                {/* Central Book Spine/Cover Representation */}
                <div className={`relative z-20 w-48 md:w-56 h-full max-h-72 ${selectedBook.color} shadow-2xl rounded-r-md border border-white/20 flex flex-col items-center justify-center text-center p-6 overflow-hidden transform transition-transform hover:scale-105`}>
                  <img src={selectedBook.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" referrerPolicy="no-referrer" />
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-black/40 shadow-inner" />
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-white/20" />
                  <div className="relative z-10 bg-black/50 backdrop-blur-md p-4 w-full border border-white/10 rounded-sm">
                    <h3 className="serif text-2xl font-bold text-white/90 leading-tight drop-shadow-lg">
                      {selectedBook.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              {/* Bottom side: Details */}
              <div className="p-8 md:p-10 flex-1 flex flex-col relative bg-stone-950 overflow-y-auto">
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-6 right-6 text-stone-500 hover:text-stone-300 transition-colors bg-stone-900 hover:bg-stone-800 p-2 rounded-full z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="mb-8 text-center max-w-2xl mx-auto w-full mt-2">
                  <h2 className="serif text-4xl md:text-5xl text-stone-100 leading-tight mb-6">{selectedBook.title}</h2>
                  
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
                    <p className="text-2xl md:text-3xl text-amber-500 serif italic">by {selectedBook.author}</p>
                    <span className="hidden md:block w-2 h-2 rounded-full bg-stone-700" />
                    <p className="text-2xl md:text-3xl text-stone-300 font-mono tracking-widest">{selectedBook.year}</p>
                  </div>
                  
                  <div className="w-24 h-px bg-stone-800 mx-auto mb-8" />
                  
                  <p className="text-stone-400 leading-relaxed text-lg md:text-xl text-left md:text-center">
                    {selectedBook.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-stone-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full ${selectedBook.color} shadow-inner border border-white/10`} />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-stone-500">Binding</p>
                      <p className="text-sm text-stone-300 capitalize">
                        {selectedBook.color.replace('bg-', '').replace('-900', '').replace('-800', '')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs uppercase tracking-widest text-stone-500">Archive ID</p>
                      <p className="text-sm text-stone-600 font-mono">{selectedBook.id}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleRemoveBook(selectedBook.id);
                        setSelectedBook(null);
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-900/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
