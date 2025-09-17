import { createContext, useContext, useReducer, useEffect } from 'react'
import { authAPI } from '../services/authAPI'

const AuthContext = createContext()

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

// Initial state
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  token: null,
  error: null
}

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user)
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: parsedUser, token }
        })
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }, [])

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' })
      
      // Mock API call - replace with actual API
      const response = await authAPI.login(credentials)
      
      if (response.success) {
        const { user, token } = response.data
        
        // Store in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token }
        })
        
        return { success: true }
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: response.error || 'Login failed'
        })
        return { success: false, error: response.error }
      }
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error.message || 'Login failed'
      })
      return { success: false, error: error.message }
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' })
      
      // Mock API call - replace with actual API
      const response = await authAPI.register(userData)
      
      if (response.success) {
        const { user, token } = response.data
        
        // Store in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token }
        })
        
        return { success: true }
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: response.error || 'Registration failed'
        })
        return { success: false, error: response.error }
      }
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: error.message || 'Registration failed'
      })
      return { success: false, error: error.message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({ type: 'AUTH_LOGOUT' })
  }

  // Update user function
  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
    
    // Update localStorage
    const updatedUser = { ...state.user, ...userData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  // Check if user is admin
  const isAdmin = () => {
    return state.user && state.user.role === 'admin'
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
