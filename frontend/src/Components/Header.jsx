import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudRain, Sun, Cloud, AlertCircle } from 'lucide-react';

export default function Header() {
  const [weather, setWeather] = useState({ temp: null, condition: null, error: false });

  useEffect(() => {
    axios.get('https://api.open-meteo.com/v1/forecast?latitude=-1.2833&longitude=36.8167&current_weather=true')
      .then(res => setWeather({ temp: res.data.current_weather.temperature, condition: res.data.current_weather.weathercode, error: false }))
      .catch(() => setWeather({ temp: null, condition: null, error: true }));
  }, []);

  const getWeatherIcon = (code) => {
    if (weather.error) return <AlertCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-red-500" />;
    if (code === null) return <Cloud className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-400 animate-pulse" />;
    if (code <= 3) return <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-500" />;
    if (code <= 67) return <CloudRain className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-brand-blue" />;
    return <Cloud className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-500" />;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-white/50 shadow-sm supports-[backdrop-filter]:bg-white/40">
      <div className="max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-4 flex justify-between items-center gap-2">
        
        {/* Logo and Title Container */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-7 h-7 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center drop-shadow-md">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="15,20 55,50 15,80" fill="#00AEEF" />
              <polygon points="85,20 40,50 85,80" fill="#ED1C24" opacity="0.9" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none sm:leading-tight">KonvergeSync</h1>
            <p className="hidden sm:block text-[10px] sm:text-xs font-bold text-brand-red uppercase tracking-wider">Daily Activity Hub</p>
          </div>
        </div>
        
        {/* Weather Widget */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/60 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white shadow-sm backdrop-blur-sm">
          {getWeatherIcon(weather.condition)}
          <span className="font-semibold text-[10px] sm:text-sm text-slate-700 whitespace-nowrap">
            {weather.error ? 'Error' : weather.temp ? <>{weather.temp}°C <span className="hidden sm:inline">Nairobi</span></> : '...'}
          </span>
        </div>
        
      </div>
    </header>
  );
}