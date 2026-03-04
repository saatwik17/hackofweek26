import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'white' | 'yellow' | 'blue' | 'pink' | 'green' | 'purple';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, color = 'white', children, ...props }, ref) => {
    const bgColors = {
      white: "bg-white",
      yellow: "bg-neo-yellow",
      blue: "bg-neo-blue",
      pink: "bg-neo-pink",
      green: "bg-neo-green",
      purple: "bg-neo-purple",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border-2 border-neo-black neo-shadow p-6",
          bgColors[color],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
