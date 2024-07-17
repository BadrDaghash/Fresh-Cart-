import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';

export default function RecentProducts() {
  let { addToCart } = useContext(CartContext);
  let { toggleWishlistItem, addToWish } = useContext(WishlistContext);

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    console.log(response);
  }

  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecent
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        {data?.data.data.map((product) => (
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
  );
}
