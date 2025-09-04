import React, { useState } from 'react';
import { Heart, Home } from 'lucide-react';

const PropertyCard = ({ 
  property, 
  onSave, 
  onView, 
  showSaveButton = true, 
  variant = 'default',
  className = '' 
}) => {
  const [isSaved, setIsSaved] = useState(false);

  // 格式化价格显示
  const formatPrice = () => {
    if (property.listing_type === 'buy' && property.buy_price) {
      if (property.buy_price >= 1000000) {
        return `$${(property.buy_price / 1000000).toFixed(1)}M`;
      } else if (property.buy_price >= 1000) {
        return `$${Math.round(property.buy_price / 1000)}K`;
      }
      return `$${property.buy_price.toLocaleString()}`;
    } else if (property.listing_type === 'rent' && property.rent_price) {
      return `$${property.rent_price}/week`;
    }
    return 'Contact for price';
  };

  // distance
  const formatDistance = (distance) => {
    if (distance && distance > 0) {
      return `${distance}km from CBD`;
    }
    return '';
  };

  // year  built
  const formatYearBuilt = (year) => {
    if (year) {
      return `Built ${year}`;
    }
    return '';
  };

  // handle save button click
  const handleSave = (e) => {
    e.stopPropagation(); // stop event bubbling
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(property.property_id, !isSaved);
    }
  };

  // handle card click
  const handleCardClick = () => {
    if (onView) {
      onView(property.property_id);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`property-card ${className}`}
      style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: onView ? 'pointer' : 'default',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }
      }}
      onMouseEnter={(e) => onView && (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => onView && (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {/* Property image section */}
      <div style={{ position: 'relative' }}>
        {property.image_url ? (
          <img 
            src={property.image_url} 
            alt={`${property.property_type} in ${property.suburb}`}
            style={{ 
              width: '100%', 
              height: '200px', 
              objectFit: 'cover' 
            }}
            onError={(e) => {
              // Fallback when image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback background (when no image or image load fails) */}
        <div 
          style={{ 
            width: '100%', 
            height: '200px', 
            backgroundColor: '#e5e7eb',
            display: property.image_url ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Home style={{ width: '60px', height: '60px', color: '#9ca3af' }} />
        </div>

        {/* Save button */}
        {showSaveButton && (
          <button 
            onClick={handleSave}
            style={{ 
              position: 'absolute', 
              top: '12px', 
              right: '12px', 
              width: '36px', 
              height: '36px', 
              backgroundColor: isSaved ? '#ef4444' : 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '50%', 
              border: 'none',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Heart 
              style={{ 
                width: '18px', 
                height: '18px',
                color: isSaved ? 'white' : '#6b7280',
                fill: isSaved ? 'white' : 'none'
              }} 
            />
          </button>
        )}

        {/* Sale method label */}
        {property.method && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {property.method}
          </div>
        )}
      </div>
      
      {/* Property information section */}
      <div style={{ padding: '16px' }}>
        {/* Price and agent */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
            {formatPrice()}
          </span>
          {property.seller && (
            <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
              {property.seller}
            </span>
          )}
        </div>
        
        {/* Address information */}
        <p style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '4px', margin: '0 0 4px 0' }}>
          {property.address || `${property.property_type} in ${property.suburb}`}
        </p>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', margin: '0 0 12px 0' }}>
          {property.suburb}{property.postcode ? `, ${property.postcode}` : ''}
          {property.distance && property.distance > 0 && (
            <span> • {formatDistance(property.distance)}</span>
          )}
        </p>
        
        {/* Property specifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          <span style={{ fontWeight: '500' }}>{property.bedrooms} bed</span>
          <span style={{ fontWeight: '500' }}>{property.bathrooms} bath</span>
          {property.carspaces && property.carspaces > 0 && (
            <span style={{ fontWeight: '500' }}>{property.carspaces} car</span>
          )}
          {property.landsize && (
            <span style={{ fontWeight: '500' }}>{property.landsize}m²</span>
          )}
        </div>
        
        {/* Bottom information */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280' }}>
          <span>
            {property.listing_type === 'buy' ? 'For Sale' : 'For Rent'}
          </span>
          <span>{formatYearBuilt(property.year_built)}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;