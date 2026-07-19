import React from 'react'
import { useNavigate } from 'react-router'


const Card = ({product}) => {
    const navigate=useNavigate()
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6 flex"
            
            onClick={()=> navigate(`details/${product.id}`)}

            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                        >
                            {/* Product Image */}
                            <div className="h-60 bg-gray-50 flex items-center justify-center p-4">
                                <img    
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full object-contain hover:scale-105 transition duration-300"   
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-5">
                                <p className="text-xs text-blue-600 uppercase font-semibold mb-2">
                                    {product.category}
                                </p>

                                <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                                    {product.title}
                                </h2>

                                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-2xl font-bold text-green-600">
                                        ${product.price}
                                    </span>

                                    <div className="text-sm text-yellow-500 font-medium">
                                        ⭐ {product.rating.rate}
                                        <span className="text-gray-500 ml-1">
                                            ({product.rating.count})
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    
                </div>
            </div>
        </>

    )
}

export default Card