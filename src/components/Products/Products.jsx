import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { WishlistContext } from '../../Context/WishlistContext';

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  let { addToCart } = useContext(CartContext);
  let { toggleWishlistItem, addToWish } = useContext(WishlistContext);

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    console.log(response);
  }

  async function getProducts() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(response?.data.data);
      console.log(response.data.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-center pt-16 font-semibold mt-10 text-3xl md:text-4xl text-[#334464] border-b-2 pb-6">
            All Products
          </h1>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="item shadow-lg hover:shadow-[#7234fa] border-[1px] border-transparent p-4 rounded-2xl transition-shadow duration-300"
                >
                  <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                    <div className="product">
                      <img src={product.imageCover} className="w-full" alt="" />
                      <span className="block font-light text-[#7234fa]">{product.category.name}</span>
                      <h3 className="text-md font-normal text-[#334464]">
                        {product.title.split(' ').slice(0, 2).join(' ')}
                      </h3>
                      <div className="flex justify-between">
                        <span>{product.price} EGP</span>
                        <span>
                          {product.ratingsAverage}{' '}
                          <i className="fas fa-star text-yellow-400"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleWishlistItem(product.id)}
                    className="pt-2 w-full"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-md text-[#7234fa]">
                        Add to Wishlist
                      </span>
                      <i
                        className={`fa-heart fa-solid fa-lg ${
                          addToWish.includes(product.id)
                            ? 'text-red-600'
                            : 'text-[#7234fa]'
                        }`}
                      ></i>
                    </div>
                  </button>
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="btn mt-3 w-full"
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
