import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { photos, Photo } from "./data/photos";
import Lightbox from "./components/Lightbox";
import UploadModal from "./components/UploadModal";
import { Camera, Instagram, Mail, ArrowDown, Plus, Trash2, Lock, Unlock } from "lucide-react";

export default function App() {
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>(photos);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const selectedPhoto = galleryPhotos.find((p) => p.id === selectedPhotoId);

  const handleNext = () => {
    if (selectedPhotoId === null) return;
    const currentIndex = galleryPhotos.findIndex((p) => p.id === selectedPhotoId);
    const nextIndex = (currentIndex + 1) % galleryPhotos.length;
    setSelectedPhotoId(galleryPhotos[nextIndex].id);
  };

  const handlePrev = () => {
    if (selectedPhotoId === null) return;
    const currentIndex = galleryPhotos.findIndex((p) => p.id === selectedPhotoId);
    const prevIndex = (currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    setSelectedPhotoId(galleryPhotos[prevIndex].id);
  };

  const handleUpload = (newPhoto: Photo) => {
    setGalleryPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
      if (selectedPhotoId === id) setSelectedPhotoId(null);
    }
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      const password = window.prompt("Enter admin password:");
      if (password === "admin") {
        setIsAdmin(true);
      } else if (password !== null) {
        alert("Incorrect password");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 relative">
      {/* Header / Hero */}
      <header className="relative h-[60vh] flex flex-col items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center px-4"
        >
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-white/60 uppercase mb-4">
            Photography Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
            Lumina Gallery
          </h1>
          <p className="font-serif italic text-white/40 text-lg md:text-xl max-w-md mx-auto">
            Capturing the silence between moments.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ArrowDown size={24} strokeWidth={1} className="animate-bounce" />
        </motion.div>
      </header>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layoutId={`photo-${photo.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer relative"
              onClick={() => setSelectedPhotoId(photo.id)}
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-white/5">
                <motion.img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Overlay Info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-white mb-2">View</p>
                  <div className="w-8 h-[1px] bg-white/50" />
                </div>

                {/* Delete Button (Admin Only) */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(photo.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                    title="Delete Photo"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              <div className="mt-4 flex justify-between items-baseline opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-serif text-lg font-light">{photo.title}</h3>
                <span className="font-sans text-[10px] tracking-widest uppercase">{photo.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-white/5 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-8">The Artist</h2>
          <div className="w-24 h-[1px] bg-white/20 mx-auto mb-8" />
          <p className="font-serif text-lg md:text-xl text-white/70 leading-relaxed mb-12">
            "I believe that photography is not just about capturing a moment, but about preserving the feeling of that moment. 
            Through my lens, I explore the silent conversations between light and shadow, seeking beauty in the overlooked and the ordinary."
          </p>
          <button className="px-8 py-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs tracking-[0.2em]">
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 text-center relative">
        <div className="flex justify-center gap-8 mb-8">
          <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group">
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group">
            <Camera size={20} strokeWidth={1.5} />
          </a>
          <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group">
            <Mail size={20} strokeWidth={1.5} />
          </a>
        </div>
        <p className="font-sans text-xs text-white/30 tracking-widest uppercase mb-8">
          © {new Date().getFullYear()} Lumina Gallery. All rights reserved.
        </p>
        
        {/* Admin Toggle */}
        <button 
          onClick={handleAdminToggle}
          className="text-white/10 hover:text-white/30 transition-colors text-[10px] uppercase tracking-widest flex items-center gap-2 mx-auto"
        >
          {isAdmin ? <Unlock size={12} /> : <Lock size={12} />}
          {isAdmin ? "Admin Mode Active" : "Admin Access"}
        </button>
      </footer>

      {/* Floating Upload Button (Admin Only) */}
      <AnimatePresence>
        {isAdmin && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsUploadModalOpen(true)}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-200 transition-colors"
          >
            <Plus size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <UploadModal
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleUpload}
            nextId={Math.max(...galleryPhotos.map(p => p.id)) + 1}
          />
        )}
      </AnimatePresence>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox
            photo={selectedPhoto}
            onClose={() => setSelectedPhotoId(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
