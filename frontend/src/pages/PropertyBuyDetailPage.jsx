import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Bed, Bath, Car, Ruler, Home, ArrowLeft } from 'lucide-react';
import Logo from '../components/logo'; 
import UserMenu from '../components/UserMenu';
import PropertyCard from '../components/PropertyCard';

// Icon components for Property Details 
const PropertyIcon = () => <Home style={{ width: '16px', height: '16px', color: '#666' }} />;
const LandIcon = () => <Ruler style={{ width: '16px', height: '16px', color: '#666' }} />;
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
    <circle cx="12" cy="10" r="3"/>
    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
  </svg>
);

// Additional Icon components for Features & Amenities
const ParkingIcon = () => <Car style={{ width: '16px', height: '16px', color: '#b45309' }} />;
const WifiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
    <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
    <path d="M12 20h.01"/>
  </svg>
);
const SwimmingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <path d="M2 18h20"/>
    <path d="M6.5 8.5c.5-1 1.5-1 2.5-1s2 0 2.5 1c.5 1 1.5 1 2.5 1s2 0 2.5-1"/>
    <path d="M6.5 15.5c.5-1 1.5-1 2.5-1s2 0 2.5 1c.5 1 1.5 1 2.5 1s2 0 2.5-1"/>
  </svg>
);
const GymIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <path d="M7.01 14.94L3 18.95"/>
    <path d="M3 3l18 18"/>
    <path d="M12.5 7.5L20 15"/>
    <path d="M7.5 12.5L15 20"/>
  </svg>
);
const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const LightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);
const AcIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const ServiceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const BalconyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);
const KitchenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
    <path d="M3 2v20h18V2H3z"/>
    <path d="M9 22V12h6v10"/>
    <path d="M9 7h6"/>
  </svg>
);

// Header data structure
const headerData = {
  user: { name: 'John Doe', email: 'john@example.com' },
  actions: [
    {
      type: 'save',
      text: 'Save',
      icon: '♡',
      favorited: false
    },
    {
      type: 'share', 
      text: 'Share',
      icon: '↗'
    }
  ]
};

// Price prediction data structure
const pricePredictionData = {
  forecasts: [
    {
      period: '1 Year Forecast',
      years: 1,
      highlighted: false
    },
    {
      period: '5 Year Forecast', 
      years: 5,
      highlighted: true
    },
    {
      period: '10 Year Forecast',
      years: 10, 
      highlighted: false
    }
  ]
};

// Tab content data structure
const nearbyData = {
  transportation: [
    'Flinders Station - 5 min walk',
    'Bus Stop - 2 min walk', 
    'Tram Stop - 1 min walk'
  ],
  amenities: [
    'Woolworths - 3 min walk',
    'Multiple cafes nearby',
    'Medical Center - 8 min walk'
  ],
  education: [
    'Melbourne Primary - 1.2 km',
    'RMIT University - 800m',
    'State Library - 10 min walk'
  ],
  lifestyle: [
    'Treasury Gardens - 5 min',
    'Fitness First - 3 min walk',
    'Restaurant district nearby'
  ]
};

