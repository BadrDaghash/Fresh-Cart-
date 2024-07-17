
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import style from './home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainCategory from '../MainCategory/MainCategory';
import Loader from '../Loader/Loader'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  async function getProducts() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    console.log(data);
    setIsLoading(false)

    
  }
  useEffect(() => {
    getProducts();
  }, []);
 
  
  return <>
    {isLoading ? (
      <Loader/>
    ):(
      <> 
      <MainCategory />
      <CategoriesSlider />
      <RecentProducts />

</>)}</>
  
    
   
  
}
