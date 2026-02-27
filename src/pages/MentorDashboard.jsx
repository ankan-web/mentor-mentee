import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Calendar,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
  Users,
  BarChart3,
  FileText,
  Video,
  CheckCircle,
  XCircle,
  LogOut,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Briefcase,
  TrendingUp,
  LayoutDashboard,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone
} from 'lucide-react';
import api, { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { id: 'chats', icon: <MessageSquare className="w-5 h-5" />, label: "Chats" },
    { id: 'schedule', icon: <Calendar className="w-5 h-5" />, label: "Schedule" }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside className={`fixed top-16 sm:top-20 left-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] bg-gray-800 border-r border-gray-700 shadow-lg transition-all duration-300 z-30 flex flex-col ${isOpen ? 'w-64 sm:w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
        <div className="flex-1 py-4 sm:py-6 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-1 sm:space-y-2 px-3">
            {navItems.map((item, idx) => {
              const isActive = currentView === item.id;
              return (
                <li key={idx}>
                  <button 
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-900/30 text-blue-400 font-semibold border border-blue-800/50' : 'text-gray-400 hover:bg-gray-700/50 hover:text-blue-400'}`}
                  >
                    <div className={`${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                      {item.icon}
                    </div>
                    {isOpen && <span className="text-sm sm:text-base whitespace-nowrap">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const [adminData, setAdminData] = useState({
    name: 'Dr. A. Chatterjee',
    department: 'Computer Science',
    role: 'Senior Faculty & Mentor',
    employee_id: 'EMP-2048',
    stats: {
      totalMentees: 24,
      criticalMentees: 3,
      pendingRequests: 5,
      meetingsToday: 3
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/profile');
        const data = response.data;
        
        if (data.role !== 'mentor' && data.role !== 'admin') {
          navigate('/');
          return;
        }

        setAdminData({
          name: data.name || 'Mentor',
          department: data.department || 'Computer Science',
          role: data.mentor_profile?.designation || 'Faculty Mentor',
          employee_id: data.mentor_profile?.employee_id || 'EMP-0000',
          stats: {
            totalMentees: data.mentor_profile?.mentees?.length || 0,
            criticalMentees: 3,
            pendingRequests: 5,
            meetingsToday: 3
          }
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const menteesList = [
    { name: "Rahul Kumar", roll: "CS2021-045", status: "good", attendance: "92%", alert: false },
    { name: "Sneha Das", roll: "CS2021-089", status: "warning", attendance: "68%", alert: true, alertReason: "Low Attendance" },
    { name: "Aman Gupta", roll: "CS2021-102", status: "good", attendance: "85%", alert: false },
    { name: "Priya Roy", roll: "CS2021-033", status: "critical", attendance: "55%", alert: true, alertReason: "Failed Midterms" },
  ];

  const schedule = [
    { time: "10:00 AM", title: "DBMS Lecture", type: "class", location: "Room 304", tagColor: "blue" },
    { time: "01:30 PM", title: "1-on-1 Mentoring: Sneha", type: "mentoring", location: "Faculty Cabin 12", tagColor: "purple" },
    { time: "03:00 PM", title: "Department Meeting", type: "meeting", location: "Conference Room B", tagColor: "amber" }
  ];

  const requests = [
    { student: "John Doe", type: "Leave Request", date: "Medical Leave (3 Days)", priority: "medium" },
    { student: "Priya Roy", type: "Mentoring Session", date: "Requested for Tomorrow", priority: "high" },
    { student: "Team Alpha", type: "Project Approval", date: "DBMS Mini Project", priority: "low" }
  ];

  const chatContacts = [
    { id: 1, name: "Sneha Das", roll: "CS2021-089", lastMessage: "Sir, I have submitted the assignment.", time: "10:30 AM", unread: 2, online: true },
    { id: 2, name: "Priya Roy", roll: "CS2021-033", lastMessage: "Can we reschedule our meeting?", time: "Yesterday", unread: 0, online: false },
    { id: 3, name: "Rahul Kumar", roll: "CS2021-045", lastMessage: "Thank you for the notes!", time: "Monday", unread: 0, online: true },
    { id: 4, name: "Aman Gupta", roll: "CS2021-102", lastMessage: "I had a doubt regarding DBMS.", time: "Monday", unread: 0, online: false },
    { id: 5, name: "Department Group", roll: "CSE Faculty", lastMessage: "Meeting at 3 PM today.", time: "09:00 AM", unread: 5, online: true, isGroup: true },
  ];

  const [activeChat, setActiveChat] = useState(chatContacts[0]);
  const [messageInput, setMessageInput] = useState("");

  const chatMessages = [
    { id: 1, sender: 'mentor', text: "Hello Sneha, did you complete the DBMS project?", time: "09:00 AM" },
    { id: 2, sender: 'student', text: "Good morning Sir. Yes, I'm just finalizing the documentation.", time: "09:15 AM" },
    { id: 3, sender: 'mentor', text: "Great. Please ensure you include the ER diagrams as discussed in the last session.", time: "09:20 AM" },
    { id: 4, sender: 'student', text: "Will do. Are there any specific format guidelines for the report?", time: "09:25 AM" },
    { id: 5, sender: 'mentor', text: "Standard IEEE format is fine. Just make sure the diagrams are legible.", time: "09:30 AM" },
    { id: 6, sender: 'student', text: "Sir, I have submitted the assignment on the portal.", time: "10:30 AM" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getInitials = (name) => {
    return name ? name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AD';
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mb-4"></div>
        <h2 className="text-xl font-bold text-blue-400 animate-pulse">Loading Mentor Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 overflow-hidden flex flex-col">
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg shadow-md z-40 border-b border-gray-800 h-16 sm:h-20">
        <div className="px-3 sm:px-6 h-full flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-base sm:text-lg font-bold text-gray-100">Adamas University</h1>
                  <p className="text-xs sm:text-sm text-blue-400 font-medium">Mentor Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden lg:flex items-center bg-gray-800/80 focus-within:bg-gray-800 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all px-4 py-2.5 rounded-xl border border-gray-700 shadow-inner w-64 xl:w-80">
                <Search className="w-4 h-4 text-gray-500 mr-3" />
                <input
                  type="text"
                  placeholder="Search students, requests..."
                  className="bg-transparent outline-none text-sm w-full placeholder-gray-500 text-gray-200"
                />
              </div>

              <button className="relative p-2 sm:p-2.5 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-sm hover:bg-gray-700 transition-all">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse border-2 border-gray-900">
                  {adminData.stats.pendingRequests}
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 sm:space-x-3 hover:bg-gray-800 rounded-xl p-1.5 transition-colors border border-transparent hover:border-gray-700"
                >
                  <div className="text-right hidden md:block">
                    <h3 className="font-bold text-gray-200 text-sm">{adminData.name}</h3>
                    <p className="text-xs text-blue-400 font-medium">{adminData.role}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-inner ring-2 ring-gray-800">
                    {getInitials(adminData.name)}
                  </div>
                </button>

                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-700 bg-gray-800/50">
                        <p className="font-bold text-gray-200 text-sm">{adminData.name}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">{adminData.employee_id}</p>
                      </div>
                      <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-medium">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 sm:pt-20 flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          currentView={currentView}
          setCurrentView={setCurrentView}
        />

        <main className={`flex-1 transition-all duration-300 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-y-auto ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
          <div className="max-w-7xl mx-auto p-3 sm:p-6 lg:p-8 h-full flex flex-col">
            
            {currentView === 'dashboard' && (
              <>
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-100 mb-1 sm:mb-2 tracking-tight">
                      Overview, <span className="text-blue-400">{adminData.name.split(' ')[1]}</span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                      {adminData.department} Department
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 bg-gray-800 border border-gray-700 shadow-sm px-4 py-2.5 rounded-xl">
                    <div className="p-2 bg-indigo-900/30 rounded-lg text-indigo-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Today's Date</p>
                      <p className="text-sm font-bold text-gray-200">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-600 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-900/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-900/30 text-blue-400 rounded-xl">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 bg-green-900/30 text-green-400 border border-green-800/50 rounded-full">+2 New</span>
                    </div>
                    <h3 className="text-3xl font-black text-gray-100 mb-1">{adminData.stats.totalMentees}</h3>
                    <p className="text-sm font-medium text-gray-400">Total Assigned Mentees</p>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-600 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-900/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-red-900/30 text-red-400 rounded-xl">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 bg-red-900/30 text-red-400 border border-red-800/50 rounded-full">Action Needed</span>
                    </div>
                    <h3 className="text-3xl font-black text-gray-100 mb-1">{adminData.stats.criticalMentees}</h3>
                    <p className="text-sm font-medium text-gray-400">Mentees at Risk</p>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-600 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-900/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-amber-900/30 text-amber-400 rounded-xl">
                        <FileText className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-gray-100 mb-1">{adminData.stats.pendingRequests}</h3>
                    <p className="text-sm font-medium text-gray-400">Pending Approvals</p>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-600 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-900/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-purple-900/30 text-purple-400 rounded-xl">
                        <Video className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-gray-100 mb-1">{adminData.stats.meetingsToday}</h3>
                    <p className="text-sm font-medium text-gray-400">Meetings Today</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 pb-8">
                  <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                    <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
                      <div className="p-5 sm:p-6 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-100 flex items-center">
                            <Users className="w-5 h-5 text-indigo-400 mr-2" />
                            Mentee Roster Spotlight
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">Quick overview of students requiring attention</p>
                        </div>
                        <button className="text-sm text-indigo-400 font-semibold hover:text-indigo-300 bg-indigo-900/30 px-4 py-2 rounded-lg transition-colors border border-indigo-800/50">
                          View All Students
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                              <th className="px-6 py-4 font-semibold">Student</th>
                              <th className="px-6 py-4 font-semibold">Roll Number</th>
                              <th className="px-6 py-4 font-semibold">Attendance</th>
                              <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {menteesList.map((mentee, idx) => (
                              <tr key={idx} className="hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-indigo-900/40 text-indigo-300 font-bold flex items-center justify-center text-sm shadow-sm border border-indigo-800/50">
                                      {mentee.name.split(' ').map(n=>n[0]).join('')}
                                    </div>
                                    <div>
                                      <p className="text-sm font-bold text-gray-200">{mentee.name}</p>
                                      {mentee.alert && (
                                        <p className="text-[11px] font-semibold text-red-400 flex items-center mt-0.5">
                                          <AlertTriangle className="w-3 h-3 mr-1" /> {mentee.alertReason}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="font-mono text-sm text-gray-400">{mentee.roll}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full rounded-full ${parseInt(mentee.attendance) > 75 ? 'bg-green-500' : 'bg-red-500'}`} 
                                        style={{ width: mentee.attendance }}
                                      ></div>
                                    </div>
                                    <span className={`text-sm font-bold ${parseInt(mentee.attendance) > 75 ? 'text-green-400' : 'text-red-400'}`}>
                                      {mentee.attendance}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end space-x-2">
                                    <button 
                                      onClick={() => setCurrentView('chats')} 
                                      className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/30 rounded-lg transition-colors" 
                                      title="Message"
                                    >
                                      <MessageSquare className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/30 rounded-lg transition-colors" title="View Profile">
                                      <ChevronRight className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5 sm:p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-100 flex items-center">
                          <Clock className="w-5 h-5 text-purple-400 mr-2" />
                          Today's Itinerary
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {schedule.map((item, idx) => (
                          <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 hover:bg-gray-700/50 transition-all group bg-gray-800/50">
                            <div className={`py-2 px-3 rounded-xl bg-${item.tagColor}-900/30 border border-${item.tagColor}-800/50 flex flex-col items-center justify-center min-w-[80px]`}>
                              <span className={`text-sm font-bold text-${item.tagColor}-400 whitespace-nowrap`}>
                                {item.time.split(' ')[0]}
                              </span>
                              <span className={`text-[10px] font-bold text-${item.tagColor}-500 uppercase`}>
                                {item.time.split(' ')[1]}
                              </span>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-base font-bold text-gray-200">{item.title}</h4>
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-gray-700 text-gray-300 border border-gray-600`}>
                                  {item.type}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 flex items-center">
                                <LayoutDashboard className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                                {item.location}
                              </p>
                            </div>

                            {item.type === 'mentoring' && (
                              <button className="self-center p-2 bg-purple-900/30 border border-purple-800/50 text-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition-colors">
                                <Video className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-5 sm:p-6 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-900/10 rounded-bl-full -z-10"></div>
                      
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold text-amber-400 flex items-center">
                          <Bell className="w-5 h-5 text-amber-500 mr-2" />
                          Pending Approvals
                        </h3>
                        <span className="bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-bold px-2 py-1 rounded-md">
                          {requests.length} New
                        </span>
                      </div>

                      <div className="space-y-3">
                        {requests.map((req, idx) => (
                          <div key={idx} className="bg-gray-800/80 p-4 rounded-xl shadow-sm border border-gray-700 hover:border-amber-500/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-bold text-gray-200">{req.student}</h4>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                req.priority === 'high' ? 'bg-red-900/30 text-red-400 border border-red-800/50' : 
                                'bg-blue-900/30 text-blue-400 border border-blue-800/50'
                              }`}>
                                {req.priority}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-gray-400">{req.type}</p>
                            <p className="text-xs text-gray-500 mt-1">{req.date}</p>
                            
                            <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-700">
                              <button className="flex-1 flex items-center justify-center space-x-1 py-1.5 bg-green-900/20 text-green-400 border border-green-800/50 hover:bg-green-600 hover:text-white rounded-lg transition-colors text-xs font-bold">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button className="flex-1 flex items-center justify-center space-x-1 py-1.5 bg-red-900/20 text-red-400 border border-red-800/50 hover:bg-red-600 hover:text-white rounded-lg transition-colors text-xs font-bold">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Deny</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full mt-4 py-3 text-center text-sm font-bold text-amber-500 hover:text-amber-400 bg-amber-900/10 hover:bg-amber-900/20 border border-amber-900/30 rounded-xl transition-colors">
                        View All Requests
                      </button>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 sm:p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-100 mb-4">Quick Mentor Actions</h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-indigo-500/50 hover:bg-gray-700 transition-all group">
                          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2 shadow-sm text-indigo-400 group-hover:scale-110 transition-transform">
                            <Video className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-gray-300 text-center">Group<br/>Session</span>
                        </button>
                        
                        <button 
                          onClick={() => setCurrentView('chats')}
                          className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-blue-500/50 hover:bg-gray-700 transition-all group"
                        >
                          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2 shadow-sm text-blue-400 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-gray-300 text-center">Broadcast<br/>Message</span>
                        </button>

                        <button className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-purple-500/50 hover:bg-gray-700 transition-all group">
                          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2 shadow-sm text-purple-400 group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-gray-300 text-center">Generate<br/>Report</span>
                        </button>

                        <button className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl border border-gray-600 hover:border-green-500/50 hover:bg-gray-700 transition-all group">
                          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2 shadow-sm text-green-400 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-gray-300 text-center">Update<br/>Grades</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}

            {currentView === 'chats' && (
              <div className="flex h-full w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden mb-6">
                <div className="w-full sm:w-80 md:w-96 border-r border-gray-700 flex flex-col bg-gray-900/50 h-full">
                  <div className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-gray-100 mb-4">Messages</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Search mentees or messages..." 
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {chatContacts.map(contact => (
                      <div 
                        key={contact.id}
                        onClick={() => setActiveChat(contact)}
                        className={`flex items-start p-4 cursor-pointer border-b border-gray-800 transition-colors hover:bg-gray-800/80 ${activeChat.id === contact.id ? 'bg-gray-800 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
                      >
                        <div className="relative mr-3 shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${contact.isGroup ? 'bg-indigo-600' : 'bg-gradient-to-br from-blue-600 to-indigo-700'}`}>
                            {getInitials(contact.name)}
                          </div>
                          {contact.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-bold text-gray-200 truncate pr-2">{contact.name}</h4>
                            <span className="text-[10px] text-gray-500 whitespace-nowrap">{contact.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-400 truncate pr-4">{contact.lastMessage}</p>
                            {contact.unread > 0 && (
                              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[1.25rem] text-center">
                                {contact.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden sm:flex flex-1 flex-col bg-gray-950 h-full relative">
                  
                  <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm z-10">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${activeChat.isGroup ? 'bg-indigo-600' : 'bg-gradient-to-br from-blue-600 to-indigo-700'}`}>
                          {getInitials(activeChat.name)}
                        </div>
                        {activeChat.online && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-100">{activeChat.name}</h3>
                        <p className="text-xs text-gray-400 flex items-center">
                          {activeChat.online ? <span className="text-green-500 mr-1">Online</span> : <span>Offline</span>}
                          {!activeChat.isGroup && <span className="mx-1.5">•</span>}
                          {!activeChat.isGroup && <span className="font-mono">{activeChat.roll}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400">
                      <button className="p-2 hover:bg-gray-800 hover:text-gray-200 rounded-full transition-colors"><Phone className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-gray-800 hover:text-gray-200 rounded-full transition-colors"><Video className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-gray-800 hover:text-gray-200 rounded-full transition-colors"><Search className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-gray-800 hover:text-gray-200 rounded-full transition-colors"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/80 custom-scrollbar" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.4) 0%, transparent 100%)' }}>
                    
                    <div className="flex justify-center my-4">
                      <span className="bg-gray-800 text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gray-700">Today</span>
                    </div>

                    {chatMessages.map((msg) => {
                      const isMentor = msg.sender === 'mentor';
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMentor ? 'items-end' : 'items-start'}`}>
                          <div 
                            className={`max-w-[75%] lg:max-w-[65%] px-4 py-2.5 rounded-2xl shadow-sm text-[15px] leading-relaxed relative group ${
                              isMentor 
                                ? 'bg-blue-600 text-white rounded-br-sm' 
                                : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-sm'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div className={`text-[10px] text-gray-500 mt-1 flex items-center space-x-1 ${isMentor ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <span>{msg.time}</span>
                            {isMentor && <CheckCircle className="w-3 h-3 text-blue-500" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="p-3 bg-gray-900 border-t border-gray-800">
                    <div className="flex items-end gap-2 bg-gray-800 rounded-2xl p-2 border border-gray-700 focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 transition-all">
                      <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors shrink-0">
                        <Smile className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors shrink-0">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <textarea 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none text-gray-200 text-sm max-h-32 min-h-[40px] resize-none focus:outline-none focus:ring-0 py-2 custom-scrollbar"
                        rows={1}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if(messageInput.trim()) {
                               setMessageInput("");
                            }
                          }
                        }}
                      />
                      <button 
                        className={`p-2.5 rounded-full shrink-0 transition-all duration-200 flex items-center justify-center ${messageInput.trim() ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-700 text-gray-400'}`}
                      >
                        <Send className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}
            
            {currentView === 'schedule' && (
              <div className="flex items-center justify-center h-full bg-gray-800/30 rounded-2xl border border-gray-800 border-dashed">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-gray-300">Schedule View</h2>
                  <p className="text-gray-500 mt-2">Full calendar interface will go here.</p>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #4B5563;
        }
      `}</style>
    </div>
  );
};

export default MentorDashboard;
