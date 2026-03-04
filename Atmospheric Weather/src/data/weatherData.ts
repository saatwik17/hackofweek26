import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from 'lucide-react';

export interface WeatherData {
  id: string;
  city: string;
  country: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  description: string;
  forecast: { day: string; temp: number; icon: any }[];
  theme: {
    from: string;
    to: string;
    accent: string;
  };
}

export const weatherData: WeatherData[] = [
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    temp: 18,
    condition: 'Rainy',
    high: 20,
    low: 15,
    humidity: 82,
    windSpeed: 12,
    description: 'Light rain throughout the day with moderate breeze.',
    forecast: [
      { day: 'Mon', temp: 19, icon: CloudRain },
      { day: 'Tue', temp: 21, icon: Cloud },
      { day: 'Wed', temp: 22, icon: Sun },
    ],
    theme: {
      from: 'from-slate-900',
      to: 'to-slate-800',
      accent: 'text-blue-400',
    },
  },
  {
    id: 'ny',
    city: 'New York',
    country: 'USA',
    temp: 24,
    condition: 'Sunny',
    high: 26,
    low: 18,
    humidity: 45,
    windSpeed: 15,
    description: 'Clear skies and sunny. Perfect weather for a walk in the park.',
    forecast: [
      { day: 'Mon', temp: 25, icon: Sun },
      { day: 'Tue', temp: 23, icon: Cloud },
      { day: 'Wed', temp: 20, icon: CloudRain },
    ],
    theme: {
      from: 'from-orange-900',
      to: 'to-amber-900',
      accent: 'text-orange-400',
    },
  },
  {
    id: 'london',
    city: 'London',
    country: 'UK',
    temp: 12,
    condition: 'Cloudy',
    high: 14,
    low: 9,
    humidity: 70,
    windSpeed: 20,
    description: 'Overcast clouds with a chance of drizzle in the afternoon.',
    forecast: [
      { day: 'Mon', temp: 13, icon: Cloud },
      { day: 'Tue', temp: 12, icon: CloudRain },
      { day: 'Wed', temp: 14, icon: Cloud },
    ],
    theme: {
      from: 'from-indigo-950',
      to: 'to-slate-900',
      accent: 'text-indigo-400',
    },
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    country: 'India',
    temp: 29,
    condition: 'Rainy',
    high: 31,
    low: 26,
    humidity: 88,
    windSpeed: 18,
    description: 'Monsoon showers expected throughout the day. High humidity levels.',
    forecast: [
      { day: 'Mon', temp: 28, icon: CloudRain },
      { day: 'Tue', temp: 29, icon: CloudRain },
      { day: 'Wed', temp: 30, icon: Cloud },
    ],
    theme: {
      from: 'from-blue-950',
      to: 'to-slate-900',
      accent: 'text-blue-400',
    },
  },
  {
    id: 'delhi',
    city: 'New Delhi',
    country: 'India',
    temp: 34,
    condition: 'Sunny',
    high: 38,
    low: 26,
    humidity: 35,
    windSpeed: 10,
    description: 'Hot and dry with clear skies. Stay hydrated.',
    forecast: [
      { day: 'Mon', temp: 35, icon: Sun },
      { day: 'Tue', temp: 36, icon: Sun },
      { day: 'Wed', temp: 34, icon: Cloud },
    ],
    theme: {
      from: 'from-orange-800',
      to: 'to-red-900',
      accent: 'text-orange-400',
    },
  },
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    country: 'India',
    temp: 24,
    condition: 'Cloudy',
    high: 26,
    low: 19,
    humidity: 65,
    windSpeed: 22,
    description: 'Pleasant weather with breezy conditions. Perfect for a walk.',
    forecast: [
      { day: 'Mon', temp: 23, icon: Cloud },
      { day: 'Tue', temp: 24, icon: CloudRain },
      { day: 'Wed', temp: 25, icon: Sun },
    ],
    theme: {
      from: 'from-emerald-900',
      to: 'to-teal-950',
      accent: 'text-emerald-400',
    },
  },
  {
    id: 'nagpur',
    city: 'Nagpur',
    country: 'India',
    temp: 36,
    condition: 'Sunny',
    high: 40,
    low: 28,
    humidity: 30,
    windSpeed: 12,
    description: 'The Orange City is experiencing bright sunshine. Very warm afternoon expected.',
    forecast: [
      { day: 'Mon', temp: 37, icon: Sun },
      { day: 'Tue', temp: 38, icon: Sun },
      { day: 'Wed', temp: 36, icon: Cloud },
    ],
    theme: {
      from: 'from-orange-600',
      to: 'to-red-800',
      accent: 'text-orange-300',
    },
  },
];
