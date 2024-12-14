import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Additem from './components/Additem';
import Listitem from './components/Listitem';
import Orders from './components/Orders';
import Navbar from './components/Navbar';
import Adminpanel from './components/Adminpanel';
import Login from './components/Login';
import Analytics from './components/Analytics'; // Import Analytics
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]); // Items state to track the items
  const [orders, setOrders] = useState([]); // Orders state to track orders
  const [token, setToken] = useState(null);
  const [categoryProductCount, setCategoryProductCount] = useState({
    Men: 0,
    Women: 0,
    Kids: 0,
  });
  
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
      console.log(res.data);
        if (res.data.success) {
          setOrders(res.data.orders); // Set the orders state
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
    setOrders([]); 
    localStorage.removeItem('token'); // Remove token from local storage
  };

  // Update the product count based on category (Men, Women, Kids)
  const updateProductCount = (products) => {
    const count = { Men: 0, Women: 0, Kids: 0 };
    products.forEach((item) => {
      if (item.category === 'Men') {
        count.Men++;
      } else if (item.category === 'Women') {
        count.Women++;
      } else if (item.category === 'Kids') {
        count.Kids++;
      }
    });
    setCategoryProductCount(count); // Update the state with the new counts
  };

  // Fetch items from API and update the product count
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/listproduct');
        setItems(response.data.products);
        updateProductCount(response.data.products); // Update product count after fetching items
      } catch (error) {
        toast.error('Error fetching items');
      }
    };

    fetchItems();
  }, []); // Run this effect only once on component mount

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar logout={logout} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={token ? <Adminpanel /> : <Navigate to="/login" />} />
          <Route path="/additem" element={token ? <Additem items={items} setItems={setItems} /> : <Navigate to="/login" />} />
          <Route path="/listitems" element={token ? <Listitem items={items} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={token ? <Orders orders={orders} /> : <Navigate to="/login" />} />
          <Route
            path="/analytics"
            element={token ? (
              <Analytics 
                orders={orders} 
                menItems={categoryProductCount.Men} 
                womenItems={categoryProductCount.Women} 
                kidsItems={categoryProductCount.Kids} 
              />
            ) : <Navigate to="/login" />}
          />
          <Route path="/login" element={!token ? <Login setToken={login} /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
