import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Heart, 
  Calendar, 
  Settings, 
  LogOut
} from 'lucide-react';

const UserMenu = ({ user, onLogin, onSignup, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={onLogin}
          style={{ 
            backgroundColor: 'transparent', 
            color: '#374151', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            border: '1px solid #d1d5db', 
            cursor: 'pointer', 
            fontWeight: '500', 
            transition: 'all 0.2s',
            fontSize: '14px'
          }}
        >
          Sign In
        </button>
        <button 
          onClick={onSignup}
          style={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: '500', 
            transition: 'all 0.2s',
            fontSize: '14px'
          }}
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }} ref={menuRef}>
      {/* User Avatar/Trigger */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '8px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <div style={{ 
          width: '36px', 
          height: '36px', 
          backgroundColor: '#2563eb', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <User style={{ width: '20px', height: '20px', color: 'white' }} />
        </div>
        <span style={{ color: '#111827', fontWeight: '500', fontSize: '14px' }}>
          {user.name}
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          marginTop: '8px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          minWidth: '200px',
          overflow: 'hidden',
          zIndex: 1000
        }}>
          {/* User Info Header */}
          <div style={{ 
            padding: '16px', 
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                backgroundColor: '#2563eb', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <User style={{ width: '22px', height: '22px', color: 'white' }} />
              </div>
              <div>
                <p style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  margin: '0 0 2px 0' 
                }}>
                  {user.name}
                </p>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#6b7280', 
                  margin: 0 
                }}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div style={{ padding: '8px 0' }}>
            <MenuItem 
              icon={<Heart />} 
              text="Saved Properties" 
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/user?tab=favorites';
              }}
            />
            <MenuItem 
              icon={<Calendar />} 
              text="Inspections" 
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/user?tab=inspections';
              }}
            />
            <MenuItem 
              icon={<Settings />} 
              text="Profile Settings" 
              onClick={() => {
                setIsOpen(false);
                window.location.href = '/user?tab=profile';
              }}
            />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '8px 0' }} />

          {/* Logout */}
          <div style={{ padding: '8px 0' }}>
            <MenuItem 
              icon={<LogOut />} 
              text="Sign Out" 
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              isLogout={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Menu Item Component
const MenuItem = ({ icon, text, onClick, badge, isLogout = false }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px 16px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        color: isLogout ? '#ef4444' : '#374151',
        transition: 'background-color 0.2s',
        textAlign: 'left'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = isLogout ? '#fef2f2' : '#f3f4f6';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
      }}
    >
      <div style={{ 
        width: '18px', 
        height: '18px',
        color: isLogout ? '#ef4444' : '#6b7280'
      }}>
        {React.cloneElement(icon, { 
          style: { width: '18px', height: '18px' } 
        })}
      </div>
      <span style={{ flex: 1 }}>{text}</span>
      {badge && (
        <div style={{
          backgroundColor: '#ef4444',
          color: 'white',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: '600'
        }}>
          {badge}
        </div>
      )}
    </button>
  );
};

export default UserMenu;
