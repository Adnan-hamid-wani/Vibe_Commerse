import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function App(){
  return (
    <div className="app">
      <header>
        <h1>Vibe Commerce - Mock Cart</h1>
      </header>
      <main>
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}
