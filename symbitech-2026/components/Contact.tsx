import React from 'react';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen py-24 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-4">
            GET IN <span className="text-neon-blue">TOUCH</span>
          </h2>
          <div className="h-1 w-24 bg-neon-blue mx-auto rounded-full shadow-[0_0_10px_#00f3ff]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Details Card */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-neon-blue/50 transition-colors duration-300">
            <h3 className="font-orbitron text-2xl text-white mb-6">Contact Info</h3>
            
            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="p-4 bg-black/30 rounded-full mr-4 group-hover:bg-neon-blue/20 transition-colors">
                  <Mail className="h-6 w-6 text-neon-purple group-hover:text-neon-blue transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-inter uppercase tracking-wider">Email Us</p>
                  <p className="text-white font-medium">contact@symbitech2026.edu</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="p-4 bg-black/30 rounded-full mr-4 group-hover:bg-neon-blue/20 transition-colors">
                  <Phone className="h-6 w-6 text-neon-purple group-hover:text-neon-blue transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-inter uppercase tracking-wider">Call Us</p>
                  <p className="text-white font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="p-4 bg-black/30 rounded-full mr-4 group-hover:bg-neon-blue/20 transition-colors">
                  <MapPin className="h-6 w-6 text-neon-purple group-hover:text-neon-blue transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-inter uppercase tracking-wider">Visit Us</p>
                  <p className="text-white font-medium">Symbiosis Campus, Tech Lane, Pune</p>
                </div>
              </div>
            </div>
          </div>

          {/* Socials & Map Placeholder */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-neon-purple/50 transition-colors duration-300 flex-grow">
               <h3 className="font-orbitron text-2xl text-white mb-6">Social Connect</h3>
               <p className="text-gray-400 font-inter mb-6">Follow us for real-time updates and behind-the-scenes content.</p>
               
               <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-black/30 rounded-full hover:bg-neon-blue hover:text-black transition-all duration-300 group">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="p-3 bg-black/30 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 group">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="p-3 bg-black/30 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="p-3 bg-black/30 rounded-full hover:bg-gray-200 hover:text-black transition-all duration-300 group">
                    <Github className="h-6 w-6" />
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;