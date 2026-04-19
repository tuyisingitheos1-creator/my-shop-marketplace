import React, { useState } from 'react';
import { ShoppingBag, Truck } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const FREE_DELIVERY_LIMIT = 10000; // Example: 10,000 RWF

  const products = [
    { id: 1, name: "Basmati Rice 5kg", price: 8000 },
    { id: 2, name: "Cooking Oil 1L", price: 2500 },
    { id: 3, name: "Local Coffee Bean", price: 5000 },
  ];

  const addToCart = (p) => setCart([...cart, p]);
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = (subtotal >= FREE_DELIVERY_LIMIT || subtotal === 0) ? 0 : 1500;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1>My Online Shop</h1>
      
      {/* Products */}
      {products.map(p => (
        <div key={p.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          <strong>{p.name}</strong> - {p.price} RWF 
          <button onClick={() => addToCart(p)} style={{ float: 'right' }}>Add</button>
        </div>
      ))}

      {/* Cart Summary */}
      <div style={{ marginTop: '30px', padding: '15px', background: '#f0f0f0', borderRadius: '10px' }}>
        <h3><ShoppingBag size={18} /> Order Summary</h3>
        <p>Items: {cart.length}</p>
        <p>Subtotal: **{subtotal} RWF**</p>
        
        <p style={{ color: deliveryFee === 0 && subtotal > 0 ? 'green' : 'black' }}>
          <Truck size={18} /> Delivery: {deliveryFee === 0 ? **"FREE"** : `${deliveryFee} RWF`}
        </p>

        {subtotal > 0 && subtotal < FREE_DELIVERY_LIMIT && (
          <small style={{ color: 'orange' }}>Add {FREE_DELIVERY_LIMIT - subtotal} RWF more for FREE delivery!</small>
        )}

        <hr />
        <h2>Total: {subtotal + deliveryFee} RWF</h2>
        {subtotal > 0 && <button style={{ width: '100%', padding: '10px', background: 'black', color: 'white' }}>Order via WhatsApp</button>}
      </div>
    </div>
  );
}

export default App;
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;