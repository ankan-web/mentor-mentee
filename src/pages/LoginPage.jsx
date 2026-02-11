import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api'; 
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  LogIn,
  ArrowLeft,
  Smartphone,
  Shield,
  AlertCircle,
  CreditCard // Added icon for Registration No
} from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // State for Form Data
  const [loginData, setLoginData] = useState({
    registration_no: '', // Changed from email to registration_no
    password: '',
    rememberMe: false
  });

  // State for UI Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');       
    setIsLoading(true); 

    try {
      // 1. Send UMS Login Request to Backend
      // This will check UMS credentials, create a user if new, and return a token
      const response = await api.post('/users/login-ums', {
        registration_no: loginData.registration_no,
        password: loginData.password
      });

      // 2. Handle Success
      const { token, name, role } = response.data;
      
      // Save Token & User Info
      setAuthToken(token);
      localStorage.setItem('userName', name);
      localStorage.setItem('userRole', role);

      // 3. Redirect to Dashboard
      // Since UMS sync fills profile data, we skip onboarding and go straight to dashboard
      navigate('/onboarding'); 

    } catch (err) {
      console.error("Login Error:", err);
      // Display error message from Backend (e.g., "Invalid Registration Number or Password")
      setError(err.response?.data?.message || 'Login failed. Please check your UMS credentials.');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Since we use UMS, we can't reset passwords here. 
    // We redirect/inform them to use the official UMS portal.
    alert('Please use the official Adamas University UMS portal to reset your password.');
    setIsForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 right-0 p-6">
        <Link to="/" className="inline-flex items-center space-x-3 text-blue-800 hover:text-blue-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          {/* Logo Section */}
          <div className="flex justify-center mb-4">
             <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center text-blue-800 font-bold text-2xl">
                A
             </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Adamas University</h1>
          <p className="text-blue-600 font-medium">Mentor-Mentee Platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Information */}
            <div className="md:w-2/5 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8 md:p-12">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  {isForgotPassword ? 'Reset Your Password' : 'Welcome Back'}
                </h2>
                <p className="text-blue-200 mb-6">
                  {isForgotPassword 
                    ? "Please visit the official UMS portal to reset your password. We sync directly with university records."
                    : "Continue your mentorship journey. Log in using your official University Management System (UMS) credentials."
                  }
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure Access</h4>
                      <p className="text-blue-300 text-sm">Direct UMS Authentication</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Academic Network</h4>
                      <p className="text-blue-300 text-sm">Synced with your profile</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Removed "Create Account" link since we use UMS login */}
              <div className="mt-8">
                 <p className="text-blue-200 text-sm italic">
                    * Use your Registration No. (e.g. AU/2022/...)
                 </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {isForgotPassword ? 'Reset Password' : 'Sign In via UMS'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {isForgotPassword 
                    ? 'Redirecting to UMS Helpdesk...'
                    : 'Enter your Registration Number & UMS Password'
                  }
                </p>
              </div>

              {/* Error Alert Display */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 animate-fadeIn">
                  <AlertCircle size={18} />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {!isForgotPassword ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Registration Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={loginData.registration_no}
                        onChange={(e) => setLoginData({...loginData, registration_no: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="AU/2022/XXXX"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gray-700 font-medium">Password</label>
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Your UMS Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={loginData.rememberMe}
                        onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="remember" className="ml-2 text-gray-600">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`
                      w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 
                      text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-300 transform 
                      ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 shadow-lg hover:shadow-xl'}
                    `}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <LogIn className="w-5 h-5" />
                      <span className="text-lg">
                        {isLoading ? 'Verifying with UMS...' : 'Sign In'}
                      </span>
                    </span>
                  </button>

                  {/* Alternative Login Options */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2"
                    >
                      <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">U</div>
                      <span>Faculty Login</span>
                    </button>
                    
                    <button
                      type="button"
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2"
                    >
                      <Smartphone className="w-5 h-5 text-gray-600" />
                      <span>Admin Login</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">UMS Password Reset</h3>
                  <p className="text-gray-600 mb-6">
                    Since your account is linked to the university system, you must reset your password through the official portal.
                  </p>
                  <a 
                    href="https://adamasknowledgecity.ac.in/student/forgot-password" // Replace with actual UMS URL if different
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Go to UMS Portal
                  </a>
                  <button
                    onClick={() => setIsForgotPassword(false)}
                    className="block w-full mt-4 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Back to Login
                  </button>
                </div>
              )}

              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Terms of Service
                  </a>{' '}
                  and acknowledge our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Adamas University Mentor-Mentee Platform. All rights reserved.</p>
          <p className="text-sm mt-2">
            For technical support, contact: support@adamasuniversity.ac.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;