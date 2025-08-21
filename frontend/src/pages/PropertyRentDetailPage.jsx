import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Bed, Bath, Car, Ruler, Home, Calendar, DollarSign } from 'lucide-react';

const PropertyRentDetailPage = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [showRentalCalculatorModal, setShowRentalCalculatorModal] = useState(false);
  const [weeklyIncome, setWeeklyIncome] = useState(2000);
  const [leaseLength, setLeaseLength] = useState(12);

  const property = {
    title: "Modern CBD Apartment",
    weeklyRent: 650,
    bond: 2600,
    address: "456 Collins Street, Melbourne VIC 3000",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 85,
    internalArea: 75,
    propertyType: "Apartment",
    availableDate: "Available Now",
    leaseTerm: "12 months preferred",
    furnished: "Unfurnished",
    petFriendly: false,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Discover comfortable living in this modern 2-bedroom apartment located in the heart of Melbourne's CBD. Featuring contemporary finishes, plenty of natural light, and convenient city access."
  };

  const similarProperties = [
    {
      id: 2,
      title: "Stylish Southbank Unit", 
      weeklyRent: 580,
      location: "Southbank Promenade, Southbank",
      bedrooms: 2,
      bathrooms: 1,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Charming Collingwood Terrace",
      weeklyRent: 520,
      location: "Smith Street, Collingwood", 
      bedrooms: 2,
      bathrooms: 1,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "Premium Richmond Apartment",
      weeklyRent: 720,
      location: "Bridge Road, Richmond", 
      bedrooms: 2,
      bathrooms: 2,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      title: "Urban Carlton Studio",
      weeklyRent: 450,
      location: "Lygon Street, Carlton", 
      bedrooms: 1,
      bathrooms: 1,
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const currentRent = property.weeklyRent;
  const annualRentGrowthRate = 0.05;

  const calculateAffordability = () => {
    const weeklyRentAffordable = weeklyIncome * 0.3;
    const isAffordable = currentRent <= weeklyRentAffordable;
    const difference = Math.abs(weeklyRentAffordable - currentRent);
    
    return {
      isAffordable,
      recommendedMaxRent: Math.round(weeklyRentAffordable),
      difference: Math.round(difference),
      percentage: Math.round((currentRent / weeklyIncome) * 100)
    };
  };

  const generateRentTrendData = () => {
    const data = [];
    const startYear = 2020;
    const currentYear = 2025;
    const endYear = 2030;
    
    for (let year = startYear; year < currentYear; year++) {
      const baseHistoricalRent = 520;
      const rent = baseHistoricalRent * Math.pow(1.04, year - startYear);
      data.push({
        year,
        historical: Math.round(rent),
        predicted: null,
        confidenceHigh: null,
        confidenceLow: null
      });
    }
    
    for (let year = currentYear; year <= endYear; year++) {
      const yearsFromNow = year - currentYear;
      const predictedRent = currentRent * Math.pow(1 + annualRentGrowthRate, yearsFromNow);
      const confidenceRange = predictedRent * 0.1;
      
      data.push({
        year,
        historical: year === currentYear ? currentRent : null,
        predicted: Math.round(predictedRent),
        confidenceHigh: Math.round(predictedRent + confidenceRange),
        confidenceLow: Math.round(predictedRent - confidenceRange)
      });
    }
    
    return data;
  };

  const calculateRentPrediction = (years) => {
    const baseRent = property.weeklyRent;
    const predictedRent = baseRent * Math.pow(1 + annualRentGrowthRate, years);
    const totalIncrease = predictedRent - baseRent;
    const growthPercentage = ((predictedRent / baseRent - 1) * 100).toFixed(1);
    
    return {
      predicted: Math.round(predictedRent),
      totalIncrease: Math.round(totalIncrease),
      growthPercentage
    };
  };

  const chartData = generateRentTrendData();

  const PropertyCard = ({ property }) => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
      <div style={{ position: 'relative' }}>
        <img 
          src={property.image} 
          alt={property.title}
          style={{ width: '100%', height: '192px', objectFit: 'cover' }}
        />
      </div>
      
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '8px' }}>
          ${property.weeklyRent}/week
        </div>
        
        <h3 style={{ fontWeight: '500', color: 'black', marginBottom: '4px', fontSize: '16px', margin: '0 0 4px 0' }}>{property.title}</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px', margin: '0 0 12px 0' }}>{property.location}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#666' }}>
          <span>{property.bedrooms} beds</span>
          <span>•</span>
          <span>{property.bathrooms} bath</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: 'white', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', padding: '24px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e5e5', padding: '16px 0', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', border: 'none', color: '#666', fontSize: '16px', cursor: 'pointer' }}>
                ← Go back
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
                  P
                </div>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>PROPZY</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: isFavorited ? '#3b82f6' : 'white', color: isFavorited ? 'white' : '#666', cursor: 'pointer' }}
                >
                  {isFavorited ? '♥' : '♡'} Save
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: 'white', color: '#666', cursor: 'pointer' }}>
                  ↗ Share
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px', height: '500px', marginBottom: '48px' }}>
            <div style={{ position: 'relative', height: '100%' }}>
              <img 
                src={property.images[0]} 
                alt={property.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', height: '100%' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={property.images[1]} 
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <img 
                  src={property.images[2]} 
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <img 
                  src={property.images[3]} 
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
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
            
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>
                ${property.weeklyRent}/week
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'black', margin: 0 }}>{property.title}</h1>
                <div style={{ backgroundColor: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  {property.availableDate}
                </div>
              </div>
              
              <p style={{ color: '#666', marginBottom: '24px', fontSize: '16px' }}>{property.address}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Bed style={{ width: '16px', height: '16px', color: '#666' }} />
                  <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.bedrooms}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Bath style={{ width: '16px', height: '16px', color: '#666' }} />
                  <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.bathrooms}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Car style={{ width: '16px', height: '16px', color: '#666' }} />
                  <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.parking}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Ruler style={{ width: '16px', height: '16px', color: '#666' }} />
                  <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.area}m²</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Home style={{ width: '16px', height: '16px', color: '#666' }} />
                  <span style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>{property.propertyType}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#666', marginBottom: '32px' }}>
                <span><strong>Bond:</strong> ${property.bond.toLocaleString()}</span>
                <span><strong>Lease Term:</strong> {property.leaseTerm}</span>
                <span><strong>Furnished:</strong> {property.furnished}</span>
                <span><strong>Pets:</strong> {property.petFriendly ? 'Allowed' : 'Not allowed'}</span>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '12px' }}>About this property</h2>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
                  {property.description}
                </p>
                <button style={{ color: '#3b82f6', backgroundColor: 'transparent', border: 'none', fontWeight: '500', cursor: 'pointer' }}>
                  Full description →
                </button>
              </div>

              <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'black', marginBottom: '24px' }}>Rental Details</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Property Type</span>
                    <span style={{ color: 'black', fontWeight: '500' }}>{property.propertyType}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Available Date</span>
                    <span style={{ color: 'black', fontWeight: '500' }}>{property.availableDate}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Lease Term</span>
                    <span style={{ color: 'black', fontWeight: '500' }}>{property.leaseTerm}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Furnished</span>
                    <span style={{ color: 'black', fontWeight: '500' }}>{property.furnished}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Bond Required</span>
                    <span style={{ color: 'black', fontWeight: '500' }}>${property.bond.toLocaleString()}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Pet Friendly</span>
                    <span style={{ color: property.petFriendly ? '#10b981' : '#ef4444', fontWeight: '500' }}>
                      {property.petFriendly ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'black', marginBottom: '24px' }}>Features & Amenities</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>Secure parking</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>NBN ready</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>Swimming pool</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>Gym access</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>City views</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>Natural light</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>Air conditioning</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>Dishwasher</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>Balcony</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>Modern kitchen</span>
                  </div>
                </div>
              </div>

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
                      backgroundColor: '#3b82f6', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      📊
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', margin: 0 }}>
                        Rent Trends
                      </h3>
                      <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                        Historical & predicted rent analysis
                      </p>
                    </div>
                  </div>
                  <button style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    View Report
                  </button>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'black', margin: 0 }}>
                      5-Year Rent Forecast
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                      Based on market trends
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
                          tickFormatter={(value) => `$${value}`}
                        />
                        
                        <Area
                          type="monotone"
                          dataKey="confidenceHigh"
                          stroke="none"
                          fill="#3b82f6"
                          fillOpacity={0.1}
                        />
                        <Area
                          type="monotone"
                          dataKey="confidenceLow"
                          stroke="none"
                          fill="#3b82f6"
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
                          stroke="#3b82f6"
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
                      <div style={{ width: '16px', height: '2px', backgroundColor: '#3b82f6' }}></div>
                      <span style={{ color: '#666' }}>Predicted</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '16px', height: '8px', backgroundColor: '#3b82f6', opacity: 0.2 }}></div>
                      <span style={{ color: '#666' }}>Confidence Range</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    textAlign: 'center',
                    border: '1px solid #e5e5e5'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>1 Year Forecast</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '4px' }}>
                      ${calculateRentPrediction(1).predicted}/week
                    </div>
                    <div style={{ fontSize: '14px', color: '#3b82f6', fontWeight: '500', marginBottom: '4px' }}>
                      +${calculateRentPrediction(1).totalIncrease}/week
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      (+{calculateRentPrediction(1).growthPercentage}% increase)
                    </div>
                  </div>

                  <div style={{ 
                    backgroundColor: '#eff6ff', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    textAlign: 'center',
                    border: '2px solid #3b82f6'
                  }}>
                    <div style={{ fontSize: '14px', color: '#3b82f6', fontWeight: '500', marginBottom: '8px' }}>
                      3 Year Forecast
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '4px' }}>
                      ${calculateRentPrediction(3).predicted}/week
                    </div>
                    <div style={{ fontSize: '14px', color: '#3b82f6', fontWeight: '500', marginBottom: '4px' }}>
                      +${calculateRentPrediction(3).totalIncrease}/week
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      (+{calculateRentPrediction(3).growthPercentage}% increase)
                    </div>
                  </div>

                  <div style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    textAlign: 'center',
                    border: '1px solid #e5e5e5'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>5 Year Forecast</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '4px' }}>
                      ${calculateRentPrediction(5).predicted}/week
                    </div>
                    <div style={{ fontSize: '14px', color: '#3b82f6', fontWeight: '500', marginBottom: '4px' }}>
                      +${calculateRentPrediction(5).totalIncrease}/week
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      (+{calculateRentPrediction(5).growthPercentage}% increase)
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '16px' }}>Location & Nearby</h2>
                
                <div style={{ backgroundColor: '#f9fafb', borderRadius: '12px', height: '400px', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.0169!2d144.9630!3d-37.8136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ca2f8c89a90!2s456%20Collins%20St%2C%20Melbourne%20VIC%203000!5e0!3m2!1sen!2sau!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'black', marginBottom: '12px' }}>Transportation</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🚊</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Flinders Station - 5 min walk</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🚌</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Bus Stop - 2 min walk</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🚃</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Tram Stop - 1 min walk</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'black', marginBottom: '12px' }}>Nearby Amenities</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🛒</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Woolworths - 3 min walk</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>☕</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Multiple cafes nearby</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🏥</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Medical Center - 8 min walk</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'black', marginBottom: '12px' }}>Education</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🏫</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Melbourne Primary - 1.2 km</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🎓</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>RMIT University - 800m</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📚</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>State Library - 10 min walk</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'black', marginBottom: '12px' }}>Lifestyle</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🏞️</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Treasury Gardens - 5 min</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🏋️</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Fitness First - 3 min walk</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>🍽️</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>Restaurant district nearby</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '48px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '24px' }}>Similar Properties</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  {similarProperties.map(prop => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div style={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', position: 'sticky', top: '24px' }}>
                
                <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '20px' }}>💰</span>
                    <span style={{ fontWeight: '500', color: 'black' }}>Affordability Check</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '8px' }}>
                    {calculateAffordability().isAffordable ? '✅ Affordable' : '⚠️ Above Budget'}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {calculateAffordability().percentage}% of income • Max recommended: ${calculateAffordability().recommendedMaxRent}/week
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    onClick={() => setShowApplicationModal(true)}
                    style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '16px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Apply Now
                  </button>
                  
                  <button 
                    onClick={() => setShowInspectionModal(true)}
                    style={{ width: '100%', border: '1px solid #10b981', color: '#10b981', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', backgroundColor: 'white', cursor: 'pointer' }}
                  >
                    📅 Book Inspection
                  </button>

                  <button 
                    onClick={() => setShowRentalCalculatorModal(true)}
                    style={{ width: '100%', border: '1px solid #f59e0b', color: '#f59e0b', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', backgroundColor: 'white', cursor: 'pointer' }}
                  >
                    🧮 Affordability Calculator
                  </button>

                  <button 
                    onClick={() => setShowContactModal(true)}
                    style={{ width: '100%', border: '1px solid #6b7280', color: '#374151', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', backgroundColor: 'white', cursor: 'pointer' }}
                  >
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showContactModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '448px', margin: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', margin: 0 }}>Contact Agent</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                style={{ color: '#9ca3af', backgroundColor: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                alt="Agent"
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'black', margin: 0 }}>Sarah Johnson</h4>
                <p style={{ color: '#666', margin: 0 }}>Rental Manager</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>4.8 Rating (156 reviews)</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href="tel:+61390001234"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}
              >
                <span>📞</span>
                <div>
                  <div style={{ fontWeight: '500', color: 'black' }}>Call Now</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>+61 3 9000 1234</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {showApplicationModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '448px', margin: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', margin: 0 }}>Submit Application</h3>
              <button 
                onClick={() => setShowApplicationModal(false)}
                style={{ color: '#9ca3af', backgroundColor: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Full Name"
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', boxSizing: 'border-box' }}
              />
              <input
                type="email"
                placeholder="Email Address"
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', boxSizing: 'border-box' }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', boxSizing: 'border-box' }}
              />
              <input
                type="text"
                placeholder="Annual Income"
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', boxSizing: 'border-box' }}
              />
              <select style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', boxSizing: 'border-box' }}>
                <option>Preferred Move-in Date</option>
                <option>Immediately</option>
                <option>Within 2 weeks</option>
                <option>Within 1 month</option>
              </select>
              <button 
                onClick={() => {
                  alert('Application submitted!');
                  setShowApplicationModal(false);
                }}
                style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '16px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {showInspectionModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '448px', margin: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', margin: 0 }}>Book Inspection</h3>
              <button 
                onClick={() => setShowInspectionModal(false)}
                style={{ color: '#9ca3af', backgroundColor: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Your Name"
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', boxSizing: 'border-box' }}
              />
              <input
                type="email"
                placeholder="Email Address"
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', boxSizing: 'border-box' }}
              />
              <select style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', boxSizing: 'border-box' }}>
                <option>Tomorrow 10:00 AM</option>
                <option>Tomorrow 2:00 PM</option>
                <option>Thursday 10:00 AM</option>
                <option>Friday 11:00 AM</option>
              </select>
              <button 
                onClick={() => {
                  alert('Inspection booked!');
                  setShowInspectionModal(false);
                }}
                style={{ width: '100%', backgroundColor: '#10b981', color: 'white', padding: '16px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {showRentalCalculatorModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '448px', margin: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', margin: 0 }}>Affordability Calculator</h3>
              <button 
                onClick={() => setShowRentalCalculatorModal(false)}
                style={{ color: '#9ca3af', backgroundColor: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Weekly Income: ${weeklyIncome.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="50"
                  value={weeklyIncome}
                  onChange={(e) => setWeeklyIncome(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', appearance: 'none', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  <span>$500</span>
                  <span>$5000</span>
                </div>
              </div>

              <div style={{ backgroundColor: calculateAffordability().isAffordable ? '#f0fdf4' : '#fef2f2', border: `1px solid ${calculateAffordability().isAffordable ? '#bbf7d0' : '#fecaca'}`, borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'black', marginBottom: '12px' }}>Affordability Analysis</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Weekly Income:</span>
                    <span style={{ fontWeight: '500' }}>${weeklyIncome.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Recommended Max Rent (30%):</span>
                    <span style={{ fontWeight: '500' }}>${calculateAffordability().recommendedMaxRent}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>This Property:</span>
                    <span style={{ fontWeight: '500' }}>${currentRent}/week</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Percentage of Income:</span>
                    <span style={{ fontWeight: '500', color: calculateAffordability().isAffordable ? '#059669' : '#dc2626' }}>
                      {calculateAffordability().percentage}%
                    </span>
                  </div>
                  <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '8px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '600' }}>
                      <span>Assessment:</span>
                      <span style={{ color: calculateAffordability().isAffordable ? '#059669' : '#dc2626' }}>
                        {calculateAffordability().isAffordable ? 'Affordable' : 'Above Budget'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                * Based on the 30% rule. Consider other expenses like utilities, groceries, and savings when budgeting.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyRentDetailPage;