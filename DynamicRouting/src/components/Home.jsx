import React, { useContext } from 'react'
import axios from 'axios'
import { store } from '../context/Context'

const Home = () => {

  let { productsData, setProductsData } = useContext(store);

  let getProductsData = async () => {

    try {

      let res = await fetch('https://fakestoreapi.com/products')
      console.log(res)

    } catch (err) {
      console.log(err)
    }
  }

  getProductsData()

  return (
    <div>Home</div>
  )
}

export default Home