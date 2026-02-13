import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  // Check local storage for a previously selected payment method
  const savedPaymentMethod = localStorage.getItem('paymentMethod') || 'PayPal';

  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    // Save selected payment method to local storage
    localStorage.setItem('paymentMethod', paymentMethod);

    // Navigate to the final step: Place Order
    navigate('/placeorder');
  };

  return (
    <div style={containerStyle}>
      <h2>Payment Method</h2>
      <form onSubmit={submitHandler} style={formStyle}>
        
        <div style={formGroupStyle}>
          <label style={{ marginBottom: '15px' }}>Select Method</label>
          
          {/* PayPal Option */}
          <div style={radioGroupStyle}>
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="PayPal">PayPal or Credit Card</label>
          </div>

          {/* Stripe Option (Example of another option) */}
          <div style={radioGroupStyle}>
            <input
              type="radio"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="Stripe">Stripe</label>
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          Continue to Place Order
        </button>
      </form>
    </div>
  );
};

// Simple inline styles for demonstration
const containerStyle = { maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #444', backgroundColor: '#222' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const formGroupStyle = { display: 'flex', flexDirection: 'column' };
const radioGroupStyle = { marginBottom: '10px' };
const buttonStyle = { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' };

export default PaymentScreen;