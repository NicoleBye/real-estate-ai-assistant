import React, { useState, useEffect } from 'react';
import Logo from '../components/logo'; 
import UserMenu from '../components/UserMenu';

import FavoriteProperties from '../components/FavoriteProperties';
import UserProfile from '../components/UserProfile';
import { 
  Heart, 
  User
} from 'lucide-react';

// TODO: Delete after API integration - START
const mockUser = {
  username: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+61 4 1234 5678',
  memberSince: '2024-03-15',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
};
const mockFavoriteProperties = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    suburb: "Melbourne",
    address: "123 Collins Street",
    postcode: "3000",
    property_type: "buy",
    category: "Apartment",
    company: "Premium Real Estate",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 850000,
    rent_price: null,
    bedrooms_num: 3,
    bathrooms_num: 2,
    carspaces: 2,
    landsize: 450,
    year_built: 2020,
    lat: -33.8915,
    lng: 151.2767,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    color: '#3b82f6',
    match_score: 95
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    suburb: "South Yarra",
    address: "456 Chapel Street",
    postcode: "3141",
    property_type: "rent",
    category: "House",
    company: "City Rentals",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: null,
    rent_price: 650,
    bedrooms_num: 2,
    bathrooms_num: 2,
    carspaces: 1,
    landsize: 180,
    year_built: 2019,
    lat: -33.8886,
    lng: 151.2094,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    color: '#ef4444',
    match_score: 78
  }
];
// TODO: Delete after API integration - END

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  // TODO: Change to useState(null) and useState([]) after API integration
  const [user, setUser] = useState(mockUser);
  const [favoriteProperties, setFavoriteProperties] = useState(mockFavoriteProperties);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial data when component mounts
  useEffect(() => {
    // Use mock data temporarily, no API call
    setUser(mockUser);
    setFavoriteProperties(mockFavoriteProperties);
    setLoading(false);

    // TODO: Delete above lines and uncomment code below when backend is ready
    /*
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        
        // Fetch user profile and favorite properties in parallel
        const [userResponse, propertiesResponse] = await Promise.all([
          fetch('/api/user/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/api/properties/favorites', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!userResponse.ok || !propertiesResponse.ok) {
          throw new Error('Failed to load dashboard data. Please try again.');
        }

        const userData = await userResponse.json();
        const propertiesData = await propertiesResponse.json();

        setUser(userData);
        setFavoriteProperties(propertiesData);

      } catch (err) {
        setError(err.message);
        // In case of error, use mock data so the page doesn't break
        setUser(mockUser);
        setFavoriteProperties(mockFavoriteProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    */
  }, []);


  // Handle URL parameters for direct tab navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['favorites', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const handleRemoveProperty = async (propertyId) => {
    // Optimistic update
    setFavoriteProperties(prev => prev.filter(property => property.id !== propertyId));

    alert('Property removed from favorites!');

    // TODO: Uncomment the API call below when backend is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/properties/favorites/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // If API call fails, revert the state (optional, but good practice)
        // You would need to fetch the original list again or have a copy
        alert('Failed to remove property from server. Please refresh.');
      }
    } catch (err) {
      console.error('Failed to remove property:', err);
      alert('An error occurred. Please try again.');
    
    
      // Revert the optimistic update
      setFavoriteProperties(prev => [...prev, fallbackFavoriteProperties.find(p => p.id === propertyId)].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }
    */
  };

  const handleUpdateUser = async (updatedUserData) => {
    // Optimistically update the UI
    setUser(prev => ({ ...prev, ...updatedUserData }));
    alert('Profile updated successfully!');

    // TODO: Uncomment the API call below when backend is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/profile', {
        method: 'PUT', // or 'PATCH'
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUserData)
      });

      if (!response.ok) {
        // Handle error, maybe revert state
        alert('Failed to update profile on server.');
      }
      
      const updatedUser = await response.json();
      setUser(updatedUser); // Update state with confirmed data from server

    } catch (err) {
      console.error('Failed to update user:', err);
      alert('An error occurred while updating your profile.');
    }
    */
  };


  const tabs = [
    { id: 'favorites', label: 'Saved Properties', icon: Heart, count: favoriteProperties.length },
    { id: 'profile', label: 'Profile', icon: User, count: 0 }
  ];
  // Render a loading state while fetching data
  if (loading) {
    return <div>Loading your dashboard...</div>;
  }
  
  // Render an error state if fetching fails
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render a message if user data is missing
  if (!user) {
    return <div>Could not load user profile. Please log in again.</div>
  }
  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: '#f8fafc', 
      margin: 0, 
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '0 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <Logo />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={user.avatar}
                alt={user.username}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                  {user.username}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Sidebar */}
          <div style={{ width: '280px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? '#f0f9ff' : 'white',
                    borderLeft: activeTab === tab.id ? '3px solid #2563eb' : '3px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: activeTab === tab.id ? '#2563eb' : '#374151',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <tab.icon style={{ width: '18px', height: '18px' }} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count > 0 && (
                    <div style={{
                      backgroundColor: activeTab === tab.id ? '#2563eb' : '#ef4444',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {tab.count}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {activeTab === 'favorites' && (
              <>
                {error && (
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#fee2e2',
                    color: '#ef4444',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    {error}
                  </div>
                )}
                
                {loading ? (
                  <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#6b7280'
                  }}>
                    Loading your favorite properties...
                  </div>
                ) : (
                  <FavoriteProperties 
                    favoriteProperties={favoriteProperties}
                    onRemoveProperty={handleRemoveProperty}
                  />
                )}
              </>
            )}

            {activeTab === 'profile' && (
              <UserProfile 
                user={user}
                onUpdateUser={handleUpdateUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;