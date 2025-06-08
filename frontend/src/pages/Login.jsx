import React, { useState } from 'react'
import { Link } from "react-router";
import Header from '../components/Header'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'

const Login = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_LOGIN_ENDPOINT}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();

          console.log("Login response Data: ", data);
    
          if (res.ok) {
            // Save token (optional: to localStorage or cookie)
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.user.role);
            localStorage.setItem('userId', data.user._id);
            localStorage.setItem('userName', data.user.name);

            //alert('Login successful!');
           

      // Redirect based on role
      if (data.user.role === 'employer') {
        navigate('/employerdashboard');
      } else if (data.user.role === 'jobseeker') {
        navigate('/jobseekerdashboard');
      } else {
        toast.error('Unknown role');
      }} else {
            toast.error('Error: ' + data.error);
          }
        } catch (err) {
          console.error(err);
          toast.error('An error occurred during login');
        }
      };
  return (
    <div>
        <Header />
        <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4">
          <div className="relative w-full max-w-md">
            {/* Main login card */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
              {/* Header section */}
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">
                  Login to {import.meta.env.VITE_APP_NAME || 'HireNest'}
                </h2>
                <p className="text-gray-600 font-medium">Welcome back! Please sign in to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address
                  </label>
                  <input
                    type="email" 
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password field */}
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Password
                  </label>
                  <input
                    type="password" 
                    id="password"
                    name="password"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-[0.98]"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </span>
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-4 text-sm text-gray-500 font-medium">Don't have an account?</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <Link 
                  to="/signup" 
                  className="inline-flex items-center justify-center font-semibold text-blue-600 hover:text-blue-700 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Sign up here
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      
    </div>
  )
}

export default Login
