import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useState } from 'react'

const Details = () => {

    const [oneProduct, setOneProduct] = useState({})
    console.log(oneProduct)
    let { id } = useParams()
    console.log(id)

    let singleProductsData = async () => {

        try {
            let res = await axios.get(`https://fakestoreapi.com/products/${id}`)

            setOneProduct(res.data)

        } catch (err) {
            console.log('single product err', err)
        }
    }

    useEffect(() => {
        singleProductsData()

    }, [])

    return (
        <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border">

            <div className="h-64 bg-gray-100 flex items-center justify-center">
                <img
                    src={oneProduct.image}
                    alt="Product"
                    className="h-48 object-contain"
                />
            </div>

            <div className="p-5">

                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                    Jewelery
                </span>


                <h2 className="text-xl font-bold text-gray-800 mt-3">
                    {oneProduct.title}
                </h2>


                <p className="text-gray-600 text-sm mt-2">
                    {oneProduct.description}
                </p>


                <div className="flex justify-between items-center mt-5">
                    <span className="text-2xl font-bold text-green-600">
                        {oneProduct.price}
                    </span>

                    <span className="text-yellow-500 font-semibold">
                      ⭐ ({oneProduct?.rating?.count})
                    </span>
                </div>


                <button className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    Remove from Cart
                </button>
            </div>

        </div>
    )
}

export default Details