import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  Search, 
  FileText, 
  Image as ImageIcon,
  Check, 
  CheckCheck,
  Calendar,
  AlertCircle,
  X,
  Menu,
  ChevronLeft,
  Download,
  Mic,
  Smile,
  Clock,
  User,
  MessageSquare,
  BookOpen,
  Target,
  FileCode,
  Video as VideoIcon,
  GraduationCap
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Memoized Message Component to prevent unnecessary re-renders
const MessageBubble = React.memo(({ msg, mentorDetails }) => {
  return (
    <div 
      className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`
        max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 relative group transition-all duration-300
        ${msg.sender === 'student' 
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none shadow-lg' 
          : 'bg-gradient-to-r from-gray-50 to-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
        }
      `}>
        
        {/* Sender Info for Mentor Messages */}
        {msg.sender === 'mentor' && (
          <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1.5 sm:mb-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {mentorDetails.avatar.charAt(0)}
            </div>
            <span className="text-xs font-semibold text-gray-700">{mentorDetails.name.split(' ')[0]}</span>
          </div>
        )}

        {/* File Attachment */}
        {msg.type === 'file' && (
          <div className={`mb-2 sm:mb-3 p-2 sm:p-3 rounded-lg sm:rounded-xl ${msg.sender === 'student' ? 'bg-white/10' : 'bg-blue-50 border border-blue-100'}`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${msg.sender === 'student' ? 'bg-white/20' : 'bg-white'}`}>
                <FileText className={`w-5 h-5 sm:w-6 sm:h-6 ${msg.sender === 'student' ? 'text-white' : 'text-blue-600'}`} />
              </div>
              <div className="flex-1 overflow-hidden min-w-0">
                <p className={`font-bold text-xs sm:text-sm truncate ${msg.sender === 'student' ? 'text-white' : 'text-gray-800'}`}>
                  {msg.fileName}
                </p>
                <p className={`text-xs ${msg.sender === 'student' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {msg.fileSize} • PDF
                </p>
              </div>
              <button className={`p-1.5 sm:p-2 rounded-lg ${msg.sender === 'student' ? 'hover:bg-white/20' : 'hover:bg-blue-100'}`}>
                <Download className={`w-4 h-4 ${msg.sender === 'student' ? 'text-white' : 'text-blue-600'}`} />
              </button>
            </div>
          </div>
        )}

        {/* Message Content */}
        <p className={`text-sm sm:text-base leading-relaxed ${msg.type === 'file' ? 'mb-1' : ''} ${msg.sender === 'student' ? 'text-blue-50' : 'text-gray-700'}`}>
          {msg.content}
        </p>

        {/* Message Metadata */}
        <div className={`flex items-center justify-end mt-1.5 sm:mt-2 ${msg.sender === 'student' ? 'text-blue-200' : 'text-gray-400'}`}>
          <span className="text-xs">{msg.time}</span>
          {msg.sender === 'student' && (
            <span className="flex items-center ml-1">
              {msg.status === 'sent' && <Check className="w-3 h-3 ml-1" />}
              {msg.status === 'delivered' && <CheckCheck className="w-3 h-3 ml-1" />}
              {msg.status === 'read' && <CheckCheck className="w-3 h-3 ml-1 text-blue-300" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Mock Mentor Details
  const mentorDetails = {
    name: 'Dr. S. Chatterjee',
    department: 'Computer Science Department',
    designation: 'Professor',
    rating: '4.8/5',
    nextMeeting: 'Tomorrow, 2:00 PM',
    status: 'online',
    avatar: 'SC',
    subjects: ['Database Management', 'Algorithms', 'Machine Learning']
  };

  // Mock Messages Data
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'mentor',
      type: 'text',
      content: 'Hello Ankan! I reviewed your project proposal.',
      time: '10:00 AM',
      status: 'read'
    },
    {
      id: 2,
      sender: 'mentor',
      type: 'text',
      content: 'The "Mental Health" topic is good, but you need to refine the scope.',
      time: '10:01 AM',
      status: 'read'
    },
    {
      id: 3,
      sender: 'student',
      type: 'text',
      content: 'Okay sir. Should I focus only on the chatbot part for the MVP?',
      time: '10:05 AM',
      status: 'read'
    },
    {
      id: 4,
      sender: 'mentor',
      type: 'file',
      fileName: 'Project_Guidelines_v2.pdf',
      fileSize: '2.4 MB',
      content: 'Check this document for the new requirements.',
      time: '10:15 AM',
      status: 'read'
    },
    {
      id: 5,
      sender: 'mentor',
      type: 'text',
      content: 'Also, remember to submit your mid-term progress report by Friday.',
      time: '10:16 AM',
      status: 'read'
    },
  ]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'student',
      type: 'text',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Focus back on textarea after sending
    textareaRef.current?.focus();

    // Simulate Auto-Reply (for demo)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'mentor',
        type: 'text',
        content: 'Got it. Let\'s discuss this in our next meeting.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      }]);
    }, 2000);
  }, [newMessage]);

  const handleFileUpload = useCallback((type) => {
    // Handle file upload logic here
    console.log(`Uploading ${type}`);
    setShowAttachmentMenu(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-white/90 backdrop-blur-lg shadow-sm z-40 border-b border-gray-200">
        <div className="px-3 sm:px-6 py-2 sm:py-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <Link to="/onboarding" className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/au_logo.png" 
                alt="Adamas University" 
                className="h-8 sm:h-10 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-bold text-gray-800">Adamas University</h1>
                <p className="text-xs sm:text-sm text-blue-600">Mentor Chat</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link 
              to="/onboarding"
              className="hidden md:inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Onboarding</span>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-right hidden md:block">
                <h3 className="font-semibold text-gray-800 text-sm">Ankan Das</h3>
                <p className="text-xs text-gray-500">CSE, 3rd Year</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                AD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 sm:pt-20">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <main className={`
          flex-1 transition-all duration-300 min-h-screen
          ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
          p-3 sm:p-4 lg:p-8
        `}>
          <div className="max-w-6xl mx-auto">
            {/* Chat Header */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6 overflow-hidden">
              <div className="p-3 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg">
                        {mentorDetails.avatar}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">{mentorDetails.name}</h2>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{mentorDetails.designation}, {mentorDetails.department}</p>
                      <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                        <span className="flex items-center text-xs sm:text-sm text-amber-600 font-medium">
                          ⭐ {mentorDetails.rating}
                        </span>
                        <span className="flex items-center text-xs sm:text-sm text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Next: {mentorDetails.nextMeeting}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button className="p-2 sm:p-3 bg-blue-50 text-blue-600 rounded-lg sm:rounded-xl hover:bg-blue-100 transition-all hover:-translate-y-0.5">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button className="p-2 sm:p-3 bg-purple-50 text-purple-600 rounded-lg sm:rounded-xl hover:bg-purple-100 transition-all hover:-translate-y-0.5">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <Link 
                      to="/onboarding/schedule"
                      className="hidden md:inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all hover:-translate-y-0.5 shadow-md"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mentor Expertise */}
              <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Expertise:</span>
                  {mentorDetails.subjects.map((subject, idx) => (
                    <span key={idx} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-blue-200 text-blue-700 text-xs font-medium rounded-full">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Messages Column */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                  {/* Messages Header */}
                  <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800">Messages</h3>
                    </div>
                    <div className="relative hidden sm:block">
                      <input 
                        type="text" 
                        placeholder="Search messages..." 
                        className="pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-48"
                      />
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Messages Container */}
                  <div className="h-[350px] sm:h-[400px] lg:h-[500px] overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6">
                    {/* Date Divider */}
                    <div className="flex justify-center">
                      <span className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-700 border border-blue-200">
                        Today • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </span>
                    </div>

                    {messages.map((msg) => (
                      <MessageBubble 
                        key={msg.id} 
                        msg={msg} 
                        mentorDetails={mentorDetails}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-3 sm:p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <form onSubmit={handleSendMessage} className="relative">
                      <div className="flex items-end gap-1.5 sm:gap-2">
                        {/* Attachment Button */}
                        <div className="relative">
                          <button 
                            type="button"
                            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                            className="p-2 sm:p-3 bg-white border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all hover:-translate-y-0.5"
                          >
                            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          
                          {/* Attachment Menu */}
                          {showAttachmentMenu && (
                            <div className="absolute bottom-full mb-2 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 w-40 sm:w-48 z-50">
                              <button 
                                type="button"
                                onClick={() => handleFileUpload('document')}
                                className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition text-left"
                              >
                                <FileText className="w-4 h-4" />
                                <span className="text-xs sm:text-sm font-medium">Document</span>
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleFileUpload('image')}
                                className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition text-left"
                              >
                                <ImageIcon className="w-4 h-4" />
                                <span className="text-xs sm:text-sm font-medium">Image</span>
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleFileUpload('code')}
                                className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition text-left"
                              >
                                <FileCode className="w-4 h-4" />
                                <span className="text-xs sm:text-sm font-medium">Code File</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Text Input */}
                        <div className="flex-1 relative">
                          <textarea
                            ref={textareaRef}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                              }
                            }}
                            placeholder="Type your message..."
                            className="w-full p-2.5 sm:p-4 bg-white border border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                            rows="1"
                            style={{ minHeight: '48px', maxHeight: '120px' }}
                          />
                          <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex items-center space-x-1 sm:space-x-2">
                            <button type="button" className="p-1 sm:p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                              <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button type="button" className="p-1 sm:p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 hidden sm:block">
                              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Send Button */}
                        <button 
                          type="submit"
                          disabled={!newMessage.trim()}
                          className={`
                            p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center
                            ${newMessage.trim() 
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }
                          `}
                        >
                          <Send className={`w-4 h-4 sm:w-5 sm:h-5 ${newMessage.trim() ? 'ml-0.5' : ''}`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1.5 sm:mt-2 px-1 sm:px-2">
                        <p className="text-xs text-gray-500 hidden sm:block">
                          Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">Enter</kbd> to send
                        </p>
                        <p className="text-xs text-blue-600 font-medium flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Academic communication only
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Quick Actions */}
              <div className="space-y-4 sm:space-y-6 hidden lg:block">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                    Quick Actions
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <Link 
                      to="/onboarding/schedule"
                      className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg sm:rounded-xl transition group"
                    >
                      <span className="text-xs sm:text-sm font-medium">Schedule Meeting</span>
                      <Calendar className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg sm:rounded-xl transition group">
                      <span className="text-xs sm:text-sm font-medium">Request Review</span>
                      <BookOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg sm:rounded-xl transition group">
                      <span className="text-xs sm:text-sm font-medium">Video Call</span>
                      <VideoIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Recent Files */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 mr-2" />
                    Shared Files
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center p-2.5 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl hover:border-blue-300 transition">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3 shrink-0">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">Project_Guidelines.pdf</p>
                        <p className="text-xs text-gray-500">2.4 MB • Yesterday</p>
                      </div>
                      <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center p-2.5 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl hover:border-blue-300 transition">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3 shrink-0">
                        <FileCode className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">Algorithm_Implementation.py</p>
                        <p className="text-xs text-gray-500">12 KB • 2 days ago</p>
                      </div>
                      <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 flex items-center">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                    Chat Guidelines
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    <li className="flex items-start text-xs sm:text-sm text-gray-700">
                      <Check className="w-3 h-3 text-green-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
                      <span>Be specific with your questions</span>
                    </li>
                    <li className="flex items-start text-xs sm:text-sm text-gray-700">
                      <Check className="w-3 h-3 text-green-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
                      <span>Share files for better guidance</span>
                    </li>
                    <li className="flex items-start text-xs sm:text-sm text-gray-700">
                      <Check className="w-3 h-3 text-green-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
                      <span>Schedule calls for complex topics</span>
                    </li>
                    <li className="flex items-start text-xs sm:text-sm text-gray-700">
                      <Check className="w-3 h-3 text-green-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
                      <span>Allow 24-48 hrs for responses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatInterface;