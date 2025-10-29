import React, { useEffect, useState } from 'react';
import API from '../api/api';
import CheckoutModal from './CheckoutModal';

/**
 * Cart component - lists cart items and allows removal and checkout
 */
export default function Cart(){
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  useEffect(() => {
    loadCart();
    const handler = () => loadCart();
    window.addEventListener('cart:update', handler);
    return () => window.removeEventListener('cart:update', handler);
  }, []);

  async function loadCart(){
    setLoading(true);
    try {
      const res = await API.get('/cart');
      setCart(res.data);
    } catch (err) {
      console.error('Failed to load cart', err);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id){
    try {
      await API.delete(`/cart/${id}`);
      loadCart();
    } catch (err) {
      console.error(err);
      alert('Failed to remove');
    }
  }

  return (
    <aside className="cart">
      <h2>Cart</h2>
      {loading ? <p>Loading...</p> : (
        <>
          {cart.items.length === 0 ? <p>Cart is empty</p> : (
            <ul>
              {cart.items.map(it => (
                <li key={it._id}>
                  <div>
                    <strong>{it.product.name}</strong> x {it.qty}
                  </div>
                  <div>₹{it.product.price * it.qty}</div>
                  <button onClick={() => removeItem(it._id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          <div className="total">Total: ₹{cart.total}</div>
          <div>
            <button disabled={cart.items.length===0} onClick={() => setShowCheckout(true)}>Checkout</button>
          </div>
        </>
      )}
      {showCheckout && <CheckoutModal onClose={() => { setShowCheckout(false); loadCart(); }} />}
    </aside>
  );
}
