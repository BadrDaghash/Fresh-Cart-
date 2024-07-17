import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  const { setUserLogin } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name must be at least 3 characters long ').max(16, 'Name cannot exceed 12 characters').required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid Egyptian number').required('Phone number is required'),
    password: Yup.string().matches(/^[A-Z][a-z]{5,10}$/, 'Password must start with an uppercase letter, followed by 5 to 10 lowercase letters').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Please re-enter your password'),
  });

  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleRegister(formValues) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
      .then(function (apiResponse) {
        if (apiResponse.data.message === 'success') {
          localStorage.setItem('userToken', apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate('/Login');
        } else {
          console.log('error', apiResponse.data.message);
          setApiError('Registration failed');
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setApiError(error?.response?.data?.message || 'An error occurred');
      });
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    onSubmit: handleRegister,
    validationSchema,
  });

  return (
    <div className='min-h-screen bg-[#334464] pt-2 flex justify-center items-center'>
      <div className="w-full max-w-md bg-white p-8 sm:p-6 sm:mt-12 md:p-8 rounded-lg shadow-md">
        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>
        )}
        <div className='flex flex-wrap justify-center mb-4'>
          <i className="fa-solid fa-circle-user text-[#7234fa] fa-2xl mt-4 pe-2"></i>
          <h2 className='text-2xl font-medium text-[#334464] pb-4'>Register Now</h2>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
              placeholder=" "
            />
            <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#7234fa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter your Name :
            </label>
          </div>
          {formik.errors.name && formik.touched.name && (
            <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          )}

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
            <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#7234fa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter your Email :
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
              placeholder=" "
            />
            <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#7234fa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter your Phone number :
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.phone}</span>
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
              placeholder=" "
            />
            <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#7234fa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter your Password :
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-[#7234fa] peer"
              placeholder=" "
            />
            <label htmlFor="rePassword" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-[#7234fa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter your re-password:
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          )}

          <div className='mt-10 mb-6 text-center w-full'>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-4 w-full bg-[#7234fa] hover:bg-[#4a53e0] text-white rounded-full cursor-pointer"
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </div>
          <div className="mt-6 mb-4 text-sm text-center space-x-2">
            <span className="text-gray-400">Already have an account?</span>
            <Link to='/Login' className="text-[#7234fa]">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
