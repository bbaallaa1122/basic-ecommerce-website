import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import basic from './basic.png';
const Navbar = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-500 text-white fixed top-0 left-0 right-0 z-10 shadow-md">
      
      <div className="flex items-center">
        <img
          src={basic}
          alt="Admin Panel Logo"
          className="h-10 w-30 mr-3"
        />
      </div>

    
      <div className="flex items-center space-x-6">
       
        <Link
          to="/"
          className="flex items-center p-2 hover:bg-gray-700 rounded-md transition"
          title="Home"
        >
          <FaHome size={20} />
        </Link>

        {/* Logout Icon */}
        <button
          onClick={handleLogout}
          className="flex items-center p-2 hover:bg-gray-700 rounded-md transition"
          title="Logout"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
