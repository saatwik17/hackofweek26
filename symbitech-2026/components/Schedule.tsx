import React from 'react';
import { ScheduleItem } from '../types';

const scheduleData: ScheduleItem[] = [
  { time: '09:00 AM', event: 'Opening Ceremony', location: 'Main Auditorium', description: 'Kickoff with keynote speakers from top tech firms.' },
  { time: '11:00 AM', event: 'Hackathon Begins', location: 'Innovation Hub', description: '24-hour coding marathon starts.' },
  { time: '02:00 PM', event: 'Robo Race Qualifiers', location: 'Arena B', description: 'Round 1 of the autonomous bot race.' },
  { time: '04:00 PM', event: 'Tech Quiz', location: 'Lecture Hall 1', description: 'Elimination round for the quiz participants.' },
  { time: '10:00 AM (Day 2)', event: 'UI/UX Showdown', location: 'Design Lab', description: 'Live design challenge.' },
];

const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="min-h-screen py-24 bg-black/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-4">
            EVENT <span className="text-neon-purple">SCHEDULE</span>
          </h2>
          <div className="h-1 w-24 bg-neon-purple mx-auto rounded-full shadow-[0_0_10px_#bc13fe]"></div>
        </div>

        <div className="relative border-l-2 border-neon-purple/30 ml-3 md:ml-6 space-y-12">
          {scheduleData.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-black border-2 border-neon-purple shadow-[0_0_8px_#bc13fe]"></div>
              
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 group">
                <div className="md:w-32 flex-shrink-0">
                  <span className="font-orbitron text-neon-purple font-bold text-lg">
                    {item.time}
                  </span>
                </div>
                
                <div className="flex-grow p-6 bg-white/5 border border-white/10 rounded-lg group-hover:border-neon-purple/50 transition-colors duration-300">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-1">
                    {item.event}
                  </h3>
                  <div className="text-sm font-inter text-neon-blue mb-2 uppercase tracking-wider">
                    {item.location}
                  </div>
                  <p className="font-inter text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;