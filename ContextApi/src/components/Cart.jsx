import React, { useState } from "react";

const initialCartItems = [
    {
        id: 1,
        title: "Fjallraven Backpack",
        price: 109.95,
        quantity: 1,
        image:
            "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    },
    {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        quantity: 1,
        image:
            "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    },
];

const Cart = ({  }) => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const increaseQuantity = (id) => {
        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((previousItems) =>
            previousItems.filter((item) => item.id !== id)
        );
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const shipping = cartItems.length > 0 ? 10 : 0;
    const total = subtotal + shipping;

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-10">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-8 text-3xl font-bold text-slate-900">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                        <h2 className="text-2xl font-semibold text-slate-800">
                            Your cart is empty
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Add some products to your cart.
                        </p>

                        <a
                            href="/"
                            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Cart items */}
                        <section className="flex flex-1 flex-col gap-4">
                            {cartItems.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                                >
                                    <div className="flex h-32 w-full items-center justify-center rounded-lg bg-slate-50 p-3 sm:w-32">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col gap-3">
                                        <h2 className="text-lg font-bold text-slate-900">
                                            {item.title}
                                        </h2>

                                        <p className="text-xl font-bold text-blue-700">
                                            ${item.price.toFixed(2)}
                                        </p>

                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            {/* Quantity controls */}
                                            <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
                                                <button
                                                    type="button"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="px-4 py-2 text-lg hover:bg-slate-100"
                                                >
                                                    −
                                                </button>

                                                <span className="min-w-10 px-3 text-center font-semibold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => increaseQuantity(item.id)}
                                                    className="px-4 py-2 text-lg hover:bg-slate-100"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="font-semibold text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-xl font-bold text-slate-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </article>
                            ))}
                        </section>

                        {/* Order summary */}
                        <aside className="h-fit w-full rounded-xl bg-white p-6 shadow-sm lg:sticky lg:top-24 lg:w-96">
                            <h2 className="text-xl font-bold text-slate-900">
                                Order Summary
                            </h2>

                            <div className="mt-6 flex flex-col gap-4 border-b border-slate-200 pb-5">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between py-5 text-xl font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button
                                type="button"
                                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                            >
                                Proceed to Checkout
                            </button>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Cart;