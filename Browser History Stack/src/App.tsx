import React, { useState, FormEvent, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, RotateCw, Globe, Layers, Search, Code, Play, MousePointer2 } from 'lucide-react';

// --- 3D Tilt Wrapper Component ---
const TiltWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Floating Background Particles ---
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 40 + 10;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * -20;
        const isCube = Math.random() > 0.5;
        
        return (
          <motion.div
            key={i}
            className={`absolute bg-white/5 backdrop-blur-sm border border-white/10 ${isCube ? 'rounded-lg' : 'rounded-full'}`}
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotateX: isCube ? [0, 360, 720] : 0,
              rotateY: isCube ? [0, 360, 720] : 0,
              rotateZ: [0, 180, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          />
        );
      })}
    </div>
  );
};

const BrowserViewport = ({ url }: { url: string }) => {
  const getEmbedUrl = (rawUrl: string) => {
    try {
      const urlObj = new URL(rawUrl);
      if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
        const v = urlObj.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
      } else if (urlObj.hostname === 'youtu.be') {
        const v = urlObj.pathname.slice(1);
        if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
      }
      return rawUrl;
    } catch (e) {
      return rawUrl;
    }
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="w-full h-full bg-white relative group">
      <iframe 
        src={embedUrl} 
        className="w-full h-full border-none bg-white"
        title="Browser Viewport"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md border border-white/10 shadow-xl">
        Note: Some sites block embedding (X-Frame-Options).
      </div>
    </div>
  );
};

