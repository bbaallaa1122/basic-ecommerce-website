import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopcontext } from '../context/Contextprovider';
import Productitem from '../components/Productitem';

const Wishlist = () => {
  const { token, wishlist, products } = useContext(shopcontext);
  const navigate = useNavigate();

  // Filter wishlist items
  const wishitems = products.filter((item) => wishlist.includes(item._id));

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  }, [token, navigate]);

  return (
    token ? (
      <div className="py-20 px-8">
        {/* Wishlist Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishitems.length > 0
              ? `You have ${wishitems.length} items in your wishlist.`
              : 'Your wishlist is currently empty.'}
          </p>
        </div>

        {/* Wishlist Items */}
        {wishitems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishitems.map((item) => (
              <Productitem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
            <a
              href="/home"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    ) : null // If no token, render nothing until redirected
  );
};

export default Wishlist;
