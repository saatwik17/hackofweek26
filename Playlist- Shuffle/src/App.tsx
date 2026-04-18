import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DoublyLinkedList, SongNode } from './lib/DoublyLinkedList';
import { PlayCircle, ArrowDownUp, Plus, Trash2, Shuffle, Music, FastForward, Rewind } from 'lucide-react';

const GRADIENTS = [
  "from-rose-500 to-orange-400",
  "from-blue-600 to-indigo-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-yellow-400",
  "from-fuchsia-600 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-violet-600 to-purple-400",
];

export default function App() {
  const dllRef = useRef(new DoublyLinkedList());
  const [nodes, setNodes] = useState<SongNode[]>([]);
  
  // Form States
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [deleteIdx, setDeleteIdx] = useState<string>('');
  
  // Track playing index
  const [playingIdx, setPlayingIdx] = useState<number>(0);

  // Initialize data
  useEffect(() => {
    const list = dllRef.current;
    list.addEnd("Bohemian Rhapsody", "Queen", GRADIENTS[6]);
    list.addEnd("Starboy", "The Weeknd", GRADIENTS[0]);
    list.addEnd("Levitating", "Dua Lipa", GRADIENTS[4]);
    setNodes(list.toArray());
  }, []);

  const syncList = () => {
    setNodes(dllRef.current.toArray());
  };

  const getRandColor = () => GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

  const handleAddFront = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dllRef.current.addFront(title, artist || "Unknown Artist", getRandColor());
    syncList();
    setTitle('');
    setArtist('');
    setPlayingIdx(prev => prev + 1); // Shift playing index if added to front
  };

  const handleAddEnd = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dllRef.current.addEnd(title, artist || "Unknown Artist", getRandColor());
    syncList();
    setTitle('');
    setArtist('');
  };

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const idx = parseInt(deleteIdx);
    if (isNaN(idx) || idx < 0 || idx >= dllRef.current.size) return;
    dllRef.current.deleteAt(idx);
    syncList();
    setDeleteIdx('');
    if (idx === playingIdx) setPlayingIdx(0);
    else if (idx < playingIdx) setPlayingIdx(prev => prev - 1);
  };

  const handleReverse = () => {
    dllRef.current.reverse();
    syncList();
    // Update playing index after reverse
    if (nodes.length > 0) {
      setPlayingIdx(nodes.length - 1 - playingIdx);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-fuchsia-500/30 flex flex-col md:flex-row">
      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 lg:w-96 bg-stone-900 border-r border-stone-800 p-6 flex flex-col gap-8 flex-shrink-0 z-10 md:h-screen md:sticky md:top-0 md:overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-blue-400 flex items-center gap-2 mb-2">
            <Music className="text-fuchsia-400" />
            VibeChain
          </h1>
          <p className="text-stone-400 text-sm">
            Interactive Doubly Linked List Playlist
          </p>
        </div>

        {/* Add Song Form */}
        <section className="bg-stone-950/50 p-4 rounded-2xl border border-stone-800">
          <h2 className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">Add Tracks</h2>
          <div className="flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="Song Title" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="px-4 py-2 bg-stone-900 rounded-xl border border-stone-700 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all placeholder:text-stone-600"
            />
            <input 
              type="text" 
              placeholder="Artist" 
              value={artist}
              onChange={e => setArtist(e.target.value)}
              className="px-4 py-2 bg-stone-900 rounded-xl border border-stone-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-stone-600"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button 
                onClick={handleAddFront}
                disabled={!title.trim()}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-stone-800 hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-medium transition-colors"
              >
                <Rewind size={16} /> Add Head
              </button>
              <button 
                onClick={handleAddEnd}
                disabled={!title.trim()}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-stone-800 hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-medium transition-colors"
              >
                Add Tail <FastForward size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Action Controls */}
        <div className="flex flex-col gap-4">
          <section className="bg-stone-950/50 p-4 rounded-2xl border border-stone-800 flex flex-col gap-3">
             <h2 className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">Remove Track</h2>
             <form onSubmit={handleDelete} className="flex gap-2">
              <input 
                type="number" 
                placeholder="Index (e.g. 0)" 
                value={deleteIdx}
                onChange={e => setDeleteIdx(e.target.value)}
                min="0"
                max={Math.max(0, dllRef.current.size - 1)}
                className="flex-1 px-4 py-2 bg-stone-900 rounded-xl border border-stone-700 outline-none focus:border-red-500 transition-all text-sm w-full"
              />
              <button 
                type="submit"
                disabled={!deleteIdx}
                className="p-2 aspect-square flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </form>
          </section>

          <button 
            onClick={handleReverse}
            disabled={nodes.length < 2}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-semibold shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
          >
            <Shuffle size={20} />
            Reverse Playlist
          </button>
        </div>

        {/* Stats */}
        <div className="mt-auto pt-6 border-t border-stone-800 flex justify-between text-sm text-stone-500 font-mono">
          <span>SIZE: {dllRef.current.size}</span>
          <span>HEAD: {dllRef.current.head ? 'SET' : 'NULL'}</span>
          <span>TAIL: {dllRef.current.tail ? 'SET' : 'NULL'}</span>
        </div>
      </aside>

      {/* Visualizer Area */}
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {nodes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-stone-500 gap-4 mt-20">
              <Music size={48} className="opacity-20" />
              <p>Playlist is empty. Add a track to begin.</p>
            </div>
          ) : (
             <div className="w-full flex flex-col items-center pb-20 relative">
                {/* Pointer line visualization in the background */}
                <div className="absolute top-10 bottom-10 w-px bg-stone-800 left-1/2 -ml-px z-0 pointer-events-none" />

                <AnimatePresence mode="popLayout">
                  {nodes.map((node, index) => {
                    const isPlaying = playingIdx === index;
                    
                    return (
                      <React.Fragment key={node.id}>
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, scale: 0.5, x: 100, filter: 'blur(10px)' }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 350, 
                            damping: 25,
                            mass: 1,
                            layout: { duration: 0.4 }
                          }}
                          className={`w-full max-w-lg z-10 relative group ${isPlaying ? 'scale-105' : ''}`}
                        >
                          {/* List Position Indicators */}
                          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1">
                            <span className="text-xs font-mono text-stone-600 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-800">
                              [{index}]
                            </span>
                          </div>

                          <div className={`p-4 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
                            isPlaying 
                              ? 'bg-stone-800/80 border-stone-600 shadow-xl shadow-stone-900/50' 
                              : 'bg-stone-900/50 border-stone-800 hover:bg-stone-800'
                          }`}>
                            <div className="flex items-center gap-4">
                              {/* Album Art Cover */}
                              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${node.color} flex flex-shrink-0 items-center justify-center shadow-inner relative overflow-hidden`}>
                                {isPlaying && (
                                  <motion.div 
                                    className="absolute inset-0 bg-black/20"
                                    animate={{ opacity: [0.2, 0, 0.2] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                  />
                                )}
                                <Music className="text-white/50" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white truncate">{node.title}</h3>
                                <p className="text-stone-400 text-sm truncate">{node.artist}</p>
                              </div>

                              <button 
                                onClick={() => setPlayingIdx(index)}
                                className={`p-3 rounded-full transition-all ${
                                  isPlaying 
                                    ? 'bg-white text-black scale-110 shadow-lg shadow-white/10' 
                                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white'
                                }`}
                              >
                                <PlayCircle className={isPlaying ? 'fill-black' : ''} />
                              </button>
                            </div>
                            
                            {/* DLL Nodes tags */}
                            <div className="flex gap-2 mt-4 items-center">
                                {index === 0 && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/20">
                                    Head
                                  </span>
                                )}
                                {index === nodes.length - 1 && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/20">
                                    Tail
                                  </span>
                                )}
                                
                                <div className="flex-1" />
                                
                                {/* Prev / Next Visualizers */}
                                <div className="flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                                  <span className="text-[10px] font-mono bg-stone-950 px-1.5 py-0.5 rounded text-stone-400 flex items-center gap-1 border border-stone-800">
                                    prev: {index === 0 ? 'null' : `[${index - 1}]`}
                                  </span>
                                  <span className="text-[10px] font-mono bg-stone-950 px-1.5 py-0.5 rounded text-stone-400 flex items-center gap-1 border border-stone-800">
                                    next: {index === nodes.length - 1 ? 'null' : `[${index + 1}]`}
                                  </span>
                                </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Visual DLL Connection Arrow */}
                        {index < nodes.length - 1 && (
                          <motion.div 
                            layout
                            className="z-0 py-2 flex items-center justify-center text-stone-700"
                          >
                            <ArrowDownUp size={20} className="opacity-50" />
                          </motion.div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </AnimatePresence>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

