import React from 'react';
import { motion } from 'motion/react';
import { WeatherData } from '../data/weatherData';
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
  isSelected: boolean;
  onClick: () => void;
}

const WeatherIcon = ({ condition, className }: { condition: string; className?: string }) => {
  if (condition === 'Sunny') return <Sun className={className} />;
  if (condition === 'Rainy') return <CloudRain className={className} />;
  return <Cloud className={className} />;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, isSelected, onClick }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-3xl p-6 transition-all duration-500 shrink-0 ${
        isSelected 
          ? 'bg-white/10 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl' 
          : 'bg-white/5 hover:bg-white/10 hover:shadow-lg backdrop-blur-md'
      }`}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <motion.h3 className="text-lg font-medium text-white/80">{data.country}</motion.h3>
          <motion.h2 className="text-2xl md:text-3xl font-bold text-white break-words leading-tight">{data.city}</motion.h2>
        </div>
        <WeatherIcon condition={data.condition} className={`h-10 w-10 shrink-0 ${data.theme.accent}`} />
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-white/60">{data.condition}</span>
          <span className="text-4xl font-light text-white">{data.temp}°</span>
        </div>
        
        {isSelected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
             <div className="flex flex-col items-center rounded-lg bg-white/5 p-2">
                <Wind className="h-4 w-4 text-white/70" />
                <span className="text-xs text-white/70">{data.windSpeed}km/h</span>
             </div>
             <div className="flex flex-col items-center rounded-lg bg-white/5 p-2">
                <Droplets className="h-4 w-4 text-white/70" />
                <span className="text-xs text-white/70">{data.humidity}%</span>
             </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
