import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, FileText, Plus, Trash2, CheckCircle2, Clock, Settings2, Layers } from 'lucide-react';

type JobStatus = 'queued' | 'printing' | 'completed';

interface PrintJob {
  id: string;
  name: string;
  pages: number;
  color: string;
  status: JobStatus;
}

const COLORS = [
  'bg-cyan-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-indigo-500',
];

export default function App() {
  const [queue, setQueue] = useState<PrintJob[]>([]);
  const [currentJob, setCurrentJob] = useState<PrintJob | null>(null);
  const [completed, setCompleted] = useState<PrintJob[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [jobCounter, setJobCounter] = useState(1);

  const addJob = () => {
    const newJob: PrintJob = {
      id: Math.random().toString(36).substring(7),
      name: `Document_${jobCounter}.pdf`,
      pages: Math.floor(Math.random() * 10) + 1,
      color: COLORS[jobCounter % COLORS.length],
      status: 'queued',
    };
    setQueue((prev) => [...prev, newJob]);
    setJobCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isPrinting && queue.length > 0) {
      // Add a small delay so the user can see the job enter the queue
      const timer = setTimeout(() => {
        setQueue((prev) => {
          if (prev.length === 0) return prev;
          const nextJob = prev[0];
          setCurrentJob({ ...nextJob, status: 'printing' });
          setIsPrinting(true);
          return prev.slice(1);
        });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isPrinting, queue.length]);

  useEffect(() => {
    if (currentJob && isPrinting) {
      // Simulate printing time based on pages (e.g., 400ms per page)
      const printTime = currentJob.pages * 400 + 1000;
      const timer = setTimeout(() => {
        setCompleted((prev) => [{ ...currentJob, status: 'completed' }, ...prev].slice(0, 15));
        setCurrentJob(null);
        setIsPrinting(false);
      }, printTime);

      return () => clearTimeout(timer);
    }
  }, [currentJob, isPrinting]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 p-4 md:p-6 flex flex-col font-sans selection:bg-cyan-500/30">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-lg shadow-black/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Layers className="w-7 h-7 text-cyan-400 relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent tracking-tight">
              Nexus PrintQueue
            </h1>
            <p className="text-sm text-neutral-500 font-medium mt-0.5">FIFO 3D Simulation Engine</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={addJob}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-4 h-4" />
            Enqueue Job
          </button>
          <button
            onClick={() => setQueue([])}
            disabled={queue.length === 0}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 text-neutral-400 font-medium rounded-xl hover:bg-neutral-800 hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Left: Queue List */}
        <div className="col-span-1 bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-5 flex flex-col backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-neutral-100">
              <Clock className="w-5 h-5 text-amber-400" />
              Active & Pending
            </h2>
            <span className="px-2.5 py-1 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-md border border-neutral-700">
              {queue.length + (currentJob ? 1 : 0)}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {currentJob && (
                <motion.div
                  key={`current-${currentJob.id}`}
                  layout
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="p-3.5 bg-neutral-950/80 border border-cyan-500/50 rounded-2xl flex items-center gap-3.5 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                  <div className={`w-3 h-3 rounded-full ${currentJob.color} shadow-[0_0_10px_currentColor] animate-pulse`} />
                  <div className="flex-1 min-w-0 relative z-10">
                    <p className="text-sm font-medium text-cyan-100 truncate">{currentJob.name}</p>
                    <p className="text-xs text-cyan-500/80 mt-0.5">Printing ({currentJob.pages} pages)...</p>
                  </div>
                  <div className="relative z-10">
                    <Settings2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  </div>
                </motion.div>
              )}
              {queue.map((job, idx) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="p-3.5 bg-neutral-950/50 border border-neutral-800/80 rounded-2xl flex items-center gap-3.5 group hover:border-neutral-700 transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${job.color} shadow-[0_0_10px_currentColor] opacity-80`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-200 truncate">{job.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{job.pages} pages</p>
                  </div>
                  <div className="text-xs font-mono font-medium text-neutral-600 bg-neutral-900 px-2 py-1 rounded-md">
                    #{idx + 1}
                  </div>
                </motion.div>
              ))}
              {queue.length === 0 && !currentJob && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-neutral-600 space-y-3 py-10"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-800/50 flex items-center justify-center border border-neutral-800">
                    <FileText className="w-5 h-5 text-neutral-500" />
                  </div>
                  <p className="text-sm font-medium">Queue is empty</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: 3D Visualization */}
        <div className="col-span-1 lg:col-span-2 bg-neutral-900/20 border border-neutral-800/50 rounded-3xl overflow-hidden relative flex items-center justify-center perspective-1000 shadow-2xl min-h-[400px]">
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />

          {/* 3D Scene */}
          <div
            className="relative w-full h-full flex items-center justify-center transform-style-3d transition-transform duration-1000 ease-out"
            style={{ transform: 'rotateX(55deg) rotateZ(-35deg) scale3d(0.9, 0.9, 0.9)' }}
          >
            {/* Conveyor Belt Base */}
            <div
              className="absolute w-[450px] h-[140px] bg-neutral-900 border-4 border-neutral-800 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center px-6 gap-6 transform-style-3d"
              style={{ transform: 'translateZ(-20px) translateX(-80px)' }}
            >
              {/* Animated Belt Texture */}
              {isPrinting || queue.length > 0 ? (
                <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_30px,#fff_30px,#fff_60px)] animate-conveyor rounded-xl" />
              ) : (
                <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_30px,#fff_30px,#fff_60px)] rounded-xl" />
              )}

              {/* Queue Items on Belt */}
              <div className="relative w-full h-full flex items-center justify-end gap-6 overflow-hidden z-10 transform-style-3d">
                <AnimatePresence mode="popLayout">
                  {queue.map((job) => (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, x: -100, translateZ: 20 }}
                      animate={{ opacity: 1, x: 0, translateZ: 20 }}
                      exit={{ opacity: 0, x: 100, translateZ: 20 }}
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.8 }}
                      className={`shrink-0 w-20 h-28 ${job.color} rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center relative group backdrop-blur-sm bg-opacity-90 border border-white/20`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <FileText className="w-8 h-8 text-white/90 mb-2 drop-shadow-md" />
                      <span className="text-xs font-bold text-white drop-shadow-md">{job.pages}p</span>
                      {/* 3D Thickness */}
                      <div className="absolute inset-y-0 right-[-10px] w-[10px] bg-black/30 rounded-r-xl transform origin-left rotate-y-90" />
                      <div className="absolute inset-x-0 bottom-[-10px] h-[10px] bg-black/40 rounded-b-xl transform origin-top rotate-x-[-90deg]" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Printer Machine */}
            <div
              className="absolute w-[180px] h-[200px] bg-neutral-800 rounded-3xl border-2 border-neutral-700 shadow-[0_40px_80px_rgba(0,0,0,0.9),-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-end pb-6 z-20 transform-style-3d"
              style={{ transform: 'translateZ(40px) translateX(200px) translateY(-30px)' }}
            >
              {/* Printer Top Panel */}
              <div className="absolute top-0 inset-x-0 h-16 bg-neutral-700 rounded-t-3xl border-b-2 border-neutral-600 flex items-center justify-center px-5 transform-style-3d">
                <div className="w-20 h-3 bg-black/50 rounded-full shadow-inner" />
                <div className="absolute right-5 flex gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] ${isPrinting ? 'bg-cyan-400 animate-pulse' : 'bg-neutral-500'}`} />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_currentColor]" />
                </div>
              </div>

              {/* Paper Output Slot */}
              <div className="w-32 h-6 bg-black/80 rounded-full mb-4 relative overflow-hidden flex justify-center shadow-inner">
                {/* Printing Paper Animation */}
                <AnimatePresence>
                  {currentJob && (
                    <motion.div
                      key="printing-paper"
                      initial={{ y: -60 }}
                      animate={{ y: 0 }}
                      exit={{ y: 60, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
                      className={`absolute top-0 w-24 h-16 ${currentJob.color} rounded-sm opacity-90 shadow-[0_0_20px_currentColor]`}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Status Display */}
              <div className="w-28 h-8 bg-black/90 rounded-lg border border-neutral-700 flex items-center justify-center gap-2 shadow-inner">
                {isPrinting ? (
                  <>
                    <Settings2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">Printing</span>
                  </>
                ) : (
                  <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">Ready</span>
                )}
              </div>
              
              {/* 3D Side Panels */}
              <div className="absolute inset-y-0 left-[-20px] w-[20px] bg-neutral-900 rounded-l-3xl transform origin-right rotate-y-[-90deg] border-y-2 border-l-2 border-neutral-800" />
            </div>
            
            {/* Completed Tray (Visual only) */}
            <div 
              className="absolute w-[160px] h-[120px] bg-neutral-900/80 border-2 border-neutral-800 rounded-xl shadow-xl transform-style-3d"
              style={{ transform: 'translateZ(-10px) translateX(380px) translateY(-10px)' }}
            >
               <div className="absolute inset-0 flex items-center justify-center opacity-20">
                 <CheckCircle2 className="w-12 h-12 text-emerald-500" />
               </div>
            </div>
          </div>
        </div>

        {/* Right: Completed List */}
        <div className="col-span-1 bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-5 flex flex-col backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-neutral-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Completed
            </h2>
            <span className="px-2.5 py-1 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-md border border-neutral-700">
              {completed.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {completed.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="p-3.5 bg-neutral-950/50 border border-emerald-500/20 rounded-2xl flex items-center gap-3.5 relative overflow-hidden group hover:border-emerald-500/40 transition-colors"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${job.color} opacity-80`} />
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-200 truncate">{job.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{job.pages} pages</p>
                  </div>
                </motion.div>
              ))}
              {completed.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-neutral-600 space-y-3 py-10"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-800/50 flex items-center justify-center border border-neutral-800">
                    <CheckCircle2 className="w-5 h-5 text-neutral-500" />
                  </div>
                  <p className="text-sm font-medium">No jobs completed</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
