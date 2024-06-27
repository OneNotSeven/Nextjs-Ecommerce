"use client"

import { apiBaseUrl } from "@/config"
import React, { useEffect } from "react"

const Productdelete = ({ data }) => {
    
    const deleteProduct = async () => {
        const shopsval = await fetch(`${apiBaseUrl}/api/shopsupdate/`+`${data}`, {
           method:"DELETE" 
        })
}


  return (
      <>
         
          

          


<div key={data} id="popup-modal" tabindex="-1" class="confirmation hidden overflow-y-auto overflow-x-hidden  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-slate-300 rounded-lg shadow-gray-500 shadow dark:bg-gray-700">
           
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                          <button onClick={() => {
                              deleteProduct()
                              const confirmclose = document.querySelectorAll(".confirmation")
                              confirmclose[idx].classList.add("hidden")

                }} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, Im sure
                </button>
                          <button onClick={() => {
                              const confirmclose = document.querySelectorAll(".confirmation")
                              confirmclose[idx].classList.add("hidden")
                }} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
        </div>
    </div>
</div>

      </>
  )
}

export default Productdelete