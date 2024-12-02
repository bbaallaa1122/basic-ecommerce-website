import React,{useState} from 'react'
import {image} from '../imagefiles/image';
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
const Banner = () => {
    const [curind,setCurind]=useState(1);
    const bannerimages=[
        image.banner1,
        image.banner2,
        image.banner3,
        image.banner4,
    ]
    function prehandleclick(){
         setCurind( (curind)=>
            curind===0?bannerimages.length-1:curind-1
         )
    }
    function nexhandleclick(){
        setCurind( (curind)=>
           curind===bannerimages.length-1?0:curind+1
        )
   }
  return (
    <div className='pt-16'>
    <div className=' container px-12 mx-auto py-5 rounded'>
      <div className=' h-80 w-full bg-slate-200'>
    <div className='flex w-full h-full overflow-hidden'>
        {
          bannerimages.map((image,index) =>{ 
            return (
        <div  key={index} className='w-full h-full min-w-full min-h-full' style={{transform :`translateX(-${(curind)*100}%)`}}>
           <img src={image} className='w-full h-full ' alt="bannerimage"/>
        </div>
          );
          }
          )
      }
      <button onClick={prehandleclick}class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full shadow-lg hover:bg-opacity-75 focus:outline-none ">
      <FaLessThan />
</button>

<button onClick={nexhandleclick}class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full shadow-lg hover:bg-opacity-75 focus:outline-none">
<FaGreaterThan />
</button>

      </div>
        </div>
    </div>
    </div>
  )
}

export default Banner
