import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Bell,
  Trash2,
  ExternalLink,
  Filter,
  Search,
  Bed,
  Bath,
  Car,
  MapPin,
  Home
} from 'lucide-react';

// TODO: Delete after API integration - START
const fallbackFavoriteProperties = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    suburb: "Bondi Beach",
    address: "123 Ocean Drive",
    postcode: "2026",
    property_type: "buy",
    category: "House",
    company: "Elite Realty",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 2850000,
    rent_price: null,
    bedrooms_num: 4,
    bathrooms_num: 3,
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
    suburb: "Sydney CBD",
    address: "456 George Street",
    postcode: "2000",
    property_type: "rent",
    category: "Apartment",
    company: "City Properties",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: null,
    rent_price: 800,
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

const FavoriteProperties = () => {
  // TODO: Change to useState([]) after API integration
  const [favoriteProperties, setFavoriteProperties] = useState(fallbackFavoriteProperties);
  // const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

    // TODO: Uncomment when API is ready
  /*
  useEffect(() => {
    fetchFavoriteProperties();
  }, []);

  const fetchFavoriteProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/favorites');
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data = await response.json();
      setFavoriteProperties(data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  */

  const handleRemoveProperty = (id) => {
    // TODO: Delete below direct state update and uncomment API call when backend is ready
    setFavoriteProperties(prev => 
      prev.filter(property => property.id !== id)
    );
    
    /*
    const removePropertyAPI = async () => {
      try {
        const response = await fetch(`/api/user/favorites/${propertyId}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }
        
        setFavoriteProperties(prev => 
          prev.filter(property => property.id !== propertyId)
        );
      } catch (error) {
        console.error('Failed to remove favorite:', error);
        setError('Failed to remove property');
      }
    };
    
    removePropertyAPI();
    */
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatPrice = (price, listingType) => {
    if (listingType === 'rent') {
      return `$${price}/week`;
    }
    return `$${price.toLocaleString()}`;
  };

  const filteredProperties = favoriteProperties.filter(property => {
    const matchesSearch = property.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.listing_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const PropertyCard = ({ property, onRemove }) => (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{ 
          height: '200px', 
          backgroundColor: '#e5e7eb',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Home style={{ width: '60px', height: '60px', color: '#9ca3af' }} />
        </div>
        
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: property.listing_type === 'buy' ? '#fbbf24' : '#3b82f6',
          color: property.listing_type === 'buy' ? '#111827' : 'white',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'uppercase'
        }}>
          {property.listing_type}
        </div>
        
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          gap: '8px'
        }}>
          {property.price_alert && (
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.9)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '500'
            }}>
              <Bell style={{ width: '12px', height: '12px', display: 'inline', marginRight: '4px' }} />
              Alert On
            </div>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove(property.id);
            }}
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Trash2 style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>
      
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
            {formatPrice(property.buy_price || property.rent_price, property.listing_type)}
          </span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            {property.seller}
          </span>
        </div>
        
        <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', margin: '0 0 4px 0' }}>
          {property.property_type} in {property.suburb}
        </h4>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
          {property.address}, {property.suburb} {property.postcode}
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Bed style={{ width: '16px', height: '16px' }} />
            <span>{property.bedrooms}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Bath style={{ width: '16px', height: '16px' }} />
            <span>{property.bathrooms}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Car style={{ width: '16px', height: '16px' }} />
            <span>{property.carspaces}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin style={{ width: '16px', height: '16px' }} />
            <span>{property.distance}km</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280' }}>
          <span>Saved {formatDate(property.saved_date)}</span>
          <button style={{
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ExternalLink style={{ width: '12px', height: '12px' }} />
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
            Saved Properties
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            {filteredProperties.length} properties saved
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 16px 8px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <Search style={{ 
              width: '16px', 
              height: '16px', 
              position: 'absolute', 
              left: '12px', 
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }} />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '8px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="all">All Types</option>
            <option value="buy">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <Heart style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
            No saved properties found
          </h3>
          <p style={{ color: '#6b7280', margin: 0 }}>
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start browsing to save your favorite properties'
            }
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {filteredProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onRemove={handleRemoveProperty}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProperties;