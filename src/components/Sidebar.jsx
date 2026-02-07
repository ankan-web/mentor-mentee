import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/dashboard/chat', icon: MessageSquare, label: 'Mentor Chat', badge: 2 },
    { path: '/dashboard/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/dashboard/academics', icon: BookOpen, label: 'Academics' },
  ];

  return (
    <>
      {/* Mobile Backdrop/Overlay - Fades in/out using CSS opacity */}
      <div 
        className={`
          fixed inset-0 z-30 bg-black/40 md:hidden transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={toggleSidebar}
      ></div>
      
      <aside className={`
        fixed md:sticky top-0 z-40 h-screen flex flex-col
        bg-white/80 backdrop-blur-xl border-r border-white/50 shadow-2xl
        transition-all duration-300 ease-in-out
        
        /* MOBILE STYLES (Default): Always w-72, Slide logic */
        w-72 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}

        /* DESKTOP STYLES (md:): Always visible, Width logic */
        md:translate-x-0 
        ${isOpen ? 'md:w-72' : 'md:w-20'}
      `}>

      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className={`flex items-center gap-3 transition-opacity duration-300 ${!isOpen ? 'md:justify-center w-full' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          
          {/* Title - Hidden on Desktop Collapse, Visible on Mobile Open */}
          <span className={`
            font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 whitespace-nowrap transition-all duration-300
            ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 md:hidden'} 
          `}>
            Adamas
          </span>
        </div>

        {/* Mobile Close Button */}
        <button onClick={toggleSidebar} className="md:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2 mt-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `
              w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden whitespace-nowrap
              ${isActive 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                : 'text-slate-500 hover:bg-white hover:shadow-md'
              }
              ${!isOpen && 'md:justify-center md:px-0'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} className={`shrink-0 ${!isActive ? 'group-hover:text-blue-600' : ''}`} />
                
                {/* Label - controlled by opacity/width for smooth hide */}
                <span className={`
                  font-medium transition-all duration-300
                  ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 md:hidden'}
                `}>
                  {item.label}
                </span>

                {item.badge && (
                  <span className={`
                    ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/50">
        <button className={`
          flex items-center gap-3 p-3 w-full rounded-xl hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all overflow-hidden whitespace-nowrap
          ${!isOpen && 'md:justify-center'}
        `}>
          <LogOut size={20} className="shrink-0" />
          <span className={`
            font-medium transition-all duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}
          `}>
            Sign Out
          </span>
        </button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;