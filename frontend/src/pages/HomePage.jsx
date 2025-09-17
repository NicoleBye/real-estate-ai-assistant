import React, { useState } from 'react';
import { useEffect } from 'react';
import Logo from '../components/logo'; 
import UserMenu from '../components/UserMenu';
import PropertyCard from '../components/PropertyCard';


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
  Heart,
  Star,
  TrendingUp
} from 'lucide-react';

  // TODO: Delete after API integration - START
const fallbackProperties = [
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
    property_type: "buy",
    category: "Apartment",
    company: "City Properties",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 1250000,
    rent_price: null,
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
    suburb: "Paddington", 
    address: "789 Oxford Street",
    postcode: "2021",
    property_type: "buy",
    category: "Townhouse",
    company: "Heritage Homes",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 3200000,
    rent_price: null,
    bedrooms_num: 5, 
    bathrooms_num: 4, 
    carspaces: 2,
    landsize: 680, 
    year_built: 1920,
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
  },
  { 
    id: "550e8400-e29b-41d4-a716-446655440004",
    suburb: "Surry Hills", 
    address: "321 Crown Street",
    postcode: "2010",
    property_type: "buy",
    category: "Townhouse",
    company: "Urban Living",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 950000,
    rent_price: null,
    bedrooms_num: 3, 
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
  },
  { 
    id: "550e8400-e29b-41d4-a716-446655440005",
    suburb: "Darling Harbour", 
    address: "100 Harbour Street",
    postcode: "2000",
    property_type: "buy",
    category: "Apartment",
    company: "Waterfront Realty",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 1680000,
    rent_price: null,
    bedrooms_num: 3, 
    bathrooms_num: 3, 
    carspaces: 2,
    landsize: null, 
    year_built: 2021,
    lat: -33.8708,
    lng: 151.1982,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    color: '#8b5cf6',
    match_score: 72
  },
  { 
    id: "550e8400-e29b-41d4-a716-446655440006",
    suburb: "Leichhardt", 
    address: "45 Norton Street",
    postcode: "2040",
    property_type: "buy",
    category: "House",
    company: "Family First Realty",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    buy_price: 750000,
    rent_price: null,
    bedrooms_num: 3, 
    bathrooms_num: 1, 
    carspaces: 1,
    landsize: 250, 
    year_built: 1960,
    lat: -33.8846,
    lng: 151.1547,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      }
    ],
    color: '#06b6d4',
    match_score: 68
  }
];
  // TODO: Delete after API integration - END


