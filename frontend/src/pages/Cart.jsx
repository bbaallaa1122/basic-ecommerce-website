import React, { useContext, useEffect, useState } from 'react';
import { shopcontext } from '../context/Contextprovider';
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [tempcart, setTempcart] = useState([]);
  const { cart, products, updatecart, curr, delfee, updateamount, token } = useContext(shopcontext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  }, [token, navigate]);

  useEffect(() => {
    const temp = [];
    for (const ids in cart) {
      for (const sizes in cart[ids]) {
        temp.push({
          id: ids,
          size: sizes,
          quantity: cart[ids][sizes],
        });
      }
    }
    setTempcart(temp);
  }, [cart]);

  let totcost = 0;

  return (
    <div className="pt-20 px-8 min-h-screen bg-gray-50">
      <p className="text-4xl font-bold text-center mb-8 text-gray-800">Your Cart</p>

      <div className="space-y-6">
        {tempcart.map((item) => {
          const prod = products.find((product) => product._id === item.id);
          if (!prod) return null; 
          const price = prod.price * item.quantity;
          totcost += price;
          
          return (
            <div
              key={item.id + item.size}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={prod.image[0]}
                  alt={prod.name}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{prod.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updatecart({ id: item.id, size: item.size, quantity: Number(e.target.value) })
                  }
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xl font-semibold text-gray-800">{curr}{price.toFixed(2)}</p>
                <button
                  onClick={() => updatecart({ id: item.id, size: item.size, quantity: 0 })}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <MdDelete size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {tempcart.length === 0 && (
        <p className="text-center text-xl text-gray-500 mt-10">Your cart is empty.</p>
      )}

      {tempcart.length > 0 && (
        <div className="mt-10 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between text-lg font-medium text-gray-700">
              <p>SubTotal:</p>
              <p>{curr}{totcost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-700 mt-2">
              <p>Shipping Fee:</p>
              <p>{curr}{delfee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-xl font-semibold text-gray-800 mt-4">
              <p>Total Amount:</p>
              <p>{curr}{(totcost + delfee).toFixed(2)}</p>
            </div>
          </div>
          
          <Link to={'/cart/placeorder'} className='cursor-pointer'>
            <button 
              onClick={() => updateamount(totcost + delfee)}
              className="w-full py-3 text-white bg-gray-500 hover:bg-gray-700 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
