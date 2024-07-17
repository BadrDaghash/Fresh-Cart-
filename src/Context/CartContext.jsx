import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartID, setCartID] = useState(null);
    const headers = {
        token: localStorage.getItem("userToken")
    };

    async function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then(response => {
                toast.success(response.data.status);
                setNumOfCartItems(response?.data?.numOfCartItems);
                setTotalPrice(response?.data?.data.totalCartPrice);
                setCartID(response?.data?.data._id);
                setIsLoading(false);
                return response;
            })
            .catch(error => {
                toast.error('Failed to add item');
                setIsLoading(false);
                return error;
            });
    }

    async function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then(response => {
                setNumOfCartItems(response?.data?.numOfCartItems);
                setTotalPrice(response?.data?.data.totalCartPrice);
                setCartID(response?.data?.data._id);
                setIsLoading(false);
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }

    async function removeCartItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then(response => {
                setNumOfCartItems(response?.data?.numOfCartItems);
                setTotalPrice(response?.data?.data.totalCartPrice);
                setIsLoading(false);
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    async function removeCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then(response => {
                setCartID(null);
                setNumOfCartItems(0);
                setTotalPrice(0);
                setIsLoading(false);
                return response;
            })
            .catch(error => {
                return error;
            });
    }

    async function updateCartItems(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
            .then(response => {
                setNumOfCartItems(response?.data?.numOfCartItems);
                setTotalPrice(response?.data?.data.totalCartPrice);
                setIsLoading(false);
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }

    async function onlinePayment(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`, { shippingAddress }, { headers })
            .then(response => {
                window.location.href = response?.data?.session.url;
                setIsLoading(false);
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }

    async function CashPayment(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, { shippingAddress }, { headers })
            .then(response => {
                setIsLoading(false);
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }

    async function getAllOrders(headers) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`, { headers })
            .then(response => {
                setIsLoading(false);
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    }

    return (
        <CartContext.Provider value={{
            addToCart, getCartItems, removeCartItems, updateCartItems,
            numOfCartItems, totalPrice, isLoading, setIsLoading, onlinePayment, CashPayment, getAllOrders, removeCart
        }}>
            {props.children}
        </CartContext.Provider>
    );
}
