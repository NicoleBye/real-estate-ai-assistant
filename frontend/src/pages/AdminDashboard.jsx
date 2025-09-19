import React, { useState, useEffect } from 'react';
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
// TODO: Delete after API integration - START
const mockAdmin = {
  username: 'Admin User',
  email: 'admin@propzy.com',
  role: 'Administrator',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
};

const mockProperties = [
  {
    id: "1",
    suburb: "Melbourne",
    address: "123 Collins Street",
    postcode: "3000",
    property_type: "buy",
    category: "Apartment",
    owner_id: "2", // 关联到 Sarah Johnson 的用户 ID
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
    id: "2",
    suburb: "South Yarra",
    address: "456 Chapel Street",
    postcode: "3141",
    property_type: "rent",
    category: "House",
    owner_id: "4", // 关联到 Michael Chen 的用户 ID
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
  },
  {
    id: "3",
    suburb: "Richmond",
    address: "789 Swan Street",
    postcode: "3121",
    property_type: "buy",
    category: "Townhouse",
    owner_id: "3", // 关联到 Emma Wilson 的用户 ID
    created_at: "2025-01-18T11:20:00Z",
    updated_at: "2025-01-22T16:45:00Z",
    buy_price: 720000,
    rent_price: null,
    status: "rejected",
    action_aggregates: {
      VIEW: 156,
    },
    bedrooms_num: 3,
    bathrooms_num: 2,
    carspaces: 1,
    landsize: 680,
    year_built: 1960,
    lat: -33.8848,
    lng: 151.2291,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    color: '#f59e0b',
    match_score: 84
  },
  {
    id: "4",
    suburb: "Carlton",
    address: "321 Lygon Street",
    postcode: "3053",
    property_type: "rent",
    category: "Apartment",
    owner_id: "2", // 关联到 Sarah Johnson 的用户 ID
    created_at: "2025-01-22T09:30:00Z",
    updated_at: "2025-01-22T09:30:00Z",
    buy_price: null,
    rent_price: 480,
    status: "pending",
    action_aggregates: {
      VIEW: 67,
    },
    bedrooms_num: 1,
    bathrooms_num: 1,
    carspaces: 0,
    landsize: 180,
    year_built: 2019,
    lat: -33.8886,
    lng: 151.2094,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }
    ],
    color: '#ef4444',
    match_score: 78
  }
];

