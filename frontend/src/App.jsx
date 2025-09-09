import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import RegisterPage from './pages/RegisterPage';
import RentPropertiesPage from './pages/RentPropertiesPage';
import BuyPropertiesPage from './pages/BuyPropertiesPage';
import PropertyRentDetailPage from './pages/PropertyRentDetailPage';
import PropertyBuyDetailPage from './pages/PropertyBuyDetailPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import CompactAIChat from './components/CompactAIChat';

function App() {
  const location = useLocation();
  const [modalProperty, setModalProperty] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const hideAIChat = ['/login', '/register', '/adminlogin'].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/rent" element={<RentPropertiesPage />} />
        <Route path="/buy" element={<BuyPropertiesPage />} />
        <Route path="/rent/:id" element={<PropertyRentDetailPage />} />
        <Route path="/buy/:id" element={<PropertyBuyDetailPage />} />
      </Routes>

      {!hideAIChat && (
      <CompactAIChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onPropertyView={setModalProperty} 
      />
      )}

      {/* Portal Modal */}
      {modalProperty && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={() => setModalProperty(null)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '95vw',
            height: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setModalProperty(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                zIndex: 10
              }}>
              ×
            </button>
            
            <div style={{ padding: '40px' }}>
              <h2>{modalProperty.property_type} in {modalProperty.suburb}</h2>
              <p>Price: ${modalProperty.buy_price ? modalProperty.buy_price.toLocaleString() : `${modalProperty.rent_price}/week`}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default App;