import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = ({ 
  size = 'medium',
  clickable = true,
  showText = true 
}) => {
  const navigate = useNavigate();
  
  // Size configuration for different use cases
  const sizeConfig = {
    small: { 
      logoSize: '24px', 
      fontSize: '16px',
      gap: '6px'
    },
    medium: { 
      logoSize: '36px', 
      fontSize: '24px',
      gap: '8px'
    },
    large: { 
      logoSize: '48px', 
      fontSize: '32px',
      gap: '10px'
    }
  };
  
  const config = sizeConfig[size];
  
  const handleClick = () => {
    if (clickable) {
      navigate('/');
    }
  };
  
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: config.gap,
        cursor: clickable ? 'pointer' : 'default'
      }}
      onClick={handleClick}
    >
      <img 
        src="/logo.png" 
        alt="Propzy Logo"
        style={{ 
          width: config.logoSize, 
          height: config.logoSize, 
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
      {/* Fallback logo when image fails to load */}
      <div 
        style={{ 
          width: config.logoSize, 
          height: config.logoSize, 
          backgroundColor: '#FBCA03', 
          borderRadius: '8px', 
          display: 'none', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: config.fontSize === '24px' ? '18px' : config.fontSize === '32px' ? '24px' : '14px',
          color: '#111827',
          boxShadow: '0 2px 4px rgba(251, 202, 3, 0.3)'
        }}
      >
        P
      </div>
      
      {showText && (
        <span 
          style={{ 
            fontSize: config.fontSize, 
            fontWeight: 'bold', 
            color: '#111827' 
          }}
        >
          PROPZY
        </span>
      )}
    </div>
  );
};

export default Logo;
