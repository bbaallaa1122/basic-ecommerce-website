// src/components/Orders.js
import React from 'react';

function Orders({ orders }) {
  return (
    <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="p-4 border rounded-md shadow-sm">
              <h3 className="font-bold">{order.name}</h3>
              <p>Status: {order.status}</p>
              <span className="text-blue-600">Total: ${order.total}</span>
            </div>
          ))
        ) : (
          <p>No orders yet. Once you have items, orders will appear here.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
