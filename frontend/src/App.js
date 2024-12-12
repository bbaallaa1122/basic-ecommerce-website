import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import WishList from './pages/WishList';
import PlaceOrder from './pages/PlaceOrder';
import Men from './pages/Men';
import Women from './pages/Women';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import Kids from './pages/Kids';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Product from './pages/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/placeorder" element={<PlaceOrder />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productid" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
