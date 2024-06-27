"use client"
import { apiBaseUrl } from '@/config'

import { cartDatApi, deleteItemsCart, secondCartDataApi } from '@/controller/controller'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const CartModal = () => {
  const [contextInfo, setcontextInfo] = useState({})
  const [cartAllData, setcartAllData] = useState()
  const [allPrice, setallPrice] = useState()
  const [totalPrice, settotalPrice] = useState()
  const [finalAmount, setfinalAmount] = useState()
  const [error, seterror] = useState(false)
  const redirection=useRouter()

  var userId
  
  useEffect(() => {
    
    // try {
      const jwtverify = async () => {
        try {
          const verifydone = await fetch(`${apiBaseUrl}/api/tokengetter`, {
          method: "Post"
        })
        // console.log("verifydone", verifydone.status)
        
          if (verifydone.status === 500) {
            throw new Error
          }
       
        const responseVerify = await verifydone.json()
        return responseVerify
        } catch (error) {
          seterror(true)
        }
      }

    
    userId = jwtverify().then((response) => {
     
      if (response != undefined) {
            
        return response.verifytoken.userid;
          }
        
      })
    // console.log("jha",userId)
      setcontextInfo(userId)
      if (contextInfo != null && contextInfo && contextInfo != {}) {
        getdata()
      }
    
    }, [])
  

  async function getdata() {
    const userTry =await userId
    const cartMainDataFinal= await secondCartDataApi({ userid: userTry })
    const cartfillData = await cartMainDataFinal.json()
    // console.log("donhghghg", cartfillData.message[0])
    setcartAllData(cartfillData)
    const settingPrice=await cartfillData.message.map((items)=>Number(items.numberOfInputs*items.price))
    setallPrice(settingPrice)
    const addedPrice = await settingPrice.reduce((accumulator, currentval) => accumulator + currentval, 0)
    const roundPrices =Math.round((addedPrice) * 100) / 100 
    settotalPrice(roundPrices)
    const finalAmountDetails = Math.floor(addedPrice + 99 + 799-299)
  setfinalAmount(finalAmountDetails)
  }
  
 

  
  const removeFromCart = async (itemsID,idx,e) => {
   try {
    
    const deletedItemsResponse = await deleteItemsCart(itemsID)
    const finalDeleteRes=await deletedItemsResponse.json()
    // console.log("itemsid",finalDeleteRes)
   } catch (error) {
    return <p>something went wrong</p>
   }
   }
  // console.log("sett",cartAllData)
  // console.log("users", contextInfo)
  
  
  
  
  return (
    <>
      <section className="cart py-8 antialiased dark:bg-gray-900 md:py-16">

  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-200 dark:text-white sm:text-2xl">Shopping Cart</h2>

    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <div className="space-y-6">
                {
                  cartAllData != undefined && error == false ? cartAllData.message.map((items, idx) => (
                   
                    <div key={idx} className="cartDiv rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div  key={idx}  className="relative space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <div  key={idx}  className="shrink-0 md:order-1">
                <img key={idx}  className="h-20 w-20 dark:hidden" src={items.image} alt="imac image" height={100} width={100}/>
                
              </div>
                       <div  key={idx}  className='absolute left-20 top-0  w-5 h-5 text-gray-400 text-center rounded-full'>X{ items.numberOfInputs}</div>
              <label  key={idx}  for="counter-input" className="sr-only">Choose quantity:</label>
              <div  key={idx}  className="flex items-center justify-between md:order-3 md:justify-end">
                
                <div  key={idx}  className="text-end md:order-4 md:w-32">
                           <p  key={idx}  className="text-base font-bold text-gray-600 dark:text-white">${ items.price}</p>
                </div>
              </div>

              <div  key={idx}  className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                         <span  key={idx} className="text-base font-medium text-gray-300 hover:underline dark:text-white">{ items.description}</span>

                <div  key={idx}  className="flex items-center gap-4">
                  <button  key={idx}  type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                             Add to Favorites
                             
                  </button>

                            <button key={idx} onClick={(e) => {
                              removeFromCart(items._id);
                              const cartdiv = document.querySelectorAll(".cartDiv");
                              //  console.log("itemsdiv",e)
                              cartdiv[idx].remove()
                              location.replace(window.location.href);
                              
                            }} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
                  )):<div role="status" className='flex justify-center'>
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
              </div>
              }
          {error==true?<div className='w-full flex justify-center items-center'>
            <button onClick={()=>{redirection.push("/login")}} className=' p-3 rounded bg-blue-700'>login first</button>
            </div> :null}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-100 dark:text-white">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-400 dark:text-white">${ totalPrice}</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-400 dark:text-gray-400">Savings</dt>
                <dd className="text-base font-medium text-green-600">-$299.00</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                <dd className="text-base font-medium text-gray-400 dark:text-white">$99</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd className="text-base font-medium text-gray-400 dark:text-white">$799</dd>
              </dl>
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-200 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-200 dark:text-white">${ finalAmount}</dd>
            </dl>
          </div>

          <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <a href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
              Continue Shopping
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <form className="space-y-4">
            <div>
              <label for="voucher" className="mb-2 block text-sm font-medium text-gray-200 dark:text-white"> Do you have a voucher or gift card? </label>
              <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
            </div>
            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
      </>
  )
}

export default CartModal