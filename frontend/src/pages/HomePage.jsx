import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Bot, 
  Sparkles, 
  Home, 
  User
} from 'lucide-react';

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true); // 默认打开聊天窗口
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hi! I\'m your AI property assistant. How can I help you find your perfect property today?' }
  ]);

  const mainFeatures = ['Properties', 'New Homes', 'Commercial', 'Agents', 'Market Data', 'Resources'];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleChatSend = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, 
        { type: 'user', message: chatMessage },
        { type: 'bot', message: `I found several properties matching "${chatMessage}". Let me show you the best options...` }
      ]);
      setChatMessage('');
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#ffffff', margin: 0, padding: 0, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '0 1rem', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Home style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>Propzy</span>
          </div>
          
          <div style={{ flex: 1 }}></div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User style={{ width: '20px', height: '20px', color: 'white' }} />
                </div>
                <span style={{ color: '#111827', fontWeight: '500' }}>{user.name}</span>
                <button onClick={() => setUser(null)} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Sign Out</button>
              </div>
            ) : (
              <button onClick={() => setIsLoginOpen(true)} style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Sign In</button>
            )}
          </div>
        </div>
      </nav>

      {/* Feature Tabs */}
      <section style={{ backgroundColor: '#f9fafb', padding: '16px 0', borderBottom: '1px solid #e5e7eb', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
            {mainFeatures.map((feature, i) => (
              <button key={i} onClick={() => alert(`Navigate to ${feature}`)} style={{ color: '#374151', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', padding: '8px 0' }}>
                {feature}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section with Background */}
      <section style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 800\'%3E%3Crect width=\'1200\' height=\'800\' fill=\'%23f0f9ff\'/%3E%3Cpath d=\'M0 400L200 350L400 380L600 320L800 360L1000 340L1200 380V800H0V400Z\' fill=\'%23dbeafe\' opacity=\'0.8\'/%3E%3Cpath d=\'M0 500L200 450L400 480L600 420L800 460L1000 440L1200 480V800H0V500Z\' fill=\'%23bfdbfe\' opacity=\'0.6\'/%3E%3C/svg%3E")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        minHeight: '600px',
        width: '100%',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff', marginBottom: '24px', margin: '0 0 24px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Find Your Perfect Property</h1>
            <p style={{ fontSize: '20px', color: '#f1f5f9', margin: '0', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Discover amazing homes, apartments and commercial properties</p>
          </div>

          {/* Enhanced Search Section */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '48px', maxWidth: '900px', margin: '0 auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            {/* Search Tabs */}
            <div style={{ display: 'flex', marginBottom: '32px', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '4px' }}>
              {['Buy', 'Rent', 'Sell'].map((tab) => (
                <button 
                  key={tab} 
                  style={{ 
                    flex: 1, 
                    padding: '12px 24px', 
                    backgroundColor: tab === 'Buy' ? '#2563eb' : 'transparent',
                    color: tab === 'Buy' ? '#ffffff' : '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '16px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Location</label>
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Enter suburb, postcode or keyword..." 
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    border: '2px solid #e5e7eb', 
                    borderRadius: '12px', 
                    fontSize: '16px', 
                    backgroundColor: '#ffffff', 
                    boxSizing: 'border-box', 
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }} 
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Price Range</label>
                <select style={{ 
                  width: '100%', 
                  padding: '16px', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  backgroundColor: '#ffffff', 
                  boxSizing: 'border-box', 
                  outline: 'none'
                }}>
                  <option>Any price</option>
                  <option>Under $500k</option>
                  <option>$500k - $1M</option>
                  <option>$1M - $2M</option>
                  <option>$2M+</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Property Type</label>
                <select style={{ 
                  width: '100%', 
                  padding: '16px', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px', 
                  fontSize: '16px', 
                  backgroundColor: '#ffffff', 
                  boxSizing: 'border-box', 
                  outline: 'none'
                }}>
                  <option>All types</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Townhouse</option>
                  <option>Land</option>
                </select>
              </div>
              
              <button 
                onClick={handleSearch} 
                style={{ 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  padding: '16px 32px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Search style={{ width: '20px', height: '20px' }} />
                Search
              </button>
            </div>
            
            {/* Quick Location Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
              {['Bondi', 'Sydney CBD', 'Surry Hills', 'Newtown', 'Paddington', 'Manly', 'Parramatta'].map((suburb) => (
                <button key={suburb} onClick={() => setSearchQuery(suburb)} style={{ backgroundColor: '#f8fafc', color: '#374151', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}>
                  {suburb}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section style={{ backgroundColor: '#f8fafc', padding: '80px 0', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>Featured Properties</h2>
            <p style={{ fontSize: '18px', color: '#6b7280', margin: '0' }}>Discover the latest premium properties in top locations</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              { price: '$2,850,000', title: 'Modern Waterfront Villa', location: 'Bondi Beach, NSW', beds: 4, baths: 3, area: '450 sqm', image: '#3b82f6' },
              { price: '$1,250,000', title: 'City View Apartment', location: 'Sydney CBD, NSW', beds: 2, baths: 2, area: '120 sqm', image: '#10b981' },
              { price: '$3,200,000', title: 'Heritage Estate', location: 'Paddington, NSW', beds: 5, baths: 4, area: '680 sqm', image: '#f59e0b' },
              { price: '$950,000', title: 'Contemporary Townhouse', location: 'Surry Hills, NSW', beds: 3, baths: 2, area: '180 sqm', image: '#ef4444' },
              { price: '$1,680,000', title: 'Luxury Penthouse', location: 'Darling Harbour, NSW', beds: 3, baths: 3, area: '200 sqm', image: '#8b5cf6' },
              { price: '$750,000', title: 'Cozy Family Home', location: 'Leichhardt, NSW', beds: 3, baths: 1, area: '250 sqm', image: '#06b6d4' }
            ].map((property, i) => (
              <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s' }}>
                <div style={{ height: '240px', backgroundColor: property.image, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Home style={{ width: '80px', height: '80px', color: 'white', opacity: 0.3 }} />
                  <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '8px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>
                    {property.price}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px', margin: '0 0 8px 0' }}>{property.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px', margin: '0 0 16px 0' }}>{property.location}</p>
                  <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#374151' }}>
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section style={{ backgroundColor: '#f8fafc', padding: '60px 0 140px 0', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '8px', margin: '0 0 8px 0' }}>Explore Cities</h2>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: '0' }}>Find properties across Australia</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { 
                name: 'Sydney', 
                listings: '15,240', 
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              { 
                name: 'Melbourne', 
                listings: '12,890', 
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              },
              { 
                name: 'Brisbane', 
                listings: '8,450', 
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              },
              { 
                name: 'Perth', 
                listings: '6,720', 
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              },
              { 
                name: 'Adelaide', 
                listings: '4,830', 
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
              },
              { 
                name: 'Gold Coast', 
                listings: '3,950', 
                gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
              }
            ].map((city, i) => (
              <div 
                key={i} 
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Smaller Circular Container */}
                <div style={{ 
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%', 
                  background: city.gradient,
                  position: 'relative',
                  marginBottom: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.2s ease'
                }}>
                  {/* City icon */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}>
                    <Home style={{ width: '30px', height: '30px', color: 'white', opacity: 0.9 }} />
                  </div>

                  {/* Subtle decorative gradient */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 100%)',
                    zIndex: 1
                  }} />
                </div>

                {/* City Info */}
                <div>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#111827',
                    marginBottom: '4px', 
                    margin: '0 0 4px 0'
                  }}>
                    {city.name}
                  </h3>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#6b7280',
                    margin: '0'
                  }}>
                    {city.listings} listings
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating AI Assistant Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{ 
            width: '70px', 
            height: '70px', 
            borderRadius: '50%', 
            backgroundColor: '#2563eb', 
            border: 'none', 
            cursor: 'pointer',
            boxShadow: '0 12px 20px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.3s ease',
            animation: isChatOpen ? 'none' : 'pulse 2s infinite'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 16px 25px -5px rgba(37, 99, 235, 0.4), 0 8px 10px -5px rgba(37, 99, 235, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 12px 20px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)';
          }}
        >
          <Bot style={{ width: '32px', height: '32px', color: 'white' }} />
          <Sparkles style={{ width: '18px', height: '18px', color: 'white', position: 'absolute', top: '8px', right: '8px' }} />
          
          {/* Notification dot */}
          {!isChatOpen && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '12px',
              height: '12px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '2px solid white',
              animation: 'bounce 1s infinite'
            }} />
          )}
        </button>
        
        {/* Floating hint text */}
        {!isChatOpen && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '0',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            opacity: 0.9,
            animation: 'slideIn 0.5s ease-out'
          }}>
            💬 Chat with AI Assistant
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '20px',
              width: '12px',
              height: '12px',
              backgroundColor: '#1f2937',
              transform: 'rotate(45deg)'
            }} />
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-4px); }
            60% { transform: translateY(-2px); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(10px); }
            to { opacity: 0.9; transform: translateX(0); }
          }
        `}
      </style>

      {/* Floating AI Chat Window */}
      {isChatOpen && (
        <div style={{ 
          position: 'fixed', 
          bottom: '110px', 
          right: '24px', 
          width: '400px', 
          height: '550px',
          backgroundColor: '#ffffff', 
          borderRadius: '20px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.4s ease-out'
        }}>
          {/* Chat Header */}
          <div style={{ 
            padding: '24px', 
            borderBottom: '1px solid #e5e7eb',
            borderRadius: '20px 20px 0 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <Bot style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0' }}>AI Property Assistant</h3>
                  <p style={{ fontSize: '14px', margin: '0', opacity: 0.9 }}>Online • Ready to help</p>
                </div>
                <Sparkles style={{ width: '16px', height: '16px', color: 'white', marginLeft: '8px' }} />
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  border: 'none', 
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer', 
                  color: 'white',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              >
                ✕
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div style={{ 
            flex: 1, 
            padding: '20px', 
            overflowY: 'auto',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {chatHistory.map((chat, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: chat.type === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ 
                    maxWidth: '80%', 
                    padding: '14px 18px', 
                    borderRadius: chat.type === 'user' ? '20px 20px 6px 20px' : '6px 20px 20px 20px', 
                    fontSize: '14px', 
                    backgroundColor: chat.type === 'user' ? '#2563eb' : '#ffffff', 
                    color: chat.type === 'user' ? 'white' : '#334155',
                    wordWrap: 'break-word',
                    boxShadow: chat.type === 'user' ? '0 2px 8px rgba(37, 99, 235, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    lineHeight: '1.4'
                  }}>
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Input */}
          <div style={{ 
            padding: '20px', 
            borderTop: '1px solid #e5e7eb',
            borderRadius: '0 0 20px 20px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={chatMessage} 
                onChange={(e) => setChatMessage(e.target.value)} 
                onKeyPress={(e) => handleKeyPress(e, handleChatSend)} 
                placeholder="Ask me about properties, prices, locations..." 
                style={{ 
                  width: '100%', 
                  padding: '14px 50px 14px 18px', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '25px', 
                  backgroundColor: '#f8fafc', 
                  boxSizing: 'border-box', 
                  outline: 'none',
                  fontSize: '14px',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button 
                onClick={handleChatSend} 
                style={{ 
                  position: 'absolute', 
                  right: '6px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  backgroundColor: '#2563eb', 
                  padding: '10px', 
                  borderRadius: '50%', 
                  border: 'none', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                <Send style={{ width: '16px', height: '16px', color: 'white' }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add animation for chat window */}
      <style>
        {`
          @keyframes slideUp {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
        `}
      </style>

      {/* Login Modal */}
      {isLoginOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', width: '384px', maxWidth: '90%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', border: '2px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px', margin: '0 0 24px 0' }}>Welcome Back</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="email" 
                placeholder="Email address" 
                style={{ width: '100%', padding: '16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#ffffff', boxSizing: 'border-box' }} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                style={{ width: '100%', padding: '16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#ffffff', boxSizing: 'border-box' }} 
              />
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  style={{ flex: '1', backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }} 
                  onClick={() => { setUser({ name: 'John Doe', email: 'john@example.com' }); setIsLoginOpen(false); }}
                >
                  Sign In
                </button>
                <button 
                  style={{ flex: '1', backgroundColor: '#f3f4f6', color: '#374151', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }} 
                  onClick={() => setIsLoginOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;