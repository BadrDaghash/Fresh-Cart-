import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const { getCartItems, removeCartItems, updateCartItems, removeCart, totalPrice, isLoading, setIsLoading } = useContext(CartContext);

    async function getCart() {
        setIsLoading(true);
        const response = await getCartItems();
        if (response?.data?.data?.products) {
            setCartProducts(response.data.data.products);
        } else {
            console.error(response);
        }
        setIsLoading(false);
    }

    async function removeItems(productId) {
        setIsLoading(true);
        const response = await removeCartItems(productId);
        if (response?.data?.data?.products) {
            setCartProducts(response.data.data.products);
        } else {
            console.error(response);
        }
        setIsLoading(false);
    }

    async function removeCartProducts() {
        setIsLoading(true);
        const response = await removeCart();
        setCartProducts([]);
        setIsLoading(false);
    }

    async function updateItems(productId, count) {
        setIsLoading(true);
        if (count <= 0) {
            await removeItems(productId);
        } else {
            const response = await updateCartItems(productId, count);
            if (response?.data?.data?.products) {
                setCartProducts(response.data.data.products);
            } else {
                console.error(response);
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className='w-[90%] mx-auto mb-20 p-6 pt-10 mt-14'>
                    <h1 className='text-center font-semibold mb-6 text-3xl md:text-4xl text-[#334464] border-b-2 pb-6'>Cart Items</h1>
                    {cartProducts.length > 0 ? (
                        <div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-white uppercase bg-[#334464] dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">Image</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">Product</th>
                                            <th scope="col" className="px-6 py-3">Qty</th>
                                            <th scope="col" className="px-6 py-3">Count</th>
                                            <th scope="col" className="px-6 py-3">Price</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartProducts.map((product) => (
                                            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="p-4">
                                                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                                    {product.product.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <button onClick={() => updateItems(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                            <span className="sr-only">Decrease quantity</span>
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <div>{product.count}</div>
                                                        <button onClick={() => updateItems(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                            <span className="sr-only">Increase quantity</span>
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                                    {product.count}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                                    {product.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => removeItems(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between py-4'>
                                <h2 className='text-[#334464] font-bold text-lg md:text-xl'>Total Price: {totalPrice} EGP</h2>
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    <Link to="/checkout" className='text-white bg-[#7234fa] hover:bg-[#5b28c8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Checkout</Link>
                                    <button onClick={() => removeCartProducts()} className='bg-red-600 hover:bg-red-700 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Clear Cart</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='w-[50%] p-16 flex flex-col justify-center items-center mx-auto mt-32 bg-[#334464] rounded-md'>
                            <h2 className='font-bold text-2xl text-center text-white'>No Products In Cart</h2>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
