import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from './services/api';

import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ChatInterface from './pages/ChatInterface';
import ScheduleMeeting from './pages/ScheduleMeeting';
import Academics from './pages/Academics';

const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      // Only check if token exists - skip API call if no token
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await api.get('/users/profile');
        setUser(res.data);
      } catch (err) {
        console.error('Error loading user:', err);
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/onboarding"
          element={user ? <StudentDashboard user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path="/onboarding/chat"
          element={user ? <ChatInterface /> : <Navigate to="/login" />}
        />

        <Route
          path="/onboarding/schedule"
          element={user ? <ScheduleMeeting /> : <Navigate to="/login" />}
        />

        <Route
          path="/onboarding/academics"
          element={user ? <Academics /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
