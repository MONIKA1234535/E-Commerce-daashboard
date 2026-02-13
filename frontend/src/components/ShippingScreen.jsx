import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
  // Check if shipping details already exist in local storage to pre-fill the form
  const savedShipping = JSON.parse(localStorage.getItem('shippingAddress')) || {};

  const [address, setAddress] = useState(savedShipping.address || '');
  const [city, setCity] = useState(savedShipping.city || '');
  const [postalCode, setPostalCode] = useState(savedShipping.postalCode || '');
  const [country, setCountry] = useState(savedShipping.country || '');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const shippingAddress = {
      address,
      city,
      postalCode,
      country,
    };

    // Save shipping details to local storage
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));

    // After saving, navigate to the next step: Payment
    navigate('/payment');
  };

  return (
    <div style={containerStyle}>
      <h2>Shipping</h2>
      <form onSubmit={submitHandler} style={formStyle}>
        
        <div style={formGroupStyle}>
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label>City</label>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label>Postal Code</label>
          <input
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label>Country</label>
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

// Simple inline styles for demonstration
const containerStyle = { maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #444', backgroundColor: '#222' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const formGroupStyle = { display: 'flex', flexDirection: 'column' };
const inputStyle = { padding: '10px', border: '1px solid #555', backgroundColor: '#333', color: 'white' };
const buttonStyle = { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' };

export default ShippingScreen;