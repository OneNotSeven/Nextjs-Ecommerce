"use client"
import React from 'react'
import { IoArrowForward } from "react-icons/io5";

const Showcasebtn = (props) => {
  return (
    <>
      <div className="absolute bottom-16 left-28">

      <button className='flex p-4 items-center g-2  text-white text-2xl bg-fuchsia-500 w-56'>{props.val}<IoArrowForward/></button>
      </div>
      
      </>
  )
}

export default Showcasebtn