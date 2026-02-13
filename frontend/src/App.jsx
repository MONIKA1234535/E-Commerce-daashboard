import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import ProductList from './components/ProductList.jsx';
import ProductScreen from './components/ProductScreen.jsx';
import CartScreen from './components/CartScreen.jsx';
import { CartContext } from './context/CartContext.jsx'; 
import ShippingScreen from './components/ShippingScreen.jsx'; 
import PaymentScreen from './components/PaymentScreen.jsx';
import PlaceOrderScreen from './components/PlaceOrderScreen.jsx';

const Header = () => {
    // Use context to get the current cart count
    const { cartCount } = useContext(CartContext); 

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
            <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>MERN E-Shop</Link></h1>
            <nav>
                <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
                    🛒 Cart ({cartCount})
                </Link>
            </nav>
        </header>
    );
};

const App = () => {
  return (
    <Router>
      <div className="App">
       <Header /> 
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} /> 
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} /><Route path="/placeorder" element={<PlaceOrderScreen />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;