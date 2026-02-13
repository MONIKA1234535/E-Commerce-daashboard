import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext.jsx';

const PlaceOrderScreen = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    // 1. Get data from Local Storage
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
    const paymentMethod = localStorage.getItem('paymentMethod') || 'PayPal';
    
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [loading, setLoading] = useState(false);

    // 2. Calculate Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 1000 ? 0 : 50; // Example: Free shipping over $1000
    const totalPrice = itemsPrice + shippingPrice;

    // Check if shipping or cart data is missing
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [shippingAddress, cartItems, navigate]);

    // 3. Place Order Handler (API Call)
    const placeOrderHandler = async () => {
        setLoading(true);
        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    price: item.price,
                    product: item._id, // Send the product ID
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice: itemsPrice.toFixed(2),
                shippingPrice: shippingPrice.toFixed(2),
                totalPrice: totalPrice.toFixed(2),
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/orders', 
                orderData
            );

            setOrderSuccess(true);
            setLoading(false);
            
            // 4. Clear Cart and Local Storage on Success
            setCartItems([]);
            localStorage.removeItem('cartItems');
            localStorage.removeItem('shippingAddress');
            localStorage.removeItem('paymentMethod');

            // Navigate to an order success page (or the home page)
            navigate(`/`); 

        } catch (error) {
            setOrderError('Order failed to save. See console for details.');
            console.error(error.response || error);
            setLoading(false);
        }
    };

    if (loading) return <h2>Placing Order...</h2>;
    if (orderError) return <h2 style={{ color: 'red' }}>Error: {orderError}</h2>;
    if (cartItems.length === 0 && !orderSuccess) return <h2>Cart is Empty or Order already placed.</h2>;

    return (
        <div style={containerStyle}>
            <h2>Finalize Order</h2>
            
            {/* Order Details */}
            <div style={orderSummaryStyle}>
                
                {/* Shipping */}
                <div style={sectionStyle}>
                    <h3>Shipping</h3>
                    <p>Address: {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
                </div>

                {/* Payment */}
                <div style={sectionStyle}>
                    <h3>Payment Method</h3>
                    <p>Method: <strong>{paymentMethod}</strong></p>
                </div>

                {/* Items */}
                <div style={sectionStyle}>
                    <h3>Order Items</h3>
                    {cartItems.map((item) => (
                        <p key={item._id}>{item.name} x {item.qty} (@ ${item.price.toFixed(2)})</p>
                    ))}
                </div>
            </div>

            {/* Price Summary and Button */}
            <div style={priceSummaryStyle}>
                <h3>Order Totals</h3>
                <p>Items: ${itemsPrice.toFixed(2)}</p>
                <p>Shipping: ${shippingPrice.toFixed(2)}</p>
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
                
                <button 
                    onClick={placeOrderHandler} 
                    style={buttonStyle} 
                    disabled={cartItems.length === 0}
                >
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

// Simple inline styles
const containerStyle = { display: 'flex', gap: '40px', maxWidth: '1000px', margin: '0 auto', padding: '20px' };
const orderSummaryStyle = { flex: 2, border: '1px solid #444', padding: '20px', backgroundColor: '#222' };
const priceSummaryStyle = { flex: 1, border: '1px solid #444', padding: '20px', backgroundColor: '#333' };
const sectionStyle = { borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '15px' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', marginTop: '15px' };

export default PlaceOrderScreen;