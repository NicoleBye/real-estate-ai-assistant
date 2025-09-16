import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard'; 

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



const fallbackChatProperties = [
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
    landsize: null,
    year_built: 2018,
    lat: -33.8688,
    lng: 151.2093,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    color: '#10b981',
    match_score: 89
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    suburb: "Wollongong",
    address: "789 Crown Street",
    postcode: "2500",
    property_type: "buy",
    category: "Townhouse",
    company: "Heritage Homes",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 750000,
    rent_price: null,
    bedrooms_num: 3,
    bathrooms_num: 2,
    carspaces: 1,
    landsize: 680,
    year_built: 1960,
    lat: -33.8848,
    lng: 151.2291,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    color: '#f59e0b',
    match_score: 84
  }
];
  const fallbackProperties = fallbackChatProperties;
  // TODO: Delete after API integration - END
  
// Property Modal Component - Add this before CompactAIChat component
const PropertyModal = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;

  // Build property detail URL
  const pageUrl = property.property_type === 'buy' 
    ? `/buy/${property.id}?modal=true`
    : `/rent/${property.id}?modal=true`;
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    onClick={onClose}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '95%',
        height: '95%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0,0,0,0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.9)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.7)'}
        >
          <X style={{ width: '20px', height: '20px', color: 'white' }} />
        </button>
        {/* Embed complete property detail page */}
        <iframe 
          src={pageUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '16px'
          }}
          title="Property Details"
        />
      </div>
    </div>
  );
};

