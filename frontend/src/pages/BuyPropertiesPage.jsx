import React, { useState, useEffect } from 'react';
import Logo from '../components/logo'; 
import PropertyCard from '../components/PropertyCard';

// TODO: Delete after API integration - START  
const fallbackBuyProperties = [
  {
    id: 1,
    suburb: "Melbourne",
    address: "123 Collins Street",
    property_type: "buy",
    category: "Apartment",
    company: "Ray White Melbourne",
    postcode: "3000",
    buy_price: 650000,
    rent_price: null,
    bedrooms_num: 3,
    bathrooms_num: 2,
    carspaces: 1,
    landsize: null,
    year_built: 2020,
    lat: -37.8136,
    lng: 144.9631,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z"
  },
  {
    id: 2,
    suburb: "South Yarra",
    address: "456 Chapel Street",
    property_type: "buy", 
    category: "House",
    company: "Jellis Craig",
    postcode: "3141",
    buy_price: 780000,
    rent_price: null,
    bedrooms_num: 4,
    bathrooms_num: 3,
    carspaces: 2,
    landsize: 400,
    year_built: 2018,
    lat: -37.8467,
    lng: 144.9896,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    created_at: "2025-01-02T11:30:00Z",
    updated_at: "2025-01-02T11:30:00Z"
  },
  {
    id: 3,
    suburb: "Collingwood",
    address: "789 Smith Street",
    property_type: "buy",
    category: "Townhouse", 
    company: "Hocking Stuart",
    postcode: "3066",
    buy_price: 920000,
    rent_price: null,
    bedrooms_num: 3,
    bathrooms_num: 2,
    carspaces: 2,
    landsize: 150,
    year_built: 2019,
    lat: -37.8043,
    lng: 144.9848,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    created_at: "2025-01-03T14:15:00Z",
    updated_at: "2025-01-03T14:15:00Z"
  },
  {
    id: 4,
    suburb: "Richmond",
    address: "321 Swan Street",
    property_type: "buy",
    category: "Unit",
    company: "Nelson Alexander",
    postcode: "3121",
    buy_price: 450000,
    rent_price: null,
    bedrooms_num: 2,
    bathrooms_num: 1,
    carspaces: 1,
    landsize: null,
    year_built: 2015,
    lat: -37.8197,
    lng: 144.9864,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    created_at: "2025-01-04T09:45:00Z",
    updated_at: "2025-01-04T09:45:00Z"
  },
  {
    id: 5,
    suburb: "Southbank",
    address: "100 Southbank Promenade",
    property_type: "buy",
    category: "Apartment",
    company: "Barry Plant",
    postcode: "3006", 
    buy_price: 1150000,
    rent_price: null,
    bedrooms_num: 3,
    bathrooms_num: 2,
    carspaces: 2,
    landsize: null,
    year_built: 2021,
    lat: -37.8220,
    lng: 144.9633,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    created_at: "2025-01-05T16:20:00Z",
    updated_at: "2025-01-05T16:20:00Z"
  },
  {
    id: 6,
    suburb: "Fitzroy",
    address: "555 Brunswick Street", 
    property_type: "buy",
    category: "House",
    company: "RT Edgar",
    postcode: "3065",
    buy_price: 2200000,
    rent_price: null,
    bedrooms_num: 5,
    bathrooms_num: 3,
    carspaces: 2,
    landsize: 600,
    year_built: 1920,
    lat: -37.7979,
    lng: 144.9810,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    created_at: "2025-01-06T12:00:00Z",
    updated_at: "2025-01-06T12:00:00Z"
  }
];
  // TODO: Delete after API integration - END

const BuyPropertiesPage = () => {
  // TODO: Change to useState([]) after API integration  
  const [properties, setProperties] = useState(fallbackBuyProperties)
  const [showMap, setShowMap] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 400000, max: 1500000 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('buy');

  // Load properties when component mounts
  useEffect(() => {
    // Use fallback data temporarily, no API call
    setProperties(fallbackBuyProperties);
    setLoading(false);
    
    // TODO: Delete above two lines and uncomment code below when backend is ready
    /*
    const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/properties/buy');
      const data = await response.json();
      
      if (response.ok) {
        setProperties(data.properties || []);
      } else {
        console.error('Failed to load properties');
        setProperties([]);
      }
    } catch (error) {
      console.error('Failed to load properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };
  loadProperties();
  */
}, []);

  // Format price for display
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000)}K`;
    }
    return `$${price}`;
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
        }}>‚à?/button>
      </div>
      
      <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
        üìç Melbourne, VIC
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
            <button 
              onClick={() => setActiveTab('buy')}
              style={{ 
                flex: 1, 
                padding: '12px 16px', 
                fontSize: '14px', 
                fontWeight: '500', 
                backgroundColor: activeTab === 'buy' ? '#FBCA03' : '#f3f4f6', 
                color: activeTab === 'buy' ? '#111827' : '#6b7280', 
                borderRadius: '6px', 
                border: 'none', 
                cursor: 'pointer', 
                transition: 'background-color 0.2s' 
              }}
            >
              Buy
            </button>
            <button 
              onClick={() => {
                setActiveTab('rent');
                window.location.href = '/rent';
              }}
              style={{ 
                flex: 1, 
                padding: '12px 16px', 
                fontSize: '14px', 
                fontWeight: '500', 
                backgroundColor: activeTab === 'rent' ? '#FBCA03' : '#f3f4f6', 
                color: activeTab === 'rent' ? '#111827' : '#6b7280', 
                borderRadius: '6px', 
                border: 'none', 
                cursor: 'pointer', 
                transition: 'background-color 0.2s' 
              }}
            >
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
                <span style={{ color: '#9ca3af', fontSize: '14px', marginTop: '16px' }}>‚Ä?/span>
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
                  <span style={{ fontSize: '14px', color: '#374151' }}>Apartment & Unit</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" name="propertyType" value="Townhouse" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Townhouse</span>
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

            {/* Year Built */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Year Built</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="yearBuilt" value="any" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Any year</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="yearBuilt" value="2010+" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>2010+</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="yearBuilt" value="2000-2010" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>2000-2010</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="yearBuilt" value="before2000" style={{ marginRight: '12px' }} />
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
                <option value="0-200">0-200 sqm</option>
                <option value="200-400">200-400 sqm</option>
                <option value="400-600">400-600 sqm</option>
                <option value="600-800">600-800 sqm</option>
                <option value="800-1000">800-1000 sqm</option>
                <option value="1000+">1000+ sqm</option>
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
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {properties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property}
                onView={(property) => window.location.href = `/${property.property_type}/${property.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPropertiesPage;
