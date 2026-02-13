import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

const ProductScreen = () => {
    const { id } = useParams(); 
    const { addToCart, cartCount } = useContext(CartContext); 
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch product data from your backend
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Product not found or API error.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            alert(`${product.name} added to cart! Total items: ${cartCount + 1}`); 
        }
    };

    if (loading) return <h2 style={{ color: 'white', padding: '20px' }}>Loading...</h2>;
    if (error) return <h2 style={{ color: 'red', padding: '20px' }}>Error: {error}</h2>;
    if (!product) return <h2 style={{ color: 'white', padding: '20px' }}>Product not found</h2>;

    return (
        <div style={pageWrapperStyle}>
            <Link to="/" style={backLinkStyle}>{'< Go Back'}</Link>
            
            <div style={detailContainerStyle}>
                {/* --- IMAGE SECTION --- */}
                <div style={imageBoxStyle}>
                    {/* IMPORTANT: Only use the <img> tag here. 
                      Do not put text like "[Image of...]" inside this div.
                    */}
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        style={imageStyle}
                    />
                </div>

                {/* --- INFO SECTION --- */}
                <div style={infoStyle}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{product.name}</h2>
                    <hr style={{ borderColor: '#444' }} />
                    <p style={{ margin: '20px 0' }}><strong>Description:</strong> {product.description}</p>
                    <p style={{ fontSize: '1.5rem' }}>Price: <strong>${product.price.toFixed(2)}</strong></p>
                    <p>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    
                    {product.countInStock > 0 && (
                        <button style={buttonStyle} onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    )} 
                </div>
            </div>
        </div>
    );
};

// --- Styles for a clean Dark Theme ---

const pageWrapperStyle = {
    padding: '20px',
    color: 'white',
    minHeight: '100vh'
};

const backLinkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: '20px'
};

const detailContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    marginTop: '20px'
};

const imageBoxStyle = { 
    flex: '1',
    minWidth: '300px',
    maxWidth: '500px',
    height: '500px', 
    backgroundColor: '#333', // Dark background for the image container
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #444'
};

const imageStyle = { 
    width: '100%', 
    height: '100%', 
    objectFit: 'contain' // Ensures the image isn't stretched
};

const infoStyle = { 
    flex: '1',
    minWidth: '300px'
};

const buttonStyle = { 
    padding: '15px 30px', 
    backgroundColor: '#28a745', 
    color: 'white', 
    border: 'none', 
    borderRadius: '4px',
    cursor: 'pointer', 
    marginTop: '20px',
    fontSize: '1rem',
    fontWeight: 'bold'
};

export default ProductScreen;