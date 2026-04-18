import React, { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  BarChart3, 
  Target, 
  Award, 
  Zap, 
  Trash2, 
  Shuffle, 
  TrendingUp, 
  Activity 
} from 'lucide-react';

export default function App() {
  const [scores, setScores] = useState<number[]>([
    85, 92, 78, 92, 88, 76, 95, 89, 85, 92, 100, 64, 85
  ]);
  const [inputValue, setInputValue] = useState('');

  // Linear Traversal & Array-Based Frequency Logic
  const stats = useMemo(() => {
    let min = 100;
    let max = 0;
    // 1. Array-based frequency count (indices 0 to 100)
    const freq = new Array(101).fill(0);
    let maxFreq = 0;
    const mode: number[] = [];

    // 2. Linear traversal to find min, max, and populate frequencies
    for (let i = 0; i < scores.length; i++) {
      const score = scores[i];
      if (score < min) min = score;
      if (score > max) max = score;
      freq[score]++;
      
      if (freq[score] > maxFreq) {
        maxFreq = freq[score];
      }
    }

    if (scores.length === 0) {
      min = 0;
      max = 0;
    } else {
      // Find mode(s) cleanly from the frequency array
      for (let i = 0; i < freq.length; i++) {
        if (freq[i] === maxFreq && maxFreq > 0) {
          mode.push(i);
        }
      }
    }

    return { min, max, mode, freq, maxFreq, count: scores.length };
  }, [scores]);

  const handleAddScore = (e: FormEvent) => {
    e.preventDefault();
    const val = parseInt(inputValue, 10);
    if (!isNaN(val) && val >= 0 && val <= 100) {
      setScores((prev) => [val, ...prev]);
      setInputValue('');
    }
  };

  const removeScore = (indexToRemove: number) => {
    setScores((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const addRandomBatch = () => {
    const newScores = Array.from({ length: 5 }, () => Math.floor(Math.random() * 41) + 60); // Scores 60-100
    setScores((prev) => [...newScores, ...prev]);
  };

  const clearAll = () => setScores([]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-slate-950 font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <header className="relative z-10 w-full max-w-6xl mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight flex items-center gap-3">
            <Zap className="w-8 h-8 text-indigo-400" />
            ScoreSight
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base font-mono">
            O(N) Traversal O(1) Access &mdash; The interactive algorithm visualizer
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <button onClick={addRandomBatch} className="btn-secondary group flex items-center gap-2">
            <Shuffle className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            Auto-fill
          </button>
          <button onClick={clearAll} className="btn-secondary group flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-pink-400 transition-colors" />
            Clear
          </button>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Controls & List */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Add Score Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl backdrop-blur-md"
          >
            <div className="bg-slate-900/80 p-6 rounded-[14px]">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Add New Score
              </h2>
              <form onSubmit={handleAddScore} className="flex gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0 - 100"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-lg font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  disabled={!inputValue}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 group active:scale-95"
                >
                  <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Scores List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 min-h-[300px] max-h-[500px] p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl backdrop-blur-md flex flex-col"
          >
            <div className="bg-slate-900/80 p-6 rounded-[14px] flex-1 flex flex-col gap-4 overflow-hidden">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  Recent Entries
                </h2>
                <div className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono text-slate-300">
                  N={stats.count}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-2">
                <AnimatePresence mode="popLayout">
                  {scores.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-8 text-slate-500 font-mono text-sm border border-slate-800 border-dashed rounded-xl"
                    >
                      Empty set. Add data.
                    </motion.div>
                  )}
                  {scores.map((score, i) => (
                    <motion.div
                      key={`${i}-${score}`} /* using index creates proper shifting on deletion */
                      layout
                      initial={{ opacity: 0, x: -20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group flex items-center justify-between bg-slate-800/40 hover:bg-slate-800/80 p-3 rounded-xl border border-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-mono text-xs w-6">#{stats.count - i}</span>
                        <span className="text-lg font-mono font-medium text-purple-200">{score}</span>
                      </div>
                      <button 
                        onClick={() => removeScore(i)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1 transition-all"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* RIGHT COLUMN: Stats & Visualizations */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Key Metrics Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              delay={0.2} 
              title="Minimum" 
              value={stats.count > 0 ? stats.min : '--'} 
              icon={<TrendingUp className="w-5 h-5 text-red-400 rotate-180" />} 
            />
            <MetricCard 
              delay={0.3} 
              title="Maximum" 
              value={stats.count > 0 ? stats.max : '--'} 
              icon={<TrendingUp className="w-5 h-5 text-green-400" />} 
              isHighlight={stats.max === 100}
            />
            <MetricCard 
              delay={0.4} 
              title="Mode(s)" 
              value={stats.count > 0 ? stats.mode.join(', ') : '--'} 
              icon={<Award className="w-5 h-5 text-amber-400" />} 
              subtitle={stats.count > 0 ? `Freq: ${stats.maxFreq}` : ''}
            />
          </div>

          {/* Histogram Visualizer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1 p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl backdrop-blur-md"
          >
            <div className="bg-slate-900/80 p-6 rounded-[14px] h-full flex flex-col">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-1">
                    <BarChart3 className="w-5 h-5 text-pink-400" />
                    Frequency Count Histogram
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Displaying array counts indices 0-100 `freq[number]`
                  </p>
                </div>
                {stats.count > 0 && (
                  <div className="text-right text-xs font-mono text-slate-500">
                    <div>Highest Freq = {stats.maxFreq}</div>
                    <div>Range = [{stats.min}, {stats.max}]</div>
                  </div>
                )}
              </div>

              {/* The Chart Area */}
              <div className="flex-1 min-h-[250px] relative mt-4 border-b border-slate-700/50 pb-2">
                
                {/* Background grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                   <div className="border-t border-slate-700 w-full" />
                   <div className="border-t border-slate-700 w-full" />
                   <div className="border-t border-slate-700 w-full" />
                   <div className="border-t border-slate-700 w-full" />
                </div>

                <div className="relative h-full flex items-end gap-[1px] md:gap-[2px] z-10 w-full">
                  {stats.freq.map((count, index) => {
                    const heightPercent = stats.maxFreq === 0 ? 0 : (count / stats.maxFreq) * 100;
                    const isMode = stats.mode.includes(index) && count > 0;
                    const isMin = index === stats.min && count > 0;
                    const isMax = index === stats.max && count > 0;
                    
                    return (
                      <div 
                        key={index} 
                        className="flex-1 relative group h-full cursor-crosshair flex flex-col justify-end items-center"
                      >
                        <motion.div
                          layout
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercent}%` }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className={`w-full min-w-[2px] rounded-t-sm transition-colors ${
                            isMode 
                              ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]' 
                              : isMin
                              ? 'bg-red-400'
                              : isMax
                              ? 'bg-green-400'
                              : count > 0 
                              ? 'bg-indigo-500 hover:bg-indigo-400' 
                              : 'bg-transparent group-hover:bg-slate-800/60'
                          }`}
                        />
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] md:text-xs px-2 py-1.5 rounded border border-slate-700 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                          <div className="font-mono text-indigo-300">freq[{index}]</div>
                          <div className="font-bold">{count} {count === 1 ? 'occurrence' : 'occurrences'}</div>
                        </div>
                        {/* Selected Indicators Below */}
                        {index % 10 === 0 && index !== 0 && index !== 100 && count === 0 && (
                          <div className="absolute -bottom-6 text-[9px] text-slate-600 font-mono pointer-events-none hidden md:block">
                            {index}
                          </div>
                        )}
                        {index === 0 && (
                           <div className="absolute -bottom-6 left-0 text-[10px] text-slate-500 font-mono pointer-events-none">0</div>
                        )}
                        {index === 100 && (
                           <div className="absolute -bottom-6 right-0 text-[10px] text-slate-500 font-mono pointer-events-none">100</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend under chart */}
              <div className="flex justify-center gap-6 mt-8 text-xs font-mono text-slate-400">
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-red-400"></span> Min
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-green-400"></span> Max
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-amber-400"></span> Mode
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-indigo-500"></span> Value
                 </div>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      <style>{`
        .btn-secondary {
          @apply px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all text-sm font-medium text-slate-200 backdrop-blur-md;
        }
      `}</style>
    </div>
  );
}

// ---------------------------
// Reusable Sub-Components
// ---------------------------

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  delay: number;
  isHighlight?: boolean;
  subtitle?: string;
}

function MetricCard({ title, value, icon, delay, subtitle, isHighlight }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
      className={`relative p-1 rounded-2xl bg-gradient-to-b ${isHighlight ? 'from-green-500/20' : 'from-white/10'} to-transparent shadow-xl`}
    >
      <div className={`bg-slate-900/90 h-full p-5 rounded-[14px] flex flex-col justify-between overflow-hidden relative group`}>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        
        <div className="flex justify-between items-start mb-2 relative z-10">
          <span className="text-slate-400 font-medium text-sm">{title}</span>
          <div className="p-2 bg-slate-800/50 rounded-lg">{icon}</div>
        </div>
        
        <div className="relative z-10">
          <motion.div 
            key={String(value)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-3xl font-mono font-bold ${isHighlight ? 'text-green-300' : 'text-white'}`}
          >
            {value}
          </motion.div>
          {subtitle && (
            <div className="text-xs text-slate-500 font-mono mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

