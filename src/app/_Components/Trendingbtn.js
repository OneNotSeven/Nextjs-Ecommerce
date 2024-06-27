"use client"
import React from 'react'
import { IoArrowForward } from "react-icons/io5";

const Trendingbtn = (props) => {

  return (
    <>
      <div className="absolute bottom-8 left-8">

      <button className='flex items-center gap-2 p-4  text-white text-2xl bg-fuchsia-500 rounded-md'>{props.val}<IoArrowForward/></button>
      </div>
      
      </>
  )
}

export default Trendingbtn