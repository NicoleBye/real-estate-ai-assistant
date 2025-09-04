import React, { useState } from 'react';
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

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [showAddModal, setShowAddModal] = useState(false);

  const [agent] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@realestate.com',
    phone: '+61 3 9000 1567',
    company: 'Premium Real Estate',
    license: 'REA12345',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332bb5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  });

  const [properties] = useState([
    {
      id: "1",
      suburb: "Melbourne",
      address: "123 Collins Street",
      postcode: "3000",
      listing_type: "buy",
      property_type: "Apartment",
      buy_price: 850000,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 2,
      status: "published",
      views: 245,
      inquiries: 12,
      image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "2",
      suburb: "South Yarra",
      address: "456 Chapel Street",
      postcode: "3141",
      listing_type: "rent",
      property_type: "House",
      rent_price: 650,
      bedrooms: 2,
      bathrooms: 2,
      carspaces: 1,
      status: "pending",
      views: 89,
      inquiries: 5,
      image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]);

  const [inspections] = useState([
    {
      id: 1,
      property_address: "123 Collins Street, Melbourne",
      client_name: "John Smith",
      client_phone: "+61 4 1234 5678",
      inspection_date: "2025-02-01T10:00:00Z",
      inspection_type: "Buy - Private Viewing",
      status: "confirmed",
      listing_type: "buy"
    },
    {
      id: 2,
      property_address: "456 Chapel Street, South Yarra",
      client_name: "Michael Chen",
      client_phone: "+61 4 5555 1234",
      inspection_date: "2025-02-03T11:00:00Z",
      inspection_type: "Rent - Open Inspection",
      status: "pending",
      listing_type: "rent"
    }
  ]);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-AU', { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price, listingType) => {
    if (listingType === 'rent') {
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
            src={property.image_url} 
            alt={`${property.property_type} in ${property.suburb}`}
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
            <button style={{
              backgroundColor: 'rgba(59, 130, 246, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer'
            }}>
              <Edit style={{ width: '14px', height: '14px' }} />
            </button>
            <button style={{
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
              {formatPrice(property.buy_price || property.rent_price, property.listing_type)}
            </span>
            <span style={{ 
              fontSize: '12px', 
              color: 'white',
              backgroundColor: property.listing_type === 'buy' ? '#fbbf24' : '#3b82f6',
              padding: '2px 6px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              {property.listing_type}
            </span>
          </div>
          
          <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', margin: '0 0 4px 0' }}>
            {property.property_type} in {property.suburb}
          </h4>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
            {property.address}, {property.suburb} {property.postcode}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Bed style={{ width: '14px', height: '14px' }} />
              <span>{property.bedrooms}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Bath style={{ width: '14px', height: '14px' }} />
              <span>{property.bathrooms}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Car style={{ width: '14px', height: '14px' }} />
              <span>{property.carspaces}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280' }}>
            <span>{property.views} views • {property.inquiries} inquiries</span>
          </div>
        </div>
      </div>
    );
  };

  const InspectionCard = ({ inspection }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e5e7eb',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
              {inspection.property_address}
            </h4>
            <div style={{
              backgroundColor: inspection.listing_type === 'buy' ? '#fef3c7' : '#dbeafe',
              color: inspection.listing_type === 'buy' ? '#92400e' : '#1e40af',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '500',
              textTransform: 'uppercase'
            }}>
              {inspection.listing_type}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>
            <Calendar style={{ width: '16px', height: '16px' }} />
            <span style={{ fontWeight: '500' }}>
              {formatDateTime(inspection.inspection_date)}
            </span>
            <span style={{ marginLeft: '8px', padding: '2px 6px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '12px' }}>
              {inspection.inspection_type}
            </span>
          </div>
          
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            <p style={{ margin: '0 0 4px 0' }}>
              <strong>Client:</strong> {inspection.client_name}
            </p>
            <p style={{ margin: '0' }}>
              <strong>Phone:</strong> {inspection.client_phone}
            </p>
          </div>
        </div>
        
        <div style={{
          backgroundColor: inspection.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
          color: inspection.status === 'confirmed' ? '#166534' : '#92400e',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'capitalize'
        }}>
          {inspection.status}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={{
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Confirm
        </button>
        
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
          Reschedule
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'properties', label: 'Properties', icon: Home, count: properties.length },
    { id: 'inspections', label: 'Inspections', icon: Calendar, count: inspections.length },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo size="medium" />
            <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>Agent Portal</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={agent.avatar}
                alt={agent.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: 0 }}>
                  {agent.name}
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                  {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}

            {/* Inspections Tab */}
            {activeTab === 'inspections' && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
                    Property Inspections
                  </h1>
                  <p style={{ color: '#6b7280', margin: 0 }}>
                    {inspections.filter(i => i.status === 'confirmed').length} confirmed inspections
                  </p>
                </div>

                <div>
                  {inspections.map(inspection => (
                    <InspectionCard key={inspection.id} inspection={inspection} />
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
                        defaultValue={agent.name}
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
                        defaultValue={agent.phone}
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

      {/* Add Property Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', margin: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>Add New Property</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Address" style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} />
              <input type="text" placeholder="Suburb" style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} />
              <input type="number" placeholder="Price" style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} />
              <select style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }}>
                <option>Property Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Townhouse</option>
                <option>Unit</option>
              </select>
              <select style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }}>
                <option>Listing Type</option>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <input type="number" placeholder="Bedrooms" style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} />
                <input type="number" placeholder="Bathrooms" style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} />
                <input type="number" placeholder="Car Spaces" style={{ padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }} />
              </div>
            </div>
            
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
                  alert('Property added successfully!');
                  setShowAddModal(false);
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