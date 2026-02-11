import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  LogOut,
  X,
  Users,
  FileText,
  BarChart3,
  Award,
  Settings,
  HelpCircle,
  GraduationCap,
  Target,
  Bell,
  Home
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  // Check if we're in onboarding route
  const isOnboarding = location.pathname.includes('/onboarding');
  const basePath = isOnboarding ? '/onboarding' : '/dashboard';

  const navItems = [
    { 
      path: basePath, 
      icon: Home, 
      label: 'Dashboard', 
      end: true, 
      color: 'blue' 
    },
    { 
      path: `${basePath}/chat`, 
      icon: MessageSquare, 
      label: 'Mentor Chat', 
      badge: 3, 
      color: 'green',
      // Custom isActive check for chat routes
      isActive: (pathname) => pathname.includes('/chat')
    },
    { 
      path: `${basePath}/schedule`, 
      icon: Calendar, 
      label: 'Schedule', 
      color: 'purple' 
    },
    { 
      path: `${basePath}/academics`, 
      icon: BookOpen, 
      label: 'Academics', 
      color: 'amber' 
    },
    // { 
    //   path: `${basePath}/assignments`, 
    //   icon: FileText, 
    //   label: 'Assignments', 
    //   badge: 2, 
    //   color: 'red' 
    // },
    // { 
    //   path: `${basePath}/grades`, 
    //   icon: BarChart3, 
    //   label: 'Grades', 
    //   color: 'indigo' 
    // },
    // { 
    //   path: `${basePath}/mentors`, 
    //   icon: Users, 
    //   label: 'Mentors', 
    //   color: 'cyan' 
    // },
    // { 
    //   path: `${basePath}/achievements`, 
    //   icon: Award, 
    //   label: 'Achievements', 
    //   color: 'pink' 
    // },
  ];

  const bottomNavItems = [
    { path: `${basePath}/settings`, icon: Settings, label: 'Settings', color: 'gray' },
    { path: `${basePath}/support`, icon: HelpCircle, label: 'Help & Support', color: 'gray' },
  ];

  // Custom function to check if a route is active
  const isActiveRoute = (item) => {
    if (item.isActive) {
      return item.isActive(location.pathname);
    }
    
    if (item.end) {
      return location.pathname === item.path;
    }
    
    return location.pathname.startsWith(item.path);
  };

  return (
    <>
      {/* Mobile Backdrop/Overlay */}
      <div 
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          md:hidden
        `}
        onClick={toggleSidebar}
      ></div>
      
      {/* Sidebar Container - START BELOW NAVBAR (pt-20) */}
      <aside className={`
        fixed md:fixed top-20 left-0 z-50 h-[calc(100vh-5rem)] flex flex-col
        bg-gradient-to-b from-white to-gray-50 backdrop-blur-xl
        border-r border-gray-200 shadow-2xl
        transition-all duration-300 ease-in-out
        
        /* Mobile: Full width slide */
        w-72 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}

        /* Desktop: Always visible, collapsed/expanded */
        md:translate-x-0 
        ${isOpen ? 'md:w-72' : 'md:w-20'}
      `}>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className={`flex items-center justify-between ${!isOpen ? 'md:justify-center' : ''}`}>
            <div className={`flex items-center gap-3 transition-all duration-300 ${!isOpen ? 'md:justify-center' : ''}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              
              {/* Title */}
              <div className={`
                transition-all duration-300 overflow-hidden
                ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 md:hidden'}
              `}>
                <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">Adamas University</h2>
                <p className="text-sm text-blue-600 whitespace-nowrap">
                  {isOnboarding ? 'Onboarding' : 'Student Portal'}
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile - Only shown when expanded */}
          <div className={`
            mt-6 transition-all duration-300 overflow-hidden
            ${isOpen ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 md:hidden'}
          `}>
            <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  AD
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Ankan Das</h3>
                  <p className="text-xs text-gray-600">CSE • 3rd Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActiveRoute(item);
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
                  relative overflow-hidden
                  ${active 
                    ? `bg-gradient-to-r from-${item.color}-600 to-${item.color}-700 text-white shadow-lg` 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                  ${!isOpen && 'md:justify-center md:px-3'}
                `}
              >
                <>
                  <div className={`
                    flex items-center justify-center shrink-0 transition-all
                    ${active ? 'text-white' : `text-${item.color}-600 group-hover:text-${item.color}-700`}
                  `}>
                    <item.icon size={20} />
                  </div>
                  
                  {/* Label */}
                  <span className={`
                    font-medium transition-all duration-300 whitespace-nowrap
                    ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 md:hidden'}
                  `}>
                    {item.label}
                  </span>

                  {/* Badge */}
                  {item.badge && (
                    <span className={`
                      ml-auto bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 px-1.5 
                      rounded-full flex items-center justify-center shadow-sm transition-all duration-300
                      ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}
                    `}>
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="
                      absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-200 z-50 whitespace-nowrap
                      md:block hidden
                    ">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Navigation & Logout */}
        <div className="p-4 border-t border-gray-200">
          {/* Bottom Navigation Items */}
          <div className="mb-2 space-y-1">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group
                  ${isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }
                  ${!isOpen && 'md:justify-center md:px-3'}
                `}
              >
                <item.icon size={18} className="shrink-0" />
                <span className={`
                  font-medium transition-all duration-300 whitespace-nowrap
                  ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}
                `}>
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Logout Button */}
          <button className={`
            w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
            text-red-600 hover:bg-red-50 hover:text-red-700
            ${!isOpen && 'md:justify-center md:px-3'}
          `}>
            <LogOut size={18} className="shrink-0" />
            <span className={`
              font-medium transition-all duration-300 whitespace-nowrap
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