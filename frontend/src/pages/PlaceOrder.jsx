import React, { useContext, useState } from 'react';
import { shopcontext } from '../context/Contextprovider';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assests/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Placeorder = () => {
  const { totalamount,updateorders,erasecart} = useContext(shopcontext);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    postalCode: '',
    country: '',
    additionalNotes: '',
  });

  const [paymentSelected, setPaymentSelected] = useState(false);
  const [buttonClass, setButtonClass] = useState("w-auto py-2 px-4 text-white bg-gray-400 rounded-lg text-sm");
  const navigate = useNavigate();

  const handleClick = () => {
    setButtonClass("w-auto py-2 px-4 text-white bg-gray-700 rounded-lg text-sm");
    setPaymentSelected(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  const handlePlaceOrder = () => {
    const { name, address, phone, email, city, postalCode, country } = deliveryInfo;
    if (!name || !address || !phone || !email || !city || !postalCode || !country) {
      toast.warn('Please fill in all delivery information.');
      return;
    }

    if (!paymentSelected) {
      toast.warn('Please select a payment option.');
      return;
    }

   
    updateorders();
    erasecart();
    navigate('/orders');
  };

  return (
    <div className="pt-20 px-6 min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-center items-center font-poppins">
      {/* Toast Container */}
      <ToastContainer />

      {/* Delivery Information */}
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg mb-8">
        <p className="text-2xl font-semibold text-gray-800 mb-6">Delivery Information</p>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={deliveryInfo.name}
              onChange={handleChange}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm text-gray-700">Shipping Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={deliveryInfo.address}
              onChange={handleChange}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              placeholder="123 Street, City, State"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleChange}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              placeholder="123-456-7890"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={deliveryInfo.email}
              onChange={handleChange}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              placeholder="example@mail.com"
            />
          </div>

          {/* Stacked Input Fields */}
          <div className="flex flex-wrap space-x-4">
            <div className="w-1/3 space-y-2">
              <label htmlFor="city" className="text-sm text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={deliveryInfo.city}
                onChange={handleChange}
                className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                placeholder="City"
              />
            </div>
            <div className="w-1/3 space-y-2">
              <label htmlFor="postalCode" className="text-sm text-gray-700">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={deliveryInfo.postalCode}
                onChange={handleChange}
                className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                placeholder="12345"
              />
            </div>
            <div className="w-1/3 space-y-2">
              <label htmlFor="country" className="text-sm text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={deliveryInfo.country}
                onChange={handleChange}
                className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                placeholder="Country"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="additionalNotes" className="text-sm text-gray-700">Additional Notes</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={deliveryInfo.additionalNotes}
              onChange={handleChange}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              placeholder="Any special delivery instructions"
            />
          </div>
        </form>
      </div>

      {/* Order Summary & Payment Options */}
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <p className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</p>
        <div className="flex justify-between text-lg font-semibold text-gray-800 mb-6">
          <p>Total Amount:</p>
          <p>{`$${(totalamount).toFixed(2)}`}</p>
        </div>

        {/* Payment Option */}
        <p className="text-lg font-medium text-gray-800 mb-4">Payment Option</p>
        <button className={buttonClass} onClick={handleClick}>
          <img src={assets.cod} alt="cod" className="w-16 h-8 mx-auto" />
        </button>

        {/* Place Order Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePlaceOrder}
            className="w-full max-w-xs py-3 text-white bg-gray-700 hover:bg-gray-500 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;