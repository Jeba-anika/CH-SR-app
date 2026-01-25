import React from "react";
import { Link } from "react-router";
import { FaShoppingCart, FaStore } from "react-icons/fa";
const Home = () => {
  return (
    // <div>
    //   <Link to={"/orders"}>View Orders</Link>
    //   <Link to={"/shops"}>View Shops</Link>
    // </div>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2 text-[#FAD443]">
          Sales Dashboard
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Choose what you want to manage
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-4">
          {/* Orders */}
          <Link
            to="/orders"
            className="
              flex items-center gap-4
              p-5
              rounded-xl
              bg-white
              shadow
              hover:shadow-md
              transition-all
              border
              border-[#FAD443]
            "
          >
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaShoppingCart size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Orders</h2>
              <p className="text-sm text-gray-500">
                Create, view & update orders
              </p>
            </div>
          </Link>

          {/* Shops */}
          <Link
            to="/shops"
            className="
              flex items-center gap-4
              p-5
              rounded-xl
              bg-white
              shadow
              hover:shadow-md
              transition-all
              border
              border-[#FAD443]
            "
          >
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaStore size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Shops</h2>
              <p className="text-sm text-gray-500">Manage shop information</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
