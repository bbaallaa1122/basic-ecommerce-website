import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaClipboardList, FaBoxOpen, FaChartLine } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-800 text-white fixed top-0 left-0 flex flex-col items-center py-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      
      
      <Link
        to="/"
        className="w-full flex items-center px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
      >
        <FaHome className="mr-3" /> 
        <span>Home</span>
      </Link>
      
      
      <Link
        to="/additem"
        className="w-full flex items-center px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
      >
        <FaPlus className="mr-3" /> 
        <span>Add New Item</span>
      </Link>
      
     
      <Link
        to="/listitems"
        className="w-full flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        <FaClipboardList className="mr-3" /> 
        <span>View Items</span>
      </Link>
      
      
      <Link
        to="/orders"
        className="w-full flex items-center px-4 py-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition"
      >
        <FaBoxOpen className="mr-3" /> 
        <span>View Orders</span>
      </Link>

      
      <Link
        to="/analytics"
        className="w-full flex items-center px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        <FaChartLine className="mr-3" /> 
        <span>Analytics</span>
      </Link>
    </div>
  );
};

export default Sidebar;