const mockUsers = [
  {
    id: "1",
    username: "John Smith",
    email: "john.smith@email.com",
    role: "user",
    status: "active",
    joined: "2024-12-15T10:00:00Z",
    properties_saved: 5
  },
  {
    id: "2",
    username: "Sarah Johnson",
    email: "sarah.johnson@realestate.com",
    role: "agent",
    status: "active",
    joined: "2023-06-15T10:00:00Z",
    properties_listed: 15,
    active_listings: 8
  },
  {
    id: "3",
    username: "Emma Wilson",
    email: "emma.wilson@email.com",
    role: "user",
    status: "inactive",
    joined: "2024-11-20T10:00:00Z",
    properties_saved: 2,
  },
  {
    id: "4",
    username: "Michael Chen",
    email: "michael.chen@cityrentals.com",
    role: "agent",
    status: "active",
    joined: "2024-01-10T10:00:00Z",
    properties_listed: 22,
    active_listings: 12
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // TODO: Change to useState(null) and useState([]) after API integration
  const [admin, setAdmin] = useState(mockAdmin);
  const [properties, setProperties] = useState(mockProperties);
  const [users, setUsers] = useState(mockUsers);

  // Fetch initial data when component mounts
  useEffect(() => {
    // Use mock data temporarily, no API call
    setAdmin(mockAdmin);
    setProperties(mockProperties);
    setUsers(mockUsers);
    setLoading(false);

    // TODO: Delete above lines and uncomment code below when backend is ready
    /*
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        
        // Fetch admin profile, properties and users in parallel
        const [adminResponse, propertiesResponse, usersResponse] = await Promise.all([
          fetch('/api/admin/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/api/admin/properties', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/api/admin/users', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!adminResponse.ok || !propertiesResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to load dashboard data');
        }

        const adminData = await adminResponse.json();
        const propertiesData = await propertiesResponse.json();
        const usersData = await usersResponse.json();

        setAdmin(adminData);
        setProperties(propertiesData);
        setUsers(usersData);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
        setError(err.message);
        // In case of error, use mock data so the page doesn't break
        setAdmin(mockAdmin);
        setProperties(mockProperties);
        setUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    */
  }, []);
  // Analytics data
  const analyticsData = {
    totalProperties: properties.length,
    totalUsers: users.length,
    totalViews: properties.reduce((sum, prop) => sum + prop.views, 0),
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

  const formatPrice = (price, propertyType) => {
    if (propertyType === 'rent') {
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

  const handleViewProperty = async (propertyId) => {
    setLoading(true);
    try {
      // TODO: Uncomment when API is ready
      /*
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/properties/${propertyId}/details`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch property details');
      }

      const propertyDetails = await response.json();
      setSelectedProperty(propertyDetails);
      */
      
      // Use mock data temporarily
      const property = properties.find(p => p.id === propertyId);
      setSelectedProperty(property);
      setShowViewModal(true);
    } catch (err) {
      console.error('Failed to fetch property details:', err);
      alert('Failed to load property details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportProperties = async () => {
    try {
      // TODO: Uncomment when API is ready
      /*
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/properties/export', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to export properties');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `properties-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      */
      
      // Mock export functionality
      alert('Export functionality will be available when the API is ready');
    } catch (err) {
      console.error('Failed to export properties:', err);
      alert('Failed to export properties. Please try again.');
    }
  };

  const handleImportProperties = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // TODO: Uncomment when API is ready
      /*
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/properties/import', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to import properties');
      }

      const result = await response.json();
      setProperties(prev => [...prev, ...result.properties]);
      alert(`Successfully imported ${result.properties.length} properties`);
      */
      
      // Mock import functionality
      alert('Import functionality will be available when the API is ready');
    } catch (err) {
      console.error('Failed to import properties:', err);
      alert('Failed to import properties. Please try again.');
    }
  };

  const handlePropertyStatusChange = async (propertyId, newStatus) => {
    // Optimistically update UI
    setProperties(prev => prev.map(property => 
      property.id === propertyId 
        ? { ...property, status: newStatus, updated_at: new Date().toISOString() }
        : property
    ));

    // TODO: Uncomment when API is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/properties/${propertyId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update property status');
      }
    } catch (err) {
      console.error('Failed to update property status:', err);
      alert('Failed to update property status. Please try again.');
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
    setProperties(prev => prev.filter(property => property.id !== propertyId));

    // TODO: Uncomment when API is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/properties/${propertyId}`, {
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

  const canPerformBulkAction = (action) => {
    const selectedItems = properties.filter(p => selectedProperties.includes(p.id));
    
    switch(action) {
      case 'published':
        // 只能批量发布待审核的属性
        return selectedItems.every(p => p.status === 'pending');
      case 'rejected':
        // 只能批量拒绝待审核的属性
        return selectedItems.every(p => p.status === 'pending');
      case 'delete':
        // 可以删除任何状态的属性
        return true;
      default:
        return false;
    }
  };

  const getBulkActionDisabledReason = (action) => {
    if (!canPerformBulkAction(action)) {
      return `Can only ${action === 'published' ? 'approve' : 'reject'} pending properties`;
    }
    return '';
  };

  const handleViewUser = async (userId) => {
    setLoading(true);
    try {
      // TODO: Uncomment when API is ready
      /*
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${userId}/details`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userDetails = await response.json();
      setSelectedUser(userDetails);
      */
      
      // Use mock data temporarily
      const user = users.find(u => u.id === userId);
      setSelectedUser(user);
      setShowUserModal(true);
    } catch (err) {
      console.error('Failed to fetch user details:', err);
      alert('Failed to load user details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      // TODO: Uncomment when API is ready
      /*
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      */

      // Optimistically update UI
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user. Please try again.');
      // Revert optimistic update
      setUsers(mockUsers);
    }
  };

  const handleSignOut = async () => {
    try {
      // TODO: Uncomment when API is ready
      /*
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to sign out');
      }
      */

      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/adminlogin';
    } catch (err) {
      console.error('Failed to sign out:', err);
      alert('Failed to sign out. Please try again.');
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedProperties.length === 0) {
      alert('Please select properties first');
      return;
    }

    if (!canPerformBulkAction(action)) {
      alert(getBulkActionDisabledReason(action));
      return;
    }

    if (!window.confirm(`Are you sure you want to ${action} ${selectedProperties.length} selected properties?`)) {
      return;
    }

    // Optimistically update UI
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

    // TODO: Uncomment when API is ready
    /*
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/properties/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyIds: selectedProperties,
          action: action
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} properties`);
      }
    } catch (err) {
      console.error(`Failed to ${action} properties:`, err);
      alert(`Failed to ${action} properties. Please try again.`);
      // Revert optimistic update
      setProperties(mockProperties);
      setSelectedProperties([]);
    }
    */
  };

  const filteredProperties = properties.filter(property => {
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.username.toLowerCase().includes(searchQuery.toLowerCase());
    
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
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
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
              src={property.images[0].url} 
              alt={property.category}
              style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                {property.category} in {property.suburb}
              </h4>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {property.address}, {property.postcode}
              </p>
            </div>
          </div>
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
          <span style={{
            backgroundColor: property.property_type === 'buy' ? '#fef3c7' : '#dbeafe',
            color: property.property_type === 'buy' ? '#92400e' : '#1e40af',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase'
          }}>
            {property.property_type}
          </span>
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#111827' }}>
          {formatPrice(property.buy_price || property.rent_price, property.property_type)}
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'left' }}>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            <div>{property.bedrooms_num}bed • {property.bathrooms_num}bath • {property.carspaces}car</div>
          </div>
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'left' }}>
          <div style={{ fontSize: '13px', color: '#374151' }}>
            <div style={{ fontWeight: '500' }}>{users.find(u => u.id === property.owner_id)?.username || 'Unknown'}</div>
            <div style={{ color: '#6b7280' }}>{users.find(u => u.id === property.owner_id)?.company || 'Unknown'}</div>
          </div>
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
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
        <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
          <div>{property.action_aggregates?.VIEW || 0} views</div>
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#6b7280' }}>
          {formatDate(property.created_at)}
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            <button
              onClick={() => handleViewProperty(property.id)}
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
            
            {property.status === 'pending' ? (
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
              </>
            ) : (
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
            )}
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
            {user.username}
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
          : `${user.properties_saved} saved`
        }
      </td>
      <td style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleViewUser(user.id)}
            style={{
              padding: '6px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <Eye style={{ width: '14px', height: '14px', color: '#6b7280' }} />
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            style={{
              padding: '6px',
              backgroundColor: '#fee2e2',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
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
        Loading dashboard...
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
        color: '#dc2626',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div>Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc2626',
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo size="medium" />
            <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>Admin Panel</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={admin.avatar}
                alt={admin.username}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                  {admin.username}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  {admin.role}
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleSignOut}
              style={{
                backgroundColor: 'transparent',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
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
                      <button 
                        onClick={handleExportProperties}
                        style={{
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
                        }}
                      >
                        <Download style={{ width: '16px', height: '16px' }} />
                        Export
                      </button>
                      
                      <label style={{
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
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleImportProperties}
                          style={{ display: 'none' }}
                        />
                        <Upload style={{ width: '16px', height: '16px' }} />
                        Import
                      </label>
                    </div>
                  </div>

                  {selectedProperties.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
                      <span style={{ fontSize: '14px', color: '#1e40af', fontWeight: '500' }}>
                        {selectedProperties.length} properties selected
                      </span>
                      <button
                        onClick={() => handleBulkAction('published')}
                        disabled={!canPerformBulkAction('published')}
                        title={getBulkActionDisabledReason('published')}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: canPerformBulkAction('published') ? '#dcfce7' : '#f3f4f6',
                          color: canPerformBulkAction('published') ? '#166534' : '#9ca3af',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: canPerformBulkAction('published') ? 'pointer' : 'not-allowed',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleBulkAction('rejected')}
                        disabled={!canPerformBulkAction('rejected')}
                        title={getBulkActionDisabledReason('rejected')}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: canPerformBulkAction('rejected') ? '#fee2e2' : '#f3f4f6',
                          color: canPerformBulkAction('rejected') ? '#dc2626' : '#9ca3af',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: canPerformBulkAction('rejected') ? 'pointer' : 'not-allowed',
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
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <colgroup>
                        <col style={{ width: '40px' }} />
                        <col style={{ width: '35%' }} />
                        <col style={{ width: '80px' }} />
                        <col style={{ width: '100px' }} />
                        <col style={{ width: '120px' }} />
                        <col style={{ width: '120px' }} />
                        <col style={{ width: '100px' }} />
                        <col style={{ width: '80px' }} />
                        <col style={{ width: '120px' }} />
                        <col style={{ width: '100px' }} />
                      </colgroup>
                      <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>
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
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Property</th>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Type</th>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Price</th>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Details</th>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Agent</th>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Status</th>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Views</th>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Created</th>
                          <th style={{ 
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#374151',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                          }}>Actions</th>
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
                            src={property.images[0].url} 
                            alt={property.property_type}
                            style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: '0 0 4px 0' }}>
                              {property.address}
                            </p>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                              {property.views} views
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

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                User Details
              </h2>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                }}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                  Basic Information
                </h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Username</p>
                    <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedUser.username}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Email</p>
                    <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedUser.email}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Role</p>
                    <span style={{
                      backgroundColor: selectedUser.role === 'agent' ? '#fef3c7' : '#dbeafe',
                      color: selectedUser.role === 'agent' ? '#92400e' : '#1e40af',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      display: 'inline-block'
                    }}>
                      {selectedUser.role}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Status</p>
                    <span style={{
                      backgroundColor: selectedUser.status === 'active' ? '#dcfce7' : '#f3f4f6',
                      color: selectedUser.status === 'active' ? '#166534' : '#6b7280',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      display: 'inline-block'
                    }}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                  Activity
                </h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Joined Date</p>
                    <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{formatDate(selectedUser.joined)}</p>
                  </div>
                  {selectedUser.role === 'agent' ? (
                    <>
                      <div>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Properties Listed</p>
                        <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedUser.properties_listed}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Active Listings</p>
                        <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedUser.active_listings}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Properties Saved</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedUser.properties_saved}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Details Modal */}
      {showViewModal && selectedProperty && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                Property Details
              </h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedProperty(null);
                }}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <img
                  src={selectedProperty.images[0].url}
                  alt={selectedProperty.category}
                  style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
                />
                
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <span style={{
                    backgroundColor: selectedProperty.property_type === 'buy' ? '#fef3c7' : '#dbeafe',
                    color: selectedProperty.property_type === 'buy' ? '#92400e' : '#1e40af',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    textTransform: 'uppercase'
                  }}>
                    {selectedProperty.property_type}
                  </span>
                  <span style={{
                    ...getStatusColor(selectedProperty.status),
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {selectedProperty.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                  {selectedProperty.category} in {selectedProperty.suburb}
                </h3>
                <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 16px 0' }}>
                  {selectedProperty.address}, {selectedProperty.postcode}
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: '0 0 24px 0' }}>
                  {formatPrice(selectedProperty.buy_price || selectedProperty.rent_price, selectedProperty.property_type)}
                </p>
              </div>

              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>
                    Property Details
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Bedrooms</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedProperty.bedrooms_num}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Bathrooms</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedProperty.bathrooms_num}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Car Spaces</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedProperty.carspaces}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Land Size</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedProperty.landsize}m²</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Year Built</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedProperty.year_built}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Views</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{selectedProperty.views}</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>
                    Agent Information
                  </h4>
                  <div>
                    <p style={{ fontSize: '15px', color: '#111827', margin: '0 0 4px 0' }}>{selectedProperty.username}</p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{selectedProperty.company}</p>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>
                    Dates
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Created</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{formatDate(selectedProperty.created_at)}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 4px 0' }}>Last Updated</p>
                      <p style={{ fontSize: '15px', color: '#111827', margin: 0 }}>{formatDate(selectedProperty.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
