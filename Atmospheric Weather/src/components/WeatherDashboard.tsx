import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weatherData } from '../data/weatherData';
import { WeatherCard } from './WeatherCard';
import { Wind, Droplets, Thermometer, Calendar, Sun, CloudRain, Cloud, Search } from 'lucide-react';

const MetricCard = ({ icon, label, value, delay }: { icon: any, label: string, value: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
  >
    <div className="p-2 bg-white/10 rounded-full text-white">
      {icon}
    </div>
    <div>
      <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-white font-semibold text-lg">{value}</p>
    </div>
  </motion.div>
);

export const WeatherDashboard: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState(weatherData[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedCity = weatherData.find((c) => c.id === selectedCityId) || weatherData[0];

  const filteredCities = weatherData.filter(city => 
    city.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${selectedCity.theme.from} ${selectedCity.theme.to} transition-colors duration-1000 ease-in-out p-4 md:p-8 lg:p-12 flex items-center justify-center font-sans`}>
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: City Selection */}
        <div className="lg:col-span-4 flex flex-col gap-4 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <h1 className="text-4xl font-light text-white tracking-tight">Weather<span className="font-bold">Now</span></h1>
            <p className="text-white/50 text-sm mt-1">Select a location to view details</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-2"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
            />
          </motion.div>
          
          <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <WeatherCard
                  key={city.id}
                  data={city}
                  isSelected={selectedCityId === city.id}
                  onClick={() => setSelectedCityId(city.id)}
                />
              ))
            ) : (
              <div className="text-white/40 text-center py-8">
                No cities found
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Detailed View */}
        <div className="lg:col-span-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCity.id}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="h-full w-full rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl p-8 md:p-12 flex flex-col justify-between overflow-hidden relative min-h-[600px]"
            >
              {/* Decorative Background Elements */}
              <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br ${selectedCity.theme.from} to-transparent opacity-30 blur-3xl pointer-events-none`} />
              <div className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr ${selectedCity.theme.accent.replace('text-', 'bg-')} to-transparent opacity-10 blur-3xl pointer-events-none`} />

              {/* Header */}
              <div className="flex justify-between items-start z-10">
                <div className="flex-1 min-w-0 pr-4">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 text-white/60 text-sm font-medium uppercase tracking-wider"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                  </motion.div>
                  
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-4xl md:text-6xl font-bold text-white mt-4 break-words leading-tight"
                  >
                    {selectedCity.city}
                  </motion.h1>

                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold text-white mt-2 tracking-tighter"
                  >
                    {selectedCity.temp}°
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`text-xl font-medium ${selectedCity.theme.accent} mt-2`}
                  >
                    {selectedCity.condition}
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="hidden md:block shrink-0"
                >
                  {/* Large Icon Representation */}
                  {selectedCity.condition === 'Sunny' && <Sun className="w-32 h-32 text-orange-400 drop-shadow-[0_0_30px_rgba(251,146,60,0.6)]" />}
                  {selectedCity.condition === 'Rainy' && <CloudRain className="w-32 h-32 text-blue-400 drop-shadow-[0_0_30px_rgba(96,165,250,0.6)]" />}
                  {selectedCity.condition === 'Cloudy' && <Cloud className="w-32 h-32 text-gray-300 drop-shadow-[0_0_30px_rgba(209,213,219,0.4)]" />}
                </motion.div>
              </div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/80 text-lg leading-relaxed max-w-lg z-10 mt-8"
              >
                {selectedCity.description}
              </motion.p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 z-10">
                <MetricCard 
                  icon={<Wind className="w-5 h-5" />} 
                  label="Wind Speed" 
                  value={`${selectedCity.windSpeed} km/h`} 
                  delay={0.5} 
                />
                <MetricCard 
                  icon={<Droplets className="w-5 h-5" />} 
                  label="Humidity" 
                  value={`${selectedCity.humidity}%`} 
                  delay={0.6} 
                />
                <MetricCard 
                  icon={<Thermometer className="w-5 h-5" />} 
                  label="High / Low" 
                  value={`${selectedCity.high}° / ${selectedCity.low}°`} 
                  delay={0.7} 
                />
              </div>

              {/* Forecast Mini-Row */}
              <div className="mt-8 pt-8 border-t border-white/10 z-10">
                 <h4 className="text-white/50 text-sm uppercase tracking-widest mb-4">3-Day Forecast</h4>
                 <div className="flex justify-between md:justify-start md:gap-12">
                    {selectedCity.forecast.map((day, idx) => (
                      <motion.div 
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + (idx * 0.1) }}
                        className="flex flex-col items-center gap-2"
                      >
                        <span className="text-white/60 text-sm">{day.day}</span>
                        <day.icon className="w-6 h-6 text-white" />
                        <span className="text-white font-medium">{day.temp}°</span>
                      </motion.div>
                    ))}
                 </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
