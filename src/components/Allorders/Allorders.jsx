import React, { useEffect, useState, useContext } from 'react';
import Master from './../../assets/master.png';
import Visa from './../../assets/visa.png';
import Payoneer from './../../assets/payoneer.png';
import Paypal from './../../assets/paypal.png';
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';

export default function Allorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const { getAllOrders } = useContext(CartContext);

  async function getOrders() {
    try {
      let response = await getAllOrders();
      setOrders(response?.data?.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <h1 className="text-center pt-16 pb-6 font-semibold mt-10 text-3xl md:text-4xl text-[#334464] border-b-2">ALL ORDERS</h1>
      {loading ? (
       <div className="h-screen"><Loader/> </div> 
      ) : (
        <div className="w-full mx-auto px-4">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col md:flex-row mb-6 py-4 mx-auto border-solid border-b-2">
              <div className="md:w-4/6 p-4 bg-white">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-900">
                    <thead className="text-sm text-white uppercase bg-[#334464]">
                      <tr>
                        <th scope="col" className="px-6 py-3 rounded-s-lg"></th>
                        <th scope="col" className="px-6 py-3">Product Name</th>
                        <th scope="col" className="px-6 py-3">Qty</th>
                        <th scope="col" className="px-6 py-3 rounded-e-lg">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item) => (
                        <tr key={item.product.id} className="bg-white">
                          <td className="px-6 py-4">
                            <img src={item.product.imageCover} alt={item.product.title} className="w-28 h-28 object-cover rounded" />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {item.product.title.split(' ').slice(0, 2).join(' ')}
                          </td>
                          <td className="px-6 py-4">
                            {item.count}
                          </td>
                          <td className="px-6 py-4">
                            {item.price} EGP
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-2/6 p-4 bg-white rounded-lg shadow-md">
                <h5 className="text-2xl font-bold text-center pb-2 text-[#334464]">ORDER SUMMARY</h5>
                <p className="tracking-tight"><span className="text-md font-semibold">Order Id: </span>{order.id}</p>
                <p className="tracking-tight"><span className="text-md font-semibold">Created At: </span>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="tracking-tight"><span className="text-md font-semibold">Payment Method: </span>{order.paymentMethodType}</p>
                <p className="tracking-tight"><span className="text-md font-semibold">Tax Price: </span>{order.taxPrice}</p>
                <p className="tracking-tight"><span className="text-md font-semibold">Total Price: </span>{order.totalOrderPrice}</p>
                <p className="tracking-tight"><span className="text-md font-semibold">Delivered: </span>{order.isDelivered ? 'Yes' : 'No'}</p>
                <p className="tracking-tight"><span className="text-md font-semibold">Paid: </span>{order.isPaid ? 'Yes' : 'No'}</p>
                <div className="flex justify-center items-center mt-4 space-x-4">
                  <img src={Master} alt="Mastercard" className="w-12" />
                  <img src={Visa} alt="Visa" className="w-12" />
                  <img src={Payoneer} alt="Payoneer" className="w-12" />
                  <img src={Paypal} alt="Paypal" className="w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
