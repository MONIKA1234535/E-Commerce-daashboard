import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Change the URL if your back-end is hosted elsewhere
        const { data } = await axios.get('https://e-commerce-daashboard.onrender.com');
        //http://localhost:5000/api/products
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products from the API.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>Error: {error}</h2>;
  
 return (
    <div>
      <h2>Latest Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          // This is the correct, single map loop structure
          <div key={product._id} style={productCardStyle}>
            <img src={product.image} alt={product.name} style={imageStyle} />
    
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                <h3>{product.name}</h3>
            </Link>
            <p><strong>${product.price.toFixed(2)}</strong></p>
            <p>{product.description}</p>
            <p style={{ fontSize: '0.8em' }}>Stock: {product.countInStock}</p>
          </div>
        ))}
        
      </div>
    </div>
  );
};

const imageStyle = { width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover', marginBottom: '10px' };

const productCardStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '5px',
  width: '300px',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
};

export default ProductList;