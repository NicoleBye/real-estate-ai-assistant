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

  // format price
  const formatPrice = () => {
    if (property.property_type === 'buy' && property.buy_price) {
      if (property.buy_price >= 1000000) {
        return `$${(property.buy_price / 1000000).toFixed(1)}M`;
      } else if (property.buy_price >= 1000) {
        return `$${Math.round(property.buy_price / 1000)}K`;
      }
      return `$${property.buy_price.toLocaleString()}`;
    } else if (property.property_type === 'rent' && property.rent_price) {
      return `$${property.rent_price}/week`;
    }
    return 'Contact for price';
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
      onSave(property.id, !isSaved);
    }
  };

  // handle card click
  const handleCardClick = () => {
    if (onView) {
      onView(property);
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
        {property.images.length > 0 ? (
          <img 
            src={property.images?.[0]?.url} 
            alt={`${property.category} in ${property.suburb}`}
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
            display: property.images && property.images.length > 0 ? 'none' : 'flex',
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
            <span style={{ 
              fontSize: '16px', 
              color: isSaved ? 'white' : '#6b7280',
              lineHeight: 1
            }}>
              {isSaved ? 'â™? : 'â™?}
            </span>
          </button>
        )}
      </div>
      
      {/* Property information section */}
      <div style={{ padding: '16px' }}>
        {/* Price and agent */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
            {formatPrice()}
          </span>
          {property.company && (
            <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
              {property.company}
            </span>
          )}
        </div>
        
        {/* Address information */}
        <p style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '4px', margin: '0 0 4px 0' }}>
          {property.address || `${property.category} in ${property.suburb}`}
        </p>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', margin: '0 0 12px 0' }}>
          {property.suburb}{property.postcode ? `, ${property.postcode}` : ''}
        </p>
        
        {/* Property specifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          <span style={{ fontWeight: '500' }}>{property.bedrooms_num} bed</span>
          <span style={{ fontWeight: '500' }}>{property.bathrooms_num} bath</span>
          {property.carspaces && property.carspaces > 0 && (
            <span style={{ fontWeight: '500' }}>{property.carspaces} car</span>
          )}
          {property.landsize && (
            <span style={{ fontWeight: '500' }}>{property.landsize}mÂ²</span>
          )}
        </div>
        
        {/* Bottom information */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280' }}>
          <span>
            {property.property_type === 'buy' ? 'For Sale' : 'For Rent'}
          </span>
          <span>{formatYearBuilt(property.year_built)}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
