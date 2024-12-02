import React from 'react'
import Productspage from '../components/Productspage'
import Searchbar from '../components/Searchbar'

const women = () => {
  return (
    <div className='pt-20'>
      <Searchbar/>
      <Productspage name={"Women"}/>
    </div>
  )
}

export default women
