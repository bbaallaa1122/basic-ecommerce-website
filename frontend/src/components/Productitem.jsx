import React, { useContext } from 'react'
import { shopcontext } from '../context/Contextprovider'
import {Link} from 'react-router-dom'
const Productitem = ({id,image,name,price}) => {
    const currency=useContext(shopcontext);
  return (
    <div>
    <Link to={`/product/${id}`}  className='cursor-pointer'>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]}/>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency.curr}{price}</p>
      </div>
      </Link>
    </div>
  )
}

export default Productitem
