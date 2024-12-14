import React from 'react';
import Layout from './Layout.js';
import { FaClipboardList, FaBoxOpen, FaChartLine, FaCogs } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // For navigation

const Adminpanel = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Navigate to Manage Products Page
  const handleManageProducts = () => {
    navigate('/listitems');
  };

  // Navigate to View Orders Page
  const handleViewOrders = () => {
    navigate('/orders');
  };

  // Navigate to Analytics Page
  const handleAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <Layout>
      <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to the Admin Panel</h1>
        <p className="text-xl text-center mb-8">Manage your items and orders from here.</p>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center">
            <FaClipboardList size={30} />
            <h2 className="mt-4 text-2xl font-semibold">Manage Products</h2>
            <p className="mt-2">View, add, and edit your products</p>
            <button
              onClick={handleManageProducts}
              className="mt-4 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-white"
            >
              Manage
            </button>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center">
            <FaBoxOpen size={30} />
            <h2 className="mt-4 text-2xl font-semibold">View Orders</h2>
            <p className="mt-2">Track customer orders and manage status</p>
            <button
              onClick={handleViewOrders}
              className="mt-4 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md text-white"
            >
              View Orders
            </button>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg text-center">
            <FaChartLine size={30} />
            <h2 className="mt-4 text-2xl font-semibold">Analytics</h2>
            <p className="mt-2">View product statistics and insights</p>
            <button
              onClick={handleAnalytics}
              className="mt-4 bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-md text-white"
            >
              Go to Analytics
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Adminpanel;
