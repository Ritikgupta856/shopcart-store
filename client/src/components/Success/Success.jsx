import React from 'react'
import {BsBagCheckFill} from 'react-icons/bs'


import { useNavigate } from "react-router-dom";

function Success() {

  const navigate = useNavigate();
  return (
    <div className='h-screen w-full'>
      <div className="flex flex-col justify-center h-full items-center gap-4 bg-neutral-400"> 
      <div className="icon">
      <BsBagCheckFill size={40}/>
      </div>
     <h2>Thank you for your purchase</h2>
     <p className='description'> If you have any questions , please email&nbsp; <a href='mailto:order@gmail.com' className='email-msg'>order@gmail.com</a> </p>
     <button className='p-3 rounded-xl bg-red-500 text-white' onClick={() => navigate("/")}>Continue Shopping</button>
     </div>
    </div>
  )
}

export default Success
