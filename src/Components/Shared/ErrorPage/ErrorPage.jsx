import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">Oops!</h1>

      <p className="mt-4 text-gray-600">Sorry, something went wrong.</p>

      {error?.status && (
        <p className="mt-2 text-sm text-gray-500">Error code: {error.status}</p>
      )}

      <Link
        to="/home"
        className="
          mt-6
          px-6
          py-2
          bg-[#F9CF2F]
          text-black
          rounded
          font-medium
          hover:opacity-90
          transition
        "
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
