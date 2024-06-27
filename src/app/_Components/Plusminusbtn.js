"use client"
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { cartDatApi, cartapidata, counterUpdaterApi } from "@/controller/controller";

import Comments from "@/app/_Components/Comments";
import { apiBaseUrl } from "@/config";

const Plusminusbtn = ({ data }) => {
  // console.log("opy",data)
  var val
  if (data) {
    if (data.price != undefined) {
      val = parseInt(data.price)
      // console.log("prrprprprp",data.price)
    } else {
      val=null
    }
  }
    const [price, setprice] = useState(val)
  const [counter, setcounter] = useState(1)
  
  const [contextInfo, setcontextInfo] = useState({})
  
 
  const myid=toString(contextInfo)
  
 

// console.log("pata hai",contextInfo)



  const cartdatastr = async () => {
    
  
   
    

    try {
      
        const jwtverify = async () => {
          const verifydone= await fetch(`${apiBaseUrl}/api/tokengetter`, {
           method: "Post"
          })
           const responseVerify = await verifydone.json()
           return responseVerify
        }
        const userId = jwtverify().then((response) => {
          return response.verifytoken.userid;
        })
     
      
     
      
     
    const cartMainData = await cartDatApi({ userid: userId })
    const cartfill = await cartMainData.json()
    // console.log("don", cartfill)
    const oops = cartfill.message.filter((items) => items.productsUniqueId==data.id)
    // console.log("oops", oops)
    
    if (oops.length != 0) {
      const valueCounterUpdaterApi = await counterUpdaterApi({userid:userId,productid:oops[0]._id,counter:counter})
      const resValueCounter = await valueCounterUpdaterApi.json();
      // console.log("updatingProgress",resValueCounter)
    }

    const datacart = { userid:userId,productsUniqueId:data.id, title: data.title, price: data.price,category:data.category, description: data.description, numberOfInputs:counter,image:data.thumbnail,reviews: data.reviews }
    
    if (oops.length == 0) {
      const cartRes = await cartapidata(datacart)
      const john=await cartRes.json()
   }
      
    } catch (error) {
    //  console.log("not available")
    }
    
    

    
}
  
    var plusval = counter
    var prices =price

    const plus = () => {

        if (plusval != 10) {
            plusval = plusval + 1
            setcounter(plusval)

            prices =Math.round((prices + parseInt(data.price,10) ) * 100) / 100 
        
        setprice(prices)
    }
            
    
        
    }

    const minus = () => {
       
        if (plusval!==1) {
            plusval = plusval - 1
            setcounter(plusval)
            prices=Math.round((prices - parseInt(data.price,10) ) * 100) / 100 
            setprice(prices)
        }
    }

  return (
    <>
      {data ? <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
        <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600  dark:text-white"><Link href="/">Home</Link> / {data.category} / {data.title}</p>
        <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-100 dark:text-white mt-4">{data.title}</h2>
      
        <div className="flex mt-5 gap-4">
                      
          <p className="hover:underline flex gap-1 cursor-pointer">
          <svg class="w-6 h-6 text-yellow-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
</svg>
{data.reviews?.length}  reviews
            </p>

          
          <button onClick={() => {
            const commentuser = document.querySelector(".userComments")
            commentuser.classList.remove("hidden")
          }} className=" hover:underline flex gap-1 cursor-pointer">
            <svg class="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"/>
</svg>

            comment</button>
        </div>
       
        {data ? <Comments data={data} /> : <Comments />}
      
      
        <p className="font-normal text-base leading-6 text-gray-600  mt-7">{data.description}</p>
        <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 dark:text-white">$ {price}</p>
      
        <div className="lg:mt-11 mt-10">
          <div className="flex flex-row justify-between">
            <p className="font-medium text-base leading-4 text-gray-600 ">Select quantity</p>
            <div className="flex">
              <button
                id="minuscounter"
                onClick={() => { minus() }}
                className="focus:outline-none dark:text-white cursor-pointer w-7 h-7 flex items-center justify-center pb-1"
              >
                -
              </button>
              <input
                id="counter"
                aria-label="input"
                className="border dark:text-white border-gray-300 dark:bg-transparent h-full text-center w-14 pb-1"
                type="text"
                value={counter}
              />
              <button
                onClick={() => { plus() }}
                className="focus:outline-none dark:text-white focus:ring-offset-2 cursor-pointer w-7 h-7 flex items-center justify-center pb-1"
              >
                +
              </button>
            </div>
                            
          </div>
          <hr className="bg-gray-200 w-full my-2" />
          <div className="flex flex-row justify-between items-center mt-4">
            <p className="font-medium text-base leading-4 text-gray-600 ">Dimensions</p>
            <img onclick="rotate()" id="rotateSVG" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer transform duration-100  dark" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/svg4.svg" alt="dropdown" />
            {/* <img onclick="rotate()" id="rotateSVG" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer transform duration-100 hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/svg4dark.svg" alt="dropdown"> */}
          </div>
          <hr className="bg-gray-200 w-full mt-4" />
        </div>
      
        <button onClick={() => { cartdatastr() }} className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">Add to shopping bag</button>
      </div> : <p>network error</p>}
    </>
  );
};

export default Plusminusbtn;