const StackVisualization = ({ stack, type }: { stack: string[], type: 'back' | 'forward' }) => {
  const displayStack = stack.slice(-6);
  
  return (
    <div className="flex flex-col-reverse gap-3 w-full justify-start items-center perspective-[1000px]">
      <AnimatePresence mode="popLayout">
        {displayStack.map((url, idx) => {
          const isTop = idx === displayStack.length - 1;
          
          return (
            <motion.div
              layout
              key={`${url}-${stack.length - displayStack.length + idx}`}
              initial={{ opacity: 0, y: type === 'back' ? 20 : -20, rotateX: 45, scale: 0.8 }}
              animate={{ 
                opacity: isTop ? 1 : 0.5 + (idx * 0.08),
                y: 0,
                rotateX: 0,
                scale: 1,
              }}
              exit={{ opacity: 0, x: type === 'back' ? 30 : -30, scale: 0.8 }}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 10, 
                rotateY: type === 'back' ? -5 : 5,
                z: 20,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className={`w-full py-3 px-4 rounded-xl border flex items-center shadow-xl backdrop-blur-md relative overflow-hidden group cursor-pointer
                ${type === 'back' 
                  ? 'bg-gradient-to-br from-indigo-950/80 to-blue-900/80 border-indigo-500/30 text-indigo-100' 
                  : 'bg-gradient-to-br from-fuchsia-950/80 to-purple-900/80 border-fuchsia-500/30 text-fuchsia-100'
                }
                ${isTop ? 'ring-2 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}
              `}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-3 w-full">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
                  ${type === 'back' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-fuchsia-500/20 text-fuchsia-300'}
                `}>
                  {stack.length - displayStack.length + idx + 1}
                </div>
                <div className="truncate text-xs font-mono flex-1">
                  {url.replace(/^https?:\/\//, '')}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [backStack, setBackStack] = useState<string[]>([]);
  const [forwardStack, setForwardStack] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>('https://www.youtube.com/watch?v=jfKfPfyJRdk');
  const [inputValue, setInputValue] = useState<string>('https://www.youtube.com/watch?v=jfKfPfyJRdk');

  const visit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    let url = inputValue.trim();
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    if (url === currentUrl) return;
    
    setBackStack([...backStack, currentUrl]);
    setCurrentUrl(url);
    setForwardStack([]);
    setInputValue(url);
  };

  const goBack = () => {
    if (backStack.length === 0) return;
    const newBackStack = [...backStack];
    const previousUrl = newBackStack.pop()!;
    
    setForwardStack([...forwardStack, currentUrl]);
    setCurrentUrl(previousUrl);
    setBackStack(newBackStack);
    setInputValue(previousUrl);
  };

  const goForward = () => {
    if (forwardStack.length === 0) return;
    const newForwardStack = [...forwardStack];
    const nextUrl = newForwardStack.pop()!;
    
    setBackStack([...backStack, currentUrl]);
    setCurrentUrl(nextUrl);
    setForwardStack(newForwardStack);
    setInputValue(nextUrl);
  };

  const handleUrlClick = (url: string) => {
    setInputValue(url);
    if (url === currentUrl) return;
    setBackStack([...backStack, currentUrl]);
    setCurrentUrl(url);
    setForwardStack([]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-slate-200 font-sans selection:bg-indigo-500/30 relative flex flex-col p-4 sm:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <FloatingParticles />
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-fuchsia-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[40%] w-[30%] h-[30%] bg-blue-600/20 rounded-full blur-[100px]" 
        />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center gap-4 mb-8 w-full max-w-7xl mx-auto pt-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-white/10">
          <Layers className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">HistoryStack</h1>
          <p className="text-sm text-indigo-200/70 font-medium">Data Structures Demo</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full z-10 perspective-[2000px]">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Browser Window - 7 cols */}
        <TiltWrapper className="lg:col-span-7 flex flex-col">
          <div className="bg-[#12121a]/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[600px] relative ring-1 ring-white/5" style={{ transform: 'translateZ(20px)' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            {/* Browser Header */}
            <div className="h-14 border-b border-white/5 bg-black/20 flex items-center px-4 gap-4">
              {/* Window Controls */}
              <div className="flex gap-2 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              
              {/* Navigation Controls */}
              <div className="flex gap-1 ml-2 shrink-0">
                <button 
                  onClick={goBack} 
                  disabled={backStack.length === 0}
                  className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-300"
                >
                  <ArrowLeft size={16} />
                </button>
                <button 
                  onClick={goForward} 
                  disabled={forwardStack.length === 0}
                  className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-300"
                >
                  <ArrowRight size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-300">
                  <RotateCw size={16} />
                </button>
              </div>
              
              {/* Address Bar */}
              <form onSubmit={visit} className="flex-1 flex items-center bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all shadow-inner">
                <Globe size={14} className="text-slate-500 mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder-slate-600 font-mono"
                  placeholder="Enter URL"
                />
              </form>
            </div>
            
            {/* Browser Content */}
            <div className="flex-1 relative bg-[#0a0a0e] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentUrl}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <BrowserViewport url={currentUrl} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {[
              { url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', icon: Play, label: 'YouTube Live' },
              { url: 'https://en.wikipedia.org/wiki/Stack_(abstract_data_type)', icon: Globe, label: 'Wikipedia' },
              { url: 'https://threejs.org/examples/', icon: Code, label: 'Three.js' },
              { url: 'https://example.com', icon: Search, label: 'Example' }
            ].map(item => (
              <button 
                key={item.url}
                onClick={() => handleUrlClick(item.url)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#12121a]/80 hover:bg-[#1a1a24] border border-white/10 hover:border-white/20 rounded-full transition-all shadow-lg hover:shadow-indigo-500/10 text-slate-300"
              >
                <item.icon size={14} className="text-indigo-400" />
                {item.label}
              </button>
            ))}
          </div>
        </TiltWrapper>
        
        {/* Stacks Visualization - 5 cols */}
        <TiltWrapper className="lg:col-span-5 flex flex-col h-[600px]">
          <div className="flex-1 bg-[#12121a]/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 flex flex-col relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5" style={{ transform: 'translateZ(30px)' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-2xl" />
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2 relative z-10">
              <Layers size={20} className="text-indigo-400" />
              Stack Memory
            </h2>
            
            <div className="flex-1 grid grid-cols-2 gap-6 overflow-hidden">
              {/* Back Stack */}
              <div className="flex flex-col items-center h-full">
                <div className="flex items-center justify-between w-full mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Back Stack</h3>
                  <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                    size: {backStack.length}
                  </span>
                </div>
                <div className="flex-1 w-full flex flex-col justify-end pb-2 relative">
                  {backStack.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm border border-dashed border-white/10 rounded-xl">
                      Empty
                    </div>
                  ) : (
                    <StackVisualization stack={backStack} type="back" />
                  )}
                </div>
              </div>
              
              {/* Forward Stack */}
              <div className="flex flex-col items-center h-full">
                <div className="flex items-center justify-between w-full mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Forward Stack</h3>
                  <span className="text-[10px] font-mono bg-fuchsia-500/20 text-fuchsia-300 px-2 py-0.5 rounded-full">
                    size: {forwardStack.length}
                  </span>
                </div>
                <div className="flex-1 w-full flex flex-col justify-end pb-2 relative">
                  {forwardStack.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm border border-dashed border-white/10 rounded-xl">
                      Empty
                    </div>
                  ) : (
                    <StackVisualization stack={forwardStack} type="forward" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Current State indicator */}
            <div className="mt-6 pt-6 border-t border-white/10 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  Current Page (Peek)
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-200 px-4 py-3 rounded-xl text-sm font-mono truncate shadow-inner">
                {currentUrl}
              </div>
            </div>
          </div>
        </TiltWrapper>
        </div>
      </main>
    </div>
  );
}
