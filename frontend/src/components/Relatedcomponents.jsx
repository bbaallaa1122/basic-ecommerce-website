import React, { useContext, useState, useEffect } from "react";
import { shopcontext } from "../context/Contextprovider";
import Productitem from "./Productitem";  // Ensure you have a Productitem component

const Relatedcomponent = ({ id, category, subcategory }) => {
  const { products } = useContext(shopcontext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Filter products by category and subcategory, and exclude the current product by id
      const filteredProducts = products.filter(
        (item) =>
          item.category === category &&
          item.subcategory === subcategory &&
          item._id !== id  // Exclude the current product
      );
      setRelatedProducts(filteredProducts);
    }
  }, [products, category, subcategory, id]);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((item) => (
            <Productitem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Relatedcomponent;
