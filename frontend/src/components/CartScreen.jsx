import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

const CartScreen = () => {
    // 1. Pull the new decreaseQty and addToCart (to increase) from Context
    const { cartItems, decreaseQty, addToCart, removeFromCart } = useContext(CartContext); 
    const navigate = useNavigate();

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div style={containerStyle}>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>{'< Continue Shopping'}</Link>
            <h2 style={{ marginTop: '20px' }}>Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div style={emptyCartStyle}>Your cart is empty.</div>
            ) : (
                <div style={cartLayout}>
                    <div style={{ flex: 2 }}>
                        {cartItems.map((item) => (
                            <div key={item._id} style={itemRowStyle}>
                                <div style={thumbnailStyle}>
                                    <img src={item.image} alt={item.name} style={imgStyle} />
                                </div>

                                <div style={{ flex: 2, paddingLeft: '15px' }}>
                                    <Link to={`/product/${item._id}`} style={productLinkStyle}>{item.name}</Link>
                                </div>

                                <div style={{ flex: 1 }}>${item.price.toFixed(2)}</div>

                                {/* QUANTITY CONTROL SECTION */}
                                <div style={qtyControlStyle}>
                                    <button style={qtyBtn} onClick={() => decreaseQty(item._id)}>-</button>
                                    <span style={{ margin: '0 10px' }}>{item.qty}</span>
                                    <button style={qtyBtn} onClick={() => addToCart(item, 1)}>+</button>
                                </div>

                                {/* DELETE ENTIRELY BUTTON */}
                                <button 
                                    style={removeButtonStyle} 
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={summaryStyle}>
                            <h3>Order Summary</h3>
                            <div style={summaryRow}><span>Total Items:</span><span>{totalItems}</span></div>
                            <div style={summaryRow}><strong>Subtotal:</strong><strong>${subtotal.toFixed(2)}</strong></div>
                            <button style={checkoutButtonStyle} onClick={() => navigate('/shipping')}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Styles ---
const containerStyle = { padding: '40px', maxWidth: '1200px', margin: '0 auto' };
const cartLayout = { display: 'flex', gap: '30px' };
const itemRowStyle = { display: 'flex', alignItems: 'center', borderBottom: '1px solid #333', padding: '15px 0' };
const thumbnailStyle = { width: '80px', height: '80px', backgroundColor: '#333' };
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const productLinkStyle = { textDecoration: 'none', color: '#fff', fontWeight: 'bold' };
const qtyControlStyle = { display: 'flex', alignItems: 'center', flex: 1 };
const qtyBtn = { padding: '5px 10px', cursor: 'pointer', backgroundColor: '#444', color: '#fff', border: '1px solid #666' };
const removeButtonStyle = { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' };
const summaryStyle = { border: '1px solid #444', padding: '25px', backgroundColor: '#1a1a1a', borderRadius: '8px' };
const summaryRow = { display: 'flex', justifyContent: 'space-between', margin: '15px 0' };
const checkoutButtonStyle = { width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

export default CartScreen;