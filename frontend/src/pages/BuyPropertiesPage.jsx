import React, { useState } from 'react';
import Logo from '../components/logo'; 
import PropertyCard from '../components/PropertyCard';

const BuyPropertiesPage = () => {
  // Melbourne property data for buying - exactly matching your database schema
  const [properties] = useState([
    {
      property_id: "550e8400-e29b-41d4-a716-446655440001",
      suburb: "Melbourne",
      address: "123 Collins Street",
      listing_type: "buy",
      property_type: "Apartment",
      method: "Private Sale",
      seller: "Ray White Melbourne",
      distance: 0.5,
      postcode: "3000",
      sale_date: "2025-01-15",
      buy_price: 650000,
      rent_price: null,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 1,
      landsize: null,
      year_built: 2020,
      latitude: -37.8136,
      longitude: 144.9631,
      image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      created_at: "2025-01-01T10:00:00Z"
    },
    {
      property_id: "550e8400-e29b-41d4-a716-446655440002",
      suburb: "South Yarra",
      address: "456 Chapel Street",
      listing_type: "buy", 
      property_type: "House",
      method: "Auction",
      seller: "Jellis Craig",
      distance: 3.2,
      postcode: "3141",
      sale_date: "2025-02-01",
      buy_price: 780000,
      rent_price: null,
      bedrooms: 4,
      bathrooms: 3,
      carspaces: 2,
      landsize: 400,
      year_built: 2018,
      latitude: -37.8467,
      longitude: 144.9896,
      image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      created_at: "2025-01-02T11:30:00Z"
    },
    {
      property_id: "550e8400-e29b-41d4-a716-446655440003",
      suburb: "Collingwood",
      address: "789 Smith Street",
      listing_type: "buy",
      property_type: "Townhouse", 
      method: "Private Sale",
      seller: "Hocking Stuart",
      distance: 2.8,
      postcode: "3066",
      sale_date: "2025-01-20",
      buy_price: 920000,
      rent_price: null,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 2,
      landsize: 150,
      year_built: 2019,
      latitude: -37.8043,
      longitude: 144.9848,
      image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      created_at: "2025-01-03T14:15:00Z"
    },
    {
      property_id: "550e8400-e29b-41d4-a716-446655440004",
      suburb: "Richmond",
      address: "321 Swan Street",
      listing_type: "buy",
      property_type: "Unit",
      method: "Private Sale", 
      seller: "Nelson Alexander",
      distance: 2.1,
      postcode: "3121",
      sale_date: "2025-01-25",
      buy_price: 450000,
      rent_price: null,
      bedrooms: 2,
      bathrooms: 1,
      carspaces: 1,
      landsize: null,
      year_built: 2015,
      latitude: -37.8197,
      longitude: 144.9864,
      image_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      created_at: "2025-01-04T09:45:00Z"
    },
    {
      property_id: "550e8400-e29b-41d4-a716-446655440005",
      suburb: "Southbank",
      address: "100 Southbank Promenade",
      listing_type: "buy",
      property_type: "Apartment",
      method: "Auction",
      seller: "Barry Plant",
      distance: 1.5,
      postcode: "3006", 
      sale_date: "2025-02-10",
      buy_price: 1150000,
      rent_price: null,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 2,
      landsize: null,
      year_built: 2021,
      latitude: -37.8220,
      longitude: 144.9633,
      image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      created_at: "2025-01-05T16:20:00Z"
    },
    {
      property_id: "550e8400-e29b-41d4-a716-446655440006",
      suburb: "Fitzroy",
      address: "555 Brunswick Street", 
      listing_type: "buy",
      property_type: "House",
      method: "Private Sale",
      seller: "RT Edgar",
      distance: 3.5,
      postcode: "3065",
      sale_date: "2025-02-15",
      buy_price: 2200000,
      rent_price: null,
      bedrooms: 5,
      bathrooms: 3,
      carspaces: 2,
      landsize: 600,
      year_built: 1920,
      latitude: -37.7979,
      longitude: 144.9810,
      image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      created_at: "2025-01-06T12:00:00Z"
    }
  ]);

  const [showMap, setShowMap] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 400000, max: 1500000 });

  // Format price for display
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000)}K`;
    }
    return `$${price}`;
  };

  // Format settlement date 
  const formatSettlementDate = (saleDate) => {
    const date = new Date(saleDate);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return "Available now";
    } else if (diffDays <= 30) {
      return `Settlement ${diffDays} days`;
    } else {
      return "Settlement flexible";
    }
  };

  const MapSection = () => (
    <div style={{ 
      position: 'relative', 
      height: '100%', 
      backgroundColor: '#e0f2fe',
      backgroundImage: 'linear-gradient(45deg, #e0f2fe 25%, transparent 25%), linear-gradient(-45deg, #e0f2fe 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0f2fe 75%), linear-gradient(-45deg, transparent 75%, #e0f2fe 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
    }}>
      <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} viewBox="0 0 800 400">
        <path d="M0,200 Q200,180 400,200 Q600,220 800,200" stroke="#42a5f5" strokeWidth="8" fill="none" opacity="0.6"/>
        <path d="M0,220 Q200,200 400,220 Q600,240 800,220" stroke="#1e88e5" strokeWidth="6" fill="none" opacity="0.8"/>
        
        <g stroke="#ffffff" strokeWidth="2" opacity="0.4">
          <line x1="150" y1="0" x2="150" y2="400" />
          <line x1="300" y1="0" x2="300" y2="400" />
          <line x1="450" y1="0" x2="450" y2="400" />
          <line x1="600" y1="0" x2="600" y2="400" />
          <line x1="0" y1="100" x2="800" y2="100" />
          <line x1="0" y1="300" x2="800" y2="300" />
        </g>
        
        <g fill="#ffffff" opacity="0.3">
          <rect x="120" y="80" width="60" height="40" />
          <rect x="270" y="60" width="50" height="50" />
          <rect x="420" y="70" width="70" height="60" />
          <rect x="570" y="50" width="40" height="70" />
        </g>
      </svg>
      
      {/* Property markers on map based on actual data */}
      <div style={{ position: 'absolute', top: '60px', left: '120px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
        {formatPrice(properties[0].buy_price)}
      </div>
      <div style={{ position: 'absolute', top: '80px', right: '150px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
        {formatPrice(properties[4].buy_price)}
      </div>
      <div style={{ position: 'absolute', bottom: '120px', left: '100px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
        {formatPrice(properties[1].buy_price)}
      </div>
      <div style={{ position: 'absolute', bottom: '100px', right: '180px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
        {formatPrice(properties[2].buy_price)}
      </div>
      <div style={{ position: 'absolute', top: '180px', left: '350px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
        {formatPrice(properties[5].buy_price)}
      </div>
      <div style={{ position: 'absolute', bottom: '200px', right: '80px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>
        {formatPrice(properties[3].buy_price)}
      </div>
      
      <div style={{ 
        position: 'absolute', 
        top: '16px', 
        right: '16px', 
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <button style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px', 
          height: '40px', 
          backgroundColor: '#ffffff', 
          border: 'none',
          borderBottom: '1px solid #e5e7eb',
          fontSize: '20px', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          color: '#374151',
          lineHeight: '1'
        }}>+</button>
        <button style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px', 
          height: '40px', 
          backgroundColor: '#ffffff', 
          border: 'none',
          fontSize: '20px', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          color: '#374151',
          lineHeight: '1'
        }}>−</button>
      </div>
      
      <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
        📍 Melbourne, VIC
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: '#ffffff', 
      margin: 0, 
      padding: 0, 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      overflowY: 'auto', 
      overflowX: 'hidden', 
      display: 'flex',
      scrollbarWidth: 'thin',
      scrollbarColor: '#c1c1c1 #f1f1f1'
    }}>
      {/* Left Sidebar - Filters */}
      <div style={{ width: '380px', backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ marginBottom: '24px' }}>
            <Logo size="medium" />
          </div>
          
          {/* Buy/Rent Toggle */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '4px' }}>
            <button style={{ flex: 1, padding: '12px 16px', fontSize: '14px', fontWeight: '500', backgroundColor: '#FBCA03', color: '#111827', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
              Buy
            </button>
            <button style={{ flex: 1, padding: '12px 16px', fontSize: '14px', fontWeight: '500', backgroundColor: '#f3f4f6', color: '#6b7280', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
              Rent
            </button>
          </div>
          
          {/* Show on map toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Show on map</span>
            <button 
              onClick={() => setShowMap(!showMap)}
              style={{ 
                position: 'relative', 
                width: '44px', 
                height: '24px', 
                borderRadius: '12px', 
                backgroundColor: showMap ? '#111827' : '#d1d5db', 
                border: 'none', 
                cursor: 'pointer', 
                transition: 'background-color 0.2s',
                outline: 'none'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: '2px', 
                left: showMap ? '22px' : '2px',
                width: '20px', 
                height: '20px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '50%', 
                transition: 'left 0.2s ease', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}></div>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Location Search */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Location</h3>
              <input 
                type="text" 
                placeholder="Enter suburb, postcode or address..."
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px', 
                  backgroundColor: '#ffffff', 
                  fontSize: '14px', 
                  boxSizing: 'border-box', 
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            {/* Settlement Date */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Settlement</h3>
              <select style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                backgroundColor: '#ffffff', 
                fontSize: '14px', 
                boxSizing: 'border-box', 
                outline: 'none',
                color: '#374151',
                cursor: 'pointer'
              }}>
                <option value="any">Any time</option>
                <option value="30">Within 30 days</option>
                <option value="60">Within 60 days</option>
                <option value="90">Within 90 days</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Price</h3>
              <div style={{ marginBottom: '16px' }}>
                {/* Track container */}
                <div style={{ position: 'relative', height: '60px', margin: '0 16px' }}>
                  {/* Background track */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '27px',
                    left: '0',
                    right: '0',
                    height: '6px', 
                    backgroundColor: '#e2e8f0', 
                    borderRadius: '3px'
                  }}></div>
                  
                  {/* Active range track */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      top: '27px',
                      height: '6px', 
                      backgroundColor: '#111827', 
                      borderRadius: '3px',
                      left: `${(priceRange.min / 3000000) * 100}%`,
                      width: `${((priceRange.max - priceRange.min) / 3000000) * 100}%`
                    }}
                  ></div>
                  
                  {/* Min handle */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: `calc(${(priceRange.min / 3000000) * 100}% - 11px)`,
                      width: '22px',
                      height: '22px',
                      backgroundColor: '#FBCA03',
                      borderRadius: '50%',
                      border: '3px solid #ffffff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      cursor: 'grab',
                      zIndex: 4,
                      userSelect: 'none'
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const container = e.currentTarget.parentElement;
                      const containerRect = container.getBoundingClientRect();
                      
                      const handleMouseMove = (moveEvent) => {
                        const containerLeft = containerRect.left;
                        const containerWidth = containerRect.width;
                        const mouseX = moveEvent.clientX - containerLeft;
                        const percentage = Math.max(0, Math.min(100, (mouseX / containerWidth) * 100));
                        let newMin = (percentage / 100) * 3000000;
                        
                        // Round to nearest 25000
                        newMin = Math.round(newMin / 25000) * 25000;
                        
                        // Constrain bounds
                        if (newMin >= 0 && newMin <= priceRange.max - 25000) {
                          setPriceRange({...priceRange, min: newMin});
                        }
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                        document.body.style.userSelect = '';
                      };
                      
                      document.body.style.userSelect = 'none';
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  ></div>
                  
                  {/* Max handle */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: `calc(${(priceRange.max / 3000000) * 100}% - 11px)`,
                      width: '22px',
                      height: '22px',
                      backgroundColor: '#FBCA03',
                      borderRadius: '50%',
                      border: '3px solid #ffffff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      cursor: 'grab',
                      zIndex: 4,
                      userSelect: 'none'
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const container = e.currentTarget.parentElement;
                      const containerRect = container.getBoundingClientRect();
                      
                      const handleMouseMove = (moveEvent) => {
                        const containerLeft = containerRect.left;
                        const containerWidth = containerRect.width;
                        const mouseX = moveEvent.clientX - containerLeft;
                        const percentage = Math.max(0, Math.min(100, (mouseX / containerWidth) * 100));
                        let newMax = (percentage / 100) * 3000000;
                        
                        // Round to nearest 25000
                        newMax = Math.round(newMax / 25000) * 25000;
                        
                        // Constrain bounds
                        if (newMax >= priceRange.min + 25000 && newMax <= 3000000) {
                          setPriceRange({...priceRange, max: newMax});
                        }
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                        document.body.style.userSelect = '';
                      };
                      
                      document.body.style.userSelect = 'none';
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  ></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Min</span>
                  <input 
                    type="number" 
                    value={priceRange.min}
                    onChange={(e) => {
                      let newMin = parseInt(e.target.value) || 0;
                      // Round to nearest 25000
                      newMin = Math.round(newMin / 25000) * 25000;
                      if (newMin <= priceRange.max - 25000 && newMin >= 0 && newMin <= 3000000) {
                        setPriceRange({...priceRange, min: newMin});
                      }
                    }}
                    style={{ 
                      width: '80px', 
                      padding: '8px', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '6px', 
                      textAlign: 'center', 
                      backgroundColor: '#ffffff', 
                      fontSize: '14px', 
                      boxSizing: 'border-box', 
                      outline: 'none',
                      color: '#374151'
                    }}
                  />
                </div>
                <span style={{ color: '#9ca3af', fontSize: '14px', marginTop: '16px' }}>—</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Max</span>
                  <input 
                    type="number" 
                    value={priceRange.max}
                    onChange={(e) => {
                      let newMax = parseInt(e.target.value) || 3000000;
                      // Round to nearest 25000
                      newMax = Math.round(newMax / 25000) * 25000;
                      if (newMax >= priceRange.min + 25000 && newMax >= 0 && newMax <= 3000000) {
                        setPriceRange({...priceRange, max: newMax});
                      }
                    }}
                    style={{ 
                      width: '80px', 
                      padding: '8px', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '6px', 
                      textAlign: 'center', 
                      backgroundColor: '#ffffff', 
                      fontSize: '14px', 
                      boxSizing: 'border-box', 
                      outline: 'none',
                      color: '#374151'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Property Type</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" name="propertyType" value="House" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>House</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" name="propertyType" value="Apartment" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Apartment</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" name="propertyType" value="Townhouse" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Townhouse</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" name="propertyType" value="Unit" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Unit</span>
                </label>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Bedrooms</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="bedrooms" value="1" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>1</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="bedrooms" value="2" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>2</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="bedrooms" value="3" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>3</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="bedrooms" value="4+" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>4+</span>
                </label>
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Bathrooms</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="bathrooms" value="any" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Any</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="bathrooms" value="1+" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>1+</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="bathrooms" value="2+" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>2+</span>
                </label>
              </div>
            </div>

            {/* Car Spaces */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Car Spaces</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="carspaces" value="any" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Any</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="carspaces" value="1+" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>1+ spaces</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="carspaces" value="2+" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>2+ spaces</span>
                </label>
              </div>
            </div>

            {/* Sale Method */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Sale Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" name="method" value="Private Sale" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Private Sale</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" name="method" value="Auction" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Auction</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" name="method" value="Expression of Interest" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Expression of Interest</span>
                </label>
              </div>
            </div>

            {/* Year Built */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Year Built</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="yearBuilt" value="any" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Any year</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="yearBuilt" value="new" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>2020+</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="yearBuilt" value="modern" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>2000-2019</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="yearBuilt" value="established" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Before 2000</span>
                </label>
              </div>
            </div>

            {/* Land Size (only for houses/townhouses) */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Land Size (sqm)</h3>
              <select style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                backgroundColor: '#ffffff', 
                fontSize: '14px', 
                boxSizing: 'border-box', 
                outline: 'none',
                color: '#374151',
                cursor: 'pointer'
              }}>
                <option value="any">Any size</option>
                <option value="200">200+ sqm</option>
                <option value="300">300+ sqm</option>
                <option value="400">400+ sqm</option>
                <option value="500">500+ sqm</option>
                <option value="600">600+ sqm</option>
                <option value="800">800+ sqm</option>
              </select>
            </div>

            {/* Distance from CBD */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Distance from CBD</h3>
              <select style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                backgroundColor: '#ffffff', 
                fontSize: '14px', 
                boxSizing: 'border-box', 
                outline: 'none',
                color: '#374151',
                cursor: 'pointer'
              }}>
                <option value="any">Any distance</option>
                <option value="2">Within 2km</option>
                <option value="5">Within 5km</option>
                <option value="10">Within 10km</option>
                <option value="15">Within 15km</option>
                <option value="20">Within 20km</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <button 
            style={{ 
              width: '100%', 
              padding: '14px 16px', 
              backgroundColor: '#FBCA03', 
              color: '#111827', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: '600', 
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(251, 202, 3, 0.3)'
            }}
          >
            Search Properties
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
        {/* Map Section */}
        {showMap && (
          <div style={{ height: '55%', borderBottom: '1px solid #e5e7eb' }}>
            <MapSection />
          </div>
        )}

        {/* Properties Grid */}
        <div style={{ height: showMap ? '45%' : '100%', backgroundColor: '#f8fafc', padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                Properties for Sale
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {properties.length} properties found in Melbourne
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Sort by</span>
              <select style={{ 
                padding: '8px 12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                fontSize: '14px', 
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '150px',
                color: '#374151'
              }}>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="date">Date Listed</option>
                <option value="bedrooms">Bedrooms</option>
                <option value="distance">Distance from CBD</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {properties.map(property => (
              <PropertyCard 
                key={property.property_id} 
                property={property}
                onView={(property) => window.location.href = `/${property.listing_type}/${property.property_id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPropertiesPage;