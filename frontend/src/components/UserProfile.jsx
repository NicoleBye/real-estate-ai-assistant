import React, { useState } from 'react';
import { Camera, User, Mail, Phone, Calendar } from 'lucide-react';

const UserProfile = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: user.username,
    email: user.email,
    phone: user.phone
  });
  
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdateUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user.username,
      email: user.email,
      phone: user.phone
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
          Profile Settings
        </h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Manage your personal information
        </p>
      </div>

      <div style={{ maxWidth: '600px' }}>
        {/* Personal Information */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: 0 }}>
              Personal Information
            </h3>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile Photo */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', margin: '0 0 12px 0' }}>
                Profile Photo
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <img 
                    src={user.avatar}
                    alt={user.username}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #e5e7eb' }}
                  />
                  {isEditing && (
                    <button style={{
                      position: 'absolute',
                      bottom: '0px',
                      right: '0px',
                      width: '28px',
                      height: '28px',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Camera style={{ width: '14px', height: '14px' }} />
                    </button>
                  )}
                </div>
                {isEditing && (
                  <button style={{
                    padding: '10px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    color: '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Camera style={{ width: '16px', height: '16px' }} />
                    Change Photo
                  </button>
                )}
              </div>
            </div>
            
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', margin: '0 0 8px 0' }}>
                <User style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
                Full Name
              </label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: isEditing ? '1px solid #d1d5db' : '1px solid #f3f4f6', 
                  borderRadius: '8px', 
                  backgroundColor: isEditing ? '#ffffff' : '#f9fafb', 
                  fontSize: '16px', 
                  boxSizing: 'border-box', 
                  outline: 'none',
                  color: isEditing ? '#111827' : '#6b7280'
                }} 
              />
            </div>
            
            {/* Email Address */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', margin: '0 0 8px 0' }}>
                <Mail style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
                Email Address
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: isEditing ? '1px solid #d1d5db' : '1px solid #f3f4f6', 
                  borderRadius: '8px', 
                  backgroundColor: isEditing ? '#ffffff' : '#f9fafb', 
                  fontSize: '16px', 
                  boxSizing: 'border-box', 
                  outline: 'none',
                  color: isEditing ? '#111827' : '#6b7280'
                }} 
              />
            </div>
            
            {/* Phone Number */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', margin: '0 0 8px 0' }}>
                <Phone style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
                Phone Number
              </label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: isEditing ? '1px solid #d1d5db' : '1px solid #f3f4f6', 
                  borderRadius: '8px', 
                  backgroundColor: isEditing ? '#ffffff' : '#f9fafb', 
                  fontSize: '16px', 
                  boxSizing: 'border-box', 
                  outline: 'none',
                  color: isEditing ? '#111827' : '#6b7280'
                }} 
              />
            </div>

            {/* Member Since */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', margin: '0 0 8px 0' }}>
                <Calendar style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
                Member Since
              </label>
              <div style={{ 
                padding: '12px 16px', 
                backgroundColor: '#f9fafb', 
                border: '1px solid #f3f4f6', 
                borderRadius: '8px', 
                fontSize: '16px',
                color: '#6b7280'
              }}>
                {formatDate(user.memberSince)}
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                <button 
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Save Changes
                </button>
                <button 
                  onClick={handleCancel}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
