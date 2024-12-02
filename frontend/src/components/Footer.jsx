import React from 'react';
import { assets } from '../assests/assets'; // Ensure path to assets is correct

const Footer = () => {
  return (
    <div className="py-10 bg-gray-100">
      {/* Top Section */}
      <div className="flex flex-wrap justify-around gap-6 max-w-6xl mx-auto mb-10">
        {/* Easy Exchange */}
        <div className="flex flex-col items-center text-center">
          <img src={assets.exchange_icon} alt="Easy Exchange Icon" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold text-gray-700">EASY EXCHANGE</p>
          <p className="text-xs text-gray-500 mt-1">
            Hassle-free returns and exchanges.
          </p>
        </div>

        {/* Contact and Support */}
        <div className="flex flex-col items-center text-center">
          <img src={assets.support_img} alt="Contact and Support Icon" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold text-gray-700">CONTACT AND SUPPORT</p>
          <p className="text-xs text-gray-500 mt-1">
            We're here to assist you 24/7.
          </p>
        </div>

        {/* Best Quality */}
        <div className="flex flex-col items-center text-center">
          <img src={assets.quality_icon} alt="Best Quality Icon" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold text-gray-700">BEST QUALITY</p>
          <p className="text-xs text-gray-500 mt-1">
            Guaranteed premium quality products.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-sm text-gray-500 mb-6">
            Stay updated with the latest trends, offers, and more!
          </p>
          <form className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-Gray-400 outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-500 transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center text-gray-500 mt-8 text-sm">
        © 2024 Your Brand Name. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
