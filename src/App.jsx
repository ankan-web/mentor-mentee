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
      try {
        const res = await api.get('/users/profile');
        setUser(res.data);
      } catch (err) {
        console.error('Error loading user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <div>Loading...</div>;

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
