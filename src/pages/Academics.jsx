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
  Menu,
  GraduationCap,
  Calendar,
  Users,
  Target,
  Star,
  Info
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Academics = () => {
  const [selectedSemester, setSelectedSemester] = useState('Sem 5');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock Data: Semester Performance Trend
  const semesterTrend = [
    { sem: 'S1', sgpa: 8.2 },
    { sem: 'S2', sgpa: 8.0 },
    { sem: 'S3', sgpa: 7.8 },
    { sem: 'S4', sgpa: 8.5 },
    { sem: 'S5', sgpa: 8.4 },
  ];

  // Mock Data: Current Subjects & Attendance
  const subjects = [
    { 
      code: 'CS501', 
      name: 'Database Management Systems', 
      credits: 4,
      attendance: 82,
      internals: { obtained: 24, total: 30 },
      status: 'pass',
      faculty: 'Dr. S. Chatterjee'
    },
    { 
      code: 'CS502', 
      name: 'Operating Systems', 
      credits: 4,
      attendance: 68,
      internals: { obtained: 18, total: 30 },
      status: 'warning',
      faculty: 'Prof. R. Sharma'
    },
    { 
      code: 'CS503', 
      name: 'Design & Analysis of Algorithms', 
      credits: 3,
      attendance: 45,
      internals: { obtained: 12, total: 30 },
      status: 'critical',
      faculty: 'Dr. A. Kumar'
    },
    { 
      code: 'MA504', 
      name: 'Probability & Statistics', 
      credits: 3,
      attendance: 90,
      internals: { obtained: 28, total: 30 },
      status: 'pass',
      faculty: 'Prof. M. Roy'
    },
    { 
      code: 'HU501', 
      name: 'Professional Ethics', 
      credits: 2,
      attendance: 76,
      internals: { obtained: 25, total: 30 },
      status: 'pass',
      faculty: 'Ms. P. Gupta'
    }
  ];

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 75) return { label: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 60) return { label: 'Warning', color: 'text-amber-600', bg: 'bg-amber-100' };
    return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50/30">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-lg shadow-sm z-40 border-b border-gray-200">
        <div className="px-6 py-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <img 
                src="/au_logo.png" 
                alt="Adamas University" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-800">Adamas University</h1>
                <p className="text-sm text-blue-600">Academic Progress</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">CSE • 3rd Year</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <h3 className="font-semibold text-gray-800">Ankan Das</h3>
                <p className="text-sm text-gray-500">ID: AU20210045</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                AD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-20">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <main className={`
          flex-1 transition-all duration-300 min-h-screen
          ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
          p-6 lg:p-8
        `}>
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Academic <span className="text-blue-700">Progress</span>
                </h1>
                <p className="text-gray-600">
                  Track your grades, attendance, and overall academic performance
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select 
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
                  >
                    <option>Semester 5 (Current)</option>
                    <option>Semester 4</option>
                    <option>Semester 3</option>
                    <option>Semester 2</option>
                    <option>Semester 1</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
                
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <Download size={16} /> 
                  <span>Download Marksheet</span>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* CGPA Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    +0.2
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">Current CGPA</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">8.42</h2>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>Improved from last semester</span>
                </div>
              </div>

              {/* Credits Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="p-3 bg-purple-100 rounded-xl mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Credits</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">86<span className="text-lg text-gray-400">/160</span></h2>
                <p className="text-xs text-gray-500">54 credits remaining</p>
              </div>

              {/* Backlogs Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="p-3 bg-green-100 rounded-xl mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-600 text-sm mb-1">Active Backlogs</p>
                <h2 className="text-3xl font-bold text-green-600 mb-2">0</h2>
                <p className="text-xs text-gray-500">All clear - No backlogs</p>
              </div>

              {/* Rank Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-blue-100 text-sm mb-1">Class Rank</p>
                <h2 className="text-3xl font-bold mb-2">#14</h2>
                <p className="text-xs text-blue-200">Top 15% of batch</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Subjects List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Current Semester Subjects
                    </h3>
                    <span className="text-sm text-gray-500">Semester 5 • 16 Credits</span>
                  </div>

                  <div className="space-y-4">
                    {subjects.map((sub, idx) => {
                      const status = getAttendanceStatus(sub.attendance);
                      return (
                        <div 
                          key={idx} 
                          className="group border border-gray-200 hover:border-blue-300 rounded-xl p-4 transition-all hover:shadow-md"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                                {sub.code}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{sub.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-500">{sub.credits} Credits</span>
                                  <span className="text-xs text-gray-300">•</span>
                                  <span className="text-xs text-gray-500">{sub.faculty}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${status.bg} ${status.color}`}>
                              {sub.attendance < 75 ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                              {status.label}
                            </div>
                          </div>

                          {/* Attendance Bar */}
                          <div>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-gray-500">Attendance</span>
                              <span className={`font-semibold ${status.color}`}>{sub.attendance}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${getAttendanceColor(sub.attendance)} transition-all duration-500 relative`}
                                style={{ width: `${sub.attendance}%` }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Internal Marks:</span>
                                <span className="text-sm font-semibold text-gray-800">
                                  {sub.internals.obtained}/{sub.internals.total}
                                </span>
                              </div>
                              {sub.attendance < 75 && (
                                <p className="text-xs text-red-500">
                                  Need {Math.ceil((75 - sub.attendance) * 0.8)} more classes
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Visualizations & Resources */}
              <div className="space-y-6">
                {/* SGPA Trend Graph */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-purple-600" />
                    SGPA Trend
                  </h3>
                  
                  <div className="h-64 flex items-end justify-between gap-2 px-2 relative">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      {[10, 8, 6, 4, 2].map(val => (
                        <div key={val} className="w-full border-t border-gray-200 border-dashed relative">
                          <span className="absolute -top-3 left-0 text-xs text-gray-400">{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bars */}
                    {semesterTrend.map((item, idx) => (
                      <div key={idx} className="relative z-10 flex flex-col items-center gap-2 group w-full">
                        <div 
                          className="w-full max-w-[40px] bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-700 group-hover:from-purple-500 group-hover:to-purple-400 group-hover:scale-y-105 origin-bottom relative shadow-lg"
                          style={{ height: `${(item.sgpa / 10) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            {item.sgpa} SGPA
                          </div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">{item.sem}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Current SGPA</span>
                      <span className="font-bold text-blue-600">8.4</span>
                    </div>
                  </div>
                </div>

                {/* Performance Summary */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    Performance Summary
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Attendance Overall</span>
                        <span className="font-semibold text-gray-800">72%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-amber-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Internal Marks Avg</span>
                        <span className="font-semibold text-gray-800">74%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-[74%] bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="p-3 bg-green-50 rounded-xl">
                        <p className="text-xs text-green-600 mb-1">Subjects Passed</p>
                        <p className="text-lg font-bold text-green-700">4/5</p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-xl">
                        <p className="text-xs text-amber-600 mb-1">Need Attention</p>
                        <p className="text-lg font-bold text-amber-700">1</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resources */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-pink-600" />
                    Academic Resources
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { title: "Semester 5 Syllabus", size: "2.4 MB", type: "PDF" },
                      { title: "Mid-Sem Exam Schedule", size: "1.1 MB", type: "PDF" },
                      { title: "Academic Calendar 2025", size: "800 KB", type: "PDF" },
                      { title: "Project Guidelines", size: "3.2 MB", type: "DOC" }
                    ].map((file, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-pink-600">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition">
                              {file.title}
                            </p>
                            <p className="text-xs text-gray-400">{file.size} • {file.type}</p>
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-white transition">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Academics;