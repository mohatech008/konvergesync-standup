import React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Paperclip, Clock, Sun, CloudRain, Cloud } from 'lucide-react';

const API_BASE = 'https://konvergesync-standup.onrender.com';

export default function Feed({ posts }) {
  
  const getWeatherIcon = (code) => {
    const numCode = parseInt(code);
    if (isNaN(numCode)) return <Cloud className="w-3.5 h-3.5 text-slate-400" />;
    if (numCode <= 3) return <Sun className="w-3.5 h-3.5 text-amber-500" />;
    if (numCode <= 67) return <CloudRain className="w-3.5 h-3.5 text-brand-blue" />;
    return <Cloud className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Live Activity Feed</h2>
        <span className="flex items-center text-xs font-bold text-slate-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-ping absolute"></span>
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 relative"></span>
          Live Sync
        </span>
      </div>

      <div className="space-y-5 pb-10">
        {posts.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">No standups posted yet. Be the first!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md ${post.has_blocker ? 'border-red-200 ring-1 ring-red-50' : 'border-slate-200 hover:border-brand-blue/30'}`}>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${post.has_blocker ? 'bg-red-100 text-brand-red' : 'bg-blue-100 text-brand-blue'}`}>
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{post.author}</h3>
                    
                    <div className="text-xs font-medium text-slate-500 flex items-center mt-0.5 space-x-2">
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" /> 
                        {post.timestamp ? format(new Date(post.timestamp), "MMM d, h:mm a") : 'Just now'} 
                      </span>
                      <span className="text-slate-300">•</span>
                      {post.temperature ? (
                        <span className="flex items-center bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 border border-slate-200">
                          {getWeatherIcon(post.weather_condition)}
                          <span className="ml-1">{post.temperature}°C</span>
                        </span>
                      ) : (
                        <span className="flex items-center text-slate-400">
                          <Cloud className="w-3.5 h-3.5 mr-1" />
                          <span className="text-[10px]">No weather data</span>
                        </span>
                      )}
                    </div>

                  </div>
                </div>
                {post.has_blocker && (
                  <span className="bg-red-50 text-brand-red text-xs font-bold px-3 py-1 rounded-full flex items-center border border-red-200">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1.5" /> Blocker
                  </span>
                )}
              </div>

              <div className="space-y-4 text-sm mt-5 pl-13">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="font-bold text-slate-700 block mb-1">Yesterday:</span>
                  <p className="text-slate-600 leading-relaxed">{post.yesterday}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="font-bold text-slate-700 block mb-1">Today:</span>
                  <p className="text-slate-600 leading-relaxed">{post.today}</p>
                </div>
                
                {post.has_blocker && post.blockers && (
                  <div className="bg-red-50/80 p-4 rounded-xl border border-red-100">
                    <span className="font-bold text-brand-red block mb-1">Blocked By:</span>
                    <p className="text-red-900 leading-relaxed">{post.blockers}</p>
                  </div>
                )}
                
                {post.file_attachment && (
                  <div className="pt-2">
                    <a href={`${API_BASE}${post.file_attachment}`} target="_blank" rel="noreferrer"
                      className="inline-flex items-center text-brand-blue hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full text-xs font-bold transition-colors">
                      <Paperclip className="w-4 h-4 mr-1.5" /> View Attachment
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}