import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';

export default function Wishlist() {
  const { addToCart } = useContext(CartContext);
  const [whichItems, setWhichItems] = useState([]);
  const [count, setCount] = useState(0);
  const { getWhichItems, removeWhichItem, isLoading } = useContext(WishlistContext);

  async function getItems() {
    try {
      const response = await getWhichItems();
      console.log(response);
      if (response?.data?.data) {
        setWhichItems(response.data.data);
        setCount(response.data.data.length);
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function addProductToCart(productId) {
    try {
      const response = await addToCart(productId);
      console.log(response);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  async function removeItem(productId) {
    try {
      const response = await removeWhichItem(productId, count);
      console.log(response);
      if (response?.data?.data) {
        setCount(response.data.data.length);
        setWhichItems((prevItems) => prevItems.filter(item => item.id !== productId));      } else {
        console.log('Error removing item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='pb-16'>
            <h1 className='text-center font-semibold mt-24 text-3xl md:text-4xl text-[#334464] border-b-2 pb-6 '> Wishlist </h1>
            {count > 0 ? (
              <div className="row w-[92%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {whichItems.map((product) => (
                  <div key={product.id} className="w-full max-w-sm mx-auto mt-4 bg-white border border-gray-200 rounded-lg shadow ">
                    <a href="#">
                      <img className="p-8 rounded-t-lg" src={product.imageCover} alt="product image" />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{product.title}</h5>
                      </a>
                      <div className="flex justify-between items-center mt-2.5 mb-5">
                        <p className="text-2xl font-medium text-gray-900  ">{product.price} EGP </p>
                      <div className='flex items-center'>
                          <i className="fa-solid fa-star ms-1 text-yellow-400"></i>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">{product.ratingsAverage}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <button onClick={() => addProductToCart(product.id)} className="text-white bg-[#7234fa] hover:bg-[#5b28c8] duration-300 transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add to cart</button>
                        <button onClick={() => removeItem(product.id)} className="text-white bg-red-600 hover:bg-red-700 duration-300 transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Remove <i className="fa-solid fa-trash ms-1"></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='w-[50%] p-16 justify-center items-center mx-auto mt-32 bg-[#334464] rounded-md'>
                <h2 className='font-bold text-2xl text-center text-white '>No Products In Which List</h2>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}






