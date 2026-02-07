import React, { useState, useRef, useEffect } from 'react';
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
  Menu
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Mock Current User
//   const currentUser = { id: 'student', name: 'Ankan' };

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
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'student',
      type: 'text',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate Auto-Reply (for demo)
    setTimeout(() => {
        setMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'mentor',
            type: 'text',
            content: 'Got it. Let\'s discuss this in our next meeting.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read'
        }]);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 relative overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-col h-screen flex-1 overflow-hidden">
      {/* Background Blobs (Consistent with Dashboard) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      {/* --- CHAT HEADER --- */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition inline-flex"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              SC
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Dr. S. Chatterjee</h2>
            <p className="text-xs text-blue-600 font-medium">CSE Dept • Online</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button 
             onClick={() => window.location.href='/dashboard/schedule'}
             className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-semibold"
           >
             <Calendar size={18} /> Schedule Meeting
           </button>
           <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition">
             <Search size={20} />
           </button>
           <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition">
             <MoreVertical size={20} />
           </button>
        </div>
      </header>
      

      {/* --- NOTICE BANNER --- */}
      <div className="relative z-10 bg-amber-50 border-b border-amber-100 px-4 py-2 text-center">
        <p className="text-xs text-amber-800 flex items-center justify-center gap-2 font-medium">
          <AlertCircle size={14} />
          This is an official academic channel. Chats may be monitored for quality assurance.
        </p>
      </div>

      {/* --- MESSAGES AREA --- */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10">
        {/* Date Divider */}
        <div className="flex justify-center">
          <span className="bg-slate-200/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-500">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[85%] md:max-w-[60%] rounded-2xl p-4 shadow-sm relative group
              ${msg.sender === 'student' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none' 
                : 'bg-white/80 backdrop-blur-md border border-white text-slate-800 rounded-tl-none'
              }
            `}>
              
              {/* File Attachment Styling */}
              {msg.type === 'file' && (
                <div className={`flex items-center gap-3 mb-3 p-3 rounded-xl ${msg.sender === 'student' ? 'bg-white/10' : 'bg-slate-50'}`}>
                  <div className="w-10 h-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-sm font-bold truncate ${msg.sender === 'student' ? 'text-white' : 'text-slate-800'}`}>{msg.fileName}</p>
                    <p className={`text-xs ${msg.sender === 'student' ? 'text-blue-100' : 'text-slate-500'}`}>{msg.fileSize} • PDF</p>
                  </div>
                </div>
              )}

              {/* Text Content */}
              <p className={`text-sm leading-relaxed ${msg.type === 'file' ? 'mb-1' : ''}`}>
                {msg.content}
              </p>

              {/* Metadata (Time & Status) */}
              <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${msg.sender === 'student' ? 'text-blue-100' : 'text-slate-400'}`}>
                <span>{msg.time}</span>
                {msg.sender === 'student' && (
                  <span>
                    {msg.status === 'sent' && <Check size={12} />}
                    {msg.status === 'delivered' && <CheckCheck size={12} />}
                    {msg.status === 'read' && <CheckCheck size={12} className="text-blue-200" />}
                  </span>
                )}
              </div>

            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* --- INPUT AREA --- */}
      <div className="relative z-10 p-4 bg-white/80 backdrop-blur-xl border-t border-white/50">
        <form 
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-end gap-2 bg-white rounded-3xl p-2 shadow-lg border border-slate-100 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
        >
          {/* Attachment Button */}
          <button type="button" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-full transition">
            <Paperclip size={20} />
          </button>
          
          {/* Text Input */}
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder="Type your message..."
            className="flex-1 max-h-32 py-3 px-2 bg-transparent border-none outline-none text-sm text-slate-800 resize-none placeholder-slate-400"
            rows="1"
            style={{ minHeight: '44px' }} // prevent layout shift
          />

          {/* Send Button */}
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className={`
              p-3 rounded-full transition-all duration-300 flex items-center justify-center
              ${newMessage.trim() 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 transform hover:scale-105 active:scale-95' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            <Send size={20} className={newMessage.trim() ? 'ml-0.5' : ''} />
          </button>
        </form>
        
        <p className="text-center text-[10px] text-slate-400 mt-2">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>

      </div>
    </div>
  );
};

export default ChatInterface;