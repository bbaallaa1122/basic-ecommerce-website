import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import { shopcontext } from '../context/Contextprovider';

const Searchbar = () => {
    const {searchitem,setSearchitem}=useContext(shopcontext);
  return (
    <div className='flex flex-col items-center'>
       <div className="flex items-center w-full max-w-sm border rounded-full px-2">
            <input 
              value={searchitem}
              onChange={(e)=>setSearchitem(e.target.value)}
              type="text"
              placeholder="Search here..."
              className="outline-none w-full pl-2"
            />
            <div className="text-lg bg-black text-white px-4 py-2 rounded-full">
              <FaSearch />
            </div>
          </div>
          </div>
  )
}

export default Searchbar
