import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
   

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-[140px] md:text-[200px] font-extrabold leading-none text-blue-600">
          404
        </h1>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-4 max-w-md mx-auto text-gray-500 text-lg">
          Sorry, the page you are looking for doesn't exist or has been
          moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold
          hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-200"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}