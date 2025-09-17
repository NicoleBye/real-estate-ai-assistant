import { useState, useEffect } from 'react';
import Logo from '../components/logo';
import { Mail, Lock, User, Eye, EyeOff, Check, X, Building2, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  // Check URL to determine initial role
  const getInitialRole = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.includes('/agent') ? 'agent' : 'user';
    }
    return 'user';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: getInitialRole(), // Set initial role based on URL
    // Agent specific fields
    company: '',
    licenseNumber: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Update role based on URL changes
  useEffect(() => {
    const currentRole = getInitialRole();
    if (currentRole !== formData.role) {
      setFormData(prev => ({ 
        ...prev, 
        role: currentRole,
        // Clear agent-specific fields when switching to user
        ...(currentRole === 'user' && { company: '', licenseNumber: '', phone: '' })
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'password') updatePasswordStrength(value);
  };

  const handleRoleChange = (newRole) => {
    setFormData((prev) => ({ 
      ...prev, 
      role: newRole,
      // Clear agent-specific fields when switching to user
      ...(newRole === 'user' && { company: '', licenseNumber: '', phone: '' })
    }));
    setErrors({});
    
    // Update URL to match the role using query parameter
    const newSearch = newRole === 'agent' ? '?type=agent' : '';
    const newUrl = `/register${newSearch}`;
    window.history.pushState({}, '', newUrl);
  };

  const updatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword, role, company, licenseNumber, phone } = formData;

    if (!name.trim()) newErrors.name = 'Full name is required';
    else if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
    else if (email.length > 100) newErrors.email = 'Email must be less than 100 characters';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    // Agent-specific validations
    if (role === 'agent') {
      if (!company.trim()) newErrors.company = 'Company name is required';
      if (!licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      else if (licenseNumber.trim().length < 5) newErrors.licenseNumber = 'License number must be at least 5 characters';
      if (!phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) newErrors.phone = 'Invalid phone number format';
    }
    
    if (!acceptTerms) newErrors.terms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    // Prepare user data based on role
    const userData = {
      username: formData.name.trim(),
      email: formData.email.toLowerCase(),
      password: formData.password, // This should be hashed in backend
      role: formData.role,
      ...(formData.role === 'agent' && {
        company: formData.company.trim(),
        license_number: formData.licenseNumber.trim(),
        phone: formData.phone.trim(),
      })
    };

    console.log('User data to be sent to backend:', userData);

    // fetch API request
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setShowSuccess(true);
        setTimeout(() => {
          alert('Account created successfully! Redirecting to dashboard...');
          if (formData.role === 'agent') {
            window.location.href = '/agent';  
          } else {
            window.location.href = '/user';
          }
        }, 1500);
        
      } else {
        // Registration failed
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || 'Registration failed. Please try again.' });
        }
      }
    } catch (error) {
      // Network error
      console.error('Registration error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
    };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md mx-4 transform animate-bounce">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Account Created!
          </h2>
          <p className="text-gray-600">
              Welcome to Propzy! Redirecting to your dashboard...
          </p>
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
              
              {/* Account Type Selection */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  type="button"
                  onClick={() => handleRoleChange('user')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    formData.role === 'user' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  User Account
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('agent')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    formData.role === 'agent' 
                      ? 'bg-white text-green-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Agent Account
                </button>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {formData.role === 'agent' ? 'Create Agent Account' : 'Create your account'}
              </h2>
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={() => {
                    if (formData.role === 'agent') {
                      window.location.href = '/login?type=agent';
                    } else {
                      window.location.href = '/login';
                    }
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline bg-transparent transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  className={`w-full pl-10 pr-4 py-3 border-2 ${errors.name ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

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

              {/* Agent-specific fields */}
              {formData.role === 'agent' && (
                <>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 ${errors.company ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                    />
                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="licenseNumber"
                      placeholder="Real Estate License Number"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 ${errors.licenseNumber ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                    />
                    {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </>
              )}

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
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${passwordStrength <= 2 ? 'text-red-500' : passwordStrength <= 3 ? 'text-yellow-500' : passwordStrength <= 4 ? 'text-blue-500' : 'text-green-500'}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'} bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="absolute right-12 top-3">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-lg bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                  {acceptTerms && (
                    <Check className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none" />
                  )}
                </div>
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                  I agree to the{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    Terms and Privacy Policy
                  </button>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
              
              {/* General error display */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${
                  formData.role === 'agent' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {formData.role === 'agent' ? 'Submitting Account...' : 'Creating Account...'}
                  </div>
                ) : (
                  <>
                    Create Account
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

export default RegisterPage;
