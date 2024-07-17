import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Loader from '../Loader/Loader';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllBrands() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(response.data.data);
      console.log(response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  const handleBrandClick = (brand) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={brand.image}
                alt={brand.name}
              />
            </div>
            <div className="ml-3 flex-1 flex items-center justify-center">
              <p className="text-lg font-medium text-gray-900 mt-2">
                {brand.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-center mt-12 py-12 font-semibold text-3xl md:text-4xl text-[#334464] border-b-2 pb-6">
            All Brands
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto w-[90%] pb-32 mt-12">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="shadow-lg hover:shadow-[#7234fa] border-[1px] border-transparent flex flex-col p-4 rounded-2xl items-center justify-center transition-shadow duration-300"
                onClick={() => handleBrandClick(brand)}
              >
                <img className="h-auto pb-6 max-w-full rounded-lg" src={brand.image} alt={brand.name} />
                <h3 className="text-center font-medium text-xl text-[#334464] py-4">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
