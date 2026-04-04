import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&h=350&q=80',
    alt: 'Mega Sale',
    badge: 'Live Now',
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 60% OFF on top brands',
    cta: 'Shop Now',
    color: 'from-blue-900/90'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&h=350&q=80',
    alt: 'Tech Gadgets',
    badge: 'Upcoming Sale',
    title: 'Big Billion Days',
    subtitle: 'Starts Oct 10. Wishlist your favorites now!',
    cta: 'Explore Deals',
    color: 'from-purple-900/90'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&h=350&q=80',
    alt: 'Accessories',
    badge: 'Limited Time',
    title: 'Premium Accessories',
    subtitle: 'Flat 50% OFF on Smartwatches & Audio',
    cta: 'Grab Offer',
    color: 'from-gray-900/90'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=1200&h=350&q=80',
    alt: 'Apparel & Fashion',
    badge: 'New Arrivals',
    title: 'Festive Wardrobe Refresh',
    subtitle: 'Min 40% OFF + Extra 10% on Cards',
    cta: 'View Collection',
    color: 'from-orange-900/90'
  }
];

export function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] bg-gray-200 rounded-sm overflow-hidden group shadow-sm">
      {/* Sliding Images Container */}
      <motion.div 
        className="flex w-full h-full"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
      >
        {BANNERS.map((banner) => (
          <div key={banner.id} className="relative w-full h-full flex-shrink-0">
            <img 
              src={banner.image}
              alt={banner.alt}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} to-transparent via-black/60 sm:via-black/40`} />
            
            {/* Banner Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 text-white max-w-2xl">
              <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-[#FFE500] text-gray-900 text-[10px] sm:text-xs font-bold rounded-sm uppercase tracking-wider mb-2 sm:mb-4 w-max shadow-sm">
                {banner.badge}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-3 leading-tight drop-shadow-lg">
                {banner.title}
              </h2>
              <p className="text-xs sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-8 drop-shadow-md font-medium max-w-md">
                {banner.subtitle}
              </p>
              <button className="bg-white text-gray-900 font-bold text-sm sm:text-base px-4 py-2 sm:px-8 sm:py-3 rounded-sm w-max hover:bg-gray-100 transition-colors shadow-lg cursor-pointer">
                {banner.cta}
              </button>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer shadow-sm ${
              idx === currentIndex ? 'w-4 sm:w-6 bg-white' : 'w-1.5 sm:w-2 bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
