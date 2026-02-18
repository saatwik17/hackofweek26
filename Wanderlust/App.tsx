import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StoryList from './components/StoryList';
import StoryView from './components/StoryView';
import { Trip } from './types';

// Hardcoded Data for the 3 Stories (Indian Theme)
const TRIPS: Trip[] = [
  {
    id: '1',
    title: 'Spirituality on the Ganges',
    location: 'Varanasi, India',
    date: 'March 2024',
    imageSeed: 'varanasi_ghats',
    summary: 'Witnessing the eternal cycle of life and death along the sacred ghats of one of the world\'s oldest living cities.',
    highlights: ['Evening Ganga Aarti', 'Sunrise Boat Ride', 'Kashi Vishwanath Temple', 'Blue Lassi Shop'],
    fullStory: `The air in Varanasi is thick with incense and the smoke of eternity. Arriving at the Dashashwamedh Ghat just as the sun began to dip below the horizon, I felt an overwhelming sense of ancient continuity. The Ganga Aarti began, a symphony of bells, chanting, and fire that seemed to synchronize with the heartbeat of the river itself.

Taking a boat out at sunrise was a contrast of serene silence. The water turned a soft pink, reflecting the waking city. I watched pilgrims bathe, washing away sins in the frigid waters, their devotion palpable.

Walking the narrow alleyways (galis) is a sensory overload. I dodged bulls, motorbikes, and sadhus to find the famous Blue Lassi shop. The lassi, topped with rabri and pomegranate seeds, was a creamy respite from the heat.

Visiting the Kashi Vishwanath Temple required patience, but the energy inside was electric. Varanasi isn't just a city; it's a portal between worlds, where life and death dance openly on the steps of the river.`
  },
  {
    id: '2',
    title: 'The Land of High Passes',
    location: 'Ladakh, India',
    date: 'August 2023',
    imageSeed: 'ladakh_mountains',
    summary: 'A high-altitude adventure through moonscapes, turquoise lakes, and ancient monasteries in the Himalayas.',
    highlights: ['Pangong Tso Lake', 'Nubra Valley via Khardung La', 'Thiksey Monastery', 'Biking in the Himalayas'],
    fullStory: `Ladakh feels like another planet. Landing in Leh, the thin air hits you immediately, a reminder of the altitude. My journey to Pangong Tso Lake was a test of endurance and awe. The Chang La pass, snow-capped and windy, gave way to a sudden view of blue so intense it looked painted. The lake stretches endlessly, changing colors from azure to indigo as the clouds move.

Driving through the Nubra Valley, I crossed Khardung La, one of the world's highest motorable roads. The landscape shifted to silver sand dunes where double-humped Bactrian camels roamed—a surreal sight in the Himalayas.

At Thiksey Monastery, I woke up early for the morning prayers. The deep throat-singing of the monks resonated through the wooden halls, vibrating in my chest. Ladakh strips away the unnecessary, leaving you with just the raw scale of nature and a profound silence.`
  },
  {
    id: '3',
    title: 'Serenity in the Backwaters',
    location: 'Kerala, India',
    date: 'January 2024',
    imageSeed: 'kerala_boat',
    summary: 'Drifting through palm-fringed canals on a traditional houseboat and exploring the misty tea gardens of Munnar.',
    highlights: ['Alleppey Houseboat', 'Munnar Tea Estates', 'Kathakali Dance', 'Traditional Sadhya Meal'],
    fullStory: `Kerala slows time down. Boarding a traditional houseboat in Alleppey, the chaos of the mainland faded instantly. We drifted through a labyrinth of canals, lined with swaying coconut palms and small villages where life revolves around the water. I watched kingfishers dive for lunch and locals paddling their canoes with effortless grace.

The food was a revelation. I sat down for a traditional Sadhya meal served on a banana leaf—a kaleidoscope of curries, pickles, and rice, ending with sweet payasam. The burst of spices—cardamom, pepper, cloves—reminded me I was in the land of spices.

Later, in the misty hills of Munnar, the heat replaced by a cool breeze. Endless carpets of tea plantations rolled over the hills. I watched a Kathakali performance that evening, the dancers' eyes telling stories of gods and demons without a single word spoken. Kerala truly is God's Own Country.`
  },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page !== 'story-view') {
      setSelectedTrip(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    handleNavigate('story-view');
  };

  const renderContent = () => {
    if (currentPage === 'home') {
      return (
        <>
          <Hero onStart={() => handleNavigate('stories')} />
          <div id="latest-stories">
             <StoryList trips={TRIPS} onSelectTrip={handleSelectTrip} />
          </div>
        </>
      );
    }
    
    if (currentPage === 'stories') {
      return <StoryList trips={TRIPS} onSelectTrip={handleSelectTrip} />;
    }

    if (currentPage === 'story-view' && selectedTrip) {
      return <StoryView trip={selectedTrip} onBack={() => handleNavigate('stories')} />;
    }

    if (currentPage === 'about') {
        return (
            <div className="min-h-screen pt-24 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-serif text-white mb-6">About the Wanderer</h2>
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Namaste! Welcome to my digital journal. I'm a passionate traveler obsessed with capturing the vibrant colors and diverse landscapes of India in 3 dimensions. 
                        This blog is an experiment in storytelling, combining my love for photography with immersive web technologies.
                        <br/><br/>
                        All stories here are enhanced with AI to help you dive deeper. Feel free to chat with the "Traveller Bot" on any story page to learn more about the logistics of my trips!
                    </p>
                </div>
            </div>
        )
    }

    return <Hero onStart={() => handleNavigate('stories')} />;
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500 selection:text-white">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Wanderlust 3D Blog. Built with React & Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;