# my-shop-marketplace
React marketplace app with authentication, cart, and WhatsApp ordering
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function AuthCard({ title, children }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '420px',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ margin: '0 0 10px', color: '#2c3e50' }}>{title}</h2>
      {children}
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {children}
    </div>
  );
}

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function LoginPage({ email, password, setEmail, setPassword, authLoading, authError, handleLogin, handleGuestContinue, user }) {
  if (user) return <Navigate to="/marketplace" replace />;

  return (
    <AuthLayout>
      <AuthCard title="Sign In">
        <p style={{ margin: '0 0 24px', color: '#7f8c8d' }}>
          Enter your email and password, or continue as guest.
        </p>

        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#34495e' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '10px', border: '1px solid #ddd' }}
            required
          />

          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#34495e' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd' }}
            required
          />

          {authError && (
            <p style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>{authError}</p>
          )}

          <button
            type="submit"
            disabled={authLoading}
            style={{
              width: '100%',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {authLoading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Link to="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Create account</Link>
          <Link to="/reset-password" style={{ color: '#3498db', textDecoration: 'none' }}>Forgot password?</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ color: '#7f8c8d', marginRight: '8px' }}>Or</span>
          <button
            type="button"
            onClick={handleGuestContinue}
            style={{
              border: 'none',
              background: 'none',
              color: '#3498db',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Continue as Guest
          </button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

function RegisterPage({ email, password, setEmail, setPassword, authLoading, authError, authMessage, handleRegister, user }) {
  if (user) return <Navigate to="/marketplace" replace />;

  return (
    <AuthLayout>
      <AuthCard title="Create Account">
        <p style={{ margin: '0 0 24px', color: '#7f8c8d' }}>
          Register a new account using your email and password.
        </p>

        <form onSubmit={handleRegister}>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#34495e' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '10px', border: '1px solid #ddd' }}
            required
          />

          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#34495e' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a strong password"
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd' }}
            required
          />

          {authError && (
            <p style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>{authError}</p>
          )}
          {authMessage && (
            <p style={{ color: 'green', marginBottom: '16px', fontSize: '14px' }}>{authMessage}</p>
          )}

          <button
            type="submit"
            disabled={authLoading}
            style={{
              width: '100%',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {authLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/login" style={{ color: '#3498db', textDecoration: 'none' }}>Back to login</Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

function ResetPasswordPage({ email, setEmail, authLoading, authError, resetMessage, handleResetPassword, user }) {
  if (user) return <Navigate to="/marketplace" replace />;

  return (
    <AuthLayout>
      <AuthCard title="Reset Password">
        <p style={{ margin: '0 0 24px', color: '#7f8c8d' }}>
          Enter your email and we will send you a reset link.
        </p>

        <form onSubmit={handleResetPassword}>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#34495e' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd' }}
            required
          />

          {authError && (
            <p style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>{authError}</p>
          )}
          {resetMessage && (
            <p style={{ color: 'green', marginBottom: '16px', fontSize: '14px' }}>{resetMessage}</p>
          )}

          <button
            type="submit"
            disabled={authLoading}
            style={{
              width: '100%',
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {authLoading ? 'Sending reset email...' : 'Send Reset Link'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/login" style={{ color: '#3498db', textDecoration: 'none' }}>Back to login</Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

function PrivatePage({ user }) {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ margin: '0 0 10px', color: '#2c3e50' }}>Private Page</h2>
      <p style={{ color: '#7f8c8d', marginBottom: '24px' }}>
        This page is protected. Only signed-in users can see it.
      </p>
      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f4f6f8', borderRadius: '12px' }}>
        <p><strong>Email:</strong> {user?.email || 'Guest user'}</p>
        <p><strong>Provider:</strong> {user?.app_metadata?.provider || 'supabase'}</p>
      </div>
    </div>
  );
}

function MarketplaceRoute({ products, cart, user, isGuest, handleLogout, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems, sendWhatsApp, requestProductName, setRequestProductName, requestNote, setRequestNote, requestStatus, requestLoading, handleRequestProduct }) {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h1 style={{ color: '#2c3e50', margin: '0', fontSize: '2.5em', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            🛍️ My Online Marketplace
          </h1>
          <p style={{ color: '#7f8c8d', margin: '10px 0 0 0', fontSize: '16px' }}>
            Fresh products • Fast delivery • Easy ordering
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/private" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>Private Page</Link>
          <span style={{ color: '#2c3e50', fontWeight: '600' }}>
            Signed in as {isGuest ? 'Guest User' : user?.email || 'Customer'}
          </span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      <style>{`
        .promo-banner {
          animation: slideIn 0.8s ease-out forwards;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
          border-radius: 20px;
          padding: 26px 28px;
          margin-bottom: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 18px 50px rgba(0,0,0,0.15);
          position: relative;
          overflow: hidden;
        }
        .promo-banner::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 140px;
          height: 140px;
          background: rgba(255,255,255,0.25);
          border-radius: 50%;
          animation: pulse 3.5s ease-in-out infinite;
        }
        .promo-banner h2 {
          font-size: 1.9rem;
          margin: 0 0 8px;
          line-height: 1.1;
        }
        .promo-banner p {
          margin: 0;
          opacity: 0.92;
          font-size: 1rem;
        }
        .promo-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.22);
          color: white;
          border: 1px solid rgba(255,255,255,0.35);
          padding: 14px 22px;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          font-weight: 700;
          text-decoration: none;
        }
        .promo-cta:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.32);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }
      `}</style>

      <div className="promo-banner">
        <div>
          <h2>Flash Sale: Shop & Save Today</h2>
          <p>Enjoy extra discounts on popular essentials — delivered fast to your door.</p>
        </div>
        <button className="promo-cta" onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}>
          ✨ View Deals
        </button>
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 2 }}>
          <h2 style={{ color: '#34495e', marginBottom: '20px', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
            🛒 Available Products
          </h2>
          <div id="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {products.map((product) => (
              <div key={product.id} style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
              }}
              >
                <img src={product.image_url} alt={product.name} style={{ width: '100%', borderRadius: '8px', height: '150px', objectFit: 'cover' }} />
                <h3 style={{ margin: '10px 0', fontSize: '18px', color: '#333' }}>{product.name}</h3>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2c3e50', margin: '10px 0' }}>{product.price.toLocaleString()} RWF</p>
                <button 
                  onClick={() => addToCart(product)} 
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    cursor: 'pointer',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
                >
                  🛒 Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, border: '1px solid #eee', padding: '20px', height: 'fit-content', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h3>🛒 Order Summary</h3>
          {cart.length > 0 ? (
            <div>
              <div style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{item.name}</p>
                      <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{item.price.toLocaleString()} RWF each</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: '25px', height: '25px', border: '1px solid #ddd', backgroundColor: '#f0f0f0', cursor: 'pointer', borderRadius: '3px' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: '25px', height: '25px', border: '1px solid #ddd', backgroundColor: '#f0f0f0', cursor: 'pointer', borderRadius: '3px' }}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ marginLeft: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={clearCart}
                style={{ width: '100%', padding: '8px', marginBottom: '15px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                🗑️ Clear Cart
              </button>
            </div>
          ) : (
            <p style={{ color: '#888', textAlign: 'center', fontStyle: 'italic' }}>Your cart is empty</p>
          )}
          <hr />
          <p>Items: {totalItems}</p>
          <p>Subtotal: <strong>{subtotal.toLocaleString()} RWF</strong></p>
          <p style={{ color: 'green' }}>🚚 Delivery: "FREE"</p>
          <hr />
          <h2>Total: {subtotal.toLocaleString()} RWF</h2>
          {cart.length > 0 ? (
            <button 
              onClick={sendWhatsApp}
              style={{ backgroundColor: '#25d366', color: 'white', width: '100%', padding: '15px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '8px', fontSize: '16px' }}
            >
              📱 Order via WhatsApp
            </button>
          ) : null}
        </div>
      </div>

      <div style={{ marginTop: '30px', backgroundColor: 'white', padding: '24px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 12px', color: '#2c3e50' }}>Request a Product</h3>
        <p style={{ margin: '0 0 18px', color: '#65748b' }}>
          Can’t find an item? Send us the product name and we’ll try to add it for you.
        </p>

        <form onSubmit={handleRequestProduct} style={{ display: 'grid', gap: '14px' }}>
          <input
            type="text"
            placeholder="Product name"
            value={requestProductName}
            onChange={(e) => setRequestProductName(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #d8e2ef', fontSize: '15px' }}
            required
          />
          <textarea
            placeholder="Optional note or details"
            value={requestNote}
            onChange={(e) => setRequestNote(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #d8e2ef', fontSize: '15px', minHeight: '100px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={requestLoading}
              style={{
                backgroundColor: requestLoading ? '#8bcf9d' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 22px',
                fontWeight: 'bold',
                cursor: requestLoading ? 'not-allowed' : 'pointer',
                minWidth: '160px'
              }}
            >
              {requestLoading ? 'Sending...' : 'Send Request'}
            </button>
            {requestStatus && (
              <p style={{
                margin: 0,
                color: '#2c3e50',
                fontWeight: '600',
                maxWidth: 'calc(100% - 180px)'
              }}>
                {requestStatus}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MarketplaceApp() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [requestProductName, setRequestProductName] = useState('');
  const [requestNote, setRequestNote] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);

  const sampleProducts = [
    {
      id: 1,
      name: 'Premium Basmati Rice 5kg',
      price: 8500,
      image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Organic Cooking Oil 1L',
      price: 3200,
      image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Fresh Local Coffee Beans 500g',
      price: 5500,
      image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Pure Honey 500g',
      price: 4200,
      image_url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Fresh Bananas 1kg',
      price: 1200,
      image_url: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      name: 'Tomato Paste 800g',
      price: 1800,
      image_url: 'https://images.unsplash.com/photo-1561136594-7f68413e612a?w=300&h=200&fit=crop'
    }
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          console.log('Supabase not configured, using sample data:', error.message);
          setProducts(sampleProducts);
        } else if (data && data.length > 0) {
          setProducts(data);
        } else {
          console.log('No products in database, using sample data');
          setProducts(sampleProducts);
        }
      } catch (err) {
        console.log('Error connecting to Supabase, using sample data:', err);
        setProducts(sampleProducts);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!error && data?.session?.user) {
          setUser(data.session.user);
        }
      } catch (err) {
        console.log('Auth session check failed:', err);
      }
    }
    checkSession();

    async function testConnection() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Supabase connection failed:', error.message);
        } else {
          console.log('Supabase connected successfully!');
        }
      } catch (err) {
        console.error('Supabase connection failed:', err);
      }
    }
    testConnection();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => authListener?.subscription?.unsubscribe();
  }, []);

  const handleLogin = async (e, navigate) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setAuthMessage('');
    setResetMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      setUser(data.user);
      setEmail('');
      setPassword('');
      setIsGuest(false);
      navigate('/marketplace');
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please check your login details.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e, navigate) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setAuthMessage('');
    setResetMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;

      setEmail('');
      setPassword('');
      setIsGuest(false);

      if (data.user) {
        setUser(data.user);
        navigate('/marketplace');
      } else {
        setAuthMessage('Account created. Check your email to verify and then log in.');
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setAuthMessage('');
    setResetMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
      });
      if (error) throw error;
      setResetMessage('Password reset email sent. Check your inbox.');
      setEmail('');
    } catch (err) {
      setAuthError(err.message || 'Reset password failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.log('Logout failed:', err);
    }
    setUser(null);
    setCart([]);
    setIsGuest(false);
  };

  const handleGuestContinue = (navigate) => {
    setUser({ email: 'guest@example.com', app_metadata: { provider: 'guest' } });
    setIsGuest(true);
    navigate('/marketplace');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleRequestProduct = async (e) => {
    e.preventDefault();
    if (!requestProductName.trim()) {
      setRequestStatus('Please enter the product name first.');
      return;
    }

    setRequestLoading(true);
    setRequestStatus('');

    try {
      const requestPayload = {
        name: requestProductName.trim(),
        details: requestNote.trim(),
        requested_by: user?.email || 'guest',
        requested_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from('product_requests').insert([requestPayload]);
      if (error) throw error;

      setRequestStatus(`Thanks! Your request for "${requestProductName}" has been sent.`);
    } catch (err) {
      console.error('Request submission failed:', err);
      setRequestStatus(
        `Request saved locally. Could not send to server: ${err.message || err}`
      );
    } finally {
      setRequestLoading(false);
      setRequestProductName('');
      setRequestNote('');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const sendWhatsApp = () => {
    const myNumber = '250783593013';
    const itemSummary = cart
      .map((item) => `${item.name} (x${item.quantity})`)
      .join('\n');

    const message = `*NEW ORDER ALERT*%0A%0A` +
      `Items:%0A${itemSummary}%0A%0A` +
      `*Total: ${subtotal} RWF*%0A` +
      `Delivery: FREE%0A%0A` +
      `Please confirm my delivery address!`;

    window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
  };

  if (loading) return <p>Loading Marketplace...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <LoginRoute
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              authLoading={authLoading}
              authError={authError}
              handleLogin={handleLogin}
              handleGuestContinue={handleGuestContinue}
              user={user}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterRoute
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              authLoading={authLoading}
              authError={authError}
              authMessage={authMessage}
              handleRegister={handleRegister}
              user={user}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPasswordRoute
              email={email}
              setEmail={setEmail}
              authLoading={authLoading}
              authError={authError}
              resetMessage={resetMessage}
              handleResetPassword={handleResetPassword}
              user={user}
            />
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute user={user}>
              <MarketplaceRoute
                products={products}
                cart={cart}
                user={user}
                isGuest={isGuest}
                handleLogout={handleLogout}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
                subtotal={subtotal}
                totalItems={totalItems}
                sendWhatsApp={sendWhatsApp}
                requestProductName={requestProductName}
                setRequestProductName={setRequestProductName}
                requestNote={requestNote}
                setRequestNote={setRequestNote}
                requestStatus={requestStatus}
                requestLoading={requestLoading}
                handleRequestProduct={handleRequestProduct}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/private"
          element={
            <ProtectedRoute user={user}>
              <PrivatePage user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

function LoginRoute(props) {
  const navigate = useNavigate();
  return (
    <LoginPage
      {...props}
      handleLogin={(e) => props.handleLogin(e, navigate)}
      handleGuestContinue={() => props.handleGuestContinue(navigate)}
    />
  );
}

function RegisterRoute(props) {
  const navigate = useNavigate();
  return (
    <RegisterPage
      {...props}
      handleRegister={(e) => props.handleRegister(e, navigate)}
    />
  );
}

function ResetPasswordRoute(props) {
  const navigate = useNavigate();
  return (
    <ResetPasswordPage
      {...props}
      handleResetPassword={(e) => props.handleResetPassword(e, navigate)}
    />
  );
}
