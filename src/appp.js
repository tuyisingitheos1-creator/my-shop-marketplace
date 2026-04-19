import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AddProduct from './AddProduct';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*');
    if (data) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Marketplace</h1>
      
      {/* The Form to add items */}
      <AddProduct onProductAdded={fetchProducts} />

      {/* The List of items */}
      <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <h4>{p.name}</h4>
            <p>{p.price.toLocaleString()} RWF</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
const OrderSummary = ({ cartItems, total }) => {
  
  const handleWhatsAppOrder = () => {
    // 1. Set your phone number (with country code, no + or spaces)
    const phoneNumber = "250783593013"; // Replace with your Rwanda number

    // 2. Format the list of items for the message
    const itemDetails = cartItems
      .map((item) => `- ${item.name} (${item.quantity}x)`)
      .join("\n");

    // 3. Create the message template
    const message = `Hello! I would like to place an order:
    
Items:
${itemDetails}

Total: ${total} RWF
Delivery: FREE

Please confirm my order!`;

    // 4. Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);

    // 5. Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', width: '300px' }}>
      <h3>Order Summary</h3>
      <p>Items: {cartItems.length}</p>
      <p>Subtotal: {total} RWF</p>
      <p style={{ color: 'green' }}>Delivery: "FREE"</p>
      <hr />
      <h2>Total: {total} RWF</h2>
      
      <button 
        onClick={handleWhatsAppOrder}
        style={{
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        Order via WhatsApp
      </button>
    </div>
  );
};