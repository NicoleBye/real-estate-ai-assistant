import React, { useState } from 'react';

const BuyPropertiesPage = () => {
  // Melbourne property data for buying
  const [properties] = useState([
    {
      id: 1,
      title: "Modern CBD Apartment",
      price: "$650,000",
      location: "Collins Street, Melbourne CBD",
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      availableDate: "Available now",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Spacious Family House", 
      price: "$780,000",
      location: "Chapel Street, South Yarra",
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      availableDate: "Settlement flexible",
      type: "House",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Modern Townhouse",
      price: "$920,000",
      location: "Smith Street, Collingwood",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      availableDate: "Available now",
      type: "Townhouse",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Cozy Richmond Unit",
      price: "$450,000",
      location: "Swan Street, Richmond", 
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      availableDate: "Available now",
      type: "Unit",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      title: "Luxury Southbank Apartment",
      price: "$1,150,000",
      location: "Southbank Promenade, Southbank",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      availableDate: "Settlement 30 days",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 6,
      title: "Heritage House",
      price: "$2,200,000",
      location: "Brunswick Street, Fitzroy",
      bedrooms: 5,
      bathrooms: 3,
      parking: 2,
      availableDate: "Available now",
      type: "House",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ]);

  const [showMap, setShowMap] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 400000, max: 1500000 });

  const PropertyCard = ({ property }) => (
    <div style={{ 
      backgroundColor: '#ffffff', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}>
      <div style={{ position: 'relative' }}>
        <img 
          src={property.image} 
          alt={property.title}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <button style={{ 
          position: 'absolute', 
          top: '12px', 
          right: '12px', 
          width: '32px', 
          height: '32px', 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
          borderRadius: '50%', 
          border: 'none',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          fontSize: '16px',
          color: '#FBCA03',
          transition: 'all 0.2s'
        }}>
          ♡
        </button>
      </div>
      
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>{property.price}</span>
        </div>
        
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', margin: '0 0 12px 0' }}>{property.location}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
          <span>{property.bedrooms} bed</span>
          <span>•</span>
          <span>{property.bathrooms} bath</span>
          <span>•</span>
          <span>{property.parking} car</span>
          <span>•</span>
          <span>{property.parking} area</span>
          <span>•</span>
          <span>{property.parking} propertyType</span>
        </div>
      </div>
    </div>
  );

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
      
      <div style={{ position: 'absolute', top: '60px', left: '120px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>$650K</div>
      <div style={{ position: 'absolute', top: '80px', right: '150px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>$1.1M</div>
      <div style={{ position: 'absolute', bottom: '120px', left: '100px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>$780K</div>
      <div style={{ position: 'absolute', bottom: '100px', right: '180px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>$920K</div>
      <div style={{ position: 'absolute', top: '180px', left: '350px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>$2.2M</div>
      <div style={{ position: 'absolute', bottom: '200px', right: '80px', backgroundColor: '#111827', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>$450K</div>
      
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
      <div style={{ width: '320px', backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <img 
              src="/logo.png" 
              alt="Propzy Logo"
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px'
              }}
              onError={(e) => {
                console.log('Logo loading failed, trying alternative path');
                if (e.target.src !== './src/assets/logo.png') {
                  e.target.src = './src/assets/logo.png';
                } else {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }
              }}
            />
            <div style={{ 
              width: '36px', 
              height: '36px', 
              backgroundColor: '#FBCA03', 
              borderRadius: '8px', 
              display: 'none', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#111827',
              boxShadow: '0 2px 4px rgba(251, 202, 3, 0.3)'
            }}>
              P
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>PROPZY</span>
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
                  <input type="radio" name="propertyType" value="house" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>House</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="propertyType" value="apartment" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Apartment</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="propertyType" value="townhouse" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Townhouse</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="propertyType" value="unit" style={{ marginRight: '12px' }} />
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

            {/* Parking */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Parking</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="parking" value="any" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Any</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="parking" value="1+" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>1+ spaces</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="parking" value="2+" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>2+ spaces</span>
                </label>
              </div>
            </div>

            {/* Additional Buy-specific filters */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Property Age</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="propertyAge" value="any" defaultChecked style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Any age</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="propertyAge" value="new" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>New (0-5 years)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="propertyAge" value="established" style={{ marginRight: '12px' }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Established (5+ years)</span>
                </label>
              </div>
            </div>

            {/* Land Size */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px', margin: '0 0 12px 0' }}>Land Size</h3>
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
                <option value="300">300+ sqm</option>
                <option value="400">400+ sqm</option>
                <option value="500">500+ sqm</option>
                <option value="600">600+ sqm</option>
                <option value="800">800+ sqm</option>
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
            Search
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
        {/* Map Section */}
        {showMap && (
          <div style={{ height: '35%', borderBottom: '1px solid #e5e7eb' }}>
            <MapSection />
          </div>
        )}

        {/* Properties Grid */}
        <div style={{ height: showMap ? '65%' : '100%', backgroundColor: '#f8fafc', padding: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '24px' }}>
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
                <option value="size">Size</option>
                <option value="bedrooms">Bedrooms</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPropertiesPage;