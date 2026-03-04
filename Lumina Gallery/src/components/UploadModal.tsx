import { useState, useRef } from "react";
import { motion } from "motion/react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Photo } from "../data/photos";

interface UploadModalProps {
  onClose: () => void;
  onUpload: (photo: Photo) => void;
  nextId: number;
}

export default function UploadModal({ onClose, onUpload, nextId }: UploadModalProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>("portrait");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Determine aspect ratio
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        if (ratio > 1.2) setAspectRatio("landscape");
        else if (ratio < 0.8) setAspectRatio("portrait");
        else setAspectRatio("square");
      };
      img.src = url;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) return;

    const newPhoto: Photo = {
      id: nextId,
      url: previewUrl,
      title: title || "Untitled",
      location: location || "Unknown Location",
      aspectRatio: aspectRatio,
    };

    onUpload(newPhoto);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#111] border border-white/10 p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="font-serif text-2xl text-white mb-6">Add New Photo</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div 
            className={`relative border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer hover:border-white/30 ${previewUrl ? 'h-64' : 'h-48'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-contain p-2 rounded-xl" 
              />
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 text-white/50">
                  <Upload size={24} />
                </div>
                <p className="text-sm text-white/50 font-sans">Click to upload image</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-sans">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Morning Light"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-serif"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-sans">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kyoto, Japan"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-serif"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!previewUrl}
            className="w-full py-4 bg-white text-black font-medium tracking-wide uppercase text-xs rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Add to Gallery
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
