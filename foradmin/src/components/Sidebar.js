import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-800 text-white fixed top-0 left-0 flex flex-col items-center py-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      
      {/* Home Button */}
      <Link
        to="/"
        className="w-full px-4 py-2 text-center bg-gray-600 rounded-lg hover:bg-gray-700 transition"
      >
        Home
      </Link>
      
      {/* Add New Item */}
      <Link
        to="/additem"
        className="w-full px-4 py-2 text-center bg-green-600 rounded-lg hover:bg-green-700 transition"
      >
        Add New Item
      </Link>
      
      {/* View Items */}
      <Link
        to="/listitems"
        className="w-full px-4 py-2 text-center bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        View Items
      </Link>
      
      {/* View Orders */}
      <Link
        to="/orders"
        className="w-full px-4 py-2 text-center bg-orange-600 rounded-lg hover:bg-orange-700 transition"
      >
        View Orders
      </Link>

      {/* Analytics Button */}
      <Link
        to="/analytics"
        className="w-full px-4 py-2 text-center bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        Analytics
      </Link>
    </div>
  );
};

export default Sidebar;
