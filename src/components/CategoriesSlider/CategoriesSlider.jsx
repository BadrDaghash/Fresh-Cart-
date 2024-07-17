import React, { useEffect, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";


export default function CategoriesSlider() {
  const [categories, setCategories] = useState([])
  function getCategory() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        console.log(data.data);
      })
      .catch((error) => console.error(error))
  }


  useEffect(() => { getCategory() }, [])
  var settings = {
    dots: true,
    autoplay:true,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    
  };
  return <>

<div className=' bg-[#334464] pt-4 mb-8 w-[95%] mx-auto '>
<h3 className='text-white ps-6 mb-4 text-lg font-semibold '>Shop Popular Categories</h3>
<Slider {...settings}>
      {categories?.map((category) => <div key={category.id} className='bg-white'>
        <img src={category.image} className='w-full h-[200px]' alt={category.title} />
        <p className='text-black text-md font-light text-center pt-2'>{category.name}</p>  
      </div>
      )
      }
    </Slider>
</div>
<div className='border-b-2 py-8'></div>


  </>
}
