import Products from '../src/components/Products'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import React from 'react'
import { useState } from 'react'


const App = () => {
  const [IscartOpen, setIscartOpen] = useState(false)


  return (
    <>
      {/* <Navbar setIscartOpen={setIscartOpen} /> */}
      <Navbar setIsCartOpen={setIscartOpen} />



      {IscartOpen ? <Cart /> : <Products />}

    </>
  )
}

export default App
