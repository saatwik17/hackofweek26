import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCircularQueue, Customer } from './useCircularQueue';
import { motion, AnimatePresence } from 'motion/react';
import { User, Users, CheckCircle, AlertCircle, Play, Square, Activity, Database, Clock, RefreshCw, ChevronRight } from 'lucide-react';

const QUEUE_CAPACITY = 12;

const NAMES = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Mallory", "Pat", "Quinn", "Victor"];
function generateCustomer(): Customer {
  return {
    id: Math.random().toString(36).substring(2, 6).toUpperCase(),
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    timeAdded: Date.now(),
  };
}

export default function App() {
  const { items, front, rear, enqueue, dequeue, isFull, isEmpty, reset, size } = useCircularQueue<Customer>(QUEUE_CAPACITY);
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPeakHour, setIsPeakHour] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [servedCount, setServedCount] = useState(0);
  const [droppedCount, setDroppedCount] = useState(0);

  const logsEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-49), `${new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })} | ${msg}`]);
  }, []);

  const handleEnqueue = useCallback(() => {
    if (isFull()) {
      addLog("⚠️ Queue FULL. Customer turned away.");
      setDroppedCount(prev => prev + 1);
      return false;
    }
    const c = generateCustomer();
    enqueue(c);
    addLog(`➕ Enqueued ${c.name} (#${c.id})`);
    return true;
  }, [isFull, enqueue, addLog]);

  const handleDequeue = useCallback(() => {
    if (isEmpty()) {
      addLog("💤 Queue EMPTY. Cashier idle.");
      return null;
    }
    const c = dequeue();
    if (c) {
      addLog(`✅ Served ${c.name} (#${c.id})`);
      setServedCount(prev => prev + 1);
    }
    return c;
  }, [isEmpty, dequeue, addLog]);

  useEffect(() => {
    if (!isSimulating) return;

    // Peak hours: 600ms avg arrival, 2000ms service (Queue fills fast)
    // Off-peak: 2500ms avg arrival, 1500ms service (Queue drains/stays empty)
    const avgArrival = isPeakHour ? 600 : 2500;
    const avgService = isPeakHour ? 2000 : 1500;

    let enqueueTimer: NodeJS.Timeout;
    let dequeueTimer: NodeJS.Timeout;

    const runEnqueue = () => {
      const delay = avgArrival * (0.5 + Math.random());
      enqueueTimer = setTimeout(() => {
        handleEnqueue();
        if (isSimulating) runEnqueue();
      }, delay);
    };

    const runDequeue = () => {
      const delay = avgService * (0.8 + Math.random() * 0.4);
      dequeueTimer = setTimeout(() => {
        handleDequeue();
        if (isSimulating) runDequeue();
      }, delay);
    };

    runEnqueue();
    runDequeue();

    return () => {
      clearTimeout(enqueueTimer);
      clearTimeout(dequeueTimer);
    };
  }, [isSimulating, isPeakHour, handleEnqueue, handleDequeue]);

  const currentSize = size();
  const queueFull = isFull();
  const queueEmpty = isEmpty();

  // Circle Math
  const CIRCLE_RADIUS = 140;
  const getSlotStyle = (index: number) => {
    const angle = (index / QUEUE_CAPACITY) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * CIRCLE_RADIUS;
    const y = Math.sin(angle) * CIRCLE_RADIUS;
    return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
    };
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-800 pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              <Database className="text-emerald-500" size={24} />
              ATM Queue Simulator
            </h1>
            <p className="text-neutral-500 font-mono text-sm mt-1">
              Circular Array Implementation • Max Capacity: {QUEUE_CAPACITY}
            </p>
          </div>
          
          <div className="flex bg-neutral-900 border border-neutral-800 p-1 rounded-lg">
            <button 
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm transition-colors ${isSimulating ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'}`}
            >
              {isSimulating ? <Square size={16} /> : <Play size={16} />}
              {isSimulating ? 'STOP SIMULATION' : 'START SIMULATION'}
            </button>
            <div className="w-px bg-neutral-800 mx-1"></div>
            <button 
              onClick={() => setIsPeakHour(!isPeakHour)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm transition-colors ${isPeakHour ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : 'text-neutral-400 hover:bg-neutral-800'}`}
            >
              <Activity size={16} />
              {isPeakHour ? 'PEAK HOURS ON' : 'PEAK HOURS OFF'}
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col justify-between h-24">
            <div className="text-neutral-500 text-xs font-mono tracking-widest uppercase">Current Size</div>
            <div className={`text-3xl font-mono flex items-baseline gap-2 ${queueFull ? 'text-rose-500' : queueEmpty ? 'text-neutral-600' : 'text-white'}`}>
              {currentSize}
              <span className="text-sm text-neutral-600 opacity-50">/ {QUEUE_CAPACITY}</span>
            </div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col justify-between h-24">
            <div className="text-neutral-500 text-xs font-mono tracking-widest uppercase">State</div>
            <div className="flex items-center gap-2">
              {queueFull ? (
                <span className="text-rose-500 bg-rose-500/10 px-2 py-1 rounded font-mono text-sm border border-rose-500/20 flex items-center gap-1.5"><AlertCircle size={14} /> FULL</span>
              ) : queueEmpty ? (
                <span className="text-neutral-500 bg-neutral-800 px-2 py-1 rounded font-mono text-sm border border-neutral-700 flex items-center gap-1.5"><Clock size={14} /> EMPTY</span>
              ) : (
                <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded font-mono text-sm border border-emerald-500/20 flex items-center gap-1.5"><CheckCircle size={14} /> ACTIVE</span>
              )}
            </div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col justify-between h-24">
            <div className="text-neutral-500 text-xs font-mono tracking-widest uppercase">Customers Served</div>
            <div className="text-3xl font-mono text-white">{servedCount}</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col justify-between h-24">
            <div className="text-neutral-500 text-xs font-mono tracking-widest uppercase">Customers Turned Away</div>
            <div className="text-3xl font-mono text-rose-500">{droppedCount}</div>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Circular Visualizer */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[500px] overflow-hidden relative">
            <div className="absolute top-6 left-6 text-neutral-500 text-xs font-mono tracking-widest uppercase">
              Memory Ring Visualizer
            </div>
            
            <div className="w-[360px] h-[360px] relative mt-8">
              {/* Dashed Track */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border-[1.5px] border-dashed border-neutral-800" />
              
              {items.map((item, i) => {
                const isActive = item !== null;
                const isFront = i === front;
                const isRear = i === rear;
                
                return (
                  <div 
                    key={i}
                    className="absolute z-10"
                    style={getSlotStyle(i)}
                  >
                    <div className="relative group">
                      {/* Interaction glow background */}
                      <div className={`absolute inset-0 rounded-full blur-md opacity-0 transition-opacity duration-300 ${isActive ? 'bg-indigo-500/30' : ''}`} />
                      
                      {/* Circular Node */}
                      <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono text-sm relative z-20 backdrop-blur-sm transition-all duration-300
                        ${isActive 
                            ? 'bg-neutral-800 border-indigo-500/50 shadow-lg shadow-black/80 text-white' 
                            : 'bg-neutral-950 border-neutral-800 text-neutral-700'}
                        ${isFront && isActive ? 'ring-2 ring-emerald-500 ring-offset-4 ring-offset-neutral-900' : ''}
                        ${isRear && isActive ? 'ring-2 ring-amber-500 ring-offset-4 ring-offset-neutral-900' : ''}
                        ${isRear && !isActive ? 'ring-2 ring-amber-500/30 ring-offset-4 ring-offset-neutral-900' : ''}
                      `}>
                         {isActive ? (
                            <div className="flex flex-col items-center">
                              <User size={16} className="text-indigo-400 mb-0.5" />
                              <span className="text-[9px] text-neutral-400">{item.id}</span>
                            </div>
                         ) : (
                            <span className="opacity-40">{i}</span>
                         )}
                      </div>

                      {/* Tooltip on hover */}
                      {isActive && (
                        <div className="absolute top-full lg:left-full mt-2 lg:mt-0 lg:ml-2 bg-neutral-800 border border-neutral-700 text-xs p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-max z-50">
                           <div className="font-semibold text-white">{item.name}</div>
                           <div className="text-neutral-400 font-mono text-[10px]">ID: {item.id}</div>
                           <div className="text-neutral-400 font-mono text-[10px]">Slot: {i}</div>
                        </div>
                      )}

                      {/* Pointers (Front/Rear) */}
                      {isFront && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                           <div className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20 leading-none">FRONT</div>
                           <div className="w-[1px] h-2 bg-emerald-500/50 my-1"></div>
                        </div>
                      )}
                      {isRear && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                           <div className="w-[1px] h-2 bg-amber-500/50 my-1"></div>
                           <div className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20 leading-none">REAR</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="absolute bottom-6 right-6 text-neutral-500 text-xs font-mono opacity-60">
               Memory Slots: 0 - 11
            </div>
          </div>

          {/* Right Panel: Controls & Logs */}
          <div className="flex flex-col gap-6">
            
            {/* Manual Controls */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="text-neutral-500 text-xs font-mono tracking-widest uppercase mb-4">Manual Operations</div>
              <div className="grid grid-cols-2 gap-3">
                 <button 
                   onClick={handleEnqueue}
                   disabled={isSimulating}
                   className={`p-3 rounded-lg border font-mono text-sm flex flex-col items-center justify-center gap-2 transition-colors ${isSimulating ? 'opacity-50 cursor-not-allowed border-neutral-800 bg-neutral-950 text-neutral-500' : 'border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-500/10 text-indigo-400'}`}
                 >
                   <ChevronRight size={20} className="text-indigo-500" />
                   Enqueue
                 </button>
                 <button 
                   onClick={handleDequeue}
                   disabled={isSimulating}
                   className={`p-3 rounded-lg border font-mono text-sm flex flex-col items-center justify-center gap-2 transition-colors ${isSimulating ? 'opacity-50 cursor-not-allowed border-neutral-800 bg-neutral-950 text-neutral-500' : 'border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400'}`}
                 >
                   <CheckCircle size={20} className="text-emerald-500" />
                   Dequeue
                 </button>
                 <button 
                   onClick={() => {
                     reset();
                     setLogs([]);
                     setServedCount(0);
                     setDroppedCount(0);
                     addLog("System reset.");
                   }}
                   disabled={isSimulating}
                   className={`col-span-2 p-3 mt-1 rounded-lg border font-mono text-sm flex items-center justify-center gap-2 transition-colors ${isSimulating ? 'opacity-50 cursor-not-allowed border-neutral-800 bg-neutral-950 text-neutral-500' : 'border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 text-neutral-400'}`}
                 >
                   <RefreshCw size={16} />
                   Reset System
                 </button>
              </div>
            </div>

            {/* Event Logs */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col flex-grow h-[300px] lg:h-auto">
              <div className="text-neutral-500 text-xs font-mono tracking-widest uppercase mb-4 flex justify-between items-center">
                <span>System Logs</span>
                <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded select-none">T-MINUS 0s</span>
              </div>
              <div className="flex-grow overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1.5 pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {logs.length === 0 ? (
                    <div className="text-neutral-600 italic">No events recorded.</div>
                  ) : (
                    logs.map((log, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={`py-1 px-2 rounded border-l-2 ${log.includes('FULL') ? 'border-rose-500 text-rose-300 bg-rose-500/5' : log.includes('Served') ? 'border-emerald-500 text-emerald-300 bg-emerald-500/5' : log.includes('Enqueued') ? 'border-indigo-500 text-indigo-300 bg-indigo-500/5' : 'border-neutral-600 text-neutral-400 bg-neutral-800'}`}
                      >
                        {log}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
                <div ref={logsEndRef} />
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}
