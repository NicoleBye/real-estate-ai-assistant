import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Bot, 
  Sparkles, 
  Home, 
  User,
  DollarSign,
  MapPin,
  Camera,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Car,
  X
} from 'lucide-react';

// Property Card Component
const PropertyCard = ({ property }) => (
  <div style={{
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}>
    <div style={{
      height: '160px',
      backgroundColor: property.color || '#3b82f6',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Home style={{ width: '48px', height: '48px', color: 'white', opacity: 0.3 }} />
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        ${property.buy_price ? property.buy_price.toLocaleString() : `$${property.rent_price}/week`}
      </div>
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: '#374151',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: '500',
        textTransform: 'uppercase'
      }}>
        {property.listing_type}
      </div>
    </div>
    
    <div style={{ padding: '16px' }}>
      <h4 style={{
        margin: '0 0 8px 0',
        fontSize: '16px',
        fontWeight: '600',
        color: '#111827',
        lineHeight: '1.3'
      }}>
        {property.property_type} in {property.suburb}
      </h4>
      
      <p style={{
        margin: '0 0 12px 0',
        fontSize: '13px',
        color: '#6b7280',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <MapPin style={{ width: '12px', height: '12px' }} />
        {property.address}, {property.suburb} {property.postcode}
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          fontSize: '12px',
          color: '#374151'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Bed style={{ width: '14px', height: '14px' }} />
            <span>{property.bedrooms}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Bath style={{ width: '14px', height: '14px' }} />
            <span>{property.bathrooms}</span>
          </div>
          {property.carspaces > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Car style={{ width: '14px', height: '14px' }} />
              <span>{property.carspaces}</span>
            </div>
          )}
        </div>
        
        <button style={{
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '11px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}>
          View Details
        </button>
      </div>
    </div>
  </div>
);

// Enhanced AI Chat Component
const EnhancedAIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi there! I'm here to help you find your perfect property. Just tell me what you're looking for - like \"2 bedroom apartment in Sydney under 800k\" or \"houses for rent in Wollongong\" - and I'll show you what's available.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Sample properties data
  const sampleProperties = [
    {
      property_id: "1",
      suburb: "Bondi Beach",
      address: "123 Ocean Drive",
      postcode: "2026",
      listing_type: "buy",
      property_type: "House",
      buy_price: 2850000,
      bedrooms: 4,
      bathrooms: 3,
      carspaces: 2,
      color: '#3b82f6'
    },
    {
      property_id: "2", 
      suburb: "Sydney CBD",
      address: "456 George Street",
      postcode: "2000",
      listing_type: "rent",
      property_type: "Apartment",
      rent_price: 800,
      bedrooms: 2,
      bathrooms: 2,
      carspaces: 1,
      color: '#10b981'
    },
    {
      property_id: "3",
      suburb: "Wollongong",
      address: "789 Crown Street", 
      postcode: "2500",
      listing_type: "buy",
      property_type: "Townhouse",
      buy_price: 750000,
      bedrooms: 3,
      bathrooms: 2,
      carspaces: 1,
      color: '#f59e0b'
    }
  ];

  const addMessage = (userText, botText, properties = null) => {
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(current => [...current, userMsg]);
    
    // Simulate typing delay
    setIsTyping(true);
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: botText,
        timestamp: new Date(),
        properties: properties
      };
      setMessages(current => [...current, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // Advanced query parsing function
  const parseQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    const criteria = {
      bedrooms: null,
      bathrooms: null,
      propertyType: null,
      location: null,
      priceMin: null,
      priceMax: null,
      listingType: null,
      features: []
    };

    // Extract bedroom count
    const bedroomMatch = lowerQuery.match(/(\d+)\s*(bed|bedroom|br)/);
    if (bedroomMatch) criteria.bedrooms = parseInt(bedroomMatch[1]);

    // Extract bathroom count
    const bathroomMatch = lowerQuery.match(/(\d+)\s*(bath|bathroom|ba)/);
    if (bathroomMatch) criteria.bathrooms = parseInt(bathroomMatch[1]);

    // Extract property type
    if (lowerQuery.includes('apartment') || lowerQuery.includes('unit') || lowerQuery.includes('flat')) {
      criteria.propertyType = 'Apartment';
    } else if (lowerQuery.includes('house') || lowerQuery.includes('home')) {
      criteria.propertyType = 'House';
    } else if (lowerQuery.includes('townhouse') || lowerQuery.includes('town house')) {
      criteria.propertyType = 'Townhouse';
    }

    // Extract price range
    const priceMatches = lowerQuery.match(/(\d+(?:,\d{3})*(?:k|thousand|million|m)?)/g);
    if (priceMatches) {
      priceMatches.forEach(match => {
        let price = match.replace(/,/g, '');
        if (price.includes('k')) price = parseInt(price) * 1000;
        else if (price.includes('m') || price.includes('million')) price = parseInt(price) * 1000000;
        else price = parseInt(price);

        if (lowerQuery.includes('under') || lowerQuery.includes('below') || lowerQuery.includes('max')) {
          criteria.priceMax = price;
        } else if (lowerQuery.includes('over') || lowerQuery.includes('above') || lowerQuery.includes('min')) {
          criteria.priceMin = price;
        } else if (!criteria.priceMax) {
          criteria.priceMax = price;
        }
      });
    }

    // Extract location
    const locations = ['sydney', 'bondi', 'wollongong', 'parramatta', 'cbd', 'north sydney', 'manly', 'coogee'];
    locations.forEach(location => {
      if (lowerQuery.includes(location)) {
        criteria.location = location;
      }
    });

    // Determine listing type
    if (lowerQuery.includes('rent') || lowerQuery.includes('rental') || lowerQuery.includes('lease')) {
      criteria.listingType = 'rent';
    } else if (lowerQuery.includes('buy') || lowerQuery.includes('purchase') || lowerQuery.includes('sale')) {
      criteria.listingType = 'buy';
    }

    // Extract features
    if (lowerQuery.includes('parking') || lowerQuery.includes('garage') || lowerQuery.includes('car')) {
      criteria.features.push('parking');
    }
    if (lowerQuery.includes('pool') || lowerQuery.includes('swimming')) {
      criteria.features.push('pool');
    }
    if (lowerQuery.includes('balcony') || lowerQuery.includes('terrace')) {
      criteria.features.push('balcony');
    }

    return criteria;
  };

  // Filter properties based on parsed criteria
  const filterProperties = (properties, criteria) => {
    return properties.filter(property => {
      // Filter by bedrooms
      if (criteria.bedrooms && property.bedrooms !== criteria.bedrooms) return false;
      
      // Filter by bathrooms
      if (criteria.bathrooms && property.bathrooms !== criteria.bathrooms) return false;
      
      // Filter by property type
      if (criteria.propertyType && property.property_type !== criteria.propertyType) return false;
      
      // Filter by location
      if (criteria.location && !property.suburb.toLowerCase().includes(criteria.location)) return false;
      
      // Filter by listing type
      if (criteria.listingType && property.listing_type !== criteria.listingType) return false;
      
      // Filter by price
      if (criteria.priceMin) {
        const price = property.buy_price || property.rent_price * 52; // Convert weekly rent to annual
        if (price < criteria.priceMin) return false;
      }
      if (criteria.priceMax) {
        const price = property.buy_price || property.rent_price * 52;
        if (price > criteria.priceMax) return false;
      }
      
      return true;
    });
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const criteria = parseQuery(inputValue);
    const filteredProperties = filterProperties(sampleProperties, criteria);
    
    let response = "I found these properties that match your criteria:";
    
    // Generate contextual response based on search criteria
    if (criteria.bedrooms) {
      response = `Here are ${criteria.bedrooms}-bedroom properties I found:`;
    }
    if (criteria.location) {
      response = `Properties in ${criteria.location.charAt(0).toUpperCase() + criteria.location.slice(1)}:`;
    }
    if (criteria.priceMax) {
      response = `Properties under ${criteria.priceMax.toLocaleString()}:`;
    }
    if (criteria.propertyType) {
      response = `${criteria.propertyType}s available:`;
    }
    
    if (filteredProperties.length === 0) {
      response = "I couldn't find properties matching your exact criteria, but here are some similar options you might like:";
      // Relax criteria and try again
      const relaxedProperties = sampleProperties.slice(0, 2);
      addMessage(inputValue, response, relaxedProperties);
    } else {
      addMessage(inputValue, response, filteredProperties);
    }
    
    setInputValue('');
  };

  const quickActions = [
    { text: "Show me 2 bedroom apartments", action: () => addMessage("Show me 2 bedroom apartments", "Here are some great 2-bedroom apartments:", sampleProperties.filter(p => p.bedrooms === 2)) },
    { text: "Properties under $800k", action: () => addMessage("Properties under $800k", "I found these properties under $800k:", sampleProperties.filter(p => p.buy_price && p.buy_price < 800000)) },
    { text: "Houses in Wollongong", action: () => addMessage("Houses in Wollongong", "Here are houses available in Wollongong:", sampleProperties.filter(p => p.suburb.toLowerCase().includes('wollongong'))) },
    { text: "Rental properties", action: () => addMessage("Show me rental properties", "Here are available rental properties:", sampleProperties.filter(p => p.listing_type === 'rent')) }
  ];

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '520px',
      height: '750px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot style={{ width: '20px', height: '20px' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>AI Assistant</h3>
            <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>Your Property Guide</p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        backgroundColor: '#f8fafc'
      }}>
        {messages.map((message) => (
          <div key={message.id} style={{
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
          }}>
            {/* Avatar */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: message.type === 'user' ? '#2563eb' : '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px'
            }}>
              {message.type === 'user' ? (
                <User style={{ width: '16px', height: '16px', color: 'white' }} />
              ) : (
                <Bot style={{ width: '16px', height: '16px', color: '#6b7280' }} />
              )}
            </div>
            
            {/* Message Content */}
            <div style={{
              maxWidth: '75%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.type === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: message.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                fontSize: '14px',
                lineHeight: '1.5',
                backgroundColor: message.type === 'user' ? '#2563eb' : 'white',
                color: message.type === 'user' ? 'white' : '#374151',
                boxShadow: message.type === 'bot' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                border: message.type === 'bot' ? '1px solid #e5e7eb' : 'none',
                whiteSpace: 'pre-line',
                textAlign: 'left'
              }}>
                {message.text}
              </div>
              
              {/* Property Cards */}
              {message.properties && message.properties.length > 0 && (
                <div style={{ width: '100%', marginTop: '8px' }}>
                  {message.properties.map((property) => (
                    <PropertyCard key={property.property_id} property={property} />
                  ))}
                </div>
              )}
              
              <div style={{
                fontSize: '11px',
                color: '#9ca3af',
                marginTop: '4px',
                textAlign: message.type === 'user' ? 'right' : 'left'
              }}>
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: 'white',
            borderRadius: '18px 18px 18px 4px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            width: 'fit-content'
          }}>
            <div style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#9ca3af',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite ease-in-out'
              }} />
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#9ca3af',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite ease-in-out 0.2s'
              }} />
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#9ca3af',
                borderRadius: '50%',
                animation: 'bounce 1.4s infinite ease-in-out 0.4s'
              }} />
            </div>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>AI is typing...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: 'white',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px'
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about properties..."
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '24px',
              outline: 'none',
              fontSize: '14px',
              backgroundColor: '#f9fafb',
              transition: 'border-color 0.2s, background-color 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb';
              e.target.style.backgroundColor = '#ffffff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.backgroundColor = '#f9fafb';
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: inputValue.trim() ? '#2563eb' : '#d1d5db',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              transform: inputValue.trim() ? 'scale(1)' : 'scale(0.95)'
            }}
            onMouseEnter={(e) => {
              if (inputValue.trim()) {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (inputValue.trim()) {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            <Send style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

// Main Homepage Component (keeping the same structure but with enhanced chat)
const Homepage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('rent');
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // ... (rest of the homepage code remains the same)
  // Just replacing the old chat component with EnhancedAIChat

  return (
    <div>
      {/* Your existing homepage content goes here */}
      <div style={{ minHeight: '100vh', padding: '50px', backgroundColor: '#f8fafc', textAlign: 'center' }}>
        <h1>Property Website Homepage</h1>
        <p>Click the AI Assistant button in the bottom right to test the enhanced chat!</p>
        
        {/* AI Chat Button */}
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
              transition: 'all 0.3s ease'
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
          </button>
        </div>

        {/* Enhanced AI Chat Component */}
        <EnhancedAIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
};

export default Homepage;