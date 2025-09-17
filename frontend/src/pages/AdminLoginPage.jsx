import { useState } from 'react';
import Logo from '../components/logo';
import { Mail, Lock, Eye, EyeOff, Check, ArrowRight, Shield } from 'lucide-react';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
    password: formData.password
  };

  console.log('Admin login data to be sent to backend:', loginData);

  // fetch API request
  try {
    const requestData = {
      ...loginData,
      role: 'admin'
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
        const redirectUrl = data.redirectUrl || '/admin';
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
    console.error('Admin login error:', error);
    setErrors({ general: 'Network error. Please check your connection and try again.' });
  } finally {
    setIsLoading(false);
  }
};

  if (showSuccess) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md mx-4 transform animate-bounce">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Granted!</h2>
          <p className="text-gray-600">Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <div className="flex items-center justify-center px-8 py-12 relative">
        <div className="max-w-md w-full relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
            <div className="text-center mb-8">
              <div className="mb-4">
                <Logo size="large" clickable={false} />
              </div>
              

              
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                System Administrator
              </h2>
              <p className="text-sm text-gray-600">
                Authorized personnel only
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General error display */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Administrator email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={100}
                  className={`w-full pl-10 pr-4 py-3 border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Administrator password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 ${errors.password ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300`}
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Access Admin Panel
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

export default AdminLoginPage;
