import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from "../../assets/shopping-cart (1).png";
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  let { numOfCartItems } = useContext(CartContext) || {};
  let navigate = useNavigate()
  const { counter, userName } = useContext(CounterContext);
  const { userLogin, setUserLogin } = useContext(UserContext);

  function LogOut() {
    localStorage.removeItem('userToken')
    setUserLogin(null)
    navigate('/login')
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <nav className="bg-[#222222] fixed w-full z-20 top-0 start-0 shadow-sm shadow-[#222222]    ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 ">
          <a href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src={Logo} className='w-10 me-2' alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">FreshCart</span>
          </a>

          {/* Mobile Menu Button */}
          {userLogin === null ? ' ' : <>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex  items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </>}

          {/* Menu Items */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:justify-between md:w-auto md:order-1`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {userLogin !== null ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `block p-2 font-medium rounded-md transition-colors duration-300 cursor-pointer ${isActive ? 'text-white bg-[#7234fa]' : 'text-[#ddd8ce] md:bg-transparent md:text-white hover:text-[#ffffff] hover:bg-[#7234fa]'}`}
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="products"
                      className={({ isActive }) =>
                        `block p-2 font-medium rounded-md transition-colors duration-300 cursor-pointer ${isActive ? 'text-white bg-[#7234fa]' : 'text-[#ddd8ce] md:bg-transparent md:text-white hover:text-[#ffffff] hover:bg-[#7234fa]'}`}
                      aria-current="page"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="brands"
                      className={({ isActive }) =>
                        `block p-2 font-medium rounded-md transition-colors duration-300 cursor-pointer ${isActive ? 'text-white bg-[#7234fa]' : 'text-[#ddd8ce] md:bg-transparent md:text-white hover:text-[#ffffff] hover:bg-[#7234fa]'}`}
                      aria-current="page"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className={({ isActive }) =>
                        `block p-2 font-medium rounded-md transition-colors duration-300 cursor-pointer ${isActive ? 'text-white bg-[#7234fa]' : 'text-[#ddd8ce] md:bg-transparent md:text-white hover:text-[#ffffff] hover:bg-[#7234fa]'}`}
                      aria-current="page"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="Wishlist"
                      className={({ isActive }) =>
                        `block p-2 font-medium rounded-md transition-colors duration-300 cursor-pointer ${isActive ? 'text-white bg-[#7234fa]' : 'text-[#ddd8ce] md:bg-transparent md:text-white hover:text-[#ffffff] hover:bg-[#7234fa]'}`}
                      aria-current="page"
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li className="relative">
                    <NavLink
                      to="cart"
                      className={({ isActive }) =>
                        `block py-2 px-3 font-medium rounded-md transition-colors duration-300 cursor-pointer ${isActive ? 'text-[#7234fa] bg-white' : 'text-[#ddd8ce] md:bg-transparent md:text-white hover:text-[#ffffff] hover:bg-[#7234fa]'}`}
                      aria-current="page"
                    >
                      <i className="fa-solid fa-cart-shopping fa-lg"></i>
                    </NavLink>
                    <span className="inline-flex absolute top-[-5px] right-[-18px] items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-[#7234fa] bg-[#ffffff] rounded-full">
                      {numOfCartItems}
                    </span>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          {/* Social Links and Auth Links */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className='flex px-2 gap-2 me-4 justify-center items-center'>
              <i className="fa-brands fa-instagram text-white"></i>
              <i className="fa-brands fa-facebook text-white"></i>
              <i className="fa-brands fa-tiktok text-white"></i>
              <i className="fa-brands fa-twitter text-white"></i>
              <i className="fa-brands fa-linkedin text-white"></i>
              <i className="fa-brands fa-youtube text-white"></i>
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {userLogin === null ? (
                <>
                  <li>
                    <NavLink to="register" className="block py-2 px-3 text-white hover:bg-[#5b28c8] rounded-md cursor-pointer transition-colors duration-300">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="login" className="block py-2 px-3 text-white hover:bg-[#5b28c8] rounded-md cursor-pointer transition-colors duration-300">Login</NavLink>
                  </li>
                </>
              ) : null}
              {userLogin !== null ? (
                <li onClick={LogOut}>
                  <span
                    className="block py-2 px-3 text-white bg-[#7234fa] hover:bg-[#5b28c8] rounded-md cursor-pointer transition-colors duration-300"
                    aria-current="page">
                    Logout
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
