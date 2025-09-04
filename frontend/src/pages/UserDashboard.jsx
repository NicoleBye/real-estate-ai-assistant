import React, { useState, useEffect } from 'react';
import Logo from '../components/logo'; 
import UserMenu from '../components/UserMenu';

import FavoriteProperties from '../components/FavoriteProperties';
import PropertyInspections from '../components/PropertyInspections';
import UserProfile from '../components/UserProfile';
import { 
  Heart, 
  Calendar, 
  User
} from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [user, setUser] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+61 4 1234 5678',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    memberSince: '2024-03-15'
  });

  // Sample data - in real app, this would come from API
  const [favoriteProperties] = useState([
    {
      property_id: "1",
      suburb: "Melbourne",
      address: "123 Collins Street",
      postcode: "3000",
      listing_type: "buy",
      property_type: "Apartment",
      seller: "Premium Real Estate",
      buy_price: 850000,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 2,
      distance: 0.5,
      saved_date: "2025-01-15",
      price_alert: true
    },
    {
      property_id: "2",
      suburb: "South Yarra",
      address: "456 Chapel Street",
      postcode: "3141",
      listing_type: "rent",
      property_type: "House",
      seller: "City Rentals",
      rent_price: 650,
      bedrooms: 2,
      bathrooms: 2,
      carspaces: 1,
      distance: 3.2,
      saved_date: "2025-01-20",
      price_alert: false
    }
  ]);

  const [inspections] = useState([
    {
      id: 1,
      address: "123 Collins Street, Melbourne 3000",
      property_type: "Apartment",
      agent_name: "Sarah Johnson",
      agent_phone: "+61 3 9000 1567",
      inspection_date: "2025-02-01T10:00:00Z",
      inspection_type: "Private",
      status: "confirmed",
      bedrooms: 3,
      bathrooms: 2,
      price: 850000,
      listing_type: "buy"
    },
    {
      id: 2,
      address: "789 Swan Street, Richmond 3121",
      property_type: "Townhouse",
      agent_name: "Emma Wilson",
      agent_phone: "+61 3 9000 1890",
      inspection_date: "2025-02-01T14:00:00Z",
      inspection_type: "Auction",
      status: "confirmed",
      bedrooms: 3,
      bathrooms: 2,
      price: 720000,
      listing_type: "buy"
    }
  ]);

  // Handle URL parameters for direct tab navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['favorites', 'inspections', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const handleRemoveProperty = (propertyId) => {
    console.log('Remove property:', propertyId);
    // In real app, this would update the favoriteProperties state
    alert('Property removed from favorites!');
  };

  const handleUpdateUser = (userData) => {
    setUser(prev => ({
      ...prev,
      ...userData
    }));
  };

  const tabs = [
    { id: 'favorites', label: 'Saved Properties', icon: Heart, count: favoriteProperties.length },
    { id: 'inspections', label: 'Property Inspections', icon: Calendar, count: inspections.length },
    { id: 'profile', label: 'Profile', icon: User, count: 0 }
  ];

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
                alt={user.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                  {user.name}
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
              <FavoriteProperties 
                favoriteProperties={favoriteProperties}
                onRemoveProperty={handleRemoveProperty}
              />
            )}

            {activeTab === 'inspections' && (
              <PropertyInspections inspections={inspections} />
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