import React, { useContext } from "react";
import { shopcontext } from "../context/Contextprovider";
import Productitem from "./Productitem";  // Make sure you have a Productitem component

const Relatedcomponent = ({ category, subcategory }) => {
  const { products } = useContext(shopcontext);

  // Filter products by category and subcategory
  const relatedProducts = products.filter(
    (item) => item.category === category && item.subCategory === subcategory
  );

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
