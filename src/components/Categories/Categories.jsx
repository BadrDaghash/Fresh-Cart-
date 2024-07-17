import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  async function getAllCategories() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(response.data.data);
      console.log(response.data.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCategoryClick = (category) => {
    toast((t) => (
      <span>
        Category <b className="text-[#7234fa] px-2">{category.name}</b>
        <button onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </button>
      </span>
    ));
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-center mt-24 font-semibold text-lg md:text-4xl text-[#334464] border-b-2 pb-6">
            All Categories
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[90%] mx-auto mb-12">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="relative shadow-lg hover:shadow-[#7234fa] border-[1px] border-transparent flex flex-col p-4 rounded-2xl items-center justify-center transition-shadow duration-300"
              >
                <img
                  src={category.image}
                  className="w-full h-auto object-cover rounded-lg"
                  alt="categories-image"
                />
                <h3 className="text-center w-full bg-[#7234fa] rounded-lg absolute bottom-0 font-medium text-md text-white py-2 mb-2">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
