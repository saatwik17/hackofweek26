import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-bold border-2 border-neo-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neo-black focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-neo-yellow text-neo-black neo-shadow neo-shadow-hover neo-shadow-active",
      secondary: "bg-neo-blue text-neo-black neo-shadow neo-shadow-hover neo-shadow-active",
      outline: "bg-white text-neo-black neo-shadow neo-shadow-hover neo-shadow-active",
      ghost: "bg-transparent border-transparent hover:bg-neo-black/5 text-neo-black",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
