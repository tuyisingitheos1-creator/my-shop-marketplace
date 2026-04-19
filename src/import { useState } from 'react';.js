import { useState } from 'react';
import { supabase } from './supabaseClient'; // Ensure this path is correct now!

export default function AddProduct({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('products')
      .insert([{ name, price: parseFloat(price), description }])
      .select();

    if (error) {
      alert(error.message);
    } else {
      alert('Product added successfully!');
      setName('');
      setPrice('');
      setDescription('');
      onProductAdded(); // This will refresh the list on the main page
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Add New Product</h3>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Price (RWF)" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Upload Product</button>
    </form>
  );
}