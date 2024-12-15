// src/components/Orders.js
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { FaTruck, FaBox, FaCheckCircle, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function Orders({ orders }) {
  const currentDate = new Date();
  const activeOrders = orders.filter((order) => new Date(order.deldate) > currentDate);
  const deliveredProducts = orders.filter((order) => new Date(order.deldate) <= currentDate);

  return (
    <Layout>
      <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Orders</h2>

       
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
            <FaTruck className="mr-2" />
            Active Orders
          </h3>
          {activeOrders.length > 0 ? (
            activeOrders.map((order, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm mb-4 bg-gray-50">
                <h4 className="font-bold text-gray-700">
                  <FaBox className="inline-block text-blue-500 mr-2" />
                  Product ID: {order.productid}
                </h4>
                <p className="text-sm text-gray-600">Size: {order.size}</p>
                <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-sm text-gray-600">
                  Delivery Date: <span className="font-semibold">{new Date(order.deldate).toLocaleDateString()}</span>
                </p>

                
                <div className="mt-3 text-sm">
                  <h5 className="font-semibold text-gray-700">
                    <FaMapMarkerAlt className="inline-block text-green-500 mr-2" />
                    Delivery Address
                  </h5>
                  <p>Name: {order.address.name}</p>
                  <p>Address: {order.address.address}</p>
                  <p>City: {order.address.city}</p>
                  <p>
                    <FaPhoneAlt className="inline-block text-gray-500 mr-2" />
                    {order.address.phone}
                  </p>
                  <p>
                    <FaEnvelope className="inline-block text-gray-500 mr-2" />
                    {order.address.email}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No active orders.</p>
          )}
        </div>

        
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
            <FaCheckCircle className="mr-2" />
            Delivered Products
          </h3>
          {deliveredProducts.length > 0 ? (
            deliveredProducts.map((order, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm mb-4 bg-gray-50">
                <h4 className="font-bold text-gray-700">
                  <FaBox className="inline-block text-blue-500 mr-2" />
                  Product ID: {order.productid}
                </h4>
                <p className="text-sm text-gray-600">Size: {order.size}</p>
                <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-sm text-gray-600">
                  Delivered On: <span className="font-semibold">{new Date(order.deldate).toLocaleDateString()}</span>
                </p>

                
                <div className="mt-3 text-sm">
                  <h5 className="font-semibold text-gray-700">
                    <FaMapMarkerAlt className="inline-block text-green-500 mr-2" />
                    Delivery Address
                  </h5>
                  <p>Name: {order.address.name}</p>
                  <p>Address: {order.address.address}</p>
                  <p>City: {order.address.city}</p>
                  <p>
                    <FaPhoneAlt className="inline-block text-gray-500 mr-2" />
                    {order.address.phone}
                  </p>
                  <p>
                    <FaEnvelope className="inline-block text-gray-500 mr-2" />
                    {order.address.email}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No delivered products yet.</p>
          )}
        </div>

        
        <div className="mt-8 text-center">
          <Link
            to="/analytics"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
          >
            Go to Analytics
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
