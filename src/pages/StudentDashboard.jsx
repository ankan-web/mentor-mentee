import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import {
  Search,
  Bell,
  Calendar,
  BookOpen,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
  Target,
  TrendingUp,
  Award,
  Clock,
  Users,
  BarChart3,
  FileText,
  Video,
  Download,
  CheckCircle,
  AlertCircle,
  LogOut,
  User
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // 1. Expanded State to store detailed User Data
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || 'Student',
    department: '',
    role: 'student',
    registration_no: '',
    roll_no: '',
    semester: '',
    attendance: {
      percentage: 0,
      attended: 0,
      total: 0,
      absent: 0
    }
  });

  // State for assigned mentor
  const [mentor, setMentor] = useState(null);
  const [mentorLoading, setMentorLoading] = useState(true);

  // 2. Fetch Data from Backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/profile');
        // Assuming backend sends structure: 
        // { name, department, student_profile: { roll_no, semester, attendance: { percentage, attended, total, absent }, assigned_mentor } }

        const data = response.data;
        const profile = data.student_profile || {};
        const att = profile.attendance || {};
        setUser({
          name: data.name || 'Student',
          department: data.department || 'Computer Science',
          role: data.role || 'student',

          // MAP 'roll_no' from DB to 'registration_no' in Frontend state
          registration_no: profile.roll_no || 'Not Available',

          // Use 'semester' which we just added to the Schema
          semester: profile.semester || 'IV',

          attendance: {
            percentage: att.percentage || 0,
            attended: att.attended || 0,
            total: att.total || 0,
            absent: (att.total || 0) - (att.attended || 0)
          }
        });

        // Fetch assigned mentor if available
        if (profile.assigned_mentor) {
          try {
            const mentorResponse = await api.get(`/users/${profile.assigned_mentor}`);
            setMentor(mentorResponse.data);
          } catch (mentorError) {
            console.error("Failed to fetch mentor data:", mentorError);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
        setMentorLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'U';
  };

  // Handle logout
  const handleLogout = () => {
    setAuthToken(null); // Clear token from localStorage and axios headers
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setShowProfileMenu(false);
    navigate('/login');
  };

  // 3. Dynamic Stats Calculation
  const getAttendanceStatus = (pct) => {
    if (pct >= 85) return { status: 'good', color: 'green', sub: 'Excellent!' };
    if (pct >= 75) return { status: 'neutral', color: 'blue', sub: 'Good Standing' };
    return { status: 'warning', color: 'amber', sub: 'Low Attendance!' };
  };

  const attStatus = getAttendanceStatus(user.attendance.percentage);

  const stats = [
    {
      label: "Attendance",
      value: `${user.attendance.percentage}%`,
      status: attStatus.status,
      sub: attStatus.sub,
      color: attStatus.color,
      icon: <Calendar className="w-6 h-6" />
    },
    {
      // Replaced CGPA with Class Stats
      label: "Classes Attended",
      value: `${user.attendance.attended} / ${user.attendance.total}`,
      status: 'neutral',
      sub: `${user.attendance.absent} Classes Missed`,
      color: "blue",
      icon: <BookOpen className="w-6 h-6" /> // Changed Icon
    },
    {
      label: "Current Semester",
      value: user.semester || "N/A",
      status: "neutral",
      sub: "Academic Session",
      color: "purple",
      icon: <Award className="w-6 h-6" />
    }
  ];

  // ... (Keep upcomingClasses, pendingTasks, recentActivities as is for now)
  const upcomingClasses = [
    { time: "10:00 AM", title: "Database Management", room: "Room 304", professor: "Prof. Roy", status: "upcoming" },
    { time: "02:00 PM", title: "Data Structures Lab", room: "Lab 205", professor: "Dr. Sharma", status: "lab" },
    { time: "04:30 PM", title: "Soft Skills Workshop", room: "Auditorium", professor: "Ms. Gupta", status: "workshop" }
  ];

  const pendingTasks = [
    { title: "Submit DBMS Assignment", due: "Tomorrow", priority: "high", subject: "Database Management" },
    { title: "Prepare for Mid-Terms", due: "Next Week", priority: "medium", subject: "Operating Systems" },
    { title: "Project Documentation", due: "3 days", priority: "medium", subject: "Software Engineering" }
  ];

  const recentActivities = [
    { action: "Mentor session completed", time: "2 hours ago", type: "mentor", mentor: "Dr. Chatterjee" },
    { action: "Assignment submitted", time: "Yesterday", type: "submission", subject: "DBMS" },
    { action: "Course material accessed", time: "2 days ago", type: "resource", resource: "Algorithms PDF" }
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50/30">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-sm z-40 border-b border-gray-200">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <img
                  src="/au_logo.png"
                  alt="Adamas University"
                  className="h-8 sm:h-10 w-auto"
                />
                <div className="hidden sm:block">
                  <h1 className="text-base sm:text-lg font-bold text-gray-800">Adamas University</h1>
                  <p className="text-xs sm:text-sm text-blue-600">Student Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden lg:flex items-center bg-white/60 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm w-64 xl:w-80">
                <Search className="w-4 h-4 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search courses, materials, mentors..."
                  className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
                />
              </div>

              <button className="relative p-2 sm:p-2.5 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 rounded-xl p-1.5 transition-colors"
                >
                  <div className="text-right hidden md:block">
                    <h3 className="font-semibold text-gray-800 text-sm">{user.name}</h3>
                    <p className="text-xs text-gray-500">
                      {user.registration_no || user.department || "Student"}
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                    {getInitials(user.name)}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    {/* Backdrop to close menu when clicking outside */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email || user.registration_no}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 sm:pt-20">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className={`flex-1 transition-all duration-300 p-3 sm:p-6 lg:p-8 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                    Welcome back, <span className="text-blue-700">{user.name.split(' ')[0]}!</span> 👋
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Registration No: <span className="font-mono font-medium text-gray-800">{user.registration_no}</span>
                  </p>
                </div>
                {/* Semester Badge */}
                <div className="flex items-center space-x-2 bg-white border border-blue-100 shadow-sm px-3 sm:px-4 py-2 rounded-xl">
                  <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Current Semester</p>
                    <p className="text-sm font-bold text-blue-700">{user.semester || "IV"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid - Now Dynamic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br from-white to-gray-50 border border-gray-200 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${stat.status === 'warning' ? 'border-l-4 border-l-amber-500' :
                      stat.status === 'good' ? 'border-l-4 border-l-green-500' :
                        'border-l-4 border-l-blue-500'
                    }`}
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                      {stat.icon}
                    </div>
                    <span className={`text-xs font-semibold px-2 sm:px-3 py-1 rounded-full ${stat.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                        stat.status === 'good' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                      }`}>
                      {stat.sub}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</p>

                  {/* Progress Bar (Only for percentage values) */}
                  {stat.value.includes('%') && (
                    <div className="mt-4">
                      <div className={`h-2 rounded-full bg-gray-200 overflow-hidden`}>
                        <div
                          className={`h-full rounded-full ${stat.color === 'amber' ? 'bg-amber-500' :
                              stat.color === 'blue' ? 'bg-blue-500' :
                                'bg-green-500' // Changed purple to green for good
                            }`}
                          style={{ width: stat.value }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
              {/* Left Column */}
              <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                {/* Mentor Card */}
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 shadow-2xl">
                  <div className="bg-white rounded-[14px] sm:rounded-[18px] p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                          Your Mentor
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">Assigned faculty mentor</p>
                      </div>
                      {mentor && (
                        <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full mt-2 sm:mt-0">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs sm:text-sm font-medium">Online Now</span>
                        </div>
                      )}
                    </div>

                    {mentorLoading ? (
                      <div className="flex items-center justify-center p-6 sm:p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : mentor ? (
                      <>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-blue-50 rounded-xl mb-4 sm:mb-6">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg shrink-0">
                            {getInitials(mentor.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{mentor.name}</h4>
                            <p className="text-sm text-gray-600 truncate">
                              {mentor.mentor_profile?.designation || 'Faculty'}, {mentor.department || 'Department'}
                            </p>
                            {mentor.mentor_profile?.expertise && (
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                {mentor.mentor_profile.expertise.slice(0, 3).map((exp, idx) => (
                                  <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                    {exp}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <Link
                            to="/dashboard/chat"
                            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center space-x-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm sm:text-base">Send Message</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                          <button className="group bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center space-x-2">
                            <Video className="w-4 h-4" />
                            <span className="text-sm sm:text-base">Schedule Call</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 sm:p-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        </div>
                        <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">No Mentor Assigned</h4>
                        <p className="text-gray-500 text-xs sm:text-sm mb-4">You haven't been assigned a mentor yet. Contact your department coordinator.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upcoming Classes - Keep Static for now or connect to Schedule API */}
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                      Today's Schedule
                    </h3>
                    <Link to="/dashboard/schedule" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center mt-1 sm:mt-0">
                      View Full Schedule
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {upcomingClasses.map((cls, idx) => (
                      <div
                        key={idx}
                        className="group p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${cls.status === 'lab' ? 'bg-purple-100 text-purple-600' :
                                cls.status === 'workshop' ? 'bg-amber-100 text-amber-600' :
                                  'bg-blue-100 text-blue-600'
                              }`}>
                              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-xs sm:text-sm font-bold text-blue-600">{cls.time}</span>
                                <span className={`text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${cls.status === 'lab' ? 'bg-purple-100 text-purple-700' :
                                    cls.status === 'workshop' ? 'bg-amber-100 text-amber-700' :
                                      'bg-blue-100 text-blue-700'
                                  }`}>
                                  {cls.status}
                                </span>
                              </div>
                              <h4 className="text-sm sm:text-base font-bold text-gray-800 truncate">{cls.title}</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{cls.room} • {cls.professor}</p>
                            </div>
                          </div>
                          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition">
                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6 sm:space-y-8">
                {/* Pending Tasks */}
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-2" />
                      Pending Tasks
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-white bg-amber-500 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                      {pendingTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {pendingTasks.map((task, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all"
                      >
                        <div className="flex items-start justify-between mb-1 sm:mb-2">
                          <h4 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">{task.title}</h4>
                          <span className={`text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{task.subject}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Due: {task.due}
                          </span>
                          <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                            Mark as done
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 sm:mt-6 py-2.5 sm:py-3 text-center border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg sm:rounded-xl text-sm text-gray-600 hover:text-blue-700 transition-all font-medium">
                    + Add New Task
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center mb-4 sm:mb-6">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" />
                    Recent Activity
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    {recentActivities.map((activity, idx) => (
                      <div key={idx} className="flex items-start space-x-2 sm:space-x-3">
                        <div className={`p-1.5 sm:p-2 rounded-lg ${activity.type === 'mentor' ? 'bg-blue-100 text-blue-600' :
                            activity.type === 'submission' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                          }`}>
                          {activity.type === 'mentor' ? <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" /> :
                            activity.type === 'submission' ? <FileText className="w-3 h-3 sm:w-4 sm:h-4" /> :
                              <Download className="w-3 h-3 sm:w-4 sm:h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-800">{activity.action}</p>
                          {activity.mentor && (
                            <p className="text-xs text-gray-500">with {activity.mentor}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/dashboard/activity"
                    className="mt-4 sm:mt-6 block text-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center"
                  >
                    View All Activity
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </Link>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:bg-blue-200 transition">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Course Materials</span>
                    </button>
                    <button className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:bg-amber-200 transition">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Find Mentor</span>
                    </button>
                    <button className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:bg-green-200 transition">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Assignments</span>
                    </button>
                    <button className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:bg-purple-200 transition">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Grades</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardHome;