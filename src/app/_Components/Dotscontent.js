"use client"
import React, { useState } from "react";

const Dotscontent = () => {

    const [showbtn, setshowbtn] = useState(false)

    const show = () => {
        const menu = document.querySelector(".menuDiv")
        if (showbtn == false) {
            menu.classList.remove("hidden")
            setshowbtn(!showbtn)
        }
        else {
            menu.classList.add("hidden")
            setshowbtn(!showbtn)
         }


    }

  return (
    <>
      <div className="relative inline-block ">
        <button onClick={()=>{show()}} className="relative z-10 block p-2 text-gray-700  border-transparent rounded-md dark:text-white focus:ring-opacity-40 dark:focus:ring-opacity-40  dark:bg-gray-800 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        <div
          className="menuDiv hidden absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
        >
         
           <span className="text-gray-700 pl-2">coming soon</span> 
        </div>
      </div>
    </>
  );
};

export default Dotscontent;
