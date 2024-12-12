import React, { useContext, useEffect, useState } from "react";
import { shopcontext } from "../context/Contextprovider";
import Productitem from "./Productitem";

const Productspage = ({ name }) => {
  const { products, searchitem } = useContext(shopcontext);

  // Filters State
  const [type, setType] = useState(""); // topwear, bottomwear, winterwear
  const [priceRange, setPriceRange] = useState([100, 400]);
  const [bestseller, setBestseller] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Update filtered products dynamically
  useEffect(() => {
    const filtered = products
      .filter((item) => item.name.toLowerCase().includes(searchitem.toLowerCase()))
      .filter((item) => item.category === name)
      .filter((item) => (type ? item.subCategory === type : true))
      .filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])
      .filter((item) => (bestseller ? item.bestseller === true : true));

    setFilteredProducts(filtered);
  }, [products, searchitem, name, type, priceRange, bestseller]);

  return (
    <div className="flex flex-col lg:flex-row px-8 bg-gray-50 min-h-screen">
      {/* Filter Box */}
      <div className="w-full lg:w-1/4 bg-white p-5 rounded-lg shadow-lg mb-5 lg:mb-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Filters
        </h2>

        {/* Type Filter */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Type</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              min="0"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              min="0"
            />
          </div>
        </div>

        {/* Bestseller Filter */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-gray-400 focus:outline-none"
          />
          <label htmlFor="bestseller" className="font-medium text-gray-700">
            Bestseller
          </label>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 p-10 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Productitem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No products match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Productspage;
