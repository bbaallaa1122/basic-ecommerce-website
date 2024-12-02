import React from 'react'
import Productspage from '../components/Productspage'
import Searchbar from '../components/Searchbar'
const Men = () => {
  return (
    <div className='pt-20'>
      <Searchbar/>
      <Productspage name={"Men"}/>
    </div>
  )
}

export default Men
