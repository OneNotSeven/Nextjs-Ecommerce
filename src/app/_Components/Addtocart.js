"use client"
import React from 'react'
import { cartDatApi, cartapidata, counterUpdaterApi } from "@/controller/controller";
import { apiBaseUrl } from '@/config';

const Addtocart = () => {
    
    console.log("valid", data.id)
    console.log("valid2", data.productsUniqueId)
    const added = async () => {
        
    

    try {
      
        const jwtverify = async () => {
            const verifydone = await fetch(`${apiBaseUrl}/api/tokengetter`, {
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
        const oops = cartfill.message.filter((items) => items.productsUniqueId == data.id)
        // console.log("oops", oops)
    
        // if (oops.length != 0) {
        //     const valueCounterUpdaterApi = await counterUpdaterApi({ userid: userId, productid: oops[0]._id, counter: counter })
        //     const resValueCounter = await valueCounterUpdaterApi.json();
            // console.log("updatingProgress", resValueCounter)
        // }

        const datacart = { userid: userId, productsUniqueId: data.id, title: data.title, price: data.price, category: data.category, description: data.description,image: data.thumbnail, reviews: data.reviews }
    
        if (oops.length == 0) {
            const cartRes = await cartapidata(datacart)
            const john = await cartRes.json()
        }
    
    } catch (error) {
        // console.log("not available")
    }
    
}

    

  
  return (
      <>
       <button onClick={()=>added()} className="btn bg-gray-950 group-hover:block hover:bg-gray-800 rounded-tr-2xl absolute w-40 top-[14.6rem] p-3 text-white">Buy Now</button>
       
      </>
  )
}

export default Addtocart