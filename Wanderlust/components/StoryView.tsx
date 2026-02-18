import React from 'react';
import { Trip } from '../types';
import { ArrowLeft, MapPin, Calendar, Camera } from 'lucide-react';
import ChatInterface from './ChatInterface';

interface StoryViewProps {
  trip: Trip;
  onBack: () => void;
}

const StoryView: React.FC<StoryViewProps> = ({ trip, onBack }) => {
  // Logic for loading story dynamically is removed. 
  // We now rely on trip.fullStory being present in the data passed from App.tsx.

  const storyContent = trip.fullStory || "Story content is currently unavailable.";

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Stories
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Image */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
               <img 
                 src={`https://picsum.photos/seed/${trip.imageSeed}/1200/800`} 
                 alt={trip.title}
                 className="w-full h-full object-cover" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-8">
                 <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                   {trip.title}
                 </h1>
                 <div className="flex flex-wrap gap-4 text-sm font-medium text-cyan-300">
                    <span className="flex items-center bg-slate-900/50 backdrop-blur px-3 py-1 rounded-full">
                        <MapPin className="w-4 h-4 mr-1" /> {trip.location}
                    </span>
                    <span className="flex items-center bg-slate-900/50 backdrop-blur px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4 mr-1" /> {trip.date}
                    </span>
                 </div>
               </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-inner">
                <div className="space-y-6 text-slate-300 leading-relaxed font-light">
                    {storyContent.split('\n').map((paragraph, idx) => (
                        paragraph.trim() && <p key={idx}>{paragraph}</p>
                    ))}
                </div>
              </div>
            </div>

            {/* Highlights Gallery (Static for now, simulates photo dump) */}
            <div>
                <h3 className="text-2xl font-serif text-white mb-6 flex items-center">
                    <Camera className="w-6 h-6 mr-2 text-purple-400" />
                    Trip Highlights
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trip.highlights.map((highlight, index) => (
                        <div key={index} className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer">
                            <img 
                                src={`https://picsum.photos/seed/${trip.imageSeed}${index}/400/400`} 
                                alt={highlight}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center p-2">
                                <span className="text-white text-sm font-medium">{highlight}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-8">
                {/* Chat Interface */}
                <ChatInterface trip={trip} />

                {/* Info Card */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Trip Stats</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex justify-between border-b border-slate-700 pb-2">
                            <span>Duration</span>
                            <span className="text-slate-200">7 Days</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-700 pb-2">
                            <span>Travel Style</span>
                            <span className="text-slate-200">Solo Adventure</span>
                        </li>
                         <li className="flex justify-between pb-2">
                            <span>Camera</span>
                            <span className="text-slate-200">Sony A7III</span>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryView;