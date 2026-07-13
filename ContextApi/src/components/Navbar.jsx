import React from "react";
import App from "./../App"

const Navbar = ({ setIsCartOpen }) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        
        <button
          type="button"
          onClick={() => setIsCartOpen(false)}
          className="text-2xl font-bold text-blue-700"
        >
          Shop<span className="text-slate-900">Cart</span>
        </button>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="text-sm font-medium text-slate-700 transition hover:text-blue-700 sm:text-base"
          >
            Home
          </button>

          <a
            href="/account"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-700 sm:text-base"
          >
            Account
          </a>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative text-sm font-medium text-slate-700 transition hover:text-blue-700 sm:text-base"
          >
            Cart

            <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              0
            </span>
          </button>

          <a
            href="/login"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-5 sm:text-base"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};



export default Navbar;