import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Paperclip, Clock } from 'lucide-react';

const API_BASE = 'http://127.0.0.1:5000';

export default function Feed({ posts }) {
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
          posts.map((post, index) => (
            <div key={post.id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md ${post.has_blocker ? 'border-orange-200 ring-1 ring-orange-50' : 'border-slate-200 hover:border-blue-200'}`}>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  {/* User Avatar Initial */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${post.has_blocker ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{post.author}</h3>
                    <p className="text-xs font-medium text-slate-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> 
                      {post.timestamp ? formatDistanceToNow(new Date(post.timestamp), { addSuffix: true }) : 'Recently'}
                    </p>
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
                  <div className="bg-orange-50/80 p-4 rounded-xl border border-orange-100">
                    <span className="font-bold text-orange-800 block mb-1">Blocked By:</span>
                    <p className="text-orange-900 leading-relaxed">{post.blockers}</p>
                  </div>
                )}
                
                {post.file_attachment && (
                  <div className="pt-2">
                    <a href={`${API_BASE}${post.file_attachment}`} target="_blank" rel="noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full text-xs font-bold transition-colors">
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