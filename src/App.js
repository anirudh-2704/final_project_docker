import React, { useState } from "react";
import './styles.css';

const products = [
  { id: 1, name: "Apple", price: 1.5 },
  { id: 2, name: "Banana", price: 1.0 },
  { id: 3, name: "Orange", price: 2.0 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="app">
      <h1>Shopping Cart</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price} x {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className="total">
            <h3>Total: ${getTotalPrice()}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
