import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api, { setAuthToken } from '../services/api'; // 1. Import API
import { 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  UserPlus,
  BookOpen,
  ArrowLeft,
  Smartphone,
  Calendar,
  Briefcase,
  Building,
  AlertCircle // Added for error display
} from 'lucide-react';

const SignUpPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userTypeFromQuery = queryParams.get('type');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const [formData, setFormData] = useState({
    userType: userTypeFromQuery === 'mentor' ? 'mentor' : 'mentee',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    studentId: '',
    employeeId: '',
    designation: '',
    experience: ''
  });

  const departments = [
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Law',
    'Life Sciences',
    'Pharmacy',
    'Humanities & Social Sciences',
    'Faculty of Engineering',
    'Faculty of Management',
    'Faculty of Science'
  ];

  const menteeYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
  const experienceYears = ['Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
  const designations = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Visiting Faculty',
    'Senior Lecturer',
    'Lecturer',
    'Research Scholar',
    'Industry Expert',
    'Alumni Mentor'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 1. Password Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // 2. Construct Payload to match Backend User Model
      // We combine firstName/lastName and map 'mentee' -> 'student'
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        department: formData.department,
        role: formData.userType === 'mentee' ? 'student' : 'mentor',
        
        // Conditional Profile Data
        ...(formData.userType === 'mentee' ? {
          student_profile: {
            roll_no: formData.studentId,
            year: formData.year
          }
        } : {
          mentor_profile: {
            designation: formData.designation,
            // We store experience in expertise for now, or you can add 'experience' to your backend model
            expertise: [formData.experience] 
          }
        })
      };

      // 3. Send to Backend
      const response = await api.post('/users/register', payload);
      
      // 4. Handle Success
      const { token, name } = response.data;
      setAuthToken(token); // Save token to localStorage & Axios headers
      localStorage.setItem('userName', name);

      // 5. Notify App that user logged in (reload user state)
      if (onLoginSuccess) {
        await onLoginSuccess();
      }

      // 6. Redirect based on role
      if (formData.userType === 'mentee') {
        // Students go to Onboarding to complete their profile (Goals/Interests)
        navigate('/onboarding');
      } else {
        // Mentors usually go straight to dashboard (or a "Wait for Approval" page)
        alert('Registration Successful! Redirecting to Dashboard.');
        navigate('/dashboard');
      }

    } catch (err) {
      console.error(err);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received (network error)
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        // Something else happened
        errorMessage = err.message || 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (formData.userType === 'mentor') {
      setFormData(prev => ({
        ...prev,
        studentId: '',
        year: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        employeeId: '',
        designation: '',
        experience: ''
      }));
    }
  }, [formData.userType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6">
        <Link to="/" className="inline-flex items-center space-x-2 sm:space-x-3 text-blue-800 hover:text-blue-900 text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-5xl w-full bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Branding */}
          <div className="hidden md:block md:w-2/5 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8 md:p-12">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center text-blue-900 font-bold text-lg sm:text-xl">A</div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Adamas University</h1>
                <p className="text-blue-200 text-xs sm:text-sm">Mentor-Mentee Platform</p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {formData.userType === 'mentor' ? 'Share Your Wisdom' : 'Begin Your Journey'}
              </h2>
              <p className="text-blue-200 mb-6">
                {formData.userType === 'mentor'
                  ? 'Guide the next generation and make a lasting impact on students\' lives.'
                  : 'Connect with experienced mentors and accelerate your academic and career growth.'
                }
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${formData.userType === 'mentor' ? 'bg-amber-500' : 'bg-blue-700'} rounded-full flex items-center justify-center`}>
                    {formData.userType === 'mentor' ? <User className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      {formData.userType === 'mentor' ? 'Shape Futures' : 'Expert Guidance'}
                    </h4>
                    <p className="text-blue-300 text-sm">
                      {formData.userType === 'mentor'
                        ? 'Share your knowledge and experience'
                        : 'Learn from industry professionals & seniors'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      {formData.userType === 'mentor' ? 'Teaching Portfolio' : 'Personalized Learning'}
                    </h4>
                    <p className="text-blue-300 text-sm">
                      {formData.userType === 'mentor'
                        ? 'Build your legacy as an educator'
                        : 'Customized guidance for your goals'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Community Network</h4>
                    <p className="text-blue-300 text-sm">
                      {formData.userType === 'mentor'
                        ? 'Connect with passionate educators'
                        : 'Network with peers and professionals'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-blue-200 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-white font-semibold hover:text-amber-300">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {formData.userType === 'mentor' ? 'Join as Mentor' : 'Join as Mentee'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                {formData.userType === 'mentor'
                  ? 'Share your expertise and guide students'
                  : 'Start your mentorship journey today'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* User Type Selection */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm sm:text-base text-gray-700 mb-3 font-medium">I want to join as:</label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, userType: 'mentee'})}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all min-h-[100px] sm:min-h-[120px] ${
                      formData.userType === 'mentee'
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center ${
                        formData.userType === 'mentee' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base">Mentee</h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">I want guidance</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({...formData, userType: 'mentor'})}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all min-h-[100px] sm:min-h-[120px] ${
                      formData.userType === 'mentor'
                        ? 'border-amber-600 bg-amber-50 shadow-md'
                        : 'border-gray-200 hover:border-amber-400 hover:bg-amber-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center ${
                        formData.userType === 'mentor' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <User className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base">Mentor</h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">I want to guide</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base text-gray-700 mb-2 font-medium">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-9 sm:pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[44px]"
                      placeholder={formData.userType === 'mentor' ? "Dr. John" : "John"}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm sm:text-base text-gray-700 mb-2 font-medium">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-9 sm:pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[44px]"
                      placeholder={formData.userType === 'mentor' ? "Smith" : "Doe"}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base text-gray-700 mb-2 font-medium">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 sm:pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[44px]"
                      placeholder={
                        formData.userType === 'mentor'
                          ? "faculty@adamasuniversity.ac.in"
                          : "student@adamasuniversity.ac.in"
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm sm:text-base text-gray-700 mb-2 font-medium">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 sm:pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[44px]"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Department - Common for both */}
              <div>
                <label className="block text-sm sm:text-base text-gray-700 mb-2 font-medium">Department/Faculty</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full pl-9 sm:pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[44px] appearance-none bg-white"
                    required
                  >
                    <option value="">Select Department/Faculty</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conditional Fields */}
              {formData.userType === 'mentee' ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Year of Study</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        <option value="">Select Year</option>
                        {menteeYears.map((year, index) => (
                          <option key={index} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Student ID</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GraduationCap className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="AU20230001"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Employee ID</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="employeeId"
                          value={formData.employeeId}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder="AUEMP00123"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Designation</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <select
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        >
                          <option value="">Select Designation</option>
                          {designations.map((designation, index) => (
                            <option key={index} value={designation}>{designation}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Teaching Experience</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        <option value="">Select Experience</option>
                        {experienceYears.map((exp, index) => (
                          <option key={index} value={exp}>{exp}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="••••••••"
                      required
                      minLength="8"
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
                  <p className="text-sm text-gray-500 mt-1">
                    Must be at least 8 characters with letters and numbers
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message Display */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg animate-fadeIn">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                  required
                />
                <label htmlFor="terms" className="text-gray-600 text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Terms of Service
                  </a>
                  ,{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Privacy Policy
                  </a>
                  , and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Mentorship Guidelines
                  </a>{' '}
                  of Adamas University
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r ${
                  formData.userType === 'mentor' 
                  ? 'from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800' 
                  : 'from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                } text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <UserPlus className="w-5 h-5" />
                  <span className="text-lg">
                    {isLoading ? 'Registering...' : (formData.userType === 'mentor' ? 'Register as Mentor' : 'Register as Mentee')}
                  </span>
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                {formData.userType === 'mentor' 
                  ? 'Mentor applications are reviewed within 2-3 business days'
                  : 'Your account will be activated immediately after verification'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;