// Compact AI Chat
const CompactAIChat = ({ isOpen, onClose, onPropertyView, properties = [], user = null }) => {
  // TODO: Change to use only props.properties after API integration ：const availableProperties = properties;
  const availableProperties = properties.length > 0 ? properties : fallbackChatProperties;
    // Handle property card click
  const handlePropertyView = (property) => {
    console.log('Property clicked:', property); 
    console.log('onPropertyView function:', onPropertyView);
    onPropertyView && onPropertyView(property);
  };
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
      if (criteria.bedrooms && property.bedrooms_num !== criteria.bedrooms) return false;
      
      // Filter by bathrooms
      if (criteria.bathrooms && property.bathrooms_num !== criteria.bathrooms) return false;
      
      // Filter by property type
      if (criteria.propertyType && property.category !== criteria.propertyType) return false;
      
      // Filter by location
      if (criteria.location && !property.suburb.toLowerCase().includes(criteria.location)) return false;
      
      // Filter by listing type
      if (criteria.listingType && property.property_type !== criteria.listingType) return false;
      
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

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    setMessages(current => [...current, userMsg]);
    
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    
    // Temporarily disable API, use local search instead
    setTimeout(() => {
      const criteria = parseQuery(currentInput);
      const filteredProperties = filterProperties(availableProperties, criteria);
      
      let botResponse = "I'm here to help you find properties.";
      if (filteredProperties.length > 0) {
        botResponse = `Based on your search "${currentInput}", I found ${filteredProperties.length} matching properties:`;
      } else if (criteria.bedrooms || criteria.propertyType || criteria.location) {
        botResponse = "Sorry, I couldn't find any properties matching your criteria. Try adjusting your search terms.";
      } else {
        botResponse = "I didn't quite understand your request. Try something like '2 bedroom apartment in Sydney' or 'houses in Wollongong'.";
      }
      
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date(),
        properties: filteredProperties.length > 0 ? filteredProperties.slice(0, 3) : null
      };
      setMessages(current => [...current, botMsg]);
      setIsTyping(false);
    }, 1000);

    // TODO: When backend is ready, remove the above code and restore the API call below
    /*
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          message: currentInput,
          properties: availableProperties,
          conversationHistory: messages,
          userId: user?.id
        })
      });
      // ... rest of API handling logic
    } catch (error) {
      // ... error handling
    } finally {
      setIsTyping(false);
    }
    */
  };
    

  const quickActions = [
    { text: "Show me 2 bedroom apartments", action: () => addMessage("Show me 2 bedroom apartments", "Here are some great 2-bedroom apartments:", availableProperties.filter(p => p.bedrooms_num === 2)) },
    { text: "Properties under $800k", action: () => addMessage("Properties under $800k", "I found these properties under $800k:", availableProperties.filter(p => p.buy_price && p.buy_price < 800000)) },
    { text: "Houses in Wollongong", action: () => addMessage("Houses in Wollongong", "Here are houses available in Wollongong:", availableProperties.filter(p => p.suburb.toLowerCase().includes('wollongong'))) },
    { text: "Rental properties", action: () => addMessage("Show me rental properties", "Here are available rental properties:", availableProperties.filter(p => p.listing_type === 'rent')) }
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
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onView={handlePropertyView}
                    showSaveButton={false}
                  />
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
  const [modalProperty, setModalProperty] = useState(null); 
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('rent');
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState([]);
  const [hasUserActivity, setHasUserActivity] = useState(false);
  const [error, setError] = useState(null);

  // useEffect - Load featured properties
useEffect(() => {
  // Use fallback data temporarily, no API call
  setFeaturedProperties(fallbackProperties);
  setLoading(false);
  
  // TODO: Delete above two lines and uncomment code below when backend is ready
  /*
  const loadFeaturedProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/properties/featured');
      const data = await response.json();
      
      if (response.ok) {
        setFeaturedProperties(data);
      } else {
        console.error('Failed to load featured properties');
        setFeaturedProperties(fallbackProperties);
      }
    } catch (error) {
      console.error('Failed to load featured properties:', error);
      setFeaturedProperties(fallbackProperties);
    } finally {
      setLoading(false);
    }
  };
  loadFeaturedProperties();
  */
}, []);

// handleSearch function
const handleSearch = async () => {
  if (searchQuery.trim()) {
    setHasUserActivity(true);
    
    // Navigate directly without API call
    if (activeTab === 'rent') {
      window.location.href = `/rent?location=${encodeURIComponent(searchQuery)}`;
    } else if (activeTab === 'buy') {
      window.location.href = `/buy?location=${encodeURIComponent(searchQuery)}`;
    }
    
    // TODO: Delete above navigation code and uncomment API call below when backend is ready
    /*
    setLoading(true);
    try {
      const response = await fetch('/api/properties/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: searchQuery, 
          type: activeTab 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (activeTab === 'rent') {
          window.location.href = `/rent?location=${encodeURIComponent(searchQuery)}`;
        } else if (activeTab === 'buy') {
          window.location.href = `/buy?location=${encodeURIComponent(searchQuery)}`;
        }
      } else {
        setError('Search failed. Please try again.');
      }
    } catch (error) {
      console.error('Search failed:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
    */
  }
};

// handleSaveProperty function  
const handleSaveProperty = async (propertyId) => {
  if (!user) {
    alert('Please log in to save properties!');
    return;
  }

  setHasUserActivity(true);
  
  // Mock save functionality - just update local state
  if (!savedProperties.includes(propertyId)) {
    setSavedProperties([...savedProperties, propertyId]);
  }
  alert('Property saved to your favorites! (Mock functionality)');
  
  // TODO: Delete above mock code and uncomment API call below when backend is ready
  /*
  try {
    const response = await fetch('/api/properties/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ propertyId })
    });
    
    if (response.ok) {
      if (!savedProperties.includes(propertyId)) {
        setSavedProperties([...savedProperties, propertyId]);
      }
      alert('Property saved to your favorites!');
    } else {
      alert('Failed to save property. Please try again.');
    }
  } catch (error) {
    console.error('Failed to save property:', error);
    alert('Failed to save property. Please try again.');
  }
  */
};

// handleLogout function
const handleLogout = async () => {
  // Clear local state directly without API call
  setUser(null);
  setSavedProperties([]);
  localStorage.removeItem('token');
  
  // TODO: Add API call when backend is ready
  /*
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setUser(null);
    setSavedProperties([]);
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout failed:', error);
    // Still clear local state
    setUser(null);
    setSavedProperties([]);
    localStorage.removeItem('token');
  }
  */
};
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

        {/* AI Chat Component */}
        <CompactAIChat 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
          onPropertyView={setModalProperty} 
          properties={featuredProperties} 
          user={user}
        />

        <PropertyModal 
        isOpen={!!modalProperty}
        onClose={() => setModalProperty(null)}
        property={modalProperty}
        />
      </div>
    </div>
  );
};

export default Homepage;