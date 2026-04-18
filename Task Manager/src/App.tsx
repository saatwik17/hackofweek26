import React, { useState, useEffect } from 'react';
import { Undo2, Redo2, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Task = { id: string; text: string; completed: boolean };

type Action =
  | { type: 'ADD'; task: Task; index: number }
  | { type: 'REMOVE'; task: Task; index: number }
  | { type: 'EDIT'; id: string; oldText: string; newText: string }
  | { type: 'TOGGLE'; id: string };

const generateId = () => {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 10);
};

// Applies an action forwards
const applyAction = (tasks: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'ADD': {
      const copy = [...tasks];
      copy.splice(action.index, 0, action.task);
      return copy;
    }
    case 'REMOVE':
      return tasks.filter((t) => t.id !== action.task.id);
    case 'EDIT':
      return tasks.map((t) =>
        t.id === action.id ? { ...t, text: action.newText } : t
      );
    case 'TOGGLE':
      return tasks.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    default:
      return tasks;
  }
};

// Reverts an action backwards
const applyInverse = (tasks: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'ADD':
      return tasks.filter((t) => t.id !== action.task.id);
    case 'REMOVE': {
      const copy = [...tasks];
      copy.splice(action.index, 0, action.task);
      return copy;
    }
    case 'EDIT':
      return tasks.map((t) =>
        t.id === action.id ? { ...t, text: action.oldText } : t
      );
    case 'TOGGLE':
      return tasks.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    default:
      return tasks;
  }
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [undoStack, setUndoStack] = useState<Action[]>([]);
  const [redoStack, setRedoStack] = useState<Action[]>([]);
  
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Primary dispatcher
  const dispatchAction = (action: Action) => {
    setTasks((prev) => applyAction(prev, action));
    setUndoStack((prev) => [...prev, action]);
    setRedoStack([]); // New timeline clears redo future
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const lastAction = undoStack[undoStack.length - 1];
    
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, lastAction]);
    setTasks((prev) => applyInverse(prev, lastAction));
    
    if (editingId) setEditingId(null);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextAction = redoStack[redoStack.length - 1];
    
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, nextAction]);
    setTasks((prev) => applyAction(prev, nextAction));
    
    if (editingId) setEditingId(null);
  };

  // Keyboard binding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (!isInput) e.preventDefault();
        if (isInput) return; // Let browser handle text input undo

        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        if (!isInput) e.preventDefault();
        if (isInput) return;
        
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack, tasks, editingId]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask: Task = {
      id: generateId(),
      text: inputValue.trim(),
      completed: false,
    };
    
    dispatchAction({ type: 'ADD', task: newTask, index: tasks.length });
    setInputValue('');
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditValue(task.text);
  };

  const saveEdit = (task: Task) => {
    const finalValue = editValue.trim();
    if (finalValue && finalValue !== task.text) {
      dispatchAction({
        type: 'EDIT',
        id: task.id,
        oldText: task.text,
        newText: finalValue,
      });
    }
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div 
      className="min-h-screen flex py-16 justify-center px-4 font-sans text-slate-800 overflow-x-hidden relative"
      style={{
        backgroundImage: "url('https://picsum.photos/seed/productivity/1920/1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-slate-100/75 backdrop-blur-md z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl flex flex-col gap-8 relative z-10"
      >
        
        {/* Header & Controls */}
        <div className="flex flex-col gap-5 px-2">
          <div className="flex items-end justify-between">
            <div>
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="text-4xl font-bold tracking-tight text-slate-900"
              >
                Tasks
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-500 text-sm font-medium mt-2"
              >
                Let's get things done.
              </motion.p>
            </div>

            <div className="flex items-center bg-slate-200/60 backdrop-blur-sm rounded-full p-1 border border-slate-200 shadow-sm transition-all hover:bg-slate-200">
              <motion.button 
                whileHover={{ scale: undoStack.length > 0 ? 1.1 : 1 }}
                whileTap={{ scale: undoStack.length > 0 ? 0.9 : 1 }}
                title="Undo (Ctrl+Z)"
                onClick={handleUndo} 
                disabled={undoStack.length === 0} 
                className="p-2.5 rounded-full hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all text-slate-700"
              >
                <Undo2 size={20} strokeWidth={2.5} />
              </motion.button>
              <div className="w-px h-6 bg-slate-300 mx-1"></div>
              <motion.button 
                whileHover={{ scale: redoStack.length > 0 ? 1.1 : 1 }}
                whileTap={{ scale: redoStack.length > 0 ? 0.9 : 1 }}
                title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
                onClick={handleRedo} 
                disabled={redoStack.length === 0} 
                className="p-2.5 rounded-full hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all text-slate-700"
              >
                <Redo2 size={20} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                animate={{ width: `${tasks.length === 0 ? 0 : Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%` }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                className="h-full bg-indigo-500 rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>Progress</span>
              <span>{tasks.length === 0 ? 0 : Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <motion.form 
          initial={false}
          animate={{
            scale: isFocused ? 1.02 : 1,
            y: isFocused ? -8 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onSubmit={handleAddTask} 
          className="relative flex gap-3 px-2 z-20"
        >
          {/* Animated Glow Effect */}
          <motion.div 
            className="absolute inset-0 bg-indigo-500 rounded-3xl -z-10 pointer-events-none"
            initial={false}
            animate={{ 
              opacity: isFocused ? 0.3 : 0,
              filter: isFocused ? "blur(20px)" : "blur(0px)",
              scale: isFocused ? 1.02 : 1
            }}
            transition={{ duration: 0.3 }}
          />

          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What needs to be done?"
            className="flex-1 px-5 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-slate-200/50 transition-all placeholder:text-slate-400 text-slate-700 text-lg"
          />
          <motion.button 
            whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
            whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
            type="submit" 
            disabled={!inputValue.trim()}
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-2xl shadow-sm hover:bg-indigo-700 hover:shadow disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center shrink-0"
          >
            <motion.div
              animate={{ rotate: (isFocused && inputValue.trim()) ? [0, 90, 0] : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Plus size={22} className="mr-1 opacity-90" />
            </motion.div>
            Add
          </motion.button>
        </motion.form>

        {/* Task List */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {tasks.map((task, index) => (
              <motion.div
                layout
                key={task.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.01 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -100 || info.offset.x > 100) {
                    dispatchAction({ type: 'REMOVE', task, index });
                  }
                }}
                className={`group flex items-center gap-4 p-4 bg-white border rounded-2xl shadow-sm transition-colors cursor-grab active:cursor-grabbing ${
                  task.completed ? 'border-slate-200/40 bg-slate-50/50' : 'border-slate-200/80 hover:shadow-md'
                }`}
              >
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => dispatchAction({ type: 'TOGGLE', id: task.id })}
                  className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center border transition-all duration-200 ${
                    task.completed 
                      ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm shadow-indigo-200' 
                      : 'border-slate-300 hover:border-indigo-400 text-transparent'
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: task.completed ? 1 : 0, opacity: task.completed ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Check size={16} strokeWidth={4} />
                  </motion.div>
                </motion.button>

                {editingId === task.id ? (
                  <input 
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEdit(task)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(task);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    className="flex-1 px-3 py-1.5 bg-indigo-50/50 border-b-2 border-indigo-500 rounded-t-md focus:outline-none text-slate-800 text-lg"
                  />
                ) : (
                  <motion.span 
                    animate={{ color: task.completed ? '#94a3b8' : '#334155' }}
                    className={`flex-1 truncate cursor-text transition-all text-lg select-none ${
                      task.completed ? 'line-through' : ''
                    }`}
                    onDoubleClick={() => startEditing(task)}
                  >
                    {task.text}
                  </motion.span>
                )}

                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: '#f1f5f9' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => startEditing(task)}
                    className="p-2 text-slate-400 rounded-xl hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    title="Edit (Double-click text)"
                  >
                    <Edit2 size={18} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: '#fff1f2' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatchAction({ type: 'REMOVE', task, index })}
                    className="p-2 text-slate-400 rounded-xl hover:text-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                    title="Delete or swipe left/right"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {tasks.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="py-20 text-center text-slate-400 flex flex-col items-center pointer-events-none"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-slate-200/50 fill-mode-forwards flex items-center justify-center mb-5 border border-slate-200/60 shadow-inner"
              >
                <Check size={32} className="text-slate-300" />
              </motion.div>
              <h3 className="text-xl font-semibold text-slate-500">All caught up!</h3>
              <p className="mt-2 text-sm max-w-[200px] leading-relaxed">Relax for a bit, or add a new task above.</p>
            </motion.div>
          )}
        </div>
        
      </motion.div>
    </div>
  );
}
