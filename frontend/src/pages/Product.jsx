import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { shopcontext } from "../context/Contextprovider";
import Relatedcomponent from "../components/Relatedcomponents";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function handleclick() {
  toast("Added to cart");
}

const Product = () => {
  const { productid } = useParams();
  const { products, addcart, addwishlist, wishlist, removewishlist } =
    useContext(shopcontext);

  const [prod, setProd] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productid);
    setProd(product || null);
    if (product) {
      setSelectedImage(product.image?.[0] || ""); // Default to first image
      setSelectedSize(""); // Reset size selection
    }
  }, [products, productid]);

  if (!prod) {
    return <p className="text-red-500">Product not found.</p>;
  }

  return (
    <div className="pt-20 px-8">
      {/* Product Details Section */}
      <div className="flex flex-row gap-10">
        {/* Product Images */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {/* Main Image */}
          <div className="border rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={prod.name}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2">
            {prod.image.map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-20 border rounded-lg cursor-pointer ${
                  selectedImage === image ? "border-gray-800" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-2">{prod.name}</h1>
          <p className="text-xl font-medium text-gray-600">${prod.price}</p>
          <p className="text-gray-500 my-4">{prod.description}</p>
          {/* Size Selector */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Select Size</label>
            <div className="flex gap-2">
              {prod.size.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border p-2 rounded-lg ${
                    selectedSize === size ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={
                selectedSize === ""
                  ? null
                  : () => {
                      addcart({ id: prod._id, size: selectedSize });
                      handleclick();
                    }
              }
              className={`${
                selectedSize === ""
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              } px-6 py-2 rounded-lg`}
              disabled={selectedSize === ""}
            >
              Add to Cart
            </button>

            <button
              onClick={
                wishlist.includes(prod._id)
                  ? () => removewishlist({ id: prod._id })
                  : () => addwishlist({ id: prod._id })
              }
              className="border border-black px-6 py-2 rounded-lg hover:bg-gray-200"
            >
              {wishlist.includes(prod._id) ? "Remove Wishlist" : "Add to Wishlist"}
            </button>
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="mt-10 p-5">
            <ul className="list-disc pl-5 text-gray-500">
              <li>100% Original Products</li>
              <li>Easy 7-Day Returns & Exchange Policy</li>
              <li>Delivery Time: {prod.deltime} day(s)</li>
              <li>Secure Online Payments</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-gray-600">{prod.description}</p>
      </div>

      {/* Related Products Section */}
      <Relatedcomponent
       id={prod._id}
        category={prod.category}
        subcategory={prod.subcategory}
      />
      <ToastContainer />
    </div>
  );
};

export default Product;
