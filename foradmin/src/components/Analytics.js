import React from 'react';
import Layout from './Layout';
import { useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function Analytics({ orders}) {
  const token = localStorage.getItem('token');
  const currentDate = new Date();
  const activeOrders = orders.filter((order) => new Date(order.deldate) > currentDate);
  const deliveredProducts = orders.filter((order) => new Date(order.deldate) <= currentDate);
  const [categoryProductCount, setCategoryProductCount] = useState({
      Men: 0,
      Women: 0,
      Kids: 0,
    });
  
  const totalActiveOrders = activeOrders.length;
  const totalDeliveredOrders = deliveredProducts.length;
  const updateProductCount = (products) => {
    const count = { Men: 0, Women: 0, Kids: 0 };
    products.forEach((item) => {
      if (item.category === 'Men') {
        count.Men++;
      } else if (item.category === 'Women') {
        count.Women++;
      } else if (item.category === 'Kids') {
        count.Kids++;
      }
    });
    setCategoryProductCount(count); 
  };
  useEffect(() => {
    const fetchItems = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/products/listproductadmin', {
            headers: {
              token,
            },
          });
          updateProductCount(response.data.products);
        }catch (error) {
          if(token){
          toast.error('Error fetching items');
          console.log(error.message);}
        }
    };
    fetchItems();
  }, []);
  return (
    <Layout>
      <div className="mt-20 p-6 bg-white rounded-lg shadow-md">

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Analytics</h2>

        
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-2">Total Active Orders</h4>
              <p className="text-3xl">{totalActiveOrders}</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-2">Total Delivered Orders</h4>
              <p className="text-3xl">{totalDeliveredOrders}</p>
            </div>
          </div>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Items Added Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-2">Men's Items Added</h4>
              <p className="text-3xl">{categoryProductCount.Men}</p>
            </div>
            <div className="bg-orange-600 text-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-2">Women's Items Added</h4>
              <p className="text-3xl">{categoryProductCount.Women}</p>
            </div>
            <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-2">Kids' Items Added</h4>
              <p className="text-3xl">{categoryProductCount.Kids}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Analytics;
