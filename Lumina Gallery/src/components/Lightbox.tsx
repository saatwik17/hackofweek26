import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Photo } from "../data/photos";

interface LightboxProps {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ photo, onClose, onNext, onPrev }: LightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-50"
      >
        <X size={32} strokeWidth={1} />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 md:left-8 p-4 text-white/50 hover:text-white transition-colors z-50 hidden md:block"
      >
        <ChevronLeft size={48} strokeWidth={0.5} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 p-4 text-white/50 hover:text-white transition-colors z-50 hidden md:block"
      >
        <ChevronRight size={48} strokeWidth={0.5} />
      </button>

      {/* Image Container */}
      <motion.div
        layoutId={`photo-${photo.id}`}
        className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={photo.id}
          src={photo.url}
          alt={photo.title}
          className="max-w-full max-h-[80vh] object-contain shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        />
        
        <motion.div 
          key={`text-${photo.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-white font-light tracking-wide">{photo.title}</h2>
          <p className="font-sans text-xs md:text-sm text-white/60 uppercase tracking-widest mt-2">{photo.location}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
