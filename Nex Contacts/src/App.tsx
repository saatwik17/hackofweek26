import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import React, { useState, useMemo, useEffect } from 'react';
import { Search, User, Phone, Mail, Zap, ChevronRight, Github, Globe, Briefcase, Home, Star, UserCircle, Users } from 'lucide-react';
import { GENERATED_CONTACTS, Contact } from './data';

// Binary Search Implementation for Prefix Matching (Returns all matches)
function binarySearchPrefix(contacts: Contact[], prefix: string): Contact[] {
  if (!prefix) return [];
  let left = 0;
  let right = contacts.length - 1;
  const target = prefix.toLowerCase();
  let matchIndex = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midName = contacts[mid].name.toLowerCase();

    if (midName.startsWith(target)) {
      matchIndex = mid;
      break;
    }

    if (midName < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (matchIndex === -1) return [];

  // Scan left and right to find ALL matching prefixes (since array is sorted)
  const results: Contact[] = [];
  
  // Scan left
  let i = matchIndex;
  while (i >= 0 && contacts[i].name.toLowerCase().startsWith(target)) {
    results.push(contacts[i]);
    i--;
  }
  
  results.reverse(); // Put left scan back in alphabetical order

  // Scan right
  i = matchIndex + 1;
  while (i < contacts.length && contacts[i].name.toLowerCase().startsWith(target)) {
    results.push(contacts[i]);
    i++;
  }

  return results;
}

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-cyan-500/50 transition-colors duration-300 ${className}`}
    >
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="w-full h-full p-6">
        {children}
      </div>
    </motion.div>
  );
};

const ContactCard = ({ contact, highlighted = false }: { contact: Contact, highlighted?: boolean }) => {
  return (
    <TiltCard className={highlighted ? "ring-2 ring-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)]" : ""}>
      <div className="flex flex-col items-center text-center gap-4">
        <motion.div 
          style={{ transform: "translateZ(30px)" }}
          className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/20"
        >
          <img src={contact.avatarUrl} alt={contact.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent mix-blend-overlay" />
        </motion.div>
        
        <div style={{ transform: "translateZ(20px)" }} className="space-y-1">
          <h3 className="text-xl font-bold text-white tracking-wide">{contact.name}</h3>
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm text-cyan-300 font-mono">{contact.id.padStart(4, '0')}</p>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-medium text-gray-300 border border-white/5">
              {contact.category}
            </span>
          </div>
        </div>

        <div style={{ transform: "translateZ(10px)" }} className="w-full space-y-3 mt-2">
          <div className="flex items-center gap-3 text-gray-300 bg-black/20 p-2 rounded-lg">
            <Phone size={16} className="text-cyan-400" />
            <span className="text-sm font-medium">{contact.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 bg-black/20 p-2 rounded-lg">
            <Mail size={16} className="text-cyan-400" />
            <span className="text-sm font-medium truncate">{contact.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 bg-black/20 p-2 rounded-lg">
            <Globe size={16} className="text-cyan-400" />
            <span className="text-sm font-medium">{contact.country}</span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const FloatingBackground = () => {
  const floatingImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400&auto=format&fit=crop', size: 250, top: '5%', left: '2%', delay: 0, duration: 20 },
    { id: 2, src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', size: 350, top: '50%', left: '-10%', delay: 2, duration: 25 },
    { id: 3, src: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=400&auto=format&fit=crop', size: 280, top: '10%', left: '75%', delay: 1, duration: 22 },
    { id: 4, src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop', size: 200, top: '65%', left: '80%', delay: 3, duration: 18 },
    { id: 5, src: 'https://images.unsplash.com/photo-1614851099511-773084f69111?q=80&w=400&auto=format&fit=crop', size: 180, top: '35%', left: '85%', delay: 4, duration: 15 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 mix-blend-screen">
      {floatingImages.map((item) => (
        <motion.img
          key={item.id}
          src={item.src}
          alt=""
          referrerPolicy="no-referrer"
          className="absolute rounded-full object-cover blur-[4px]"
          style={{
            width: item.size,
            height: item.size,
            top: item.top,
            left: item.left,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 40, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter contacts based on active category tab
  const displayedContacts = useMemo(() => {
    if (activeCategory === 'All') return GENERATED_CONTACTS;
    return GENERATED_CONTACTS.filter(c => c.category === activeCategory);
  }, [activeCategory]);
  
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const [searchTime, setSearchTime] = useState<number>(0);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSearchTime(0);
      return;
    }

    const start = performance.now();
    const results = binarySearchPrefix(displayedContacts, searchQuery);
    const end = performance.now();
    
    setSearchResults(results);
    setSearchTime(end - start);
  }, [searchQuery, displayedContacts]);

  const categories = [
    { id: 'All', icon: Users, color: 'text-white' },
    { id: 'Work', icon: Briefcase, color: 'text-cyan-400' },
    { id: 'Personal', icon: UserCircle, color: 'text-green-400' },
    { id: 'Family', icon: Home, color: 'text-pink-400' },
    { id: 'VIP', icon: Star, color: 'text-yellow-400' }
  ];

  const contactsToRender = searchQuery ? searchResults : displayedContacts;

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-cyan-500/30 font-sans relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <FloatingBackground />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10 mb-4 shadow-lg backdrop-blur-md">
            <Zap className="text-cyan-400 w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-sm">
            Nexus Directory
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            O(log n) binary search powered contact resolution.
          </p>
        </motion.header>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto w-full mb-16 relative perspective-1000"
        >
          <div className="relative group transform-gpu transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl">
              <div className="pl-4 pr-2 text-cyan-500">
                <Search size={24} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contacts via binary search..."
                className="w-full bg-transparent border-none outline-none text-white text-lg py-4 px-2 placeholder-gray-500 font-medium"
              />
              <div className="pr-4 flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-xs text-gray-400 font-mono">
                  ⌘ K
                </kbd>
              </div>
            </div>
          </div>

          {/* Search Stats */}
          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -bottom-8 left-0 right-0 text-center text-sm font-mono text-cyan-400/80"
              >
                {searchResults.length > 0 ? (
                  <span>Found {searchResults.length} match{searchResults.length !== 1 ? 'es' : ''} in {searchTime.toFixed(3)}ms using Binary Search</span>
                ) : (
                  <span className="text-red-400/80">No match found in O(log n)</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={18} className={isActive ? cat.color : 'text-gray-500'} />
                <span className="relative z-10">{cat.id}</span>
                <span className="relative z-10 ml-1 px-2 py-0.5 rounded-full bg-black/30 text-xs">
                  {cat.id === 'All' ? GENERATED_CONTACTS.length : GENERATED_CONTACTS.filter(c => c.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + (searchQuery ? '-search' : '-list')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-1000 pb-20"
            >
              {contactsToRender.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, scale: 0.9, translateZ: -50 }}
                  animate={{ opacity: 1, scale: 1, translateZ: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.5) }}
                >
                  <ContactCard contact={contact} highlighted={!!searchQuery} />
                </motion.div>
              ))}
              
              {contactsToRender.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                  <User size={48} className="mb-4 opacity-20" />
                  <p className="text-xl font-medium">No contacts found</p>
                  <p className="text-sm mt-2">Try adjusting your search or category filter.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