// TODO: Delete after API integration - START
const fallbackPropertyData = {
    id: 1,
    suburb: "Melbourne",
    address: "456 Collins Street",
    postcode: "3000",
    property_type: "buy",
    category: "Apartment",
    company: "Premium Real Estate",
    buy_price: 850000,
    rent_price: null,
    bedrooms_num: 3,
    bathrooms_num: 2,
    carspaces: 2,
    landsize: null,
    year_built: 2020,
    lat: -37.8136,
    lng: 144.9631,
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    agent: {
    id: 1,
    name: "Michael Chen",
    phone: "+61 3 9000 1567",
    email: "michael.chen@premiumrealestate.com",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      }
    ],
    description: "Experience luxury living in this stunning 3-bedroom penthouse located in the prestigious heart of Melbourne's CBD. This exceptional residence features premium finishes, floor-to-ceiling windows, and breathtaking city views."
  };

  const fallbackSimilarProperties = [
    {
      id: 2,
      suburb: "Southbank",
      address: "100 Southbank Promenade",
      postcode: "3006",
      property_type: "buy",
      category: "Apartment",
      company: "Barry Plant",
      buy_price: 720000,
      rent_price: null,
      bedrooms_num: 2,
      bathrooms_num: 2,
      carspaces: 1,
      landsize: null,
      year_built: 2021,
      lat: -37.8220,
      lng: 144.9633,
      images: [
        {
          id: 5,
          url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
      ],
      created_at: "2025-01-02T10:00:00Z",
      updated_at: "2025-01-02T10:00:00Z"
    },
    {
      id: 3,
      suburb: "Collingwood",
      address: "789 Smith Street",
      postcode: "3066",
      property_type: "buy",
      category: "Townhouse",
      company: "Hocking Stuart",
      buy_price: 680000,
      rent_price: null,
      bedrooms_num: 3,
      bathrooms_num: 2,
      carspaces: 1,
      landsize: 150,
      year_built: 2019,
      lat: -37.8043,
      lng: 144.9848,
      images: [
        {
          id: 6,
          url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
      ],
      created_at: "2025-01-03T10:00:00Z",
      updated_at: "2025-01-03T10:00:00Z"
    },
    {
      id: 4,
      suburb: "Richmond",
      address: "123 Bridge Road",
      postcode: "3121",
      property_type: "buy", 
      category: "Apartment",
      company: "Nelson Alexander",
      buy_price: 950000,
      rent_price: null,
      bedrooms_num: 3,
      bathrooms_num: 2,
      carspaces: 1,
      landsize: null,
      year_built: 2015,
      lat: -37.8197,
      lng: 144.9864,
      images: [
        {
          id: 7,
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
      ],
      created_at: "2025-01-04T10:00:00Z",
      updated_at: "2025-01-04T10:00:00Z"
    },
    {
      id: 5,
      suburb: "Carlton",
      address: "456 Lygon Street",
      postcode: "3053",
      property_type: "buy",
      category: "Apartment", 
      company: "RT Edgar",
      buy_price: 780000,
      rent_price: null,
      bedrooms_num: 2,
      bathrooms_num: 1,
      carspaces: 0,
      landsize: null,
      year_built: 2020,
      lat: -37.7979,
      lng: 144.9810,
      images: [
        {
          id: 8,
          url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
      ],
      created_at: "2025-01-05T10:00:00Z",
      updated_at: "2025-01-05T10:00:00Z"
    }
  ];
// TODO: Delete after API integration - END

// Helper component for property detail row
const PropertyDetailRow = ({ icon, label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon}
      <span style={{ color: '#666', fontSize: '14px' }}>{label}</span>
    </div>
    <span style={{ color: 'black', fontWeight: '500' }}>{value}</span>
  </div>
);



// Helper component for feature row
const FeatureRow = ({ icon, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
    {icon}
    <span style={{ color: '#374151', fontSize: '14px' }}>{text}</span>
  </div>
);

// Header button component 
const HeaderButton = ({ text, icon, active, onClick, style = {} }) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      padding: '8px 16px', 
      borderRadius: '8px', 
      border: '1px solid #d1d5db', 
      backgroundColor: active ? '#fbbf24' : 'white', 
      color: active ? 'black' : '#666', 
      cursor: 'pointer',
      ...style
    }}
  >
    {icon} {text}
  </button>
);

// Tab content component
const TabContent = ({ items }) => (
  <div style={{ padding: '24px' }}>
    {items.map((item, index) => (
      <div key={index} style={{ fontSize: '16px', marginBottom: '12px', color: '#374151' }}>
        {item}
      </div>
    ))}
  </div>
);

// Property header component
const PropertyHeader = ({ property }) => (
  <div>
    <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>
      ${property.buy_price.toLocaleString()}
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'black', margin: 0 }}>
        {property.category} in {property.suburb}
      </h1>
      <div style={{ width: '24px', height: '24px', backgroundColor: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</div>
    </div>
    
    <p style={{ color: '#666', marginBottom: '24px', fontSize: '16px' }}>
      {property.address}, {property.suburb} VIC {property.postcode}
    </p>
  </div>
);

// Property stats component
const PropertyStats = ({ property }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Bed style={{ width: '16px', height: '16px', color: '#666' }} />
      <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.bedrooms_num}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Bath style={{ width: '16px', height: '16px', color: '#666' }} />
      <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.bathrooms_num}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Car style={{ width: '16px', height: '16px', color: '#666' }} />
      <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.carspaces}</span>
    </div>
    {property.landsize && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Ruler style={{ width: '16px', height: '16px', color: '#666' }} />
        <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.landsize}m²</span>
      </div>
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Home style={{ width: '16px', height: '16px', color: '#666' }} />
      <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.category}</span>
    </div>
  </div>
);


