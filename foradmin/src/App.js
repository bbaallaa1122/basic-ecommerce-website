import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Additem from './components/Additem';
import Listitem from './components/Listitem';
import Orders from './components/Orders';
import Navbar from './components/Navbar';
import Adminpanel from './components/Adminpanel';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

function App() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);


  const login = (token) => {
    setToken(token);
  };

 
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar logout={logout} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={token ? <Adminpanel /> : <Navigate to="/login" />}
          />
          <Route
            path="/additem"
            element={token ? (
              <Additem items={items} setItems={setItems} />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/listitems"
            element={token ? (
              <Listitem items={items} />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/orders"
            element={token ? (
              <Orders orders={orders} />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/login"
            element={!token ? <Login setToken={login} /> : <Navigate to="/" />}
          />
        </Routes>
        
      </div>
      <ToastContainer
        
      />
    </div>
  );
}

export default App;
