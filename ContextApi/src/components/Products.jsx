import React from 'react'

const Products = () => {


   return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      {/* Page heading */}
      <div className="mx-auto mb-8 max-w-7xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Our Products
        </h1>

       
      </div>

      {/* Product cards container */}
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6">
        {storedproduct.map((product) => (
          <div
            key={product.id}
            className="flex w-full max-w-xs flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Product image */}
            <div className="flex h-56 items-center justify-center rounded-lg bg-slate-50 p-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Product information */}
            <div className="mt-4 flex flex-1 flex-col">
              <span className="mb-2 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                {product.category}
              </span>

              <h2 className="line-clamp-2 text-lg font-bold text-slate-900">
                {product.title}
              </h2>

              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                {product.description}
              </p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-yellow-500">★</span>

                <span className="text-sm font-semibold text-slate-700">
                  {product.rating.rate}
                </span>

                <span className="text-sm text-slate-500">
                  ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price and button */}
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <p className="text-2xl font-bold text-blue-700">
                  ${product.price.toFixed(2)}
                </p>

                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products