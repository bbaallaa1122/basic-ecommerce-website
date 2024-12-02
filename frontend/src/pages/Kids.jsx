import React from 'react'
import Productspage from '../components/Productspage'
import Searchbar from '../components/Searchbar'

const kids = () => {
  return (
    <div className='pt-20'>
      <Searchbar/>
      <Productspage name={"Kids"}/>
    </div>
  )
}

export default kids
