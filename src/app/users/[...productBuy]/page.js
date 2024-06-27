import { apiProductsfreeLimit } from '@/controller/controller';
import React from 'react'
import Plusminusbtn from '@/app/_Components/Plusminusbtn';
import Header from '@/app/_Components/Header';
import Link from 'next/link';
import Footer from '@/app/_Components/Footer';
import Othersproducts from '@/app/_Components/Othersproducts';
import { apiBaseUrl } from '@/config';


const page = async (req) => {
    var datarr
    try {
        const dataProducts = await fetch("https://dummyjson.com/products/categories");
         datarr = await dataProducts.json()
    } catch (error) {
        // console.log("error")
    }
   
//    console.log("####",datarr)
    var data
    var ourdata
    var finalourdata
    var sending
    var finalsend
    try {
        data = await apiProductsfreeLimit(req.params.productBuy[1])
       
        if (data != undefined) {
            
            finalsend = data
        }
        
        if (data == undefined) {
            ourdata = await fetch(`${apiBaseUrl}/api/resultcart`, {
                method: "POST",
                body: JSON.stringify({ id: parseInt(req.params.productBuy[1],10)})
            })
            sending = await ourdata.json()
            finalsend = sending.message
            
        }
        
    } catch (error) {
        // console.log("network error on product Buy")
    }
   
   

   
  return (
      <>
      <Header/>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 relative">
            <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
                
       
                  {finalsend!=undefined ? <Plusminusbtn data={finalsend} /> : <Plusminusbtn />} 
      
                 
      
                {finalsend!=undefined ? <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                      <div className="w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
                          <img className="dark:hidden" src={finalsend.thumbnail} width={500} height={600} alt="stars" />
                          {/* some content */}
                      </div>
                      <div className="w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                      {finalsend?.images[1] ?<div className="bg-gray-100 flex justify-center items-center py-4">
                              <img src={finalsend.images[1]} width={500} height={600} alt="Wooden chair - preview 1" /> 
                          </div>: null}
                          {finalsend?.images[2] ?<div className="bg-gray-100 flex justify-center items-center py-4">
                              <img src={finalsend.images[2]} width={500} height={600} alt="Wooden chair - preview 2" /> 
                          </div>: null}
                      </div>
                  </div> :null}
                 
            </div>
           
        </div>

      
<Footer/>
      </>
  )
}

export default page