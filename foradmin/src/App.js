import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Additem from './components/Additem';
import Listitem from './components/Listitem';
import Orders from './components/Orders';
import Navbar from './components/Navbar';
import Adminpanel from './components/Adminpanel';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);

  // Retrieve token from local storage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch orders only if a token is available
  useEffect(() => {
    async function getOrders() {
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/orders/adminorder', {
          headers: {
            token,
          },
        });

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    }

    getOrders();
  }, [token]);

  // Login function to set the token
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Save token to local storage
  };

  // Logout function to clear the token
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove token from local storage
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar logout={logout} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          {/* Default route redirects to Adminpanel if authenticated */}
          <Route
            path="/"
            element={token ? <Adminpanel /> : <Navigate to="/login" />}
          />

          {/* Add Item route */}
          <Route
            path="/additem"
            element={token ? (
              <Additem items={items} setItems={setItems} />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* List Items route */}
          <Route
            path="/listitems"
            element={token ? (
              <Listitem items={items} />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Orders route */}
          <Route
            path="/orders"
            element={token ? (
              <Orders orders={orders} />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Login route */}
          <Route
            path="/login"
            element={!token ? <Login setToken={login} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
