import React, { useState } from 'react';
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
  Menu
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import './ScheduleMeeting.css'; 

const ScheduleMeeting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        fullDate: date,
        available: [1, 3, 4, 5].includes(date.getDay()) 
      });
    }
    return dates;
  };

  const dates = generateDates();

  const timeSlots = [
    { time: '10:00 AM', status: 'available' },
    { time: '10:30 AM', status: 'busy' }, 
    { time: '11:00 AM', status: 'available' },
    { time: '11:30 AM', status: 'available' },
    { time: '02:00 PM', status: 'available' },
    { time: '02:30 PM', status: 'busy' },
    { time: '03:00 PM', status: 'available' },
    { time: '03:30 PM', status: 'available' },
  ];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return;
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-white animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Appointment Confirmed!</h2>
            <p className="text-slate-500 mb-6">
              Your request has been sent to <strong>Dr. S. Chatterjee</strong>.
            </p>
            
            <div className="bg-slate-50 rounded-xl p-4 text-left space-y-3 mb-8 border border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date</span>
                <span className="font-bold text-slate-800">
                  {selectedDate?.fullDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Time</span>
                <span className="font-bold text-slate-800">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Mode</span>
                <span className="font-bold text-blue-600 flex items-center gap-1">
                  {mode === 'Online' ? <Video size={14}/> : <MapPin size={14}/>} {mode}
                </span>
              </div>
            </div>

            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Background Elements - Fixed position so they don't scroll away */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="flex-1 w-full relative z-10 p-4 md:p-8">
        
        {/* Header with Menu Button */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 bg-white rounded-lg shadow-sm text-slate-700 hover:bg-slate-50 transition z-50"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Schedule Meeting</h1>
            <p className="text-sm md:text-base text-slate-500">Book a slot with your mentor</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pb-20 lg:pb-0">
          
          {/* --- LEFT COLUMN: SELECTION --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Date Selection */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 md:p-6 shadow-lg">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="text-blue-600" size={20} /> Select Date
              </h3>
              
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {dates.map((date, idx) => (
                  <button
                    key={idx}
                    disabled={!date.available}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      flex flex-col items-center justify-center min-w-[4.5rem] h-20 rounded-2xl border transition-all duration-300 snap-center
                      ${!date.available ? 'opacity-40 bg-slate-100 border-transparent cursor-not-allowed' : 'cursor-pointer hover:border-blue-300 hover:bg-white'}
                      ${selectedDate?.date === date.date 
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-transparent shadow-lg shadow-blue-500/30 scale-105' 
                        : 'bg-white border-slate-100 text-slate-600'
                      }
                    `}
                  >
                    <span className="text-xs font-medium uppercase mb-1 opacity-80">{date.day}</span>
                    <span className="text-xl font-bold">{date.date}</span>
                  </button>
                ))}
              </div>
              {!selectedDate && <p className="text-xs text-slate-400 mt-2">* Greyed out dates are unavailable</p>}
            </div>

            {/* 2. Time Selection */}
            <div className={`
              bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 md:p-6 shadow-lg transition-all duration-500
              ${selectedDate ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none grayscale'}
            `}>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="text-purple-600" size={20} /> Select Time
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={slot.status === 'busy'}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`
                      py-3 px-2 md:px-4 rounded-xl text-sm font-semibold border transition-all duration-200
                      ${slot.status === 'busy' 
                        ? 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed line-through' 
                        : 'hover:border-purple-300 hover:bg-white'
                      }
                      ${selectedTime === slot.time 
                        ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white border-transparent shadow-md' 
                        : 'bg-white border-slate-100 text-slate-600'
                      }
                    `}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Details Form */}
            <div className={`
              bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 md:p-6 shadow-lg transition-all duration-500 delay-100
              ${selectedTime ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none grayscale'}
            `}>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlignLeft className="text-pink-600" size={20} /> Meeting Details
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Type Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Purpose</label>
                    <div className="relative">
                      <select 
                        value={meetingType}
                        onChange={(e) => setMeetingType(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      >
                        <option>Academic Review</option>
                        <option>Project Guidance</option>
                        <option>Career Counseling</option>
                        <option>Attendance Issue</option>
                        <option>Personal Issue</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <ChevronRight className="rotate-90" size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Mode Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Preferred Mode</label>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      <button 
                        onClick={() => setMode('Offline')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'Offline' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <MapPin size={16} /> In-Person
                      </button>
                      <button 
                        onClick={() => setMode('Online')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'Online' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <Video size={16} /> Online
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Additional Note</label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. I want to discuss my marks in DBMS..."
                    className="w-full bg-white border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none h-24"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Booking Summary</h3>

              {/* Mentor Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                  SC
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Mentor</p>
                  <p className="font-bold text-slate-800">Dr. S. Chatterjee</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-2"><Calendar size={16}/> Date</span>
                  <span className={`font-semibold text-sm ${selectedDate ? 'text-slate-800' : 'text-slate-400 italic'}`}>
                    {selectedDate ? selectedDate.fullDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select Date'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-2"><Clock size={16}/> Time</span>
                  <span className={`font-semibold text-sm ${selectedTime ? 'text-slate-800' : 'text-slate-400 italic'}`}>
                    {selectedTime || 'Select Time'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-2"><Type size={16}/> Type</span>
                  <span className="font-semibold text-sm text-slate-800 text-right truncate ml-4">{meetingType}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-slate-500 text-sm flex items-center gap-2">
                     {mode === 'Online' ? <Video size={16}/> : <MapPin size={16}/>} Mode
                   </span>
                  <span className={`font-semibold text-sm ${mode === 'Online' ? 'text-blue-600' : 'text-slate-800'}`}>
                    {mode}
                  </span>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-xl p-3 mb-6 flex items-start gap-2">
                <Info size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  A calendar invite will be sent to your university email upon confirmation.
                </p>
              </div>

              {/* Confirm Button */}
              <button 
                onClick={handleBook}
                disabled={!selectedDate || !selectedTime}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                  ${selectedDate && selectedTime 
                    ? 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl transform hover:-translate-y-1' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }
                `}
              >
                Confirm Booking <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;