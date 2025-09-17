import { useState } from 'react';
import Logo from '../components/logo';
import { Mail, Lock, Eye, EyeOff, Check, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // Check URL to determine initial user type
  const getInitialUserType = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('type') === 'agent' ? 'agent' : 'user';
    }
    return 'user';
  };

  const [userType, setUserType] = useState(getInitialUserType());
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const { email, password } = formData;

    if (!email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
    else if (email.length > 100) newErrors.email = 'Email must be less than 100 characters';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  setIsLoading(true);

  // Prepare login data for backend
  const loginData = {
    email: formData.email.toLowerCase().trim(),
    password: formData.password,
    rememberMe: rememberMe
  };

  console.log('Login data to be sent to backend:', loginData);

  // fetch API request
try {
  const requestData = {
    ...loginData,
    role: userType
  };

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData)
  });

  const data = await response.json();

  if (response.ok) {
    // Login successful
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    setShowSuccess(true);
    setTimeout(() => {
      const redirectUrl = data.redirectUrl || (data.userType === 'agent' ? '/agent' : '/user');
      window.location.href = redirectUrl;
    }, 1500);
    
  } else {
    // Login failed
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setErrors({ general: data.message || 'Login failed. Please try again.' });
    }
  }
} catch (error) {
  // Network error
  console.error('Login error:', error);
  setErrors({ general: 'Network error. Please check your connection and try again.' });
} finally {
  setIsLoading(false);
}
};
  const handleForgotPassword = () => {
    alert('Forgot password functionality would be implemented here');
  };


  const handleRegisterClick = () => {
    if (userType === 'agent') {
      window.location.href = '/register?type=agent';
    } else {
      window.location.href = '/register';
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md mx-4 transform animate-bounce">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Login successful! Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex items-center justify-center px-8 py-12 relative">
        {/* Floating background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        
        <div className="max-w-md w-full relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
            <div className="text-center mb-8">
              <div className="mb-4">
                <Logo size="large" clickable={false} />
              </div>
              
              {/* User Type Selection */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setUserType('user')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    userType === 'user' 
                      ? 'bg-yellow-400 text-black shadow-sm border-2 border-yellow-400' 
                      : 'bg-white text-gray-600 hover:text-gray-800 border-2 border-transparent'
                  }`}
                >
                  User Login
                </button>
                <button
                  onClick={() => setUserType('agent')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    userType === 'agent' 
                      ? 'bg-yellow-400 text-black shadow-sm border-2 border-yellow-400' 
                      : 'bg-white text-gray-600 hover:text-gray-800 border-2 border-transparent'
                  }`}
                >
                  Agent Login
                </button>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome back{userType === 'agent' ? ', Agent' : ''}
              </h2>
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={() => {
                    if (userType === 'agent') {
                      window.location.href = '/register?type=agent';
                    } else {
                      window.location.href = '/register';
                    }
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline bg-transparent transition-colors"
                >
                  {userType === 'agent' ? 'Apply here' : 'Sign up here'}
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={100}
                  className={`w-full pl-10 pr-4 py-3 border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 ${errors.password ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-lg bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                    {rememberMe && (
                      <Check className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none" />
                    )}
                  </div>
                  <label htmlFor="remember" className="ml-3 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* General error display */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}     

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${
                  userType === 'agent' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
