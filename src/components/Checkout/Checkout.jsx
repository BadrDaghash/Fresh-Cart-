import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
export default function Checkout() {
  const navigate = useNavigate()
  const { onlinePayment, CashPayment } = useContext(CartContext);
  const [cashOrderData, setCashOrderData] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: (values) => {
      if (orderType === 'cash') { payCash(values); }
      else {
        payNow(values)
      }

    },
  });

  async function payNow(values) {
    await onlinePayment(values);
  }

  async function payCash(values) {
   let response = await CashPayment(values);
     if(response?.data?.status == 'success'){
      navigate('/allorders')
      console.log('cashPayment success');
     }else{
      console.log('error');
     }

    console.log(values, 'cash');
  }


  return (
    <>
      <div className="h-screen bg-[#334464] pt-2 flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="font-medium pb-4 text-center text-3xl text-[#312f36]">Checkout</h1>
          <form className="mx-auto" onSubmit={formik.handleSubmit}>
            {/* City */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#7234fa]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City :
              </label>
            </div>

            {/* phone */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300   focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#7234fa]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone :
              </label>
            </div>
            {/* details */}
            <div className="relative z-0 w-full mb-5 group">
              <textarea
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
                name="details"
                id="details"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300   focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
                placeholder=" "
              />

              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#7234fa]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Address :
              </label>
            </div>

            <div className="flex">
              <button
                type="submit"
                onClick={() => {
                  setOrderType('cash');
                }}
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 mr-2 text-center   "
              >
                Cash Order
              </button>
              <button
                type="submit"
                onClick={payNow}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center   "
              >
                Online Order
              </button>
            </div>
          </form>
        </div>

      </div>
    </>
  );
}