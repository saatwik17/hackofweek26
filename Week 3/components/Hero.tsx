import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/20 rounded-full blur-[100px] -z-10"></div>

      {/* Relative container ensures content is above the background canvas */}
      <div className="relative space-y-6 max-w-4xl z-10">
        <div className="inline-block px-4 py-1 border border-neon-blue/50 rounded-full bg-neon-blue/10 backdrop-blur-sm mb-4">
          <span className="text-neon-blue font-orbitron text-sm tracking-widest">
            OCTOBER 24-26, 2026
          </span>
        </div>
        
        <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-blue to-neon-purple tracking-tighter drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
          SYMBITECH <br /> 2026
        </h1>
        
        <p className="font-inter text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
          Where <span className="text-neon-green">Innovation</span> meets <span className="text-neon-purple">Adrenaline</span>. 
          Join the ultimate convergence of code, creativity, and competition.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <a
            href="#register"
            onClick={(e) => scrollToSection(e, '#register')}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none border border-neon-blue text-white font-orbitron font-bold tracking-wider hover:text-black transition-colors duration-300 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-neon-blue/0 group-hover:bg-neon-blue transition-all duration-300 ease-out"></span>
            <span className="relative z-10 flex items-center">
              REGISTER NOW
            </span>
            {/* Corner Accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-blue"></span>
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-blue"></span>
          </a>
          
          <a
            href="#highlights"
            onClick={(e) => scrollToSection(e, '#highlights')}
            className="px-8 py-4 text-gray-300 font-inter hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer"
          >
            EXPLORE EVENTS
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <a 
          href="#highlights" 
          onClick={(e) => scrollToSection(e, '#highlights')}
          className="text-neon-blue hover:text-white transition-colors cursor-pointer"
        >
          <ChevronDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;