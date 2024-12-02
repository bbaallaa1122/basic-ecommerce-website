import React,{useContext, useEffect, useState} from 'react'
import { shopcontext } from '../context/Contextprovider'
import Productitem from './Productitem';
const Productshome = () => {
    const {products}=useContext(shopcontext);
    const [Latestprod,setLatestprod]=useState([]);
    useEffect(()=>{
        setLatestprod(products.slice(0,10));
    },[]);
  return (
    <div className='grid grid-cols-5 gap-4 gap-y-6 px-6'>
      {Latestprod.map((product)=>(
          <Productitem id={product._id} image={product.image} name={product.name} price={product.price}/>
      ))}
    </div>
  )
}

export default Productshome
