import React from 'react';
import { image } from '../imagefiles/image';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useContext } from 'react';
import { shopcontext } from '../context/Contextprovider';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {setname,setCart,setemail,setpassword,cartcount, token, settoken } = useContext(shopcontext);
    
    const handleLogout = () => {
      settoken('');   
      setname('');  
      setemail(''); 
      setpassword('');
      setCart({});
      localStorage.removeItem('token'); 
      navigate('/auth'); 
    };

  

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-5 py-4 font-medium">
        
        <NavLink to="/home">
          <img src={image.Basics} alt="basic" className="w-36 h-17" />
        </NavLink>

        
        <ul className="hidden md:flex gap-10 text-sm text-gray-700">
          {['HOME', 'MEN', 'WOMEN', 'KIDS'].map((item, index) => (
            <li key={index}>
              <NavLink
                to={`/${item.toLowerCase()}`}
                className="flex flex-col items-center gap-1 font-bold hover:scale-110"
              >
                <p>{item}</p>
                {location.pathname === `/${item.toLowerCase()}` && (
                  <hr className="w-1/2 border-none h-[1.5px] bg-gray-700" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>

       
        <ul className="flex gap-8 text-sm text-gray-700 items-center">
          
          <li className="relative group">
            <p className="cursor-pointer text-3xl hover:scale-110">
              <CgProfile className="text-2xl" />
            </p>
            <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-md py-3 w-48 text-gray-700 z-10 transition ease-in-out duration-200">
              {!token && (
                <NavLink
                  to="/auth"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                >
                  Login/Signup
                </NavLink>
              )}
              <NavLink
                to="/orders"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
              >
                Orders
              </NavLink>
              <NavLink
                to="/wishlist"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
              >
                Wishlist
              </NavLink>
              <NavLink
                to="/contact"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
              >
                Contact
              </NavLink>
              {token && (
                <p
                  onClick={handleLogout} 
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              )}
            </div>
          </li>

          
          <li>
            <NavLink
              to="/wishlist"
              className="flex flex-col items-center gap-1 font-bold hover:scale-110"
            >
              <p>
                <FaRegHeart className="text-2xl" />
              </p>
              {location.pathname === '/wishlist' && (
                <hr className="w-1/2 border-none h-[1.5px] bg-gray-700" />
              )}
            </NavLink>
          </li>

         
          <li>
            <NavLink
              to="/cart"
              className="flex flex-col items-center gap-1 font-bold hover:scale-110"
            >
              <div className="relative">
                <FaShoppingBag className="text-2xl" />
                <div className="text-white bg-red-700 w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                  <p className="text-sm">{cartcount()}</p>
                </div>
              </div>
              {location.pathname === '/cart' && (
                <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 mt-1" />
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
