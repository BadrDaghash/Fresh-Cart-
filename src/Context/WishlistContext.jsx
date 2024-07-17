import axios from "axios";
import { createContext,useState } from "react";
import toast from "react-hot-toast";
export const WishlistContext = createContext()
export default function WishlistContextProvider(props) {
    const headers = {
        token: localStorage.getItem("userToken")
    }
    const [isLoading, setIsLoading] = useState(true);
    const [addToWish,setAddToWish] = useState([])
    async function addToWhich(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers })
            .then(response => {
               if(response?.data?.status == 'success'){
                console.log(response, 'add response');
                toast.success('Product added to Wishlist');
                setIsLoading(false);
                setAddToWish((prevWishlist) => [...prevWishlist, productId]);
               }else{
                console.log('error');
               }
                return response
            }).catch(error => {
                console.log(error);
                return error
            })
    }
    async function getWhichItems() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then(response => {
                console.log(response, 'get response');
                setIsLoading(false);
                setAddToWish((prevWishlist) => [...prevWishlist]);
                return response
            }).catch(error => {
                console.log(error);
                return error
            })
    }
    async function removeWhichItem(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            .then(response => {
               if(response?.data?.status== 'success'){
                console.log('removed');
                setAddToWish((prevWishlist) => prevWishlist.filter(id => id !== productId));
                toast.error('Product removed from Wishlist');
                setIsLoading(false);
               }             
                return response
            }).catch(error => {
                console.log(error);
            })
    }
    async function toggleWishlistItem(productId) {
        if (addToWish.includes(productId)) {
          await removeWhichItem(productId);
        } else {
          await addToWhich(productId);
        }
      }
    return (
        <WishlistContext.Provider value={{ addToWhich, getWhichItems ,removeWhichItem,isLoading ,toggleWishlistItem ,addToWish,setIsLoading }}>
            {props.children}
        </WishlistContext.Provider>
    )
}