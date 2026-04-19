export default function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
      <img 
        src={product.image_url || 'https://via.placeholder.com/150'} 
        alt={product.name} 
        style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
      />
      <h3>{product.name}</h3>
      <p>{product.description || 'No description available'}</p>
      <p><strong>{product.price} RWF</strong></p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}
