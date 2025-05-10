import React from 'react';
import { useSelector } from 'react-redux';

const CartSummary = () => {
  const { cartItems, cartCount, loading, error, success } = useSelector(
    (state) => state.auth 
  );
  console.log(cartItems,"addtocart");

  return (
    <div>
      <h2>🛒 Cart Summary</h2>
      <p>Total items: {cartCount}</p>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.title} - ₹{item.price}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Item added successfully!</p>}
    </div>
  );
};

export default CartSummary;
