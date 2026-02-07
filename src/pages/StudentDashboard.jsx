import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link instead of state
import { Search, Bell, Calendar, BookOpen, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const DashboardHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = [
    { label: "Attendance", value: "78%", status: "warning", sub: "Requires 85%", color: "amber" },
    { label: "CGPA", value: "8.4", status: "good", sub: "Top 10% of class", color: "blue" },
    { label: "Credits", value: "18/24", status: "neutral", sub: "Current Sem", color: "purple" }
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition inline-flex"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Good Morning, Ankan! 👋</h1>
            <p className="text-slate-500 text-sm">Here's what's happening with your academics today.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white shadow-sm w-64">
            <Search size={18} className="text-slate-400 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full" />
          </div>
          <button className="relative p-3 bg-white/60 backdrop-blur-md rounded-xl border border-white shadow-sm hover:shadow-md transition">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-4xl font-bold text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-slate-500 font-medium mb-2">{stat.label}</p>
            <div className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-${stat.color}-50 text-${stat.color}-600`}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mentor Card */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-1 shadow-xl">
          <div className="bg-white/95 backdrop-blur-xl rounded-[22px] p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-800">Your Mentor</h3>
                <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">Online</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">Dr. S. Chatterjee</h4>
              <p className="text-slate-500 text-sm">Computer Science Dept.</p>
            </div>
            {/* Link to Chat Page */}
            <Link 
              to="/dashboard/chat"
              className="mt-6 block text-center w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-slate-800 transition"
            >
              Send Message
            </Link>
          </div>
        </div>

        {/* Up Next Card */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-blue-600" /> Up Next
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/80 border border-white shadow-sm flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-blue-600 mb-1">10:00 AM</p>
                <h4 className="font-bold text-slate-800">Database Management</h4>
                <p className="text-xs text-slate-500">Room 304 • Prof. Roy</p>
              </div>
              <button className="text-slate-400 hover:text-blue-600"><BookOpen size={20}/></button>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardHome;