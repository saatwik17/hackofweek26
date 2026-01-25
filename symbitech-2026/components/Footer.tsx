import React from 'react';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black/80 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-orbitron text-2xl font-bold text-white">
              SYMBI<span className="text-neon-blue">TECH</span> 2026
            </h3>
            <p className="font-inter text-gray-400 text-sm leading-relaxed">
              The premier college technology festival celebrating innovation, code, and creativity. Join us to shape the future.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-orbitron text-lg text-white mb-2">CONTACT US</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400 group">
                <Mail className="h-5 w-5 mr-3 text-neon-purple group-hover:text-neon-blue transition-colors" />
                <span className="text-sm">contact@symbitech2026.edu</span>
              </div>
              <div className="flex items-center text-gray-400 group">
                <Phone className="h-5 w-5 mr-3 text-neon-purple group-hover:text-neon-blue transition-colors" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-400 group">
                <MapPin className="h-5 w-5 mr-3 text-neon-purple group-hover:text-neon-blue transition-colors" />
                <span className="text-sm">Symbiosis Campus, Tech Lane, Pune</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-orbitron text-lg text-white mb-2">FOLLOW US</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-neon-blue hover:text-black transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gray-200 hover:text-black transition-all duration-300">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-inter text-xs text-gray-600">
            &copy; 2026 SymbiTech. All rights reserved. Designed for the Future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
