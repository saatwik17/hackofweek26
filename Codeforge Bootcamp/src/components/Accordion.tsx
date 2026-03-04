import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  color?: 'white' | 'yellow' | 'blue' | 'pink' | 'green';
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick, color = 'white' }) => {
  const bgColors = {
    white: "bg-white",
    yellow: "bg-neo-yellow",
    blue: "bg-neo-blue",
    pink: "bg-neo-pink",
    green: "bg-neo-green",
  };

  return (
    <div className={cn("border-2 border-neo-black neo-shadow mb-4 overflow-hidden", bgColors[color])}>
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-bold font-display text-lg focus:outline-none"
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-6 h-6 border-2 border-neo-black rounded-full p-0.5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 border-t-2 border-neo-black border-dashed pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
