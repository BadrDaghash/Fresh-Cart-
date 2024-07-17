import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import { WishlistContext } from '../../Context/WishlistContext';
export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState({})
  const [relatedProduct, setRelatedProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let { id, category } = useParams()
  let { addToCart } = useContext(CartContext)
  let { toggleWishlistItem, addToWish } = useContext(WishlistContext)
  
  async function addProductToCart(productId) {
    let response = await addToCart(productId)
    console.log(response);
  }

  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }
  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data
        let related = allProducts.filter((product) => product.category.name === category);
        setRelatedProduct(related)
        setIsLoading(false)
      })
      .catch((error) => { })
  }
  useEffect(() => {
    getProductDetails(id)
    getRelatedProducts(category)
  }, [id, category])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return <>
    {isLoading ? (
      <Loader />
    ) : (<>
      <div >
        <div className="row w-[80%] mx-auto mt-12">
          <div className="w-2/6 pe-10">
            <Slider {...settings}>
              {productDetails?.images?.map((src) => (<img src={src} className='w-full' alt={productDetails.title} />))}
            </Slider>


          </div>
          <div className="w-4/6 p-4 ">
            <h1 className='text-lg font-semibold text-[#222222] mb-4'>{productDetails?.title}</h1>
            <p className='text-[#334464] font-light'>{productDetails?.description}</p>
            <div className='flex justify-between pt-4 '>
              <span className='font-semibold'> {productDetails?.price} EGP</span>
              <span className='font-semibold'> {productDetails?.ratingsAverage} <i className='fas fa-star text-yellow-400'></i> </span>

            </div>
            <button
              onClick={() => toggleWishlistItem(productDetails.id)}
              className=' pt-2 w-full'
            >
              <div className='flex justify-between items-center '>
                <span className='font-semibold text-md text-[#7234fa]'>Add to Wishlist</span>
                <i className={`fa-heart fa-solid fa-lg ${addToWish.includes(productDetails.id) ? 'text-red-600' : 'text-[#7234fa]'}`}></i>
              </div>
            </button>
            <button onClick={() => addProductToCart(productDetails.id)} className='px-4 py-2 rounded-lg text-white bg-[#7234fa] hover:bg-[#5b28c8] duration-300 w-full mt-3'>Add to cart</button>
          </div>

        </div>
      </div>
      <div className="w-full  ">
        <h2 className='text-2xl font-semibold text-center text-[#334464] border-solid border-t-[1px] pt-6 border-[#ddd8ce]'>Products related to this item.</h2>
        <div className="row w-[90%] mx-auto ">
          {relatedProduct.map((product) => (
            <div key={product.id} className="item w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 py-4 hover:shadow-md hover:shadow-[#7234fa] border-[1px] border-transparent p-4 rounded-2xl transition-shadow duration-300">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <div className="product s-product ">
                  <img src={product.imageCover} className='w-full' alt="" />

                  <span className='block font-light text-[#7234fa]' >{product.category.name}</span>
                  <h3 className='text-md font-normal text-[#334464]'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                  <div className='flex justify-between'>
                    <span> {product.price} EGP</span>
                    <span> {product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i> </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => toggleWishlistItem(product.id)}
                className=' pt-2 w-full'
              >
                <div className='flex justify-between items-center '>
                  <span className='font-semibold text-md text-[#7234fa]'>Add to Wishlist</span>
                  <i className={`fa-heart fa-solid fa-lg ${addToWish.includes(product.id) ? 'text-red-600' : 'text-[#7234fa]'}`}></i>
                </div>
              </button>
              <button onClick={() => addProductToCart(product.id)} className='btn mt-3'>Add to cart</button>
            </div>))}

        </div>
      </div>
    </>
    )}


  </>

}
