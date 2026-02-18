import React from 'react';
import ThreeDTiltCard from './ThreeDTiltCard';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient orb */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-950 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400 drop-shadow-lg">
            Incredible India <br /> 
          </h1>
          <p className="text-lg text-slate-400 max-w-lg">
            Journey through the mystic ghats, soaring mountains, and tranquil backwaters. Experience India's stories that pop off the screen through an immersive 3D lens.
          </p>
          <button 
            onClick={onStart}
            className="group relative px-8 py-3 bg-orange-500 hover:bg-orange-400 text-slate-900 font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
          >
            Start Exploring
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
          </button>
        </div>

        <div className="hidden lg:block">
           <ThreeDTiltCard className="w-full max-w-md mx-auto aspect-[3/4]">
              <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl border border-slate-700 bg-slate-800">
                <img 
                  src="https://picsum.photos/seed/india_taj/800/1000" 
                  alt="Hero Travel" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-2">Featured Destination</div>
                  <h3 className="text-3xl font-serif text-white">The Golden Triangle</h3>
                </div>
              </div>
           </ThreeDTiltCard>
        </div>
      </div>
    </div>
  );
};

export default Hero;