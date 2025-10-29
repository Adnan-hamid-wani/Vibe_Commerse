import React, { useEffect, useState } from 'react';
import API from '../api/api';

/**
 * ProductList - fetches products from backend and shows Add to Cart button
 */
export default function ProductList(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProducts(){
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  async function addToCart(productId){
    try {
      await API.post('/cart', { productId, qty: 1 });
      // emit a simple event so Cart can refresh - naive approach: dispatch browser event
      window.dispatchEvent(new CustomEvent('cart:update'));
    } catch (err) {
      console.error('Add to cart failed', err);
      alert('Failed to add to cart');
    }
  }

  if (loading) return <p>Loading products...</p>;
  return (
    <section className="product-list">
      {products.map(p => (
        <div key={p._id} className="card">
          <div className="card-body">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <strong>₹{p.price}</strong>
            <div>
              <button onClick={() => addToCart(p._id)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
