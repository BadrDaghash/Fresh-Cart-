import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Verify() {
  const { setUserLogin } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().length(6, 'Reset code must be exactly 6 digits').required('Reset code is required'),
  });

  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  function Verify(formValues) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: formValues.resetCode })
      .then(function (apiResponse) {
        console.log("API response:", apiResponse.data.status);
        if (apiResponse?.data?.status === "Success") {
          console.log("Success case - Navigating to /login");
          navigate('/resetpassword');
        } else {
          console.log("Error in response:", apiResponse.data.status);
          setApiError(apiResponse?.data?.message || 'An error occurred');
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("API error:", error);
        setIsLoading(false);
        setApiError(error?.response?.data?.message || 'An error occurred');
      });
  }

  const formik = useFormik({
    initialValues: {
      resetCode: ""
    },
    onSubmit: values => {
      Verify(values);
    },
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
          <h2 className='text-2xl font-semibold text-[#334464] pb-4'>E-Mail Verification</h2>
        </div>

        <form className="mt-4 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="flex mb-2 space-x-2 rtl:space-x-reverse justify-center items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <label htmlFor={`code-${i + 1}`} className="sr-only">Code {i + 1}</label>
                <input
                  type="text"
                  maxLength="1"
                  id={`code-${i + 1}`}
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500   "
                  required
                  value={formik.values.resetCode[i] || ""}
                  onChange={e => {
                    const newValue = formik.values.resetCode.split('');
                    newValue[i] = e.target.value;
                    formik.setFieldValue('resetCode', newValue.join(''));
                  }}
                />
              </div>
            ))}
          </div>
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="text-red-500 text-sm">{formik.errors.resetCode}</div>
          )}
          <p id="helper-text-explanation" className="mt-4 mb-2 flex justify-center items-center text-sm text-gray-500 ">
            Please enter the 6-digit code we sent via email.
          </p>
          <div className='flex pt-6 justify-center'>
            <button type="submit" className="w-full md:w-auto px-6 py-2 text-white bg-[#7234fa] hover:bg-[#5b28c8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center ">
              {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
