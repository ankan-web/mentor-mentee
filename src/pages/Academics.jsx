import React, { useState } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  FileText, 
  CheckCircle, 
  XCircle,
  Clock,
  PieChart,
  BarChart2,
  ChevronDown,
  Award,
  Menu
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import './Academics.css'; // Styling for the graph and progress bars

const Academics = () => {
  const [selectedSemester, setSelectedSemester] = useState('Sem 5');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock Data: Semester Performance Trend
  const semesterTrend = [
    { sem: 'S1', sgpa: 8.2 },
    { sem: 'S2', sgpa: 8.0 },
    { sem: 'S3', sgpa: 7.8 }, // Dip
    { sem: 'S4', sgpa: 8.5 }, // Improvement
    { sem: 'S5', sgpa: 8.4 }, // Current
  ];

  // Mock Data: Current Subjects & Attendance
  const subjects = [
    { 
      code: 'CS501', 
      name: 'Database Management Systems', 
      credits: 4,
      attendance: 82, // Green
      internals: { obtained: 24, total: 30 },
      status: 'pass'
    },
    { 
      code: 'CS502', 
      name: 'Operating Systems', 
      credits: 4,
      attendance: 68, // Amber (Warning)
      internals: { obtained: 18, total: 30 },
      status: 'pass'
    },
    { 
      code: 'CS503', 
      name: 'Design & Analysis of Algorithms', 
      credits: 3,
      attendance: 45, // Red (Critical)
      internals: { obtained: 12, total: 30 },
      status: 'fail' // Potential fail due to attendance
    },
    { 
      code: 'MA504', 
      name: 'Probability & Statistics', 
      credits: 3,
      attendance: 90, // Green
      internals: { obtained: 28, total: 30 },
      status: 'pass'
    },
    { 
      code: 'HU501', 
      name: 'Professional Ethics', 
      credits: 2,
      attendance: 76,
      internals: { obtained: 25, total: 30 },
      status: 'pass'
    }
  ];

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { label: 'Safe', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 60) return { label: 'Warning', color: 'text-amber-600', bg: 'bg-amber-100' };
    return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 relative overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition inline-flex"
            >
              <Menu size={24} strokeWidth={2} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Academic Progress</h1>
              <p className="text-slate-500">Track your grades, attendance, and credits.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="appearance-none bg-white/80 backdrop-blur-md border border-white pl-4 pr-10 py-2.5 rounded-xl text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option>Sem 5 (Current)</option>
                <option>Sem 4</option>
                <option>Sem 3</option>
                <option>Sem 2</option>
                <option>Sem 1</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
            </div>
            
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-900/20">
              <Download size={16} /> Marksheet
            </button>
          </div>
        </div>

        {/* --- TOP STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* CGPA Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award size={80} />
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">Current CGPA</p>
            <h2 className="text-4xl font-bold text-slate-900">8.42</h2>
            <div className="mt-2 flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full">
              <TrendingUp size={12} /> +0.2 from last sem
            </div>
          </div>

          {/* Credits Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-lg">
            <p className="text-slate-500 text-sm font-medium mb-1">Total Credits</p>
            <h2 className="text-4xl font-bold text-slate-900">86<span className="text-xl text-slate-400">/160</span></h2>
            <p className="text-xs text-slate-400 mt-2">On track for graduation</p>
          </div>

          {/* Backlogs Card (Conditional Styling) */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-lg">
            <p className="text-slate-500 text-sm font-medium mb-1">Active Backlogs</p>
            <h2 className="text-4xl font-bold text-red-500">0</h2>
            <div className="mt-2 flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full">
              <CheckCircle size={12} /> All Clear
            </div>
          </div>

           {/* Rank Card */}
           <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-500/30">
            <p className="text-blue-100 text-sm font-medium mb-1">Class Rank</p>
            <h2 className="text-4xl font-bold">#14</h2>
            <p className="text-xs text-blue-200 mt-2">Top 15% of Batch 2022</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: SUBJECTS LIST --- */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" /> Current Semester Subjects
              </h3>

              <div className="space-y-4">
                {subjects.map((sub, idx) => {
                  const status = getAttendanceStatus(sub.attendance);
                  return (
                    <div key={idx} className="group bg-white/60 hover:bg-white border border-transparent hover:border-blue-100 rounded-2xl p-4 transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-xs shrink-0">
                            {sub.code}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{sub.name}</h4>
                            <p className="text-xs text-slate-500">{sub.credits} Credits • Internal Marks: {sub.internals.obtained}/{sub.internals.total}</p>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${status.bg} ${status.color}`}>
                          {sub.attendance < 75 ? <AlertTriangle size={12}/> : <CheckCircle size={12}/>}
                          {status.label}
                        </div>
                      </div>

                      {/* Attendance Bar */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1.5">
                          <span className="text-slate-500">Attendance</span>
                          <span className={status.color}>{sub.attendance}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getAttendanceColor(sub.attendance)} transition-all duration-1000 ease-out relative`}
                            style={{ width: `${sub.attendance}%` }}
                          >
                             {/* Shimmer Effect */}
                             <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                          </div>
                        </div>
                        {sub.attendance < 75 && (
                           <p className="text-[10px] text-red-500 mt-1 font-medium">
                             * You need {Math.ceil((75 - sub.attendance) * 0.8)} more classes to reach 75%
                           </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: VISUALIZATIONS --- */}
          <div className="space-y-8">
            
            {/* SGPA Graph (CSS Only) */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-lg h-80 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BarChart2 size={20} className="text-purple-600" /> SGPA Trend
              </h3>
              
              <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2 relative">
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                  {[10, 8, 6, 4, 2].map(val => (
                    <div key={val} className="w-full border-t border-slate-200 border-dashed h-0 opacity-50 text-[10px] text-slate-400">
                      <span className="-mt-3 block">{val}</span>
                    </div>
                  ))}
                  <div className="w-full border-t border-slate-300 h-0"></div>
                </div>

                {/* Bars */}
                {semesterTrend.map((item, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-2 group w-full">
                    <div 
                      className="w-full max-w-[40px] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-700 hover:from-purple-500 hover:to-purple-400 hover:scale-y-105 origin-bottom relative shadow-lg shadow-blue-500/20"
                      style={{ height: `${item.sgpa * 10}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.sgpa} SGPA
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{item.sem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links / Resources */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-pink-600" /> Resources
              </h3>
              
              <div className="space-y-3">
                {[
                  { title: "Sem 5 Syllabus", size: "2.4 MB" },
                  { title: "Exam Schedule (Mid-Sem)", size: "1.1 MB" },
                  { title: "Academic Calendar 2025", size: "800 KB" }
                ].map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">{file.title}</p>
                        <p className="text-[10px] text-slate-400">{file.size}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-600">
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default Academics;