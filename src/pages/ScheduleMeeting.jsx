import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ChevronRight, 
  CheckCircle,
  Type,
  AlignLeft,
  Info,
  Menu,
  GraduationCap,
  User,
  Mail,
  Phone,
  MessageSquare,
  LogOut
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api, { setAuthToken } from '../services/api';

const ScheduleMeeting = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // User data state - fetched from API
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || 'Student',
    department: 'Computer Science',
    roll_no: ''
  });

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/profile');
        const data = response.data;
        const profile = data.student_profile || {};

        setUser({
          name: data.name || 'Student',
          department: data.department || 'Computer Science',
          roll_no: profile.roll_no || ''
        });

        // Update localStorage for consistency
        localStorage.setItem('userName', data.name);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Get initials from name
  const getInitials = (name) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'U';
  };

  // Handle logout
  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setShowProfileMenu(false);
    navigate('/login');
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [meetingType, setMeetingType] = useState('Academic Review');
  const [mode, setMode] = useState('Offline');
  const [note, setNote] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Mock Dates (Next 7 days)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: date,
        available: ![0, 6].includes(date.getDay())
      });
    }
    return dates;
  };

  const dates = generateDates();

  const timeSlots = [
    { time: '09:00 AM', status: 'available' },
    { time: '10:00 AM', status: 'available' },
    { time: '10:30 AM', status: 'busy' },
    { time: '11:00 AM', status: 'available' },
    { time: '11:30 AM', status: 'available' },
    { time: '12:00 PM', status: 'busy' },
    { time: '02:00 PM', status: 'available' },
    { time: '02:30 PM', status: 'available' },
    { time: '03:00 PM', status: 'available' },
    { time: '03:30 PM', status: 'busy' },
    { time: '04:00 PM', status: 'available' },
  ];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return;
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setNote('');
    setMeetingType('Academic Review');
    setMode('Offline');
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <nav className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-lg shadow-sm z-40 border-b border-gray-200">
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
                  <p className="text-sm text-blue-600">Schedule Meeting</p>
                </div>
              </div>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 hover:bg-gray-50 rounded-xl p-1.5 transition-colors"
              >
                <div className="text-right hidden md:block">
                  <h3 className="font-semibold text-gray-800 text-sm">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.department || 'Department'}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
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
                      <p className="text-xs text-gray-500">{user.roll_no || 'Student'}</p>
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
        </nav>

        <div className="flex pt-20">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className={`
            flex-1 transition-all duration-300 min-h-screen
            ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
            flex items-center justify-center p-4
          `}>
            <div className="max-w-md w-full">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Meeting Scheduled!</h2>
                <p className="text-gray-600 mb-6">
                  Your meeting with <span className="font-semibold">Dr. S. Chatterjee</span> has been confirmed.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-8 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">
                        {selectedDate?.fullDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">{selectedTime}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      {mode === 'Online' ? (
                        <Video className="w-4 h-4 text-blue-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-gray-700">{mode} Meeting</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Type className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">{meetingType}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleReset}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
                  >
                    Schedule Another Meeting
                  </button>
                  <button 
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-white/90 backdrop-blur-lg shadow-sm z-40 border-b border-gray-200">
        <div className="px-3 sm:px-6 py-2 sm:py-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/au_logo.png" 
                alt="Adamas University" 
                className="h-8 sm:h-10 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-bold text-gray-800">Adamas University</h1>
                <p className="text-xs sm:text-sm text-blue-600">Schedule Meeting</p>
              </div>
            </div>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 rounded-xl p-1.5 transition-colors"
            >
              <div className="text-right hidden md:block">
                <h3 className="font-semibold text-gray-800 text-sm">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.department || 'Department'}</p>
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
                    <p className="text-xs text-gray-500">{user.roll_no || 'Student'}</p>
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
      </nav>

      <div className="flex pt-16 sm:pt-20">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <main className={`
          flex-1 transition-all duration-300 min-h-screen
          ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
          p-4 sm:p-6 lg:p-8
        `}>
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                  Schedule a <span className="text-blue-700">Meeting</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Book a one-on-one session with your academic mentor
                </p>
              </div>
            </div>

            {/* Mentor Profile Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 shadow-xl mb-6 sm:mb-8">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg shrink-0">
                      SC
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-xl font-bold text-gray-800">Dr. S. Chatterjee</h2>
                      <p className="text-xs sm:text-sm text-gray-600">Professor, Computer Science Department</p>
                      <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                        <span className="flex items-center text-xs sm:text-sm text-amber-600">
                          ⭐ 4.8/5 (42 reviews)
                        </span>
                        <span className="flex items-center text-xs sm:text-sm text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
                          Available Today
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button className="p-2 sm:p-3 bg-blue-50 text-blue-600 rounded-lg sm:rounded-xl hover:bg-blue-100 transition">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button className="p-2 sm:p-3 bg-purple-50 text-purple-600 rounded-lg sm:rounded-xl hover:bg-purple-100 transition">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Left Column - Selection */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                
                {/* Date Selection */}
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    Select Date
                  </h3>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                    {dates.map((date, idx) => (
                      <button
                        key={idx}
                        disabled={!date.available}
                        onClick={() => setSelectedDate(date)}
                        className={`
                          flex flex-col items-center p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300
                          ${!date.available 
                            ? 'opacity-40 bg-gray-50 border-gray-200 cursor-not-allowed' 
                            : 'hover:border-blue-300 hover:shadow-md'
                          }
                          ${selectedDate?.date === date.date 
                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-transparent shadow-lg scale-105' 
                            : 'bg-white border-gray-200 text-gray-700'
                          }
                        `}
                      >
                        <span className="text-[10px] sm:text-xs font-medium uppercase mb-0.5 sm:mb-1">
                          {date.day}
                        </span>
                        <span className="text-base sm:text-xl font-bold">{date.date}</span>
                        <span className="text-[10px] sm:text-xs opacity-80">{date.month}</span>
                      </button>
                    ))}
                  </div>
                  
                  {!selectedDate && (
                    <p className="text-xs text-gray-500 mt-2 sm:mt-3 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Weekends are unavailable
                    </p>
                  )}
                </div>

                {/* Time Selection */}
                <div className={`
                  bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg transition-all duration-500
                  ${selectedDate ? 'opacity-100' : 'opacity-50 pointer-events-none grayscale'}
                `}>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    Select Time Slot
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    {timeSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={slot.status === 'busy'}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`
                          py-2 sm:py-3 px-1 sm:px-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200
                          ${slot.status === 'busy' 
                            ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed line-through' 
                            : 'hover:border-purple-300 hover:shadow-md'
                          }
                          ${selectedTime === slot.time 
                            ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white border-transparent shadow-md' 
                            : 'bg-white border-gray-200 text-gray-600'
                          }
                        `}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 sm:mt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Available
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      Booked
                    </span>
                  </div>
                </div>

                {/* Meeting Details */}
                <div className={`
                  bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg transition-all duration-500
                  ${selectedTime ? 'opacity-100' : 'opacity-50 pointer-events-none grayscale'}
                `}>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                    Meeting Details
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Purpose */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-gray-700">
                          Purpose of Meeting
                        </label>
                        <div className="relative">
                          <select 
                            value={meetingType}
                            onChange={(e) => setMeetingType(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 sm:py-3 px-3 sm:px-4 pr-8 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-xs sm:text-sm"
                          >
                            <option>Academic Review</option>
                            <option>Project Guidance</option>
                            <option>Career Counseling</option>
                            <option>Attendance Issue</option>
                            <option>Personal Mentoring</option>
                            <option>Research Discussion</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <ChevronRight className="rotate-90 w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Mode */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-gray-700">
                          Meeting Mode
                        </label>
                        <div className="flex bg-gray-100 p-1 rounded-lg sm:rounded-xl">
                          <button 
                            onClick={() => setMode('Offline')}
                            className={`
                              flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all
                              ${mode === 'Offline' 
                                ? 'bg-white text-gray-800 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                              }
                            `}
                          >
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            In-Person
                          </button>
                          <button 
                            onClick={() => setMode('Online')}
                            className={`
                              flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all
                              ${mode === 'Online' 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                              }
                            `}
                          >
                            <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Online
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700">
                        Additional Notes
                      </label>
                      <textarea 
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g., I want to discuss my project proposal and get feedback..."
                        className="w-full bg-white border border-gray-200 text-gray-700 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none h-20 sm:h-24 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xl">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Booking Summary
                  </h3>

                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold">
                          SC
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">Mentor</p>
                          <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">Dr. S. Chatterjee</p>
                          <p className="text-xs text-blue-600">CSE Department</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 sm:pt-4">
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Date
                        </span>
                        <span className={`font-medium text-xs sm:text-sm ${selectedDate ? 'text-gray-800' : 'text-gray-400'}`}>
                          {selectedDate 
                            ? selectedDate.fullDate.toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              }) 
                            : 'Not selected'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Time
                        </span>
                        <span className={`font-medium text-xs sm:text-sm ${selectedTime ? 'text-gray-800' : 'text-gray-400'}`}>
                          {selectedTime || 'Not selected'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
                          <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Purpose
                        </span>
                        <span className="font-medium text-xs sm:text-sm text-gray-800 text-right">
                          {meetingType}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 sm:gap-2">
                          {mode === 'Online' ? <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                          Mode
                        </span>
                        <span className={`font-medium text-xs sm:text-sm ${mode === 'Online' ? 'text-blue-600' : 'text-gray-800'}`}>
                          {mode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-blue-700">
                          A calendar invitation will be sent to your university email after confirmation.
                        </p>
                        {mode === 'Online' && (
                          <p className="text-xs text-blue-700 mt-1">
                            Google Meet link will be generated automatically.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleBook}
                    disabled={!selectedDate || !selectedTime}
                    className={`
                      w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                      ${selectedDate && selectedTime 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:-translate-y-0.5' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    Confirm Booking
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScheduleMeeting;