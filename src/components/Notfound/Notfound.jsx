import React, { useEffect, useState } from 'react'
import style from "./Notfound.module.css"
import NotFound from '../../assets/Notfound.webp'

export default function Notfound() {
  const [first, setFirst] = useState(0)
useEffect(() => {})
return <>

  <div> 
    <img src={NotFound} alt="notfound-image" className='h-screen w-full' />
  </div>
  </>
}
