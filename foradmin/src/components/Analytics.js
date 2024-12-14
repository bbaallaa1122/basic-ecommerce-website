import React from 'react';
import Layout from './Layout';
function Analytics({ orders, menItems, womenItems, kidsItems }) {
  // Separate active and delivered orders
  const currentDate = new Date();
  const activeOrders = orders.filter((order) => new Date(order.deldate) > currentDate);
  const deliveredProducts = orders.filter((order) => new Date(order.deldate) <= currentDate);

  // Calculate totals for each category
  const totalActiveOrders = activeOrders.length;
  const totalDeliveredOrders = deliveredProducts.length;

  return (
    <Layout>
    <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>

      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Active Orders</h3>
          <p className="text-3xl">{totalActiveOrders}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Delivered Orders</h3>
          <p className="text-3xl">{totalDeliveredOrders}</p>
        </div>
        {/* Display the number of items by category */}
        <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Men's Items Added</h3>
          <p className="text-3xl">{menItems}</p>
        </div>
        <div className="bg-orange-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Women's Items Added</h3>
          <p className="text-3xl">{womenItems}</p>
        </div>
        <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Kids' Items Added</h3>
          <p className="text-3xl">{kidsItems}</p>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default Analytics;
