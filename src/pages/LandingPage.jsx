import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  User, 
  BookOpen, 
  Target, 
  Shield, 
  ArrowRight, 
  ChevronLeft,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  TrendingUp,
  Users,
  Mail,
  Phone,
  Globe,
  FileText
} from 'lucide-react';
import './Onboarding.css'; // We'll create this CSS file

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rollNo: '',
    department: 'CSE',
    year: '3rd',
    section: '',
    phone: '',
    interests: [],
    careerGoal: ''
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock Data
  const assignedMentor = {
    name: "Dr. S. Chatterjee",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    specialization: "Artificial Intelligence & Data Science",
    experience: "12+ years",
    studentsGuided: "85+",
    email: "schatterjee@university.edu",
    achievements: ["Best Mentor Award 2023", "5 Research Papers", "Industry Collaborations"],
    image: "/api/placeholder/150/150"
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(prev => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleFinalSubmit = () => {
    // Add confetti or success animation here
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('success-animation');
    
    setTimeout(() => {
      alert("🎉 Profile Completed & Mentor Locked! Redirecting to Dashboard...");
      // navigate('/dashboard');
    }, 1500);
  };

  // Animation for step indicators
  useEffect(() => {
    const indicators = document.querySelectorAll('.step-indicator');
    indicators.forEach((indicator, index) => {
      if (index + 1 === step) {
        indicator.classList.add('pulse');
        setTimeout(() => indicator.classList.remove('pulse'), 600);
      }
    });
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 via-white flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with Logo */}
      <div className="relative z-10 text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
            MentorConnect
          </h1>
          <Sparkles className="text-yellow-500" size={20} />
        </div>
        <p className="text-slate-600">Complete your profile to begin your mentorship journey</p>
      </div>

      {/* Progress Steps with Animation */}
      <div className="relative z-10 max-w-4xl w-full mb-12">
        <div className="flex justify-between items-center relative px-8">
          {/* Animated Progress Line */}
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-1.5 bg-slate-200 -z-10 overflow-hidden rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
          
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center gap-3 z-20">
              <div className={`
                step-indicator w-14 h-14 rounded-full flex items-center justify-center border-4 shadow-lg
                transition-all duration-300 transform hover:scale-110
                ${step >= stepNumber 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-white text-white shadow-blue-200' 
                  : 'bg-white border-slate-200 text-slate-400 shadow-slate-100'
                }
                ${step === stepNumber ? 'ring-4 ring-blue-200' : ''}
              `}>
                {stepNumber === 1 && <User size={20} />}
                {stepNumber === 2 && <Target size={20} />}
                {stepNumber === 3 && <Shield size={20} />}
              </div>
              <span className={`text-sm font-bold ${step >= stepNumber ? 'text-slate-800' : 'text-slate-400'}`}>
                {stepNumber === 1 ? 'Personal Details' : stepNumber === 2 ? 'Goals & Interests' : 'Confirm Mentor'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Card with Glassmorphism */}
      <div className={`
        relative z-10 max-w-2xl w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40
        overflow-hidden transform transition-all duration-500
        ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}>
        
        {/* Decorative Header */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* --- STEP 1: PERSONAL DETAILS --- */}
        {step === 1 && (
          <div className="p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Personal Details</h2>
                <p className="text-slate-500 text-sm">Let's get to know you better</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <FileText size={14} /> Roll Number
                  </label>
                  <input 
                    type="text" 
                    placeholder="AU/2022/XXXX"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 hover:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 hover:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Year</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none bg-white/50 hover:bg-white transition-all">
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Department</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none bg-white/50 hover:bg-white transition-all">
                    <option>Computer Science & Engineering</option>
                    <option>Electronics & Communication</option>
                    <option>Mechanical Engineering</option>
                    <option>Biotechnology</option>
                    <option>Civil Engineering</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex justify-end">
              <button 
                onClick={handleNext}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Continue
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: ACADEMIC GOALS --- */}
        {step === 2 && (
          <div className="p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="text-purple-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Goals & Interests</h2>
                <p className="text-slate-500 text-sm">Tell us about your aspirations</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <TrendingUp size={16} /> I'm interested in (Select multiple)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { icon: <Briefcase size={16} />, label: 'Placement', color: 'blue' },
                    { icon: <GraduationCap size={16} />, label: 'Higher Studies', color: 'purple' },
                    { icon: <BookOpen size={16} />, label: 'Research', color: 'green' },
                    { icon: <Globe size={16} />, label: 'Entrepreneurship', color: 'yellow' },
                    { icon: <Award size={16} />, label: 'Civil Services', color: 'red' },
                    { icon: <Users size={16} />, label: 'Leadership', color: 'pink' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => toggleInterest(item.label)}
                      className={`
                        p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02]
                        ${formData.interests.includes(item.label)
                          ? `bg-${item.color}-50 border-${item.color}-500 text-${item.color}-700 shadow-md`
                          : 'bg-white/50 border-slate-200 text-slate-600 hover:border-slate-300'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-2 rounded-lg ${formData.interests.includes(item.label) ? `bg-${item.color}-100` : 'bg-slate-100'}`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Target size={16} /> Short-term Goal
                </label>
                <div className="relative">
                  <textarea 
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 hover:bg-white resize-none h-32 transition-all"
                    placeholder="Share your goals for this semester... (e.g., I want to learn ReactJS, publish one research paper, or prepare for campus placements)"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                    Optional
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-between">
              <button 
                onClick={handleBack}
                className="text-slate-600 hover:text-slate-800 flex items-center gap-2 transition-all hover:gap-3 px-4 py-2 rounded-lg hover:bg-slate-100"
              >
                <ChevronLeft size={18} /> Back
              </button>
              <button 
                onClick={handleNext}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Continue to Mentor
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 3: MENTOR CONFIRMATION --- */}
        {step === 3 && (
          <div className="p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="text-green-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Confirm Your Mentor</h2>
                <p className="text-slate-500 text-sm">Your guide for the academic journey</p>
              </div>
            </div>

            {/* Mentor Profile Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    ASSIGNED MENTOR
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Mentor Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <User size={48} className="text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full">
                      <Award size={16} />
                    </div>
                  </div>

                  {/* Mentor Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{assignedMentor.name}</h3>
                    <p className="text-lg text-blue-600 font-semibold mb-2">{assignedMentor.designation}</p>
                    <p className="text-slate-600 mb-4">{assignedMentor.department}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-slate-700">
                        <BookOpen className="text-blue-500" size={18} />
                        <span>{assignedMentor.specialization}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <TrendingUp className="text-green-500" size={18} />
                        <span>{assignedMentor.experience} Experience</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <Users className="text-purple-500" size={18} />
                        <span>{assignedMentor.studentsGuided} Students Guided</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <Mail className="text-red-500" size={18} />
                        <span>{assignedMentor.email}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Achievements</h4>
                      <div className="flex flex-wrap gap-2">
                        {assignedMentor.achievements.map((achievement, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100">
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <div className="flex items-start gap-3">
                <Shield className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Important Notice</h4>
                  <p className="text-sm text-slate-600">
                    This mentor has been carefully assigned based on your profile and interests. 
                    Once confirmed, any changes will require approval from the Head of Department.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleBack}
                className="flex-1 text-slate-600 hover:text-slate-800 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:bg-slate-100"
              >
                <ChevronLeft size={18} /> Back to Edit
              </button>
              <button 
                onClick={handleFinalSubmit}
                className="submit-btn flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <CheckCircle size={20} />
                Confirm & Lock Mentor
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-12 text-center">
        <p className="text-sm text-slate-500">
          Need help? Contact the <span className="text-blue-600 font-medium">Mentor Support Team</span>
        </p>
        <div className="mt-2 text-xs text-slate-400">
          © 2024 MentorConnect. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Onboarding;