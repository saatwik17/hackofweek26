import React from 'react';
import { Code, Cpu, Palette, Brain, Trophy } from 'lucide-react';
import { TechEvent } from '../types';

const highlights = [
  {
    icon: <Code className="h-10 w-10 text-neon-blue" />,
    title: TechEvent.CODING,
    desc: "Solve complex algorithms and optimize solutions in a high-pressure environment.",
    color: "border-neon-blue"
  },
  {
    icon: <Cpu className="h-10 w-10 text-neon-green" />,
    title: TechEvent.ROBO,
    desc: "Design autonomous bots to navigate obstacle courses at breakneck speeds.",
    color: "border-neon-green"
  },
  {
    icon: <Palette className="h-10 w-10 text-neon-purple" />,
    title: TechEvent.UI,
    desc: "Create intuitive and stunning interfaces that define the future of user experience.",
    color: "border-neon-purple"
  },
  {
    icon: <Brain className="h-10 w-10 text-pink-500" />,
    title: TechEvent.QUIZ,
    desc: "Test your tech trivia knowledge against the brightest minds.",
    color: "border-pink-500"
  },
  {
    icon: <Trophy className="h-10 w-10 text-yellow-400" />,
    title: TechEvent.HACKATHON,
    desc: "24 hours to build a working prototype that solves a real-world problem.",
    color: "border-yellow-400"
  },
];

const Highlights: React.FC = () => {
  return (
    <section id="highlights" className="min-h-screen py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-4">
          EVENT <span className="text-neon-blue">HIGHLIGHTS</span>
        </h2>
        <div className="h-1 w-24 bg-neon-blue mx-auto rounded-full shadow-[0_0_10px_#00f3ff]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {highlights.map((item, index) => (
          <div
            key={index}
            className={`group relative p-8 bg-white/5 backdrop-blur-sm border ${item.color}/30 hover:${item.color} transition-all duration-300 rounded-xl overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-start">
              <div className="mb-6 p-3 bg-white/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
                {item.title}
              </h3>
              <p className="font-inter text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;