// Price forecast card component
const ForecastCard = ({ period, years, highlighted, calculatePrediction, basePrice }) => {
  const prediction = calculatePrediction(years);
  
  return (
    <div style={{ 
      backgroundColor: highlighted ? '#fffbeb' : '#f9fafb', 
      borderRadius: '12px', 
      padding: '20px', 
      textAlign: 'center',
      border: highlighted ? '2px solid #fbbf24' : '1px solid #e5e5e5'
    }}>
      <div style={{ 
        fontSize: '14px', 
        color: highlighted ? '#f59e0b' : '#666', 
        fontWeight: highlighted ? '500' : 'normal',
        marginBottom: '8px' 
      }}>
        {period}
      </div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '4px' }}>
        ${prediction.predicted.toLocaleString()}
      </div>
      <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '500', marginBottom: '4px' }}>
        Capital Gain: +${prediction.totalGain.toLocaleString()}
      </div>
      <div style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: '500', marginTop: '4px' }}>
        ROI: {((prediction.totalGain / basePrice) * 100).toFixed(1)}%
      </div>
    </div>
  );
};

const PropertyBuyDetailPage = () => {
  // TODO: Change to useState({}) and useState([]) after API integration
  const [property, setProperty] = useState(fallbackPropertyData);
  const [similarProperties, setSimilarProperties] = useState(fallbackSimilarProperties);

  const [activeLocationTab, setActiveLocationTab] = useState('transportation');
  const [isFavorited, setIsFavorited] = useState(false);
  const [showMortgageModal, setShowMortgageModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState(720000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use fallback data temporarily, no API call
    setProperty(fallbackPropertyData);
    setSimilarProperties(fallbackSimilarProperties);
    setLoading(false);
    
    // TODO: Delete above lines and uncomment code below when backend is ready
    /*
    const loadPropertyDetails = async () => {
      setLoading(true);
      try {
        const propertyId = window.location.pathname.split('/').pop();
        
        const response = await fetch(`/api/properties/buy/${propertyId}`);
        const data = await response.json();
        
        if (response.ok) {
          setProperty(data.property);
          setSimilarProperties(data.similarProperties || []);
        } else {
          console.error('Failed to load property details');
          setProperty(fallbackPropertyData);
          setSimilarProperties(fallbackSimilarProperties);
        }
      } catch (error) {
        console.error('Failed to load property details:', error);
        setProperty(fallbackPropertyData);
        setSimilarProperties(fallbackSimilarProperties);
      } finally {
        setLoading(false);
      }
    };
    loadPropertyDetails();
    */
  }, []);

    // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: `${property.category} in ${property.suburb}`,
      text: `Check out this ${property.category} for $${property.buy_price.toLocaleString()}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const currentPrice = property.buy_price;
  const annualGrowthRate = 0.08;

  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    return monthlyPayment;
  };

  const generateChartData = () => {
    const data = [];
    const startYear = 2020;
    const currentYear = 2025;
    const endYear = 2030;
    
    for (let year = startYear; year < currentYear; year++) {
      const baseHistoricalPrice = 650000;
      const price = baseHistoricalPrice * Math.pow(1.07, year - startYear);
      data.push({
        year,
        historical: Math.round(price),
        predicted: null,
        confidenceHigh: null,
        confidenceLow: null
      });
    }
    
    for (let year = currentYear; year <= endYear; year++) {
      const yearsFromNow = year - currentYear;
      const predictedPrice = currentPrice * Math.pow(1 + annualGrowthRate, yearsFromNow);
      const confidenceRange = predictedPrice * 0.15;
      
      data.push({
        year,
        historical: year === currentYear ? currentPrice : null,
        predicted: Math.round(predictedPrice),
        confidenceHigh: Math.round(predictedPrice + confidenceRange),
        confidenceLow: Math.round(predictedPrice - confidenceRange)
      });
    }
    
    return data;
  };
  const chartData = generateChartData();

  const calculatePricePrediction = (years) => {
    const basePrice = property.buy_price;
    const predictedPrice = basePrice * Math.pow(1 + annualGrowthRate, years);
    const totalGain = predictedPrice - basePrice;
    const growthPercentage = ((predictedPrice / basePrice - 1) * 100).toFixed(1);
    
    return {
      predicted: Math.round(predictedPrice),
      totalGain: Math.round(totalGain),
      growthPercentage
    };
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

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

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: 'white', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', padding: '24px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}

        <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e5e5', padding: '16px 0', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{ 
              padding: '6px',
              border: 'none',
              backgroundColor: '#f8f9fa', 
              borderRadius: '6px',
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer'
            }}>
              <ArrowLeft style={{ width: '18px', height: '18px', color: '#495057' }} />
            </button>
            
            <Logo />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UserMenu 
                user={headerData.user}
                onLogin={() => console.log('Login')}
                onSignup={() => console.log('Signup')}
                onLogout={() => console.log('Logout')}
              />
              
              <HeaderButton
                text="Save"
                icon={isFavorited ? '♥' : '♡'}
                active={isFavorited}
                onClick={() => setIsFavorited(!isFavorited)}
              />
              
              <HeaderButton
                text="Share"
                icon="↗"
                active={false}
                onClick={handleShare}
              />
            </div>
          </div>
        </div>

          {/* Image Gallery */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px', height: '500px', marginBottom: '48px' }}>
            <div style={{ position: 'relative', height: '100%' }}>
              <img 
                src={property.images[0]?.url} 
                alt={`${property.property_type} in ${property.suburb}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', height: '100%' }}>
              {property.images.slice(1, 4).map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img 
                    src={img.url}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              ))}
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>+15</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '32px' }}>
            
            {/* Main Content */}
            <div>
              <PropertyHeader property={property} />
              <PropertyStats property={property} />

              {/* Property Details */}
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'black', marginBottom: '24px' }}>Property Details</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px' }}>
                  <PropertyDetailRow 
                    icon={<PropertyIcon />} 
                    label="Property Type" 
                    value={property.category} 
                  />
                  <PropertyDetailRow 
                    icon={<LandIcon />} 
                    label="Land Size" 
                    value={property.landsize ? `${property.landsize}m²` : 'N/A'} 
                  />
                  <PropertyDetailRow 
                    icon={<CalendarIcon />} 
                    label="Built Year" 
                    value={property.year_built} 
                  />
                </div>
              </div>

              {/* Features & Amenities */}
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'black', marginBottom: '24px' }}>Features & Amenities</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px' }}>
                  <FeatureRow icon={<ParkingIcon />} text="Secure parking" />
                  <FeatureRow icon={<WifiIcon />} text="NBN ready" />
                  <FeatureRow icon={<SwimmingIcon />} text="Swimming pool" />
                  <FeatureRow icon={<GymIcon />} text="Gym access" />
                  <FeatureRow icon={<ViewIcon />} text="City views" />
                  <FeatureRow icon={<LightIcon />} text="Natural light" />
                  <FeatureRow icon={<AcIcon />} text="Air conditioning" />
                  <FeatureRow icon={<ServiceIcon />} text="Concierge service" />
                  <FeatureRow icon={<BalconyIcon />} text="Balcony/Terrace" />
                  <FeatureRow icon={<KitchenIcon />} text="Modern kitchen" />
                </div>
              </div>

              {/* Price Prediction */}
              <div style={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e5e5', 
                borderRadius: '12px', 
                padding: '24px', 
                marginBottom: '32px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: '#fbbf24', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      📈
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', margin: 0 }}>
                        Price Prediction
                      </h3>
                      <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                        AI-powered market analysis
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'black', margin: 0 }}>
                      10-Year Price Forecast
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                      Historical data → AI prediction
                    </p>
                  </div>
                  
                  <div style={{ height: '250px', marginBottom: '16px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="year" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#666' }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#666' }}
                          tickFormatter={formatPrice}
                        />
                        
                        <Area
                          type="monotone"
                          dataKey="confidenceHigh"
                          stroke="none"
                          fill="#fbbf24"
                          fillOpacity={0.1}
                        />
                        <Area
                          type="monotone"
                          dataKey="confidenceLow"
                          stroke="none"
                          fill="#fbbf24"
                          fillOpacity={0.1}
                        />
                        
                        <Line
                          type="monotone"
                          dataKey="historical"
                          stroke="#6b7280"
                          strokeWidth={2}
                          dot={false}
                          connectNulls={false}
                        />
                        
                        <Line
                          type="monotone"
                          dataKey="predicted"
                          stroke="#fbbf24"
                          strokeWidth={3}
                          dot={false}
                          connectNulls={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '16px', height: '2px', backgroundColor: '#6b7280' }}></div>
                      <span style={{ color: '#666' }}>Historical</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '16px', height: '2px', backgroundColor: '#fbbf24' }}></div>
                      <span style={{ color: '#666' }}>Predicted</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '16px', height: '8px', backgroundColor: '#fbbf24', opacity: 0.2 }}></div>
                      <span style={{ color: '#666' }}>Confidence Range</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {pricePredictionData.forecasts.map((forecast, index) => (
                      <ForecastCard
                        key={index}
                        period={forecast.period}
                        years={forecast.years}
                        highlighted={forecast.highlighted}
                        calculatePrediction={calculatePricePrediction}
                        basePrice={property.buy_price}
                      />
                    ))}
                </div>
              </div>

              {/* Location & Nearby */}
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '16px' }}>Location & Nearby</h2>
                
                <div style={{ backgroundColor: '#f9fafb', borderRadius: '12px', height: '400px', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.0169!2d${property.lng}!3d${property.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ca2f8c89a90!2s${encodeURIComponent(property.address)}%2C%20${encodeURIComponent(property.suburb)}%20VIC%20${property.postcode}!5e0!3m2!1sen!2sau!4v1234567890`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                  {['Transportation', 'Amenities', 'Education', 'Lifestyle'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveLocationTab(tab.toLowerCase())}
                      style={{
                        padding: '12px 20px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: activeLocationTab === tab.toLowerCase() ? '#2563eb' : '#6b7280',
                        borderBottom: activeLocationTab === tab.toLowerCase() ? '2px solid #2563eb' : '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>


                {/* Tab Content */}
                <TabContent items={nearbyData[activeLocationTab]} />
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', position: 'sticky', top: '24px' }}>
                
                <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontWeight: '500', color: 'black' }}>Monthly Payment</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '8px' }}>
                    ${Math.round(calculateMortgage()).toLocaleString()}/month
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Based on ${loanAmount.toLocaleString()} loan at {interestRate}% for {loanTerm} years
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>               

                  <button 
                    onClick={() => setShowMortgageModal(true)}
                    style={{ width: '100%', border: '1px solid #10b981', color: '#10b981', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', backgroundColor: 'white', cursor: 'pointer' }}
                  >
                    Mortgage Calculator
                  </button>

                  <div style={{ marginTop: '24px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'black' }}>
                      Contact Agent
                    </h4>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <img 
                        src={property.agent?.photo}
                        alt="Agent"
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: '600', color: 'black' }}>{property.agent?.name}</div>
                        <div style={{ fontSize: '14px', color: '#666' }}>{property.company}</div>
                      </div>
                    </div>

                    <a 
                      href={`tel:${property.agent?.phone}`}
                      style={{ 
                        display: 'block',
                        width: '100%',
                        backgroundColor: '#3b82f6', 
                        color: 'white', 
                        padding: '12px 16px', 
                        borderRadius: '8px', 
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}
                    >
                      Call {property.agent?.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Similar Properties */}
            <div style={{ gridColumn: '1 / -1', marginTop: '48px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '24px' }}>Similar Properties</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                {similarProperties  
                  .filter(prop => prop.property_type === property.property_type)
                  .map(prop => (
                    <PropertyCard 
                      key={prop.id} 
                      property={prop} 
                      onView={(property) => window.location.href = `/${property.property_type}/${property.id}`}
                    />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mortgage Modal */}
      {showMortgageModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', margin: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', margin: 0 }}>Mortgage Calculator</h3>
              <button 
                onClick={() => setShowMortgageModal(false)}
                style={{ color: '#9ca3af', backgroundColor: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
              <p style={{ fontSize: '14px', color: '#0369a1', margin: 0 }}>
                Enter your loan amount to calculate monthly repayments. We recommend consulting with a bank to determine your borrowing capacity.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Loan Amount: ${loanAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', appearance: 'none', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  <span>$100K</span>
                  <span>$2M</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', appearance: 'none', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  <span>3%</span>
                  <span>10%</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Loan Term: {loanTerm} years
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', appearance: 'none', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  <span>5 years</span>
                  <span>30 years</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a', borderRadius: '8px', padding: '20px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'black', marginBottom: '16px' }}>Monthly Payment</h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', marginBottom: '12px' }}>
                  ${Math.round(calculateMortgage()).toLocaleString()}/month
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Principal & Interest only. Does not include taxes, insurance, or other fees.
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
                * This calculator provides estimates only. Actual loan terms, interest rates, and monthly payments may vary based on your financial situation and lender requirements. Please consult with a mortgage broker or bank for accurate rates and personalized advice.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyBuyDetailPage;