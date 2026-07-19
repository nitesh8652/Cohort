import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { store } from '../context/Context'
import Card from './Card';

const Home = () => {

  let { productsData, setProductsData } = useContext(store);

  let getProductsData = async () => {

    try {

      let res = await axios.get('https://fakestoreapi.com/products')
      setProductsData(res.data)
      console.log(res)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProductsData()
  },[])

  return (
    <div>
      
      {
        productsData.map((val)=>{
          return <Card key={val.id} product={val}/>
        })
      }

    </div>
  )
}

export default Home