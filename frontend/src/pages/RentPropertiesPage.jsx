import React, { useState } from 'react';

const RentPropertiesPage = () => {
  const [properties] = useState([
    {
      id: 1,
      title: "Modern CBD Apartment",
      price: "$480",
      location: "Collins Street, Melbourne CBD",
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Spacious Family House", 
      price: "$510",
      location: "Chapel Street, South Yarra",
      bedrooms: 2,
      bathrooms: 1,
      parking: 2,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Modern Townhouse",
      price: "$700",
      location: "Smith Street, Collingwood",
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Cozy Richmond Unit",
      price: "$380",
      location: "Swan Street, Richmond", 
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      title: "Luxury Southbank Apartment",
      price: "$750",
      location: "Southbank Promenade, Southbank",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 6,
      title: "Heritage House",
      price: "$680",
      location: "Brunswick Street, Fitzroy",
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ]);

  const [showMap, setShowMap] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-yellow-400 hover:bg-yellow-50 transition-colors">
          ♡
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xl font-semibold text-gray-900">{property.price}</span>
          <span className="text-sm text-gray-500">/month</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{property.location}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{property.bedrooms} rooms</span>
          <span>•</span>
          <span>{property.bathrooms} bathroom</span>
          <span>•</span>
          <span>2 floor</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-screen bg-white fixed inset-0 overflow-auto flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <img 
              src="/logo.png" 
              alt="Propzy Logo"
              className="w-9 h-9 rounded-lg object-cover"
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
            <div className="w-9 h-9 bg-yellow-400 rounded-lg hidden items-center justify-center font-bold text-lg text-gray-900 shadow-sm">
              P
            </div>
            <span className="text-2xl font-bold text-gray-900">PROPZY</span>
          </div>
          
          {/* Buy/Rent Toggle */}
          <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
            <button className="flex-1 px-4 py-3 text-sm font-medium bg-gray-100 text-gray-600 rounded-md border-none cursor-pointer">
              Buy
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium bg-yellow-400 text-gray-900 rounded-md border-none cursor-pointer transition-colors">
              Rent
            </button>
          </div>
          
          {/* Show on map toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Show on map</span>
            <button 
              onClick={() => setShowMap(!showMap)}
              className={`relative w-11 h-6 rounded-full border-none cursor-pointer transition-colors outline-none ${
                showMap ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${
                showMap ? 'translate-x-5' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Location */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Location</h3>
              <input 
                type="text" 
                placeholder="Enter suburb, postcode or address..."
                className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-sm box-border outline-none transition-colors focus:border-yellow-400"
              />
            </div>

            {/* Available from */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Available from</h3>
              <input 
                type="date" 
                defaultValue="2025-09-01"
                className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-sm box-border outline-none text-gray-700 focus:border-yellow-400"
              />
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Price</h3>
              <div className="mb-4">
                {/* Track container */}
                <div className="relative mx-4" style={{ height: '60px' }}>
                  {/* Background track */}
                  <div 
                    className="absolute left-0 right-0 bg-gray-200 rounded-full"
                    style={{ top: '27px', height: '6px' }}
                  ></div>
                  
                  {/* Active range track */}
                  <div 
                    className="absolute bg-gray-800 rounded-full"
                    style={{ 
                      top: '27px',
                      height: '6px',
                      left: `${(priceRange.min / 2000) * 100}%`,
                      width: `${((priceRange.max - priceRange.min) / 2000) * 100}%`
                    }}
                  ></div>
                  
                  {/* Min handle */}
                  <div
                    className="absolute bg-yellow-400 rounded-full border-white cursor-grab select-none"
                    style={{
                      top: '16px',
                      left: `calc(${(priceRange.min / 2000) * 100}% - 11px)`,
                      width: '22px',
                      height: '22px',
                      borderWidth: '3px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      zIndex: 4
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
                        let newMin = (percentage / 100) * 2000;
                        
                        // Round to nearest 50
                        newMin = Math.round(newMin / 50) * 50;
                        
                        // Constrain bounds
                        if (newMin >= 0 && newMin <= priceRange.max - 50) {
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
                    className="absolute bg-yellow-400 rounded-full border-white cursor-grab select-none"
                    style={{
                      top: '16px',
                      left: `calc(${(priceRange.max / 2000) * 100}% - 11px)`,
                      width: '22px',
                      height: '22px',
                      borderWidth: '3px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      zIndex: 4
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
                        let newMax = (percentage / 100) * 2000;
                        
                        // Round to nearest 50
                        newMax = Math.round(newMax / 50) * 50;
                        
                        // Constrain bounds
                        if (newMax >= priceRange.min + 50 && newMax <= 2000) {
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
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-600 mb-1">Min</span>
                  <input 
                    type="number" 
                    value={priceRange.min}
                    onChange={(e) => {
                      let newMin = parseInt(e.target.value) || 0;
                      // Round to nearest 50
                      newMin = Math.round(newMin / 50) * 50;
                      if (newMin <= priceRange.max - 50 && newMin >= 0 && newMin <= 2000) {
                        setPriceRange({...priceRange, min: newMin});
                      }
                    }}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-md text-center bg-white text-sm box-border outline-none text-gray-700 focus:border-yellow-400"
                  />
                </div>
                <span className="text-gray-400 text-sm mt-4">—</span>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-600 mb-1">Max</span>
                  <input 
                    type="number" 
                    value={priceRange.max}
                    onChange={(e) => {
                      let newMax = parseInt(e.target.value) || 2000;
                      // Round to nearest 50
                      newMax = Math.round(newMax / 50) * 50;
                      if (newMax >= priceRange.min + 50 && newMax >= 0 && newMax <= 2000) {
                        setPriceRange({...priceRange, max: newMax});
                      }
                    }}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-md text-center bg-white text-sm box-border outline-none text-gray-700 focus:border-yellow-400"
                  />
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Property Type</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="propertyType" value="house" className="mr-3" />
                  <span className="text-sm text-gray-700">House</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="propertyType" value="apartment" defaultChecked className="mr-3" />
                  <span className="text-sm text-gray-700">Apartment</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="propertyType" value="townhouse" className="mr-3" />
                  <span className="text-sm text-gray-700">Townhouse</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="propertyType" value="unit" className="mr-3" />
                  <span className="text-sm text-gray-700">Unit</span>
                </label>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Bedrooms</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="bedrooms" value="1" className="mr-3" />
                  <span className="text-sm text-gray-700">1</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="bedrooms" value="2" defaultChecked className="mr-3" />
                  <span className="text-sm text-gray-700">2</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="bedrooms" value="3" className="mr-3" />
                  <span className="text-sm text-gray-700">3</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="bedrooms" value="4+" className="mr-3" />
                  <span className="text-sm text-gray-700">4+</span>
                </label>
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Bathrooms</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="bathrooms" value="any" defaultChecked className="mr-3" />
                  <span className="text-sm text-gray-700">Any</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="bathrooms" value="1+" className="mr-3" />
                  <span className="text-sm text-gray-700">1+</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="bathrooms" value="2+" className="mr-3" />
                  <span className="text-sm text-gray-700">2+</span>
                </label>
              </div>
            </div>

            {/* Parking */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Parking</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="parking" value="any" defaultChecked className="mr-3" />
                  <span className="text-sm text-gray-700">Any</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="parking" value="1+" className="mr-3" />
                  <span className="text-sm text-gray-700">1+ spaces</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="parking" value="2+" className="mr-3" />
                  <span className="text-sm text-gray-700">2+ spaces</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full px-4 py-3.5 bg-yellow-400 text-gray-900 border-none rounded-lg text-base font-semibold cursor-pointer transition-all shadow-sm hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-md">
            Search
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col h-screen relative">
        {/* Map Section */}
        {showMap && (
          <div className="h-1/3 border-b border-gray-200 bg-blue-50 relative">
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
              📍 Melbourne, VIC
            </div>
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button className="flex items-center justify-center w-10 h-10 bg-white border-none text-xl font-bold cursor-pointer text-gray-700 border-b border-gray-200">+</button>
              <button className="flex items-center justify-center w-10 h-10 bg-white border-none text-xl font-bold cursor-pointer text-gray-700">−</button>
            </div>
            {/* Map price markers */}
            <div className="absolute top-16 left-32 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium">$478</div>
            <div className="absolute top-20 right-40 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium">$610</div>
            <div className="absolute bottom-32 left-28 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium">$659</div>
            <div className="absolute bottom-28 right-48 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium">$525</div>
            <div className="absolute top-48 left-96 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium">$698</div>
            <div className="absolute bottom-52 right-20 bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium">$280</div>
          </div>
        )}

        {/* Properties Grid */}
        <div className={`${showMap ? 'h-2/3' : 'h-full'} bg-gray-50 p-6 overflow-y-auto`}>
          <div className="flex justify-start items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Sort by</span>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white cursor-pointer outline-none min-w-40 text-gray-700">
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="date">Date Listed</option>
                <option value="size">Size</option>
                <option value="bedrooms">Bedrooms</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPropertiesPage;