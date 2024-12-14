// src/components/ListItems.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout.js';
import {
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaPlus,
  FaTshirt,
  FaChild,
  FaFemale,
  FaMale,
} from 'react-icons/fa';

function Listitem() {
  const token = localStorage.getItem('token');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Men');
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [categoryProductCount, setCategoryProductCount] = useState({
    Men: { Topwear: 0, Bottomwear: 0, Winterwear: 0 },
    Women: { Topwear: 0, Bottomwear: 0, Winterwear: 0 },
    Kids: { Topwear: 0, Bottomwear: 0, Winterwear: 0 },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/products/listproductadmin', {
          headers: {
            token,
          },
        });
        setItems(response.data.products);
        updateProductCount(response.data.products);
      } catch (error) {
        toast.error('Error fetching items');
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const updateProductCount = (products) => {
    const count = { Men: {}, Women: {}, Kids: {} };
    products.forEach((item) => {
      if (!count[item.category][item.subcategory]) {
        count[item.category][item.subcategory] = 0;
      }
      count[item.category][item.subcategory]++;
    });
    setCategoryProductCount(count);
  };

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
        const updatedItems = items.filter((item) => item._id !== itemId);
        setItems(updatedItems);
        updateProductCount(updatedItems);
        toast.success('Item removed successfully!');
      } else {
        toast.error('Error removing item!');
      }
    } catch (error) {
      toast.error('Error removing item!');
    }
  };

  const categorizeItems = (category, subcategory) => {
    return items.filter(
      (item) => item.category === category && item.subcategory === subcategory
    );
  };

  const toggleSubcategory = (subcategory) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subcategory]: !prev[subcategory],
    }));
  };

  const renderGrid = (products) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {products.map((item) => (
        <div key={item._id} className="border rounded-md p-4 shadow-sm hover:shadow-md transition">
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="font-bold text-gray-700">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          <span className="text-green-600 font-semibold">${item.price}</span>
          <button
            onClick={() => handleRemoveItem(item._id)}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 flex items-center justify-center"
          >
            <FaTrash className="mr-2" /> Remove
          </button>
        </div>
      ))}
    </div>
  );

  const categories = [
    { name: 'Men', icon: <FaMale /> },
    { name: 'Women', icon: <FaFemale /> },
    { name: 'Kids', icon: <FaChild /> },
  ];
  const subcategories = ['Topwear', 'Bottomwear', 'Winterwear'];

  const handleAddItemRedirect = (category, subcategory) => {
    navigate('/additem', { state: { category, subcategory } });
  };

  return (
    <Layout>
      <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Items List</h2>

        {/* Category Buttons */}
        <div className="flex space-x-4 mb-6">
          {categories.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`px-4 py-2 flex items-center rounded-lg ${
                activeCategory === name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {icon}
              <span className="ml-2">{name}</span>
            </button>
          ))}
        </div>

        {isLoading ? (
          <p>Loading items...</p>
        ) : (
          <div>
            {subcategories.map((subcategory) => (
              <div key={subcategory} className="mb-6">
                <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md">
                  <button
                    onClick={() => toggleSubcategory(subcategory)}
                    className="flex items-center text-lg font-semibold"
                  >
                    <FaTshirt className="mr-2" />
                    {subcategory}
                    {/* Badge displaying item count */}
                    <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-full">
                      {categoryProductCount[activeCategory][subcategory] || 0}
                    </span>
                    <span className="ml-2">
                      {expandedSubcategories[subcategory] ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>

                  <button
                    onClick={() => handleAddItemRedirect(activeCategory, subcategory)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                  >
                    <FaPlus className="mr-2" /> Add Item
                  </button>
                </div>

                {expandedSubcategories[subcategory] &&
                  (categorizeItems(activeCategory, subcategory).length > 0 ? (
                    renderGrid(categorizeItems(activeCategory, subcategory))
                  ) : (
                    <p className="text-gray-500 text-center">No items available</p>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Listitem;
