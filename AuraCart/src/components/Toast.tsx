import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Trash2, X } from 'lucide-react';

export type ToastType = 'add' | 'remove';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border bg-white shadow-xl min-w-[280px]"
          >
            {toast.type === 'add' ? (
              <CheckCircle2 className="text-green-500" size={20} />
            ) : (
              <Trash2 className="text-red-500" size={20} />
            )}
            <p className="text-sm font-medium text-gray-800 flex-1">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)} 
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-md"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
