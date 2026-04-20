import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const ADMIN_EMAIL = 'tuyisingitheos1@gmail.com';
const ADMIN_PHONE = '250783593013';

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

function MarketplaceRoute({ products, cart, user, isGuest, isAdmin, myRequests, handleLogout, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems, sendWhatsApp, requestProductName, setRequestProductName, requestNote, setRequestNote, requestStatus, requestLoading, handleRequestProduct }) {
  const respondedRequests = myRequests.filter((request) => request.admin_response);
  const notificationCount = respondedRequests.length;

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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/private" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>Private Page</Link>
          {isAdmin && (
            <Link to="/admin" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold', backgroundColor: '#d1fae5', padding: '10px 12px', borderRadius: '12px' }}>Admin Dashboard</Link>
          )}
          <span style={{ padding: '10px 14px', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '999px', fontWeight: '700' }}>
            {notificationCount > 0 ? `🔔 ${notificationCount} new response${notificationCount > 1 ? 's' : ''}` : '🔔 No new responses'}
          </span>
          <span style={{ padding: '10px 14px', backgroundColor: isAdmin ? '#ecfdf5' : '#eef2ff', color: isAdmin ? '#065f46' : '#1d4ed8', borderRadius: '999px', fontWeight: '700' }}>
            {user?.email ? (isAdmin ? 'Admin user' : 'Standard user') : 'Not signed in'}
          </span>
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
          
          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['All', 'Food', 'Clothing', 'Shoes'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === category ? '#3498db' : '#ecf0f1',
                  color: selectedCategory === category ? 'white' : '#34495e',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div id="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {products
              .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
              .map((product) => (
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#7f8c8d', backgroundColor: '#ecf0f1', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {product.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#34495e', backgroundColor: '#bdc3c7', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {product.code}
                  </span>
                </div>
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

        {notificationCount > 0 && (
          <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '16px', border: '1px solid #d1fae5' }}>
            <p style={{ margin: '0', color: '#065f46', fontWeight: '700' }}>You have {notificationCount} admin response{notificationCount > 1 ? 's' : ''}.</p>
            <p style={{ margin: '8px 0 0', color: '#14532d' }}>Check your request history below to view responses from the admin.</p>
          </div>
        )}

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

        {myRequests.length > 0 && (
          <div style={{ marginTop: '22px', padding: '18px', backgroundColor: '#f8fafc', borderRadius: '14px' }}>
            <h4 style={{ margin: '0 0 12px', color: '#1f2937' }}>Your request history</h4>
            {myRequests.slice(0, 3).map((request) => (
              <div key={request.requested_at} style={{ marginBottom: '14px', padding: '12px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 8px', fontWeight: '700' }}>{request.name}</p>
                <p style={{ margin: '0 0 6px' }}>{request.details || 'No extra details provided.'}</p>
                <p style={{ margin: '0 0 6px', color: '#475569', fontSize: '13px' }}>Status: {request.status || 'pending'}</p>
                {request.admin_response ? (
                  <p style={{ margin: 0, color: '#065f46', fontWeight: '600' }}>Response: {request.admin_response}</p>
                ) : (
                  <p style={{ margin: 0, color: '#475569', fontSize: '13px' }}>No response yet. We will update you here.</p>
                )}
              </div>
            ))}
          </div>
        )}
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
  const [myRequests, setMyRequests] = useState([]);
  const [adminRequests, setAdminRequests] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const sampleProducts = [
    // Food Products
    {
      id: 1,
      code: 'FOOD-001',
      name: 'Premium Basmati Rice 5kg',
      price: 8500,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      code: 'FOOD-002',
      name: 'Organic Cooking Oil 1L',
      price: 3200,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      code: 'FOOD-003',
      name: 'Fresh Local Coffee Beans 500g',
      price: 5500,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      code: 'FOOD-004',
      name: 'Pure Honey 500g',
      price: 4200,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      code: 'FOOD-005',
      name: 'Fresh Bananas 1kg',
      price: 1200,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      code: 'FOOD-006',
      name: 'Tomato Paste 800g',
      price: 1800,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1561136594-7f68413e612a?w=300&h=200&fit=crop'
    },
    {
      id: 7,
      code: 'FOOD-007',
      name: 'Fresh Milk 1L',
      price: 1500,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop'
    },
    {
      id: 8,
      code: 'FOOD-008',
      name: 'Whole Wheat Bread Loaf',
      price: 800,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop'
    },
    {
      id: 9,
      code: 'FOOD-009',
      name: 'Fresh Eggs 12-pack',
      price: 2200,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1582722872445-70da27ba0c1f?w=300&h=200&fit=crop'
    },
    {
      id: 10,
      code: 'FOOD-010',
      name: 'Organic Apples 1kg',
      price: 2800,
      category: 'Food',
      image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=200&fit=crop'
    },
    // Clothing Products
    {
      id: 11,
      code: 'CLOTH-001',
      name: 'Cotton T-Shirt (White)',
      price: 4500,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop'
    },
    {
      id: 12,
      code: 'CLOTH-002',
      name: 'Denim Jeans (Blue)',
      price: 12500,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=200&fit=crop'
    },
    {
      id: 13,
      code: 'CLOTH-003',
      name: 'Wool Sweater (Gray)',
      price: 18500,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=200&fit=crop'
    },
    {
      id: 14,
      code: 'CLOTH-004',
      name: 'Cotton Dress (Floral)',
      price: 9500,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop'
    },
    {
      id: 15,
      code: 'CLOTH-005',
      name: 'Leather Jacket (Black)',
      price: 28500,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop'
    },
    {
      id: 16,
      code: 'CLOTH-006',
      name: 'Running Shorts (Black)',
      price: 3200,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1506629905607-0b5b8b5a6e5e?w=300&h=200&fit=crop'
    },
    {
      id: 17,
      code: 'CLOTH-007',
      name: 'Winter Coat (Navy)',
      price: 32500,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=200&fit=crop'
    },
    {
      id: 18,
      code: 'CLOTH-008',
      name: 'Silk Scarf (Red)',
      price: 6800,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1601762603332-db5e4b90cca7?w=300&h=200&fit=crop'
    },
    // Shoes Products
    {
      id: 19,
      code: 'SHOES-001',
      name: 'Running Sneakers (White)',
      price: 18500,
      category: 'Shoes',
      image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop'
    },
    {
      id: 20,
      code: 'SHOES-002',
      name: 'Leather Boots (Brown)',
      price: 28500,
      category: 'Shoes',
      image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop'
    },
    {
      id: 21,
      code: 'SHOES-003',
      name: 'Casual Loafers (Black)',
      price: 15200,
      category: 'Shoes',
      image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop'
    },
    {
      id: 22,
      code: 'SHOES-004',
      name: 'High Heels (Red)',
      price: 22500,
      category: 'Shoes',
      image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=200&fit=crop'
    },
    {
      id: 23,
      code: 'SHOES-005',
      name: 'Sandals (Beige)',
      price: 8500,
      category: 'Shoes',
      image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop'
    },
    {
      id: 24,
      code: 'SHOES-006',
      name: 'Basketball Shoes (Blue)',
      price: 24500,
      category: 'Shoes',
      image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop'
    },
    {
      id: 25,
      code: 'SHOES-007',
      name: 'Winter Boots (Gray)',
      price: 32000,
      category: 'Shoes',
      image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=200&fit=crop'
    },
    {
      id: 26,
      code: 'SHOES-008',
      name: 'Flip Flops (Multi-color)',
      price: 2500,
      category: 'Shoes',
      image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop'
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

  useEffect(() => {
    if (user?.email) {
      fetchMyRequests(user.email);
    } else if (isGuest) {
      fetchMyRequests('guest@example.com');
    } else {
      setMyRequests([]);
    }
  }, [user, isGuest]);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminRequests();
    }
  }, [isAdmin]);

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

  const fetchMyRequests = async (userEmail) => {
    if (!userEmail) {
      setMyRequests([]);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('product_requests')
        .select('*')
        .eq('requested_by', userEmail)
        .order('requested_at', { ascending: false });
      if (error) {
        console.error('Failed to load requests:', error.message);
        return;
      }
      setMyRequests(data || []);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  const fetchAdminRequests = async () => {
    setAdminLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_requests')
        .select('*')
        .order('requested_at', { ascending: false });
      if (error) {
        console.error('Failed to load admin requests:', error.message);
        return;
      }
      setAdminRequests(data || []);
    } catch (err) {
      console.error('Failed to fetch admin requests:', err);
    } finally {
      setAdminLoading(false);
    }
  };

  const updateAdminRequest = async (requestId, responseText) => {
    if (!responseText.trim()) return;
    setAdminLoading(true);
    try {
      const { error } = await supabase
        .from('product_requests')
        .update({
          admin_response: responseText.trim(),
          status: 'responded',
          responded_at: new Date().toISOString()
        })
        .eq('id', requestId);
      if (error) throw error;

      await fetchAdminRequests();
      setAdminResponseDrafts((prev) => ({ ...prev, [requestId]: '' }));
    } catch (err) {
      console.error('Could not update request:', err);
    } finally {
      setAdminLoading(false);
    }
  };

  const sendAdminNotifications = ({ name, details, requested_by, requested_at }) => {
    const subject = encodeURIComponent(`New product request from ${requested_by}`);
    const body = encodeURIComponent(
      `Customer request:\n- Product: ${name}\n- Details: ${details || 'No details provided'}\n- Requested by: ${requested_by}\n- Requested at: ${requested_at}`
    );
    window.open(`mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`, '_blank');

    const whatsappText = encodeURIComponent(
      `New product request from ${requested_by}: ${name}. ${details ? 'Details: ' + details : ''}`
    );
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${whatsappText}`, '_blank');
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
        status: 'pending',
        admin_response: null,
        responded_at: null,
      };

      const { data, error } = await supabase.from('product_requests').insert([requestPayload]).select();
      if (error) throw error;

      setRequestStatus(`Thanks! Your request for "${requestProductName}" has been sent.`);
      setRequestProductName('');
      setRequestNote('');

      await fetchMyRequests(requestPayload.requested_by);
      sendAdminNotifications(requestPayload);
    } catch (err) {
      console.error('Request submission failed:', err);
      setRequestStatus(
        `Request failed to send. Please contact us by email or WhatsApp: ${err.message || err}`
      );
    } finally {
      setRequestLoading(false);
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
                isAdmin={isAdmin}
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
                myRequests={myRequests}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminPage
                adminRequests={adminRequests}
                adminResponseDrafts={adminResponseDrafts}
                setAdminResponseDrafts={setAdminResponseDrafts}
                updateAdminRequest={updateAdminRequest}
                adminLoading={adminLoading}
              />
            </AdminRoute>
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

function AdminPage({ adminRequests, adminResponseDrafts, setAdminResponseDrafts, updateAdminRequest, adminLoading }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc', padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1f2937' }}>Admin Request Center</h1>
            <p style={{ margin: '6px 0 0', color: '#475569' }}>View customer product requests and send responses directly.</p>
          </div>
          <Link to="/marketplace" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Back to marketplace</Link>
        </div>

        {adminRequests.length === 0 ? (
          <div style={{ padding: '30px', borderRadius: '20px', backgroundColor: 'white', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: 0, color: '#475569' }}>No product requests have been submitted yet.</p>
          </div>
        ) : (
          adminRequests.map((request) => (
            <div key={request.id} style={{ marginBottom: '18px', padding: '22px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#111827' }}>{request.name}</p>
                  <p style={{ margin: 0, color: '#4b5563' }}>{request.details || 'No details provided.'}</p>
                  <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: '13px' }}>Requested by: {request.requested_by || 'Guest'}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontWeight: '700', color: request.status === 'responded' ? '#065f46' : '#b45309' }}>Status: {request.status || 'pending'}</p>
                  <p style={{ margin: '6px 0 0', color: '#6b7280', fontSize: '13px' }}>{new Date(request.requested_at).toLocaleString()}</p>
                </div>
              </div>

              {request.admin_response && (
                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '14px', color: '#065f46' }}>
                  <p style={{ margin: 0, fontWeight: '600' }}>Last response:</p>
                  <p style={{ margin: '8px 0 0' }}>{request.admin_response}</p>
                </div>
              )}

              <textarea
                placeholder="Write a response for the customer"
                value={adminResponseDrafts[request.id] || ''}
                onChange={(e) => setAdminResponseDrafts((prev) => ({ ...prev, [request.id]: e.target.value }))}
                style={{ width: '100%', marginTop: '18px', padding: '14px', borderRadius: '14px', border: '1px solid #d1d5db', minHeight: '100px', fontSize: '15px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '14px' }}>
                <button
                  type="button"
                  disabled={adminLoading || !adminResponseDrafts[request.id]?.trim()}
                  onClick={() => updateAdminRequest(request.id, adminResponseDrafts[request.id] || '')}
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    cursor: adminLoading || !adminResponseDrafts[request.id]?.trim() ? 'not-allowed' : 'pointer',
                    fontWeight: '700'
                  }}
                >
                  {adminLoading ? 'Saving...' : 'Save Response'}
                </button>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Once saved, the customer will see the response in their account.</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AdminRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return <Navigate to="/marketplace" replace />;
  return children;
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
