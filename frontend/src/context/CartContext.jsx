import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context
export const CartContext = createContext();

// 2. Create the Provider Component
export const CartProvider = ({ children }) => {
    // Initialize cart state from localStorage or an empty array
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || []
    );

    // Save cart items to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Function to add an item to the cart
    const addToCart = (product) => {
        const existItem = cartItems.find((x) => x._id === product._id);

        if (existItem) {
            // If item exists, increase quantity
            setCartItems(
                cartItems.map((x) =>
                    x._id === product._id ? { ...existItem, qty: existItem.qty + 1 } : x
                )
            );
        } else {
            // If item is new, add it with quantity 1
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };

    const removeFromCart = (id) => {
    // We keep all items EXCEPT the one with the matching ID
    setCartItems(cartItems.filter((item) => item._id !== id));
    };
    
    // Function to calculate total cart quantity (for the header count)
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
       <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
    );
};