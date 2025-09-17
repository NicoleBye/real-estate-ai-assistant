import React, { useState, useEffect } from 'react';
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
      icon: 'â™?,
      favorited: false
    },
    {
      type: 'share', 
      text: 'Share',
      icon: 'â†?
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
  const fallbackRentPropertyData = {
      id: 1,
      suburb: "Melbourne",
      address: "456 Collins Street",
      postcode: "3000",
      property_type: "rent",
      category: "Apartment",
      company: "City Rentals",
      buy_price: null,
      rent_price: 650,
      bedrooms_num: 2,
      bathrooms_num: 2,
      carspaces: 1,
      landsize: null,
      year_built: 2020,
      lat: -37.8136,
      lng: 144.9631,
      created_at: "2025-01-01T10:00:00Z",
      updated_at: "2025-01-01T10:00:00Z",
      agent: {
        id: 1,
        name: "Sarah Johnson",
        phone: "+61 3 9000 1234",
        email: "sarah.johnson@cityrentals.com",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 4.8,
        reviews_count: 156
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
      description: "Discover comfortable living in this modern 2-bedroom apartment located in the heart of Melbourne's CBD. Featuring contemporary finishes, plenty of natural light, and convenient city access."
    };

    const fallbackRentSimilarProperties = [
      {
        id: 2,
        suburb: "Southbank",
        address: "100 Southbank Promenade",
        postcode: "3006",
        property_type: "rent",
        category: "Unit",
        company: "Barry Plant",
        buy_price: null,
        rent_price: 580,
        bedrooms_num: 2,
        bathrooms_num: 1,
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
        property_type: "rent",
        category: "Townhouse",
        company: "Hocking Stuart",
        buy_price: null,
        rent_price: 520,
        bedrooms_num: 2,
        bathrooms_num: 1,
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
        property_type: "rent",
        category: "Apartment",
        company: "Nelson Alexander",
        buy_price: null,
        rent_price: 720,
        bedrooms_num: 2,
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
        property_type: "rent",
        category: "Apartment",
        company: "RT Edgar",
        buy_price: null,
        rent_price: 450,
        bedrooms_num: 1,
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
      ${property.rent_price}/week
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'black', margin: 0 }}>
        {property.category} in {property.suburb}
      </h1>
      <div style={{ width: '24px', height: '24px', backgroundColor: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>âœ?/div>
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
        <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.landsize}mÂ²</span>
      </div>
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Home style={{ width: '16px', height: '16px', color: '#666' }} />
      <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.category}</span>
    </div>
  </div>
);

// Property summary component
const PropertySummary = ({ property }) => (
  <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#666', marginBottom: '32px', flexWrap: 'wrap' }}>
    <span><strong>Distance from CBD:</strong> {property.distance}km</span>
    <span><strong>Rental Method:</strong> {property.method}</span>
    <span><strong>Agent:</strong> {property.seller}</span>
  </div>
);

const PropertyRentDetailPage = () => {
  // TODO: Change to useState({}) and useState([]) after API integration
  const [property, setProperty] = useState(fallbackRentPropertyData);
  const [similarProperties, setSimilarProperties] = useState(fallbackRentSimilarProperties);

  const [activeLocationTab, setActiveLocationTab] = useState('transportation');
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  // Use fallback data temporarily, no API call
  setProperty(fallbackRentPropertyData);
  setSimilarProperties(fallbackRentSimilarProperties);
  setLoading(false);
  
  // TODO: Delete above lines and uncomment code below when backend is ready
  /*
  const loadPropertyDetails = async () => {
    setLoading(true);
    try {
      const propertyId = window.location.pathname.split('/').pop();
      
      const response = await fetch(`/api/properties/rent/${propertyId}`);
      const data = await response.json();
      
      if (response.ok) {
        setProperty(data.property);
        setSimilarProperties(data.similarProperties || []);
      } else {
        console.error('Failed to load property details');
        setProperty(fallbackRentPropertyData);
        setSimilarProperties(fallbackRentSimilarProperties);
      }
    } catch (error) {
      console.error('Failed to load property details:', error);
      setProperty(fallbackRentPropertyData);
      setSimilarProperties(fallbackRentSimilarProperties);
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
      text: `Check out this ${property.category} for $${property.rent_price}/week`,
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
  

  const formatAvailableDate = (saleDate) => {
    const date = new Date(saleDate);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return "Available Now";
    } else if (diffDays <= 7) {
      return `Available in ${diffDays} days`;
    } else {
      return `Available ${date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}`;
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
                  icon={isFavorited ? 'â™? : 'â™?}
                  active={isFavorited}
                  onClick={() => setIsFavorited(!isFavorited)}
                />

                <HeaderButton
                  text="Share"
                  icon="â†?
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
                  <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>+12</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '32px' }}>
            
            {/* Main Content */}
            <div>
              <PropertyHeader property={property} />

              <PropertyStats property={property} />


              {/* Rental Details */}
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'black', marginBottom: '24px' }}>Rental Details</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px' }}>
                  <PropertyDetailRow 
                    icon={<PropertyIcon />} 
                    label="Property Type" 
                    value={property.category} 
                  />
                  <PropertyDetailRow 
                    icon={<CalendarIcon />} 
                    label="Built Year" 
                    value={property.year_built} 
                  />
                  {property.landsize && (
                    <PropertyDetailRow 
                      icon={<LandIcon />} 
                      label="Land Size" 
                      value={`${property.landsize}mÂ²`} 
                    />
                  )}
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
                  <FeatureRow icon={<ServiceIcon />} text="Dishwasher" />
                  <FeatureRow icon={<BalconyIcon />} text="Balcony" />
                  <FeatureRow icon={<KitchenIcon />} text="Modern kitchen" />
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

              {/* Similar Properties */}
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '24px' }}>Similar Properties</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
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

            {/* Sidebar */}
            <div>
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', position: 'sticky', top: '24px' }}>

                {/* Agent information */}
                <div>
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
        </div>
      </div>
    </div>
  );
};

export default PropertyRentDetailPage;
