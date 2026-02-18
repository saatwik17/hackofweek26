import React from 'react';
import ThreeDTiltCard from './ThreeDTiltCard';
import { Trip } from '../types';
import { ArrowRight } from 'lucide-react';

interface StoryListProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
}

const StoryList: React.FC<StoryListProps> = ({ trips, onSelectTrip }) => {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100">Featured Journals</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Three unique destinations. Three unforgettable experiences. Click a card to dive into the journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <ThreeDTiltCard key={trip.id} onClick={() => onSelectTrip(trip)}>
            <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 group">
              {/* Image Layer */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={`https://picsum.photos/seed/${trip.imageSeed}/600/800`} 
                  alt={trip.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              </div>

              {/* Content Layer with Depth */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-10 transform transition-transform duration-300 translate-z-10">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
                  <span>{trip.location}</span>
                  <span>•</span>
                  <span>{trip.date}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3 shadow-black drop-shadow-md">
                  {trip.title}
                </h3>
                <p className="text-slate-300 text-sm line-clamp-2 mb-4">
                  {trip.summary}
                </p>
                <div className="flex items-center text-cyan-300 text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Read Story <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </ThreeDTiltCard>
        ))}
      </div>
    </div>
  );
};

export default StoryList;