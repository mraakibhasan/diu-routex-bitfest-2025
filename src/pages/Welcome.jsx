import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="w-full max-w-lg mx-auto mb-6">
        <img
          src="https://source.unsplash.com/featured/?kitchen" // Online image source
          alt="Kitchen Buddy"
          className="rounded-lg shadow-md"
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Mofa's Kitchen Buddy
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Manage your ingredients and find recipes tailored to what you have at home.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/ingredients"
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition"
        >
          Manage Ingredients
        </Link>
        <Link
          to="/recipes"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition"
        >
          View Recipes
        </Link>
      </div>
    </div>
  );
};Welcome

export default Welcome;
