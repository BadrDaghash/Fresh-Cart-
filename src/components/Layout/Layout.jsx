import React from 'react'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Register from '../Register/Register'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet></Outlet>
    <Footer/>
    </>
  )
}
