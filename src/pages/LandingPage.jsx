import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Target, 
  Award,
  Calendar,
  Star,
  ChevronRight,
  Menu,
  X,
  LogIn,
  UserPlus,
  GraduationCap,
  HeartHandshake,
  TrendingUp,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
  Target as TargetIcon,
  Users as UsersIcon
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Expert Guidance",
      description: "Get personalized mentorship from experienced seniors and faculty members."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Matching",
      description: "Our algorithm matches you with the perfect mentor based on your interests and goals."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Direct Communication",
      description: "Easy and secure messaging platform for seamless mentor-mentee interactions."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Tracking",
      description: "Set and track academic and career goals with your mentor's guidance."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Register",
      description: "Create your account as a mentor or mentee"
    },
    {
      number: "2",
      title: "Complete Profile",
      description: "Share your interests, skills, and goals"
    },
    {
      number: "3",
      title: "Get Matched",
      description: "Our system matches you with compatible partners"
    },
    {
      number: "4",
      title: "Start Journey",
      description: "Begin your mentorship journey with guidance"
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Computer Science, 3rd Year",
      text: "My mentor helped me land an internship at Google. The guidance was invaluable!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "MBA Student",
      text: "The mentor-mentee program transformed my career perspective and networking skills.",
      rating: 5
    },
    {
      name: "Dr. Anil Kumar",
      role: "Faculty Mentor",
      text: "A wonderful platform to give back and guide the next generation of students.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-lg z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/au_logo.png" 
                alt="Adamas University Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Adamas University</h1>
                <p className="text-sm text-blue-800">Mentor-Mentee Platform</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium">Testimonials</a>
              <div className="flex space-x-4">
                <Link 
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-50 transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/signup"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium">Testimonials</a>
                <div className="flex flex-col space-y-3 pt-4">
                  <Link 
                    to="/login"
                    className="flex items-center justify-center space-x-2 px-4 py-2 text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-50"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/signup"
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home"
        className="pt-24 pb-20 px-4"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 51, 102, 0.9), rgba(0, 51, 102, 0.85)), url('/carousel2.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-amber-300 font-medium">Exclusive Platform for Adamas University</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connect. Learn. <span className="text-amber-400">Grow Together</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100">
            Join Adamas University's exclusive mentorship platform where experienced mentors guide 
            the next generation towards academic and career excellence.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <Link 
              to="/signup?type=mentee"
              className="group inline-flex items-center justify-center space-x-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <span>Find a Mentor</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/signup?type=mentor"
              className="group inline-flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Become a Mentor</span>
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">500+</div>
              <div className="text-blue-200 font-medium">Active Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">2,000+</div>
              <div className="text-blue-200 font-medium">Students Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">15+</div>
              <div className="text-blue-200 font-medium">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">4.8</div>
              <div className="text-blue-200 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <TargetIcon className="w-4 h-4" />
              <span className="font-medium">Why Choose Our Platform</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need for <span className="text-blue-700">Academic Success</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A comprehensive mentorship platform designed specifically for Adamas University students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <UsersIcon className="w-4 h-4" />
              <span className="font-medium">Get Started</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Start Your Journey in <span className="text-blue-700">4 Simple Steps</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Getting started with our mentorship program is quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center h-full hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/signup"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3.5 px-8 rounded-xl text-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4" />
              <span className="font-medium">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our <span className="text-amber-600">Community</span> Says
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hear from students and mentors who have transformed their academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-l-4 border-amber-500 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl mb-6 shadow-xl">
            <HeartHandshake className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-amber-400">Transform</span> Your Academic Journey?
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Adamas University students who are already benefiting from personalized mentorship
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <Link 
              to="/signup?type=mentee"
              className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <UserPlus className="w-5 h-5" />
              <span>Join as Mentee</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/signup?type=mentor"
              className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm hover:from-white/20 hover:to-white/10 text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50 hover:shadow-2xl"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Become a Mentor</span>
            </Link>
          </div>
          
          <div className="inline-flex items-center space-x-2 text-blue-200">
            <CheckCircle className="w-5 h-5" />
            <span>Already have an account? </span>
            <Link 
              to="/login" 
              className="text-white font-semibold hover:text-amber-300 transition ml-1"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/au_logo.png" 
                  alt="Adamas University Logo" 
                  className="h-12 w-auto"
                />
                <div>
                  <h3 className="text-xl font-bold">Adamas University</h3>
                  <p className="text-blue-300 text-sm">Mentor-Mentee Platform</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting generations of learners with experienced mentors for academic and career excellence.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition flex items-center space-x-2">
                    <ChevronRight className="w-3 h-3" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition flex items-center space-x-2">
                    <ChevronRight className="w-3 h-3" />
                    <span>Features</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-400 hover:text-white transition flex items-center space-x-2">
                    <ChevronRight className="w-3 h-3" />
                    <span>Testimonials</span>
                  </a>
                </li>
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white transition flex items-center space-x-2">
                    <ChevronRight className="w-3 h-3" />
                    <span>Login</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                  <span>Adamas University, Barasat, Kolkata, West Bengal 700126</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>mentorship@adamasuniversity.ac.in</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+91 33 1234 5678</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Stay Updated</h4>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Subscribe to our newsletter for mentorship tips and updates
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-800 text-white px-4 py-3 rounded-l-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-r-lg font-medium transition-all">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Adamas University Mentor-Mentee Platform. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Designed with ❤️ for the Adamas University community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;