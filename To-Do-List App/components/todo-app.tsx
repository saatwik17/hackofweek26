'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Check, Circle, ListTodo, Clock, AlertCircle } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  deadline?: number | null;
  notified?: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

interface Toast {
  id: string;
  message: string;
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [deadlineInput, setDeadlineInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTime(Date.now());
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse todos', e);
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // Check for overdue tasks
  useEffect(() => {
    if (!isLoaded) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);
      let updated = false;
      
      const newTodos = todos.map(todo => {
        if (!todo.completed && todo.deadline && now > todo.deadline && !todo.notified) {
          updated = true;
          const toastId = crypto.randomUUID();
          setToasts(prev => [...prev, { id: toastId, message: `⏰ Time's up for: "${todo.text}"!` }]);
          
          // Auto-remove toast after 5 seconds
          setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== toastId));
          }, 5000);
          
          return { ...todo, notified: true };
        }
        return todo;
      });
      
      if (updated) {
        setTodos(newTodos);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [todos, isLoaded]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
      deadline: deadlineInput ? new Date(deadlineInput).getTime() : null,
      notified: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
    setDeadlineInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  if (!isLoaded) return null;

  return (
    <>
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-medium"
            >
              <AlertCircle size={20} />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40">
        <div className="p-8 bg-white/40 border-b border-white/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30">
              <ListTodo size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Daily Tasks ✨
              </h1>
              <p className="text-slate-600 font-medium mt-1">Stay organized and focused 🎯</p>
            </div>
          </div>

          <form onSubmit={addTodo} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done? 🚀"
                className="w-full pl-6 pr-14 py-4 bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm text-lg font-medium"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <Plus size={24} />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white/50 p-2 rounded-xl border border-white/40 w-fit">
              <Clock size={18} className="text-slate-500 ml-2" />
              <input
                type="datetime-local"
                value={deadlineInput}
                onChange={(e) => setDeadlineInput(e.target.value)}
                className="bg-transparent border-none text-sm text-slate-600 focus:ring-0 outline-none cursor-pointer"
              />
            </div>
          </form>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6 text-sm">
            <div className="flex gap-1 bg-slate-200/50 p-1 rounded-xl backdrop-blur-sm">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-lg capitalize transition-all duration-200 ${
                    filter === f
                      ? 'bg-white text-indigo-600 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 font-medium'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="text-slate-600 font-semibold bg-white/50 px-4 py-2 rounded-xl">
              {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining 📝
            </span>
          </div>

          <div className="space-y-3 min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {filteredTodos.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center h-48 text-slate-500"
                >
                  <div className="p-5 bg-white/60 rounded-full mb-4 shadow-sm">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <p className="font-medium text-lg">No tasks found. You&apos;re all caught up!</p>
                </motion.div>
              ) : (
                filteredTodos.map((todo) => {
                  const isOverdue = !todo.completed && todo.deadline && currentTime > todo.deadline;
                  
                  return (
                    <motion.div
                      key={todo.id}
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                        todo.completed
                          ? 'bg-white/40 border-white/20 opacity-75'
                          : isOverdue
                          ? 'bg-red-50/80 border-red-200 shadow-sm'
                          : 'bg-white/80 border-white/60 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                          todo.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white scale-110'
                            : isOverdue
                            ? 'border-red-400 text-transparent hover:border-red-500 hover:bg-red-50'
                            : 'border-slate-300 text-transparent hover:border-indigo-500 hover:bg-indigo-50'
                        }`}
                      >
                        {todo.completed ? <Check size={16} strokeWidth={3} /> : <Circle size={16} />}
                      </button>
                      
                      <div className="flex-grow flex flex-col">
                        <span
                          className={`text-lg font-medium transition-all duration-300 ${
                            todo.completed 
                              ? 'text-slate-400 line-through' 
                              : isOverdue
                              ? 'text-red-700'
                              : 'text-slate-800'
                          }`}
                        >
                          {todo.text}
                        </span>
                        {todo.deadline && (
                          <span className={`text-xs font-semibold flex items-center gap-1 mt-1 ${
                            todo.completed ? 'text-slate-400' : isOverdue ? 'text-red-500' : 'text-indigo-500'
                          }`}>
                            <Clock size={12} />
                            {isOverdue && !todo.completed ? 'Overdue: ' : 'Due: '}
                            {new Date(todo.deadline).toLocaleString([], {
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-100 rounded-xl transition-all duration-200"
                        aria-label="Delete task"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {todos.some((t) => t.completed) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 pt-6 border-t border-slate-200/50 flex justify-end"
            >
              <button
                onClick={clearCompleted}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-white/50 px-4 py-2 rounded-lg transition-all"
              >
                Clear completed tasks 🧹
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
