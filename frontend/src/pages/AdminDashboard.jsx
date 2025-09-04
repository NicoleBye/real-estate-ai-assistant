import React, { useState } from 'react';
import Logo from '../components/logo';

import { 
  Home, 
  User, 
  Users,
  Shield,
  BarChart3,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Clock,
  MapPin,
  Bed,
  Bath,
  Car,
  Download,
  Upload,
  TrendingUp,
  Activity,
  DollarSign
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [admin] = useState({
    name: 'Admin User',
    email: 'admin@propzy.com',
    role: 'Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  });

  // Properties data with different statuses
  const [properties, setProperties] = useState([
    {
      id: "1",
      suburb: "Melbourne",
      address: "123 Collins Street",
      postcode: "3000",
      listing_type: "buy",
      property_type: "Apartment",
      agent_name: "Sarah Johnson",
      agent_company: "Premium Real Estate",
      buy_price: 850000,
      rent_price: null,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 2,
      status: "published",
      views: 245,
      inquiries: 12,
      created_at: "2025-01-15T10:00:00Z",
      updated_at: "2025-01-20T14:30:00Z",
      image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "2",
      suburb: "South Yarra",
      address: "456 Chapel Street",
      postcode: "3141",
      listing_type: "rent",
      property_type: "House",
      agent_name: "Michael Chen",
      agent_company: "City Rentals",
      buy_price: null,
      rent_price: 650,
      bedrooms: 2,
      bathrooms: 2,
      carspaces: 1,
      status: "pending",
      views: 89,
      inquiries: 5,
      created_at: "2025-01-20T14:30:00Z",
      updated_at: "2025-01-25T09:15:00Z",
      image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "3",
      suburb: "Richmond",
      address: "789 Swan Street",
      postcode: "3121",
      listing_type: "buy",
      property_type: "Townhouse",
      agent_name: "Emma Wilson",
      agent_company: "Heritage Homes",
      buy_price: 720000,
      rent_price: null,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 1,
      status: "rejected",
      views: 156,
      inquiries: 8,
      created_at: "2025-01-18T11:20:00Z",
      updated_at: "2025-01-22T16:45:00Z",
      image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "4",
      suburb: "Carlton",
      address: "321 Lygon Street",
      postcode: "3053",
      listing_type: "rent",
      property_type: "Apartment",
      agent_name: "David Lee",
      agent_company: "Urban Properties",
      buy_price: null,
      rent_price: 480,
      bedrooms: 1,
      bathrooms: 1,
      carspaces: 0,
      status: "pending",
      views: 67,
      inquiries: 3,
      created_at: "2025-01-22T09:30:00Z",
      updated_at: "2025-01-22T09:30:00Z",
      image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]);

  // Users data
  const [users] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "user",
      status: "active",
      joined: "2024-12-15T10:00:00Z",
      properties_saved: 5,
      inspections_booked: 2
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@realestate.com",
      role: "agent",
      status: "active",
      joined: "2023-06-15T10:00:00Z",
      properties_listed: 15,
      active_listings: 8
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      role: "user",
      status: "inactive",
      joined: "2024-11-20T10:00:00Z",
      properties_saved: 2,
      inspections_booked: 0
    },
    {
      id: "4",
      name: "Michael Chen",
      email: "michael.chen@cityrentals.com",
      role: "agent",
      status: "active",
      joined: "2024-01-10T10:00:00Z",
      properties_listed: 22,
      active_listings: 12
    }
  ]);

  // Analytics data
  const analyticsData = {
    totalProperties: properties.length,
    totalUsers: users.length,
    totalViews: properties.reduce((sum, prop) => sum + prop.views, 0),
    totalInquiries: properties.reduce((sum, prop) => sum + prop.inquiries, 0),
    averagePrice: Math.round(properties
      .filter(p => p.buy_price)
      .reduce((sum, p) => sum + p.buy_price, 0) / properties.filter(p => p.buy_price).length),
    monthlyGrowth: 12.5,
    activeAgents: users.filter(u => u.role === 'agent' && u.status === 'active').length,
    pendingReviews: properties.filter(p => p.status === 'pending').length
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price, listingType) => {
    if (listingType === 'rent') {
      return `$${price}/week`;
    }
    return `$${price?.toLocaleString()}`;
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

  const handlePropertyStatusChange = (propertyId, newStatus) => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId 
        ? { ...property, status: newStatus, updated_at: new Date().toISOString() }
        : property
    ));
  };

  const handleDeleteProperty = (propertyId) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(property => property.id !== propertyId));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedProperties.length === 0) {
      alert('Please select properties first');
      return;
    }

    if (confirm(`Are you sure you want to ${action} ${selectedProperties.length} selected properties?`)) {
      if (action === 'delete') {
        setProperties(prev => prev.filter(property => !selectedProperties.includes(property.id)));
      } else {
        setProperties(prev => prev.map(property => 
          selectedProperties.includes(property.id)
            ? { ...property, status: action, updated_at: new Date().toISOString() }
            : property
        ));
      }
      setSelectedProperties([]);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.agent_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const PropertyRow = ({ property }) => {
    const statusColor = getStatusColor(property.status);
    const isSelected = selectedProperties.includes(property.id);
    
    return (
      <tr style={{ 
        backgroundColor: isSelected ? '#f0f9ff' : 'white',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <td style={{ padding: '16px' }}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedProperties(prev => [...prev, property.id]);
              } else {
                setSelectedProperties(prev => prev.filter(id => id !== property.id));
              }
            }}
            style={{ cursor: 'pointer' }}
          />
        </td>
        <td style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={property.image_url} 
              alt={property.property_type}
              style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                {property.property_type} in {property.suburb}
              </h4>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {property.address}, {property.postcode}
              </p>
            </div>
          </div>
        </td>
        <td style={{ padding: '16px' }}>
          <span style={{
            backgroundColor: property.listing_type === 'buy' ? '#fef3c7' : '#dbeafe',
            color: property.listing_type === 'buy' ? '#92400e' : '#1e40af',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase'
          }}>
            {property.listing_type}
          </span>
        </td>
        <td style={{ padding: '16px', fontWeight: '600', color: '#111827' }}>
          {formatPrice(property.buy_price || property.rent_price, property.listing_type)}
        </td>
        <td style={{ padding: '16px' }}>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            <div>{property.bedrooms}bed • {property.bathrooms}bath • {property.carspaces}car</div>
          </div>
        </td>
        <td style={{ padding: '16px' }}>
          <div style={{ fontSize: '13px', color: '#374151' }}>
            <div style={{ fontWeight: '500' }}>{property.agent_name}</div>
            <div style={{ color: '#6b7280' }}>{property.agent_company}</div>
          </div>
        </td>
        <td style={{ padding: '16px' }}>
          <span style={{
            backgroundColor: statusColor.bg,
            color: statusColor.text,
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'capitalize'
          }}>
            {property.status}
          </span>
        </td>
        <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
          <div>{property.views} views</div>
          <div>{property.inquiries} inquiries</div>
        </td>
        <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
          {formatDate(property.created_at)}
        </td>
        <td style={{ padding: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => alert(`Viewing details for ${property.address}`)}
              style={{
                padding: '6px',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Eye style={{ width: '14px', height: '14px', color: '#6b7280' }} />
            </button>
            
            {property.status === 'pending' && (
              <>
                <button
                  onClick={() => handlePropertyStatusChange(property.id, 'published')}
                  style={{
                    padding: '6px',
                    backgroundColor: '#dcfce7',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Check style={{ width: '14px', height: '14px', color: '#166534' }} />
                </button>
                <button
                  onClick={() => handlePropertyStatusChange(property.id, 'rejected')}
                  style={{
                    padding: '6px',
                    backgroundColor: '#fee2e2',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X style={{ width: '14px', height: '14px', color: '#dc2626' }} />
                </button>
              </>
            )}
            
            <button
              onClick={() => handleDeleteProperty(property.id)}
              style={{
                padding: '6px',
                backgroundColor: '#fee2e2',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Trash2 style={{ width: '14px', height: '14px', color: '#dc2626' }} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const UserRow = ({ user }) => (
    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
      <td style={{ padding: '16px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
            {user.name}
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            {user.email}
          </div>
        </div>
      </td>
      <td style={{ padding: '16px' }}>
        <span style={{
          backgroundColor: user.role === 'agent' ? '#fef3c7' : '#dbeafe',
          color: user.role === 'agent' ? '#92400e' : '#1e40af',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'capitalize'
        }}>
          {user.role}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <span style={{
          backgroundColor: user.status === 'active' ? '#dcfce7' : '#f3f4f6',
          color: user.status === 'active' ? '#166534' : '#6b7280',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'capitalize'
        }}>
          {user.status}
        </span>
      </td>
      <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
        {formatDate(user.joined)}
      </td>
      <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
        {user.role === 'agent' 
          ? `${user.properties_listed} listed, ${user.active_listings} active`
          : `${user.properties_saved} saved, ${user.inspections_booked} inspections`
        }
      </td>
      <td style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            padding: '6px',
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            <Eye style={{ width: '14px', height: '14px', color: '#6b7280' }} />
          </button>
          <button style={{
            padding: '6px',
            backgroundColor: '#fee2e2',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            <Trash2 style={{ width: '14px', height: '14px', color: '#dc2626' }} />
          </button>
        </div>
      </td>
    </tr>
  );

  const tabs = [
    { id: 'properties', label: 'Property Management', icon: Home, count: properties.length },
    { id: 'users', label: 'User Management', icon: Users, count: users.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: 0 }
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo size="medium" />
            <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>Admin Panel</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={admin.avatar}
                alt={admin.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                  {admin.name}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  {admin.role}
                </p>
              </div>
            </div>
            
            <button style={{
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
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
                    backgroundColor: activeTab === tab.id ? '#fef2f2' : 'white',
                    borderLeft: activeTab === tab.id ? '3px solid #dc2626' : '3px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: activeTab === tab.id ? '#dc2626' : '#374151',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <tab.icon style={{ width: '18px', height: '18px' }} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count > 0 && (
                    <div style={{
                      backgroundColor: '#dc2626',
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
                System Overview
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Properties</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                    {properties.length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Pending Review</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#f59e0b' }}>
                    {properties.filter(p => p.status === 'pending').length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Active Users</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>
                    {users.filter(u => u.status === 'active').length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Agents</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#3b82f6' }}>
                    {users.filter(u => u.role === 'agent').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {/* Properties Management */}
            {activeTab === 'properties' && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                    Property Management
                  </h1>
                  <p style={{ color: '#6b7280', margin: 0 }}>
                    Review and manage all property listings
                  </p>
                </div>

                {/* Filters and Actions */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#6b7280' }} />
                        <input
                          type="text"
                          placeholder="Search properties..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{
                            padding: '8px 12px 8px 36px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            minWidth: '200px'
                          }}
                        />
                      </div>
                      
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{
                        padding: '8px 16px',
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        <Download style={{ width: '16px', height: '16px' }} />
                        Export
                      </button>
                      
                      <button style={{
                        padding: '8px 16px',
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        <Upload style={{ width: '16px', height: '16px' }} />
                        Import
                      </button>
                    </div>
                  </div>

                  {selectedProperties.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
                      <span style={{ fontSize: '14px', color: '#1e40af', fontWeight: '500' }}>
                        {selectedProperties.length} properties selected
                      </span>
                      <button
                        onClick={() => handleBulkAction('published')}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleBulkAction('rejected')}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Properties Table */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9fafb' }}>
                      <tr>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>
                          <input
                            type="checkbox"
                            checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProperties(filteredProperties.map(p => p.id));
                              } else {
                                setSelectedProperties([]);
                              }
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                        </th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Property</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Type</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Price</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Details</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Agent</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Performance</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Created</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProperties.map((property) => (
                        <PropertyRow key={property.id} property={property} />
                      ))}
                    </tbody>
                  </table>

                  {filteredProperties.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                      <Home style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 16px' }} />
                      <p style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0' }}>No properties found</p>
                      <p style={{ fontSize: '14px', margin: 0 }}>Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTab === 'users' && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                    User Management
                  </h1>
                  <p style={{ color: '#6b7280', margin: 0 }}>
                    Manage all users and agents on the platform
                  </p>
                </div>

                {/* Users Table */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9fafb' }}>
                      <tr>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>User</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Role</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Joined</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Activity</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <UserRow key={user.id} user={user} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeTab === 'analytics' && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                    Analytics Dashboard
                  </h1>
                  <p style={{ color: '#6b7280', margin: 0 }}>
                    Platform performance and key metrics
                  </p>
                </div>

                {/* Key Metrics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>Total Properties</h3>
                      <div style={{ backgroundColor: '#fef3c7', padding: '8px', borderRadius: '8px' }}>
                        <Home style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
                      </div>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                      {analyticsData.totalProperties}
                    </p>
                    <p style={{ fontSize: '14px', color: '#10b981', margin: 0 }}>
                      +{analyticsData.monthlyGrowth}% from last month
                    </p>
                  </div>

                  <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>Total Views</h3>
                      <div style={{ backgroundColor: '#dbeafe', padding: '8px', borderRadius: '8px' }}>
                        <Eye style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                      </div>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                      {analyticsData.totalViews.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '14px', color: '#10b981', margin: 0 }}>
                      +18% from last month
                    </p>
                  </div>

                  <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>Total Inquiries</h3>
                      <div style={{ backgroundColor: '#dcfce7', padding: '8px', borderRadius: '8px' }}>
                        <Activity style={{ width: '20px', height: '20px', color: '#10b981' }} />
                      </div>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                      {analyticsData.totalInquiries}
                    </p>
                    <p style={{ fontSize: '14px', color: '#10b981', margin: 0 }}>
                      +25% from last month
                    </p>
                  </div>

                  <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>Average Price</h3>
                      <div style={{ backgroundColor: '#fef2f2', padding: '8px', borderRadius: '8px' }}>
                        <DollarSign style={{ width: '20px', height: '20px', color: '#dc2626' }} />
                      </div>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                      ${analyticsData.averagePrice.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                      Market average
                    </p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                  <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>
                      Recent Property Activity
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {properties.slice(0, 5).map((property) => (
                        <div key={property.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                          <img 
                            src={property.image_url} 
                            alt={property.property_type}
                            style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: '0 0 4px 0' }}>
                              {property.address}
                            </p>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                              {property.views} views • {property.inquiries} inquiries
                            </p>
                          </div>
                          <span style={{
                            ...getStatusColor(property.status),
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '500',
                            textTransform: 'capitalize'
                          }}>
                            {property.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>
                      System Stats
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#92400e' }}>Pending Reviews</span>
                          <Clock style={{ width: '16px', height: '16px', color: '#92400e' }} />
                        </div>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e', margin: 0 }}>
                          {analyticsData.pendingReviews}
                        </p>
                      </div>

                      <div style={{ padding: '12px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e40af' }}>Active Agents</span>
                          <User style={{ width: '16px', height: '16px', color: '#1e40af' }} />
                        </div>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af', margin: 0 }}>
                          {analyticsData.activeAgents}
                        </p>
                      </div>

                      <div style={{ padding: '12px', backgroundColor: '#dcfce7', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#166534' }}>Total Users</span>
                          <Users style={{ width: '16px', height: '16px', color: '#166534' }} />
                        </div>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534', margin: 0 }}>
                          {analyticsData.totalUsers}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;