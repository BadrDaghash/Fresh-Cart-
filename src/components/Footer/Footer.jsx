import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
  <>
   <div className='py-3 text-center footer bg-[#000000] '> 
      <h2 className='text-white font-normal text-lg'>Created By <Link className='text-[#7234fa] hover:text-[#5b28c8] text-xl' to="https://github.com/BadrDaghash">Badr Daghash</Link> ©2024</h2>
    </div> 
  </>
  )
}
