import React, { useEffect } from 'react';
import { CheckCircle, Calendar, MapPin, Share2 } from 'lucide-react';

const Confirmation: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-xl border border-neon-green/30 rounded-2xl p-8 text-center relative overflow-hidden">
        
        {/* Success Animation Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple animate-pulse"></div>
        
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-green/30 rounded-full blur-xl animate-pulse"></div>
            <CheckCircle className="h-20 w-20 text-neon-green relative z-10" />
          </div>
        </div>

        <h2 className="font-orbitron text-3xl font-bold text-white mb-2">
          YOU'RE IN!
        </h2>
        <p className="font-inter text-gray-300 mb-8">
          Registration successful. Welcome to the future of technology.
        </p>

        <div className="bg-black/30 rounded-lg p-6 mb-8 text-left space-y-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-neon-blue mr-3 mt-0.5" />
            <div>
              <p className="text-white font-semibold text-sm">October 24-26, 2026</p>
              <p className="text-gray-400 text-xs">Add to Calendar</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-neon-purple mr-3 mt-0.5" />
            <div>
              <p className="text-white font-semibold text-sm">Symbiosis Tech Campus</p>
              <p className="text-gray-400 text-xs">Pune, India</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          A confirmation email with your QR ticket has been sent to your registered email address.
        </p>

        <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-white text-black font-orbitron font-bold rounded hover:bg-neon-blue transition-colors duration-300"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
