import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { BarChart3, Users, AlertTriangle, Activity } from 'lucide-react';

export default function Dashboard({ stats, posts = [] }) {
  const totalPosts = stats.reduce((sum, day) => sum + day.posts, 0);
  const totalBlockers = stats.reduce((sum, day) => sum + day.blockers, 0);

  const uniqueAuthors = new Set(posts.map(post => post.author));
  const activeMembers = uniqueAuthors.size;

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center text-slate-800">
          <BarChart3 className="w-6 h-6 mr-2 text-brand-blue" />
          Productivity Dashboard
        </h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">7-Day Team Activity Overview</p>
      </div>

      {/* KPI Cards for Team Activity */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 transition-all hover:shadow-md hover:border-blue-300">
          <div className="flex items-center text-slate-500 mb-2">
            <Activity className="w-4 h-4 mr-1.5 text-brand-blue" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Updates</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-800">{totalPosts}</p>
        </div>

        <div className="bg-red-50/50 p-4 rounded-xl border border-red-50 transition-all hover:shadow-md hover:border-red-200">
          <div className="flex items-center text-slate-500 mb-2">
            <AlertTriangle className="w-4 h-4 mr-1.5 text-brand-red" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Blockers</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-800">{totalBlockers}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 transition-all hover:shadow-md hover:border-indigo-300">
          <div className="flex items-center text-slate-500 mb-2">
            <Users className="w-4 h-4 mr-1.5 text-indigo-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Members</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-800">{activeMembers}</p>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            
            <Bar dataKey="posts" name="Total Posts" fill="#00AEEF" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="blockers" name="Blockers" fill="#ED1C24" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}