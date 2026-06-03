import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

export default function Dashboard({ stats }) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
        <BarChart3 className="w-5 h-5 mr-2 text-blue-600" /> 
        Productivity Dashboard
      </h2>
      <p className="text-sm text-gray-500 mb-4">Last 7 days of team activity</p>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend wrapperStyle={{ paddingTop: '10px' }}/>
            <Bar dataKey="posts" name="Total Posts" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="blockers" name="Blockers" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}