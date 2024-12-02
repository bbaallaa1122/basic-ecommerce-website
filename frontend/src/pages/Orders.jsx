import React, { useContext } from "react";
import { shopcontext } from "../context/Contextprovider";
import { IoTrashBinSharp } from "react-icons/io5";

const Orders = () => {
  const { orders,cancelorders, products } = useContext(shopcontext);
  // Filter delivered products
  const today = new Date().toISOString().split("T")[0];
  const activeOrders = orders.filter((order) => order.deldate > today);
  const deliveredOrders = orders.filter((order) => order.deldate <= today);

  const renderOrder = (order, index, isDelivered = false) => {
    const product = products.find((item) => item._id === order.id);
    return (
      <div
        key={index}
        className="flex justify-between items-center border p-4 rounded-lg shadow-md bg-white"
      >
        {/* Product Details */}
        <div className="flex items-center gap-4">
          <img
            src={product?.image[0]} // Display the first image of the product
            alt={product?.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <p className="text-lg font-semibold">{product?.name}</p>
            <p>Size: {order.size}</p>
            <p>Quantity: {order.quantity}</p>
            <p className="text-gray-500">
              Delivery Date: {order.deldate}
            </p>
          </div>
        </div>

        {/* Cancel Button for Active Orders */}
        {!isDelivered && (
          <button
            onClick={() => cancelorders(index)}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <IoTrashBinSharp className="text-lg" />
            Cancel
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="pt-20 px-8 py-4">
      {/* Active Orders Section */}
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {activeOrders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {activeOrders.map((order, index) =>
            renderOrder(order, index, false)
          )}
        </div>
      ) : (
        <p className="text-gray-500">You have no active orders.</p>
      )}

      {/* Delivered Products Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Delivered Products</h1>
      {deliveredOrders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {deliveredOrders.map((order, index) =>
            renderOrder(order, index, true)
          )}
        </div>
      ) : (
        <p className="text-gray-500">You have no delivered products.</p>
      )}
    </div>
  );
};

export default Orders;
