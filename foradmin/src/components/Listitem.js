// src/components/ListItems.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { toast } from 'react-toastify';

function Listitem() {
  const token = localStorage.getItem('token');
  const [items, setItems] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/products/listproduct');
        setItems(response.data.products); 
      } catch (error) {
        toast.error('Error fetching items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle removing an item
  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/products/delproduct',  
        { itemId }, 
        {
          headers: {
            token,         
           },
        }
      );
      
      if (response.data.success) {
        setItems(items.filter(item => item._id !== itemId));
        toast.success('Item removed successfully!');
      } else {
        toast.error('Error removing item!');
      }
    } catch (error) {
      toast.error('Error removing item!');
    }
  };

  return (
    <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Items List</h2>
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading items...</p>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="flex items-center p-4 border rounded-md shadow-sm space-x-4">
              {/* Display the first image of the product */}
              <img 
                src={item.image[0] }
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-md" 
              />
              
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <span className="text-green-600">${item.price}</span>
              </div>

              {/* Remove button positioned to the right */}
              <button
                onClick={() => handleRemoveItem(item._id)} 
                className="ml-4 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No items available. Please add some items.</p>
        )}
      </div>
    </div>
  );
}

export default Listitem;
