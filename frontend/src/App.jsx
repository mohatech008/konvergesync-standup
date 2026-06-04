import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Components/Header.jsx';
import StandupForm from './Components/StandupForm.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Feed from './Components/Feed.jsx';
const API_BASE = 'https://konvergesync-standup.onrender.com'; 

export default function App() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState([]);

  const fetchData = async () => {
    try {
      const [postsRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE}/standups/`),
        axios.get(`${API_BASE}/standups/stats/`)
      ]);
      setPosts(postsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

 return (
    <div className="min-h-screen bg-slate-100 text-slate-800 antialiased selection:bg-brand-blue selection:text-white">
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 lg:space-y-8 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto custom-scrollbar pr-2 pb-4">
          <StandupForm onPostCreated={fetchData} />
         <Dashboard stats={stats} posts={posts} />
        </div>

        {/* RIGHT COLUMN: Live Feed */}
        <div className="lg:col-span-7">
          <Feed posts={posts} />
        </div>

      </main>
    </div>
  );
}