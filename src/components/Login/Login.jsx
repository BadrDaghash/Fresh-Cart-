import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  let { setUserLogin } = useContext(UserContext);
  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z]{5,10}$/, 'Password must start with an uppercase letter, followed by 5 to 10 lowercase letters').required('Password is required'),
  });
  const navigate = useNavigate();

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(formValues) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
      .then(function (apiResponse) {
        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate('/');
        }
        console.log(apiResponse);
        setIsLoading(false);
      })
      .catch(function (apiResponse) {
        setIsLoading(false);
        setApiError(apiResponse?.response?.data?.message);
      });

    console.log(formValues);
    console.log('register');
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema,
  });

  return (
    <div className='min-h-screen bg-[#334464] pt-2 flex justify-center items-center'>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{apiError}</span>
          </div>
        )}
        <div className='flex flex-wrap justify-center mb-4'> 
          <i className="fa-solid fa-circle-user text-[#7234fa] fa-2xl mt-4 pe-2"></i>
          <h2 className='text-2xl font-medium text-[#334464] pb-4'>Login Now</h2>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-3 focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
              placeholder=" "
            />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#7234fa]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email :</label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300   focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
              placeholder=" "
            />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#7234fa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Password :</label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}
          <Link to="/forgetpassword" className='flex justify-end text-md font-medium text-[#334464] hover:text-[#7234fa]'>Forgot Password</Link>
          <div className='flex justify-center mt-6'>
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-white bg-[#7234fa] hover:bg-[#5b28c8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm "
            >
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
