import React, { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Product } from '../lib/LinkedList';
import { ArrowDownToLine, ArrowUpToLine, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddHead: (product: Product) => void;
  onAddTail: (product: Product) => void;
}

export function ProductCard({ product, onAddHead, onAddTail }: ProductCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Subtle rotation for a premium 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Dynamic glare effect based on mouse position
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.15]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, 0]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, 0]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 50%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-xl bg-white border border-gray-200 p-4 flex flex-col gap-4 shadow-sm hover:shadow-2xl transition-shadow duration-300 group"
    >
      {/* Glare Overlay */}
      <motion.div 
        className="absolute inset-0 z-50 pointer-events-none rounded-xl mix-blend-overlay transition-opacity duration-300"
        style={{
          background: glareBackground,
          opacity: glareOpacity,
        }}
      />

      <div
        style={{ transform: "translateZ(40px)" }}
        className="relative h-56 w-full overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          {product.category}
        </div>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col gap-1 z-10">
        <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-snug">{product.name}</h3>
        
        {/* Fake Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-[#FFA41C]">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" className="opacity-50" />
          </div>
          <span className="text-xs text-blue-600 hover:text-orange-500 cursor-pointer hover:underline">
            {Math.floor(Math.random() * 5000) + 100}
          </span>
        </div>

        <p className="text-2xl font-semibold text-gray-900 mt-2">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
        </p>
        <p className="text-xs text-gray-500">Free Delivery</p>
      </div>

      <div style={{ transform: "translateZ(50px)" }} className="mt-auto flex gap-2 z-10 pt-2">
        <button
          onClick={() => onAddHead(product)}
          className="flex-1 flex items-center justify-center gap-1 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-gray-900 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer shadow-sm"
          title="Add to Head of List"
        >
          <ArrowUpToLine size={16} />
          Head
        </button>
        <button
          onClick={() => onAddTail(product)}
          className="flex-1 flex items-center justify-center gap-1 bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] text-gray-900 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer shadow-sm"
          title="Add to Tail of List"
        >
          <ArrowDownToLine size={16} />
          Tail
        </button>
      </div>
    </motion.div>
  );
}
