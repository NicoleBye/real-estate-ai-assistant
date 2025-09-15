import React, { useState, useEffect } from 'react';
import { Calendar, Bed, Bath, MapPin, Phone, Clock } from 'lucide-react';

// TODO: Delete after API integration - START
const fallbackInspections = [
  {
    id: "insp_001",
    address: "123 Collins Street, Melbourne",
    bedrooms: 2,
    bathrooms: 1,
    property_type: "Apartment",
    price: 550000,
    listing_type: "buy",
    inspection_date: "2025-01-25T14:00:00Z",
    inspection_type: "Private",
    agent_name: "Sarah Wilson",
    agent_phone: "0412 345 678",
    status: "confirmed"
  },
  {
    id: "insp_002", 
    address: "456 Chapel Street, South Yarra",
    bedrooms: 3,
    bathrooms: 2,
    property_type: "Townhouse",
    price: 850,
    listing_type: "rent",
    inspection_date: "2025-01-26T11:00:00Z",
    inspection_type: "Open House",
    agent_name: "Michael Chen",
    agent_phone: "0423 456 789",
    status: "pending"
  },
  {
    id: "insp_003",
    address: "789 Burke Road, Camberwell", 
    bedrooms: 4,
    bathrooms: 3,
    property_type: "House",
    price: 1200000,
    listing_type: "buy",
    inspection_date: "2025-01-24T10:00:00Z",
    inspection_type: "Private",
    agent_name: "Emma Thompson",
    agent_phone: "0434 567 890", 
    status: "cancelled"
  }
];
// TODO: Delete after API integration - END

const PropertyInspections = () => {
  // TODO: Change to useState([]) after API integration
  const [inspections, setInspections] = useState(fallbackInspections);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    // TODO: Uncomment when API is ready
  /*
  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/inspections');
      if (!response.ok) {
        throw new Error('Failed to fetch inspections');
      }
      const data = await response.json();
      setInspections(data);
    } catch (error) {
      console.error('Failed to fetch inspections:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  */

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
    switch (status) {
      case 'confirmed':
        return { bg: '#dcfce7', color: '#166534' };
      case 'pending':
        return { bg: '#fef3c7', color: '#92400e' };
      case 'cancelled':
        return { bg: '#fee2e2', color: '#991b1b' };
      default:
        return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const InspectionCard = ({ inspection }) => {
    const statusStyle = getStatusColor(inspection.status);
    
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        marginBottom: '16px',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                {inspection.address}
              </h4>
              <div style={{
                backgroundColor: statusStyle.bg,
                color: statusStyle.color,
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {inspection.status}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Bed style={{ width: '16px', height: '16px' }} />
                <span>{inspection.bedrooms}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Bath style={{ width: '16px', height: '16px' }} />
                <span>{inspection.bathrooms}</span>
              </div>
              <span>{inspection.property_type}</span>
              <span style={{ fontWeight: '500', color: '#111827' }}>
                {formatPrice(inspection.price, inspection.listing_type)}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#374151', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar style={{ width: '16px', height: '16px' }} />
                <span style={{ fontWeight: '500' }}>
                  {formatDateTime(inspection.inspection_date)}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock style={{ width: '16px', height: '16px' }} />
                <span style={{ padding: '2px 8px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '12px' }}>
                  {inspection.inspection_type}
                </span>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'right', marginLeft: '20px' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: '0 0 4px 0' }}>
              {inspection.agent_name}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280' }}>
              <Phone style={{ width: '12px', height: '12px' }} />
              <span>{inspection.agent_phone}</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
            View Property
          </button>
          
          {inspection.status === 'confirmed' && (
            <>
              <button style={{
                backgroundColor: 'transparent',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                Reschedule
              </button>
              
              <button style={{
                backgroundColor: 'transparent',
                color: '#ef4444',
                border: '1px solid #fca5a5',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                Cancel
              </button>
            </>
          )}
          
          {inspection.status === 'pending' && (
            <button style={{
              backgroundColor: '#2563eb',
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
          )}
          
          {inspection.status === 'cancelled' && (
            <button style={{
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Rebook
            </button>
          )}
        </div>
      </div>
    );
  };

  const upcomingInspections = inspections.filter(i => i.status === 'confirmed');
  const pendingInspections = inspections.filter(i => i.status === 'pending');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
            Property Inspections
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            {upcomingInspections.length} confirmed • {pendingInspections.length} pending
          </p>
        </div>
        
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}>
          <Calendar style={{ width: '16px', height: '16px' }} />
          Book New Inspection
        </button>
      </div>

      {inspections.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <Calendar style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
            No inspections scheduled
          </h3>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Book your first property inspection to get started
          </p>
        </div>
      ) : (
        <div>
          {inspections.map(inspection => (
            <InspectionCard key={inspection.id} inspection={inspection} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyInspections;