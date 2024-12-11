import React from 'react'
import {  Link } from 'react-router-dom';
const Adminpanel = () => {
    return (
        <div className="mt-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Panel</h1>
          <p className="text-xl mb-8">Manage your items and orders from here.</p>
          <div className="space-x-6">
        
            <Link
              to="/additem"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add New Item
            </Link>
            <Link
              to="/listitems"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Items
            </Link>
            <Link
              to="/orders"
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              View Orders
            </Link>
          </div>
        </div>
      );
    }
export default Adminpanel;