import React from "react";
import { assets } from "../assests/assets";

const Contact = () => {
  return (
    <div className=" pt-20 min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white max-w-5xl w-full rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2">
       
        <div className="relative">
          <img
            src={assets.contact_img} 
            alt="Contact Us"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

       
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition duration-300"
            >
              Contact Us
            </button>
          </form>

          
          <div className="mt-8 space-y-4">
            <p className="text-gray-800">
              <strong>Contact:</strong> hi@basic.com
            </p>
            <p className="text-gray-800">
              <strong>Based in:</strong> Chennai,India
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <i className="fab fa-facebook-f"></i> 
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <i className="fab fa-twitter"></i> 
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
