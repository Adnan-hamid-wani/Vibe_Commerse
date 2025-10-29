import React, { useState } from 'react';
import API from '../api/api';

/**
 * CheckoutModal - collects name/email and posts to /cart/checkout
 */
export default function CheckoutModal({ onClose }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try {
      // send cart items and user info - backend will recalc total and clear cart
      const res = await API.post('/cart/checkout', { name, email });
      setReceipt(res.data.receipt);
      // broadcast cart update
      window.dispatchEvent(new CustomEvent('cart:update'));
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  }

  if (receipt) {
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Receipt</h3>
          <p>Name: {receipt.name}</p>
          <p>Email: {receipt.email}</p>
          <p>Total: ₹{receipt.total}</p>
          <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Checkout</h3>
        <form onSubmit={submit}>
          <label>
            Name
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <div>
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Confirm'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
