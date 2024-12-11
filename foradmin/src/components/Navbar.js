import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ logout }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-500 text-white fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="text-xl font-bold">Admin Panel</div>
      <div>
        <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded-md">
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 hover:bg-gray-700 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