// Main Homepage Component
const Homepage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('rent');
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  
  // User behavior tracking
  const [hasUserActivity, setHasUserActivity] = useState(false);
  const [savedProperties, setSavedProperties] = useState([]);



  // TODO: Change to useState([]) after API integration
  const [featuredProperties, setFeaturedProperties] = useState(fallbackProperties);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleSignup = () => {
  window.location.href = '/register';
  };

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

  const newsArticles = [
    { 
      title: 'Melbourne House Prices Rise 4.8% in Q1 2025', 
      date: 'March 15, 2025',
      category: 'Market Update',
      image: '#3b82f6',
      excerpt: 'Melbourne property market continues strong momentum with record-breaking Q1 growth across suburbs...'
    },
    { 
      title: 'New Housing Policy Reforms Take Effect', 
      date: 'March 12, 2025',
      category: 'Policy News',
      image: '#10b981',
      excerpt: 'Federal government introduces major housing affordability reforms impacting first-time buyers...'
    },
    { 
      title: 'South Yarra Leads Melbourne Investment Returns', 
      date: 'March 10, 2025',
      category: 'Area Spotlight',
      image: '#f59e0b',
      excerpt: 'Premium suburb delivers exceptional returns as infrastructure upgrades drive demand...'
    },
    { 
      title: 'RBA Holds Rates Steady for Q1 2025', 
      date: 'March 8, 2025',
      category: 'Finance',
      image: '#ef4444',
      excerpt: 'Central bank maintains current rates amid stable inflation and property market conditions...'
    },
    { 
      title: 'St Kilda Waterfront Development Approved', 
      date: 'March 6, 2025',
      category: 'Development',
      image: '#8b5cf6',
      excerpt: 'Major beachfront project set to transform St Kilda with luxury residences and retail...'
    },
    { 
      title: 'Melbourne CBD Population Growth Hits Record', 
      date: 'March 4, 2025',
      category: 'City Growth',
      image: '#06b6d4',
      excerpt: 'Post-pandemic recovery sees CBD living reach all-time highs with new resident influx...'
    }
  ];

  const cardsPerSlide = 4;
  const totalSlides = Math.ceil(newsArticles.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentNewsSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentNewsSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };


  const getMatchScoreColor = (score) => {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#f59e0b';
    if (score >= 70) return '#ef4444';
    return '#6b7280';
  };

  // Load featured properties when component mounts
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

  return (
    <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#ffffff', margin: 0, padding: 0, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden' }}>

      <nav style={{ backgroundColor: 'transparent', borderBottom: 'none', padding: '0 1rem', width: '100%', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <Logo />
          <div style={{ flex: 1 }}></div>
          <UserMenu 
            user={user} 
            onLogin={handleLogin}
            onSignup={handleSignup}
            onLogout={handleLogout}
          />
        </div>
      </nav>

      <section style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 800\'%3E%3Crect width=\'1200\' height=\'800\' fill=\'%23f0f9ff\'/%3E%3Cpath d=\'M0 400L200 350L400 380L600 320L800 360L1000 340L1200 380V800H0V400Z\' fill=\'%23dbeafe\' opacity=\'0.8\'/%3E%3Cpath d=\'M0 500L200 450L400 480L600 420L800 460L1000 440L1200 480V800H0V500Z\' fill=\'%23bfdbfe\' opacity=\'0.6\'/%3E%3C/svg%3E")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '120px 0 160px 0',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#ffffff', marginBottom: '24px', margin: '0 0 24px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', lineHeight: '1.1' }}>Find Your Dream Home Today</h1>
            <p style={{ fontSize: '22px', color: '#f1f5f9', margin: '0', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', maxWidth: '600px', margin: '0 auto' }}>We connect people with spaces that feel like home</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', maxWidth: '1000px', margin: '0 auto 16px auto' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['rent', 'buy'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    padding: '12px 24px', 
                    backgroundColor: tab === activeTab ? '#1f2937' : '#ffffff',
                    color: tab === activeTab ? '#ffffff' : '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    minWidth: '80px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    textTransform: 'capitalize'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'end' }}>
              <div>
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Search by suburb, postcode or address..."
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '8px', 
                    fontSize: '16px', 
                    backgroundColor: '#ffffff', 
                    boxSizing: 'border-box', 
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }} 
                />
              </div>
              
              <button 
                onClick={handleSearch} 
                style={{ 
                  backgroundColor: '#1f2937', 
                  color: 'white', 
                  padding: '14px 28px', 
                  borderRadius: '8px', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                  minWidth: '100px'
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations Section - Only show if user has activity */}
      {hasUserActivity && (
        <section style={{ backgroundColor: '#ffffff', padding: '80px 0', width: '100%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '6px 14px', borderRadius: '16px', marginBottom: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <Star style={{ width: '14px', height: '14px', color: '#10b981' }} />
                <span style={{ fontSize: '12px', fontWeight: '500', color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px' }}>PERSONALIZED</span>
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>
                Recommended For You
              </h2>
              <p style={{ fontSize: '18px', color: '#6b7280', margin: '0' }}>
                AI-curated recommendations based on your preferences and search history
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {featuredProperties
                .sort((a, b) => b.match_score - a.match_score)
                .slice(0, 6)
                .map((property, index) => (
                <div key={property.id} style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.2s',
                  position: 'relative'
                }}>
                  {/* Match Score Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: getMatchScoreColor(property.match_score),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star style={{ width: '12px', height: '12px' }} />
                    {property.match_score}% match
                  </div>

                  {/* Ranking Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    zIndex: 10
                  }}>
                    #{index + 1}
                  </div>

                  <div style={{ height: '240px', backgroundColor: property.color, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Home style={{ width: '80px', height: '80px', color: 'white', opacity: 0.3 }} />
                    
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '16px', 
                      left: '16px', 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      color: 'white', 
                      padding: '8px 12px', 
                      borderRadius: '8px', 
                      fontSize: '14px', 
                      fontWeight: '600' 
                    }}>
                      ${property.buy_price ? property.buy_price.toLocaleString() : (property.rent_price ? `${property.rent_price}/week` : 'Contact for price')}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveProperty(property.id);
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        backgroundColor: savedProperties.includes(property.id) ? '#ef4444' : 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        zIndex: 5
                      }}
                    >
                      <Heart 
                        style={{ 
                          width: '18px', 
                          height: '18px', 
                          color: savedProperties.includes(property.id) ? 'white' : '#374151',
                          fill: savedProperties.includes(property.id) ? 'white' : 'none'
                        }} 
                      />
                    </button>
                  </div>

                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0', flex: 1 }}>
                        {property.category} in {property.suburb}
                      </h3>
                      {property.match_score >= 85 && (
                        <div style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontSize: '10px',
                          fontWeight: '600',
                          marginLeft: '8px'
                        }}>
                          TOP MATCH
                        </div>
                      )}
                    </div>
                    
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px', margin: '0 0 16px 0' }}>
                      {property.address}, {property.suburb} {property.postcode}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#374151', marginBottom: '16px' }}>
                      <span>{property.bedrooms_num} beds</span>
                      <span>{property.bathrooms_num} baths</span>
                      {property.landsize && <span>{property.landsize} sqm</span>}
                      {property.carspaces && <span>{property.carspaces} car</span>}
                    </div>

                    <div style={{
                      borderTop: '1px solid #e5e7eb',
                      paddingTop: '12px',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      <div style={{ fontWeight: '500', marginBottom: '4px', color: '#374151' }}>Why this matches:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {['Location preference', 'Price range', 'Property type'].map((reason, i) => (
                          <span key={i} style={{
                            backgroundColor: '#f3f4f6',
                            color: '#6b7280',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px'
                          }}>
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <button style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto'
              }}>
                <TrendingUp style={{ width: '16px', height: '16px' }} />
                View All Recommendations
              </button>
            </div>
          </div>
        </section>
      )}

      <section style={{ backgroundColor: '#f8fafc', padding: '80px 0', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '6px 14px', borderRadius: '16px', marginBottom: '20px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <Camera style={{ width: '14px', height: '14px', color: '#3b82f6' }} />
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>
              Trending Properties
            </h2>
            <p style={{ fontSize: '18px', color: '#6b7280', margin: '0' }}>
              Browse high-quality property photos
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                onView={(property) => window.location.href = `/${property.property_type}/${property.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#ffffff', padding: '80px 0', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>Latest Housing News</h2>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: '0' }}>Stay informed with the latest property market insights</p>
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <button 
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeft style={{ width: '20px', height: '20px', color: '#374151' }} />
            </button>

            <button 
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronRight style={{ width: '20px', height: '20px', color: '#374151' }} />
            </button>

            <div style={{ overflow: 'hidden', width: '100%' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  transform: `translateX(-${currentNewsSlide * 100}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                  <div 
                    key={slideIndex}
                    style={{ 
                      minWidth: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '24px',
                      padding: '0 20px'
                    }}
                  >
                    {newsArticles
                      .slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                      .map((article, i) => (
                        <article key={`${slideIndex}-${i}`} style={{ 
                          backgroundColor: '#ffffff', 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', 
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          cursor: 'pointer',
                          height: '300px',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <div style={{ 
                            height: '140px', 
                            backgroundColor: article.image, 
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Home style={{ width: '40px', height: '40px', color: 'white', opacity: 0.3 }} />
                            <div style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              color: '#374151',
                              padding: '4px 8px',
                              borderRadius: '8px',
                              fontSize: '10px',
                              fontWeight: '500'
                            }}>
                              {article.category}
                            </div>
                          </div>
                          
                          <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '8px' }}>
                              <time style={{ 
                                fontSize: '12px', 
                                color: '#6b7280',
                                fontWeight: '500'
                              }}>
                                {article.date}
                              </time>
                            </div>
                            
                            <h3 style={{ 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              color: '#111827', 
                              marginBottom: '8px', 
                              margin: '0 0 8px 0',
                              lineHeight: '1.3',
                              flex: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {article.title}
                            </h3>
                            
                            <p style={{ 
                              fontSize: '12px', 
                              color: '#6b7280', 
                              lineHeight: '1.4',
                              margin: '0 0 12px 0',
                              flex: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {article.excerpt}
                            </p>
                            
                            <div>
                              <span style={{
                                fontSize: '12px',
                                color: '#2563eb',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}>
                                Read more â†?
                              </span>
                            </div>
                          </div>
                        </article>
                      ))
                    }
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '8px', 
              marginTop: '32px' 
            }}>
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewsSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentNewsSlide ? '#2563eb' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
