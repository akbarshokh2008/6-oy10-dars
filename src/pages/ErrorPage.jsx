import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-blue-800 mb-6">404</h1>
      <p className="text-xl text-gray-500 mb-8">
        Ooo! siz noto'g'ri manzilga tushdiz
      </p>
      <button
        onClick={handleGoBack}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-800 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Home ga qaytish
      </button>
    </div>
  );
};

export default ErrorPage;
