import React from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import ChatInterface from './pages/ChatInterface';
import ScheduleMeeting from './pages/ScheduleMeeting';
import Academics from './pages/Academics';
// import PremiumSignupPage from './pages/SignupPage';
// import StudentHomeFeed from './pages/HomePage';
// import Marketplace from './pages/MarketPlacePage';
// import LostAndFoundPage from './pages/LostAndFoundPage';
// import LoginPage from './pages/LoginPage';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/dashboard/chat" element={<ChatInterface />} />
          <Route path="/dashboard/schedule" element={<ScheduleMeeting />} />
          <Route path="/dashboard/academics" element={<Academics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* <Route path="/signup" element={<PremiumSignupPage/>}/>
          <Route path="/home" element={<StudentHomeFeed/>}/>
          <Route path="/marketplace" element={<Marketplace/>}/>
          <Route path="/lost-n-found" element={<LostAndFoundPage/>}/>
          <Route path="/login" element={<LoginPage/>}/> */}

        </Routes>
        </Router>
    </>
  )
}

export default App
