// Mock authentication API - replace with actual API calls
// This provides a working interface while backend is being developed

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock users database
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://via.placeholder.com/150',
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'en'
    }
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    avatar: 'https://via.placeholder.com/150',
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'en'
    }
  }
]

// Generate mock JWT token
const generateMockToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  }
  // In real implementation, this would be properly signed
  return `mock.jwt.token.${btoa(JSON.stringify(payload))}`
}

export const authAPI = {
  // Login user
  login: async (credentials) => {
    await delay(1000) // Simulate network delay
    
    const { email, password } = credentials
    
    // Find user
    const user = mockUsers.find(u => u.email === email)
    
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }
    
    if (user.password !== password) {
      return {
        success: false,
        error: 'Invalid password'
      }
    }
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user
    
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token: generateMockToken(user)
      }
    }
  },

  // Register user
  register: async (userData) => {
    await delay(1200) // Simulate network delay
    
    const { email, password, name } = userData
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email)
    
    if (existingUser) {
      return {
        success: false,
        error: 'User already exists'
      }
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password,
      name,
      role: 'user',
      avatar: 'https://via.placeholder.com/150',
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      }
    }
    
    mockUsers.push(newUser)
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = newUser
    
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token: generateMockToken(newUser)
      }
    }
  },

  // Get current user
  getCurrentUser: async (token) => {
    await delay(500)
    
    try {
      // Decode mock token
      const tokenData = token.split('.')[3]
      const payload = JSON.parse(atob(tokenData))
      
      // Check if token is expired
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        return {
          success: false,
          error: 'Token expired'
        }
      }
      
      // Find user
      const user = mockUsers.find(u => u.id === payload.userId)
      
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        }
      }
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = user
      
      return {
        success: true,
        data: { user: userWithoutPassword }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Invalid token'
      }
    }
  },

  // Update user profile
  updateProfile: async (userId, updateData) => {
    await delay(800)
    
    const userIndex = mockUsers.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return {
        success: false,
        error: 'User not found'
      }
    }
    
    // Update user data
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updateData }
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = mockUsers[userIndex]
    
    return {
      success: true,
      data: { user: userWithoutPassword }
    }
  },

  // Change password
  changePassword: async (userId, passwordData) => {
    await delay(600)
    
    const { currentPassword, newPassword } = passwordData
    const user = mockUsers.find(u => u.id === userId)
    
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }
    
    if (user.password !== currentPassword) {
      return {
        success: false,
        error: 'Current password is incorrect'
      }
    }
    
    // Update password
    user.password = newPassword
    
    return {
      success: true,
      data: { message: 'Password updated successfully' }
    }
  },

  // Logout user (client-side only, but included for completeness)
  logout: async () => {
    await delay(300)
    
    return {
      success: true,
      data: { message: 'Logged out successfully' }
    }
  },

  // Reset password (mock implementation)
  resetPassword: async (email) => {
    await delay(1000)
    
    const user = mockUsers.find(u => u.email === email)
    
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }
    
    // In real implementation, this would send an email
    return {
      success: true,
      data: { message: 'Password reset email sent' }
    }
  }
}