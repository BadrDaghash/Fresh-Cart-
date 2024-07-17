import React, { useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function ForgetPassword() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleForget(formValues) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValues)
      .then(function (apiResponse) {
        console.log(apiResponse.data); // Debug log
        if (apiResponse.data.statusMsg === "success" ) {
          navigate('/verification', { state: { email: formValues.email } });
        }  else {
          console.log('Error in response'); // Debug log
        }
        setIsLoading(false);
      })
      .catch(function (apiResponse) {
        setIsLoading(false);
        setApiError(apiResponse?.response?.data?.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleForget,
    validationSchema,
  });

  return (
    <div className='h-screen bg-[#334464] pt-2 flex items-center justify-center'>
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>
        )}
        <div className='flex flex-wrap justify-center'>
          <h2 className='text-2xl font-medium text-[#334464] pb-4'>Forgot Your Password?</h2>
        </div>
        <form className="mt-4 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#7234fa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Email:
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
          <div className='flex pt-6 justify-center'>
            <button
              type="submit"
              className="w-full md:w-full px-6 py-2 text-white bg-[#7234fa] hover:bg-[#5b28c8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center"
            >
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : " Verify "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
