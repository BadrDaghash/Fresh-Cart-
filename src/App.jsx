import Layout from './components/Layout/Layout';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Notfound from "./components/Notfound/Notfound";
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import Logout from './components/Logout/Logout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Allorders from './components/Allorders/Allorders';
import Checkout from './components/Checkout/Checkout';
import Forgetpassword from './components/Forgetpassword/Forgetpassword';
import Verification from './components/Verification/Verification';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Wishlist from './components/Wishlist/Wishlist';
import WishlistContextProvider from './Context/WishlistContext';


// Create a new QueryClient instance
const query = new QueryClient();

// Create routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/', element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute>  <Cart /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute>  <Wishlist/></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute>  <Checkout /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute>  <Products /> </ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute>  <ProductDetails /> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute>  <Allorders /> </ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login/> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'forgetpassword', element:  <Forgetpassword/> },
      { path: 'verification', element: <Verification/>  },
      { path: 'logout', element: <Logout /> },
      { path: '*', element: <Notfound /> },
    ]
  },
]
);


function App() {
  return (
    <QueryClientProvider client={query}> 
      <UserContextProvider>
        <CounterContextProvider> 
          <CartContextProvider>
            <WishlistContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
            <ReactQueryDevtools />
            
            </WishlistContextProvider>
          </CartContextProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;