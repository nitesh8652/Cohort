import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        
        <span className="text-2xl font-bold text-blue-700">
          Shop<span className="text-slate-900">Cart</span>
        </span>

        <div className="flex items-center gap-3 sm:gap-6">
          <NavLink
            to="/"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-700 sm:text-base"
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-700 sm:text-base"
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-700 sm:text-base"
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;