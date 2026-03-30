import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const products = [
    { id: 1, name: "Shoes", price: 2000 },
    { id: 2, name: "T-Shirt", price: 800 },
    { id: 3, name: "Jeans", price: 1500 },
  ];

  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Total items
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="container">
      <h1>Shopping Cart 🛒</h1>

      <div className="badge">Items: {totalItems}</div>

      <h2>Products</h2>
      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>

          <input
            type="number"
            value={item.qty}
            min="1"
            onChange={(e) => updateQty(item.id, e.target.value)}
          />

          <span>₹{item.price * item.qty}</span>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h2 className="total">Total: ₹{totalPrice}</h2>
    </div>
  );
}