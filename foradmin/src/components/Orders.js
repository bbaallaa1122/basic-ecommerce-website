// src/components/Orders.js
import React from 'react';

function Orders({ orders }) {
  // Separate active and delivered orders
  const currentDate = new Date();
  const activeOrders = orders.filter((order) => new Date(order.deldate) > currentDate);
  const deliveredProducts = orders.filter((order) => new Date(order.deldate) <= currentDate);

  return (
    <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      {/* Active Orders Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Active Orders</h3>
        {activeOrders.length > 0 ? (
          activeOrders.map((order, index) => (
            <div key={index} className="p-4 border rounded-md shadow-sm mb-2">
              <h4 className="font-bold">Product ID: {order.productid}</h4>
              <p>Size: {order.size}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Delivery Date: {new Date(order.deldate).toLocaleDateString()}</p>
              <div className="mt-2">
                <h5 className="font-semibold">Delivery Address:</h5>
                <p>Name: {order.address.name}</p>
                <p>Address: {order.address.address}</p>
                <p>City: {order.address.city}</p>
                <p>Phone: {order.address.phone}</p>
                <p>Email: {order.address.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No active orders.</p>
        )}
      </div>

      {/* Delivered Products Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Delivered Products</h3>
        {deliveredProducts.length > 0 ? (
          deliveredProducts.map((order, index) => (
            <div key={index} className="p-4 border rounded-md shadow-sm mb-2">
              <h4 className="font-bold">Product ID: {order.productid}</h4>
              <p>Size: {order.size}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Delivered On: {new Date(order.deldate).toLocaleDateString()}</p>
              <div className="mt-2">
                <h5 className="font-semibold">Delivery Address:</h5>
                <p>Name: {order.address.name}</p>
                <p>Address: {order.address.address}</p>
                <p>City: {order.address.city}</p>
                <p>Phone: {order.address.phone}</p>
                <p>Email: {order.address.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No delivered products yet.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
