import React from 'react';
import Layout from './Layout.js';
import { FaClipboardList, FaBoxOpen, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // For navigation

const Adminpanel = () => {
  const navigate = useNavigate(); 

 
  const handleManageProducts = () => {
    navigate('/listitems');
  };

  
  const handleViewOrders = () => {
    navigate('/orders');
  };

  
  const handleAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <Layout>
      <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to the Admin Panel</h1>
        <p className="text-xl text-center mb-8">Manage your items and orders from here.</p>

       
        <div className="flex justify-center items-center gap-6 mb-12">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
            <FaClipboardList size={30} />
            <h2 className="mt-4 text-2xl font-semibold">Manage Products</h2>
            <p className="mt-2">View, add, and edit your products</p>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handleManageProducts}
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-white"
              >
                Manage
              </button>
            </div>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
            <FaBoxOpen size={30} />
            <h2 className="mt-4 text-2xl font-semibold">View Orders</h2>
            <p className="mt-2">Track customer orders and manage status</p>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handleViewOrders}
                className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md text-white"
              >
                View Orders
              </button>
            </div>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
            <FaChartLine size={30} />
            <h2 className="mt-4 text-2xl font-semibold">Analytics</h2>
            <p className="mt-2">View product statistics and insights</p>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handleAnalytics}
                className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-md text-white"
              >
                Go to Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Adminpanel;
