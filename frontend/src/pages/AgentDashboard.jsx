import React, { useState, useEffect } from 'react';
import Logo from '../components/logo';

import { 
  Home, 
  User, 
  Calendar, 
  Plus,
  Edit,
  Trash2,
  Bed,
  Bath,
  Car
} from 'lucide-react';

// TODO: Delete after API integration - START
const mockAgent = {
  username: 'Sarah Johnson',
  email: 'sarah.johnson@realestate.com',
  phone_number: '+61 3 9000 1567',
  company: 'Premium Real Estate',
  license_number: 'REA12345',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332bb5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
};

const mockProperties = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    suburb: "Melbourne",
    address: "123 Collins Street",
    postcode: "3000",
    property_type: "buy",
    category: "Apartment",
    owner_id: "2", // 关联到当前登录的 agent
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 850000,
    rent_price: null,
    status: "published",
    action_aggregates: {
      VIEW: 245,
    },
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
    owner_id: "2", // 关联到当前登录的 agent
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: null,
    rent_price: 650,
    status: "pending",
    action_aggregates: {
      VIEW: 89,
    },
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
const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [propertyType, setPropertyType] = useState('buy');
  const [editingProperty, setEditingProperty] = useState(null);
  
  // TODO: Change to useState(null) and useState([]) after API integration
  const [agent, setAgent] = useState(mockAgent);
  const [properties, setProperties] = useState(mockProperties);

  // Fetch initial data when component mounts
  useEffect(() => {
    // Use mock data temporarily, no API call
    setAgent(mockAgent);
    setProperties(mockProperties);
    setLoading(false);

    // TODO: Delete above lines and uncomment code below when backend is ready
    /*
    const fetchAgentDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        
        // Fetch agent profile and properties in parallel
        const [agentResponse, propertiesResponse] = await Promise.all([
          fetch('/api/agent/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/api/agent/properties', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!agentResponse.ok || !propertiesResponse.ok) {
          throw new Error('Failed to load dashboard data');
        }

        const agentData = await agentResponse.json();
        const propertiesData = await propertiesResponse.json();

        setAgent(agentData);
        setProperties(propertiesData);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
        setError(err.message);
        // In case of error, use mock data so the page doesn't break
        setAgent(mockAgent);
        setProperties(mockProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentDashboard();
    */
  }, []);




  const formatPrice = (price, property_type) => {
    if (property_type === 'rent') {
      return `$${price}/week`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'published': 
        return { bg: '#dcfce7', text: '#166534' };
      case 'pending': 
        return { bg: '#fef3c7', text: '#92400e' };
      case 'rejected': 
        return { bg: '#fee2e2', text: '#dc2626' };
      default: 
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const PropertyCard = ({ property }) => {
    const statusColor = getStatusColor(property.status);
    
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative' }}>
          <img 
            src={property.images[0].url} 
            alt={`${property.category} in ${property.suburb}`}
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: statusColor.bg,
            color: statusColor.text,
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'capitalize'
          }}>
            {property.status}
          </div>
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px'
          }}>
            <button 
              onClick={() => handleEditProperty(property.id)}
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer'
              }}>
              <Edit style={{ width: '14px', height: '14px' }} />
            </button>
            <button 
              onClick={() => handleDeleteProperty(property.id)}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer'
              }}>
              <Trash2 style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        </div>
        
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
              {formatPrice(property.buy_price || property.rent_price, property.property_type)}
            </span>
            <span style={{ 
              fontSize: '12px', 
              color: 'white',
              backgroundColor: property.property_type === 'buy' ? '#fbbf24' : '#3b82f6',
              padding: '2px 6px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              {property.property_type}
            </span>
          </div>
          
          <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', margin: '0 0 4px 0' }}>
            {property.category} in {property.suburb}
          </h4>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
            {property.address}, {property.suburb} {property.postcode}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Bed style={{ width: '14px', height: '14px' }} />
              <span>{property.bedrooms_num}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Bath style={{ width: '14px', height: '14px' }} />
              <span>{property.bathrooms_num}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Car style={{ width: '14px', height: '14px' }} />
              <span>{property.carspaces}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280' }}>
            <div>{property.action_aggregates?.VIEW || 0} views</div>
            <div>{agent.company}</div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'properties', label: 'Properties', icon: Home, count: properties.length },

    { id: 'profile', label: 'Profile', icon: User, count: 0 }
  ];

  const handleUpdateProfile = async (updatedData) => {
    // Optimistically update the UI
    setAgent(prev => ({ ...prev, ...updatedData }));
    alert('Profile updated successfully!');

    // TODO: Uncomment the API call below when backend is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/agent/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedAgent = await response.json();
      setAgent(updatedAgent);
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
      // Revert optimistic update
      setAgent(mockAgent);
    }
    */
  };

  const handleEditProperty = async (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setEditingProperty(property);
      setPropertyType(property.property_type);
      setShowEditModal(true);
    }
  };

  const handleUpdateProperty = async (updatedData) => {
    // Optimistically update the UI
    setProperties(prev => prev.map(p => 
      p.id === editingProperty.id 
        ? { ...p, ...updatedData, updated_at: new Date().toISOString() }
        : p
    ));
    setShowEditModal(false);
    setEditingProperty(null);
    alert('Property updated successfully!');

    // TODO: Uncomment when API is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/agent/properties/${editingProperty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update property');
      }

      const updatedProperty = await response.json();
      setProperties(prev => prev.map(p => 
        p.id === editingProperty.id ? updatedProperty : p
      ));
    } catch (err) {
      console.error('Failed to update property:', err);
      alert('Failed to update property. Please try again.');
      // Revert optimistic update
      setProperties(mockProperties);
    }
    */
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    // Optimistically remove from UI
    setProperties(prev => prev.filter(p => p.id !== propertyId));

    // TODO: Uncomment when API is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/agent/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
    } catch (err) {
      console.error('Failed to delete property:', err);
      alert('Failed to delete property. Please try again.');
      // Revert optimistic update
      setProperties(mockProperties);
    }
    */
  };

  const handleAddProperty = async (propertyData) => {
    // Create a new property object with a temporary ID
    const newProperty = {
      id: Date.now().toString(),
      ...propertyData,
      status: 'pending',
      views: 0,
      image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    };

    // Optimistically add to UI
    setProperties(prev => [...prev, newProperty]);
    setShowAddModal(false);
    alert('Property added successfully!');

    // TODO: Uncomment the API call below when backend is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/agent/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      const addedProperty = await response.json();
      setProperties(prev => prev.map(p => 
        p.id === newProperty.id ? addedProperty : p
      ));
    } catch (err) {
      console.error('Failed to add property:', err);
      alert('Failed to add property. Please try again.');
      // Remove the optimistically added property
      setProperties(prev => prev.filter(p => p.id !== newProperty.id));
    }
    */
  };

  // Render loading state
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8fafc'
      }}>
        Loading your dashboard...
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        color: '#ef4444',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div>Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo size="medium" />
            <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>Agent Portal</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={agent.avatar}
                alt={agent.username}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                  {agent.username}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  {agent.company}
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
                    backgroundColor: activeTab === tab.id ? '#f0fdf4' : 'white',
                    borderLeft: activeTab === tab.id ? '3px solid #10b981' : '3px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: activeTab === tab.id ? '#10b981' : '#374151',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <tab.icon style={{ width: '18px', height: '18px' }} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count > 0 && (
                    <div style={{
                      backgroundColor: '#ef4444',
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

            {/* Quick Stats */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', marginTop: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
                Quick Stats
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Properties</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                    {properties.length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Published</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>
                    {properties.filter(p => p.status === 'published').length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Views</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                    {properties.reduce((sum, p) => sum + p.views, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                      Property Management
                    </h1>
                    <p style={{ color: '#6b7280', margin: 0 }}>
                      Manage your property listings
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setShowAddModal(true)}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} />
                    Add Property
                  </button>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                  gap: '24px',
                  alignItems: 'start'
                }}>
                  {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}

            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div style={{ marginBottom: '32px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                    Agent Profile
                  </h1>
                  <p style={{ color: '#6b7280', margin: 0 }}>
                    Manage your professional information
                  </p>
                </div>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        defaultValue={agent.username}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          border: '1px solid #d1d5db', 
                          borderRadius: '6px', 
                          fontSize: '14px', 
                          boxSizing: 'border-box'
                        }} 
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Email
                      </label>
                      <input 
                        type="email" 
                        defaultValue={agent.email}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          border: '1px solid #d1d5db', 
                          borderRadius: '6px', 
                          fontSize: '14px', 
                          boxSizing: 'border-box'
                        }} 
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                        Phone
                      </label>
                      <input 
                        type="tel" 
                        defaultValue={agent.phone_number}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          border: '1px solid #d1d5db', 
                          borderRadius: '6px', 
                          fontSize: '14px', 
                          boxSizing: 'border-box'
                        }} 
                      />
                    </div>
                    
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button style={{
                        padding: '12px 24px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Property Modal */}
      {showEditModal && editingProperty && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', margin: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>Edit Property</h3>
            
            <form id="editPropertyForm" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                defaultValue={editingProperty.address}
                required
                style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
              />
              <input 
                type="text" 
                name="suburb" 
                placeholder="Suburb" 
                defaultValue={editingProperty.suburb}
                required
                style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
              />
              <input 
                type="text" 
                name="postcode" 
                placeholder="Postcode" 
                defaultValue={editingProperty.postcode}
                required
                style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <select 
                  name="property_type" 
                  required
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  style={{ flex: 1, padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }}
                >
                  <option value="">Select Listing Type</option>
                  <option value="buy">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
                <select 
                  name="category" 
                  required
                  defaultValue={editingProperty.category}
                  style={{ flex: 1, padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }}
                >
                  <option value="">Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Unit">Unit</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {propertyType === 'buy' ? (
                  <input 
                    type="number" 
                    name="buy_price" 
                    placeholder="Sale Price" 
                    defaultValue={editingProperty.buy_price}
                    required
                    style={{ flex: 1, padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                ) : (
                  <input 
                    type="number" 
                    name="rent_price" 
                    placeholder="Weekly Rent" 
                    defaultValue={editingProperty.rent_price}
                    required
                    style={{ flex: 1, padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="bedrooms_num" 
                    placeholder="Bedrooms" 
                    defaultValue={editingProperty.bedrooms_num}
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="bathrooms_num" 
                    placeholder="Bathrooms" 
                    defaultValue={editingProperty.bathrooms_num}
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="carspaces" 
                    placeholder="Car Spaces" 
                    defaultValue={editingProperty.carspaces}
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="landsize" 
                    placeholder="Land Size (sqm)" 
                    defaultValue={editingProperty.landsize}
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="year_built" 
                    placeholder="Year Built" 
                    defaultValue={editingProperty.year_built}
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                  </div>
                </div>
            </form>
            
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingProperty(null);
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              
              <button 
                onClick={() => {
                  const formElements = document.querySelectorAll('#editPropertyForm input, #editPropertyForm select');
                  const propertyData = Array.from(formElements).reduce((acc, el) => {
                    if (el.value) {
                      acc[el.name] = el.type === 'number' ? Number(el.value) : el.value;
                    }
                    return acc;
                  }, {});
                  handleUpdateProperty(propertyData);
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Update Property
              </button>
            </div>
          </div>
        </div>
        
      )}

      {/* Add Property Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', margin: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>Add New Property</h3>
            
            <form id="addPropertyForm" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                required
                style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
              />
              <input 
                type="text" 
                name="suburb" 
                placeholder="Suburb" 
                required
                style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
              />
              <input 
                type="text" 
                name="postcode" 
                placeholder="Postcode" 
                required
                style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <select 
                  name="property_type" 
                  required
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  style={{ flex: 1, padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }}
                >
                  <option value="">Select Listing Type</option>
                  <option value="buy">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
                <select 
                  name="category" 
                  required
                  style={{ flex: 1, padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }}
                >
                  <option value="">Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Unit">Unit</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {propertyType === 'buy' ? (
                  <input 
                    type="number" 
                    name="buy_price" 
                    placeholder="Sale Price" 
                    required
                    style={{ flex: 1, padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                ) : (
                  <input 
                    type="number" 
                    name="rent_price" 
                    placeholder="Weekly Rent" 
                    required
                    style={{ flex: 1, padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="bedrooms_num" 
                    placeholder="Bedrooms" 
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="bathrooms_num" 
                    placeholder="Bathrooms" 
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="carspaces" 
                    placeholder="Car Spaces" 
                    required
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="landsize" 
                    placeholder="Land Size (sqm)" 
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="number" 
                    name="year_built" 
                    placeholder="Year Built" 
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} 
                  />
                </div>
              </div>
            </form>
            
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              
              <button 
                onClick={() => {
                  const formElements = document.querySelectorAll('#addPropertyForm input, #addPropertyForm select');
                  const propertyData = Array.from(formElements).reduce((acc, el) => {
                    if (el.value) {
                      acc[el.name] = el.type === 'number' ? Number(el.value) : el.value;
                    }
                    return acc;
                  }, {});
                  handleAddProperty(propertyData);
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Add Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
