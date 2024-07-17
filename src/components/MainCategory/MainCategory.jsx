import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Main1 from '../../assets/main-slider-1.jpg';
import Main2 from '../../assets/main-slider-2.jpg';
import Main3 from '../../assets/main-slider-3.jpg';
import Main0 from '../../assets/main-slider-0.jpg';
import Main00 from '../../assets/main-slider-00.webp';

export default function MainCategory() {
  const [first, setFirst] = useState(0);

  useEffect(() => {}, []);

  var settings = {
    dots: true,
    autoplay: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-[90%] mx-auto mb-8 md:mt-24 mt-36 gap-4">
        <div className="lg:w-3/4 w-full">
          <Slider {...settings}>
            <img src={Main1} alt="MainCategory1" className="w-full h-auto lg:h-[400px] object-cover" />
            <img src={Main2} alt="MainCategory2" className="w-full h-auto lg:h-[400px] object-cover" />
            <img src={Main3} alt="MainCategory3" className="w-full h-auto lg:h-[400px] object-cover" />
          </Slider>
        </div>
        <div className="lg:w-1/4 w-full flex flex-col gap-4">
          <img src={Main00} alt="MainCategory00" className="w-full h-auto lg:h-[200px] object-cover" />
          <img src={Main0} alt="MainCategory0" className="w-full h-auto lg:h-[200px] object-cover" />
        </div>
      </div>
    </>
  );
}
