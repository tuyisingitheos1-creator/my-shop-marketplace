import React, { useState } from 'react';
import { ShoppingBag, Truck } from 'lucide-react';
import ProductCard from './ProductCard';

function App() {
  const [cart, setCart] = useState([]);
  const FREE_DELIVERY_LIMIT = 10000; // Example: 10,000 RWF

  const products = [
    { id: 1, name: "Basmati Rice 5kg", price: 8000, description: "Premium quality basmati rice, perfect for everyday cooking.", image_url: "https://via.placeholder.com/150?text=Rice" },
    { id: 2, name: "Cooking Oil 1L", price: 2500, description: "Healthy cooking oil made from natural ingredients.", image_url: "https://via.placeholder.com/150?text=Oil" },
    { id: 3, name: "Local Coffee Bean", price: 5000, description: "Freshly roasted local coffee beans for the perfect brew.", image_url: "https://via.placeholder.com/150?text=Coffee" },
  ];

  const addToCart = (p) => setCart([...cart, p]);
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = (subtotal >= FREE_DELIVERY_LIMIT || subtotal === 0) ? 0 : 1500;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1>My Online Shop</h1>
      
      {/* Products */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
      </div>

      {/* Cart Summary */}
      <div style={{ marginTop: '30px', padding: '15px', background: '#f0f0f0', borderRadius: '10px' }}>
        <h3><ShoppingBag size={18} /> Order Summary</h3>
        <p>Items: {cart.length}</p>
        <p>Subtotal: <strong>{subtotal} RWF</strong></p>
        
        <p style={{ color: deliveryFee === 0 && subtotal > 0 ? 'green' : 'black' }}>
          <Truck size={18} /> Delivery: {deliveryFee === 0 ? <strong>"FREE"</strong> : `${deliveryFee} RWF`}
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