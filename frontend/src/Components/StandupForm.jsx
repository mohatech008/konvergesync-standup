import React, { useState, useRef } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle, Cloud } from 'lucide-react';

const API_BASE = 'http://127.0.0.1:5000';

export default function StandupForm({ onPostCreated }) {
  const [formData, setFormData] = useState({
    author: '', yesterday: '', today: '', blockers: '', has_blocker: false
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.author || !formData.yesterday || !formData.today) {
      setError('Author, Yesterday, and Today are required fields.');
      return;
    }

    setIsSubmitting(true);
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('file', file);

    try {
      await axios.post(`${API_BASE}/standups/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setFormData({ author: '', yesterday: '', today: '', blockers: '', has_blocker: false });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
      
      onPostCreated();
    } catch (err) {
      setError('Failed to submit standup. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-50"></div>
      
      <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800 relative z-10">
        <CheckCircle className="w-6 h-6 mr-2 text-brand-blue" /> Post Your Update
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0" /> {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name</label>
          <input type="text" name="author" value={formData.author} onChange={handleInputChange} 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all duration-200" 
            placeholder="Enter your name" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">What did you do yesterday?</label>
          <textarea name="yesterday" value={formData.yesterday} onChange={handleInputChange} rows="2"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all duration-200"
            placeholder="Briefly describe yesterday's work..." />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">What are you doing today?</label>
          <textarea name="today" value={formData.today} onChange={handleInputChange} rows="2"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all duration-200"
            placeholder="What is your focus for today?" />
        </div>

        <div className={`p-4 rounded-xl border transition-all duration-300 ${formData.has_blocker ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200 hover:border-red-200'}`}>
          <label className="flex items-center space-x-3 cursor-pointer select-none">
            <input type="checkbox" name="has_blocker" checked={formData.has_blocker} onChange={handleInputChange} 
              className="w-5 h-5 text-brand-red rounded border-slate-300 focus:ring-brand-red transition-colors" />
            <span className="text-sm font-bold text-slate-700">I have a blocker</span>
          </label>
          
          {formData.has_blocker && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <textarea name="blockers" value={formData.blockers} onChange={handleInputChange} rows="2"
                placeholder="What is blocking you?"
                className="w-full p-3 bg-white border border-red-200 rounded-xl focus:ring-2 focus:ring-brand-red outline-none transition-all duration-200 shadow-sm" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Attachment (Optional)</label>
          <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} 
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100 transition-all cursor-pointer" />
        </div>

        <button type="submit" disabled={isSubmitting}
          className="w-full bg-brand-blue hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center">
          {isSubmitting ? (
            <span className="flex items-center"><Cloud className="animate-bounce w-5 h-5 mr-2" /> Posting...</span>
          ) : 'Post Standup'}
        </button>
      </form>
    </section>
  );
}