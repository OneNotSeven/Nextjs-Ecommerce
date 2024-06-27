"use client"
import React, { useEffect, useState } from 'react'
import Shop from "@/app/_Components/Shop"
import Addproductdata from '../_Components/Addproductdata'
import Shop2 from '@/app/_Components/Shop2'
import Productdelete from '../_Components/Productdelete'
import { useRouter } from 'next/navigation'
import { apiBaseUrl } from '@/config'
const Page = () => {
    var switcher = true
    var mswitcher = true
    var action = true
    var myiduser
    const [listProduct, setlistProduct] = useState([])
    const [listProduct2, setlistProduct2] = useState([])
    const [id, setid] = useState('')
    const [searchval, setsearchval] = useState()
    const redirection=useRouter()
    useEffect(() => {

        try {
            const jwtverify = async () => {
                const verifydone = await fetch(`${apiBaseUrl}/api/tokengetter`, {
                    method: "Post"
                })

                const responseVerify = await verifydone.json()
                return responseVerify
            }
            const errorhandler = jwtverify().then((res) => { return res.success })



            myiduser = jwtverify().then((response) => {
                if (response.success == !false) {
                  
                    setid( response.verifytoken.userid)
                    return response.verifytoken.userid;
                }
            })
           
            // console.log("ben10", id)


        } catch (error) {
            // console.log("something went wrong...edit")
        }

        (async function () {
            var shopsuser = await myiduser.then((response) => { return response })
            const allproduct = await fetch(`${apiBaseUrl}/api/shopsproducts/` + `${shopsuser}`, {
                method: "GET"
            })

            const productlist = await allproduct.json()
            setlistProduct(productlist.message)
            setlistProduct2(productlist.message)
        })()


    }, [])
    // console.log("sop", listProduct)

    const deleteAll = async () => {
        var userDelete = id
        const deleteAll = await fetch(`${apiBaseUrl}/api/shopsproducts/` + `${userDelete}`, {
            method: "DELETE"
        })
    }

    const deleteProduct = async (val) => {
        const shopsval = await fetch(`${apiBaseUrl}/api/shopsupdate/` + `${val}`, {
            method: "DELETE"
        })
    }

    const searchProducts = (e) => {
        
        
      e.preventDefault()
        const search = e.target.value.toLowerCase()
        if (search==='') {
           setlistProduct([...listProduct2])
        } else{
            const searchProduct = listProduct.filter((val) => {
                return val.title.toLowerCase().includes(search.toLowerCase())
    
            })
            setlistProduct(searchProduct)
           
        }

        
    }
   
    

   

   
    return (
        <>

            {id ? <div className='h-screen w-ful relative' >
                <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased relative">
                    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">

                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                <div className="w-full md:w-1/2">
                                    <form className="flex items-center">
                                        <label for="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                           <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                            </svg>

                                            </div>
                                            <input type="text" id="simple-search" className=" searching bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" onChange={(e) => { searchProducts(e) }} />
                                        </div>
                                    </form>
                                </div>
                                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <Shop />
                                    <div className=" relative flex items-center space-x-3 w-full md:w-auto">
                                        <button onClick={() => {
                                            const modaledit = document.querySelector(".massedit")

                                            if (action == true) {
                                                modaledit.classList.remove("hidden")
                                                action = false
                                            } else {
                                                modaledit.classList.add("hidden")
                                                action = true
                                            }
                                        }} className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                            <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                            Actions
                                        </button>


                                        {listProduct?.length != 0 ? <div id="popup-modal" tabindex="-1" class="confirmationDeleteAll hidden overflow-y-auto overflow-x-hidden  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                            <div class="relative p-4 w-full max-w-md max-h-full">
                                                <div class="relative bg-slate-300 rounded-lg shadow-gray-500 shadow dark:bg-gray-700">

                                                    <div class="p-4 md:p-5 text-center">
                                                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete all product?</h3>
                                                        <button onClick={() => {
                                                            deleteAll()
                                                            const instantdeleteall = document.querySelectorAll(".mainproduct")
                                                            instantdeleteall.forEach((e) => {
                                                                e.remove()
                                                            })
                                                            const confirmdel = document.querySelector(".confirmationDeleteAll")
                                                            confirmdel.classList.add("hidden")

                                                        }} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                            Yes, Im sure
                                                        </button>
                                                        <button onClick={() => {
                                                            const confirmclose = document.querySelector(".confirmationDeleteAll")
                                                            confirmclose.classList.add("hidden")
                                                        }} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : null}


                                        {/* --------------modal------------------ */}


                                        <div id="actionsDropdown" className="massedit hidden absolute top-11 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">

                                            <div className="py-1">
                                                <button onClick={() => {
                                                    if (listProduct?.length != 0) {
                                                        const deleteAllmodal = document.querySelector(".confirmationDeleteAll")
                                                        deleteAllmodal.classList.remove("hidden")
                                                        deleteAllmodal.classList.add("flex")
                                                    }

                                                }} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* heading */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-4">Product name</th>
                                            <th scope="col" className="px-4 py-3">Category</th>
                                            <th scope="col" className="px-4 py-3">Brand</th>
                                            <th scope="col" className="px-4 py-3">Description</th>
                                            <th scope="col" className="px-4 py-3">Price</th>
                                            <th scope="col" className="px-4 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* tbody content */}
                                    {listProduct?.length != 0 ? <tbody >
                                        {
                                            listProduct.map((items, idx) => (
                                                <>
                                                    <tr key={items._id} className="mainproduct border-b relative  dark:border-gray-700">
                                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{items.title}</th>
                                                        <td className="px-4 py-3">{items.category}</td>
                                                        <td className="px-4 py-3">{items.brand}</td>
                                                        <td className="px-4 py-3 max-w-[12rem] truncate">{items.description}</td>
                                                        <td className="px-4 py-3">{items.price}</td>
                                                        <td className="px-4 py-3 flex items-center justify-end">
                                                            <button onClick={() => {

                                                                const modal = document.querySelectorAll(".editmodal")
                                                                if (modal[idx].classList.contains("hidden")) {

                                                                    modal[idx].classList.remove("hidden")
                                                                    switcher = false
                                                                } else {
                                                                    modal[idx].classList.add("hidden")
                                                                    switcher = true
                                                                }
                                                            }}
                                                                className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                </svg>


                                                            </button>


                                                            <div key={items._id} className="editmodal absolute z-24 top-14 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                                <ul className="py-1 text-sm" aria-labelledby="apple-imac-27-dropdown-button">
                                                                    <li>
                                                                        <button key={items._id} onClick={() => {
                                                                            const modal = document.querySelectorAll(".updatemodal")


                                                                            modal[idx].classList.remove("hidden")

                                                                        }} type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                                                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                                            </svg>
                                                                            Edit
                                                                        </button>
                                                                    </li>

                                                                    <li>
                                                                        <button key={items._id} onClick={() => {
                                                                            const confirmclose = document.querySelectorAll(".confirmation")
                                                                            confirmclose[idx].classList.remove("hidden")
                                                                            confirmclose[idx].classList.add("flex")
                                                                            confirmclose[idx].classList.add("justify-center")
                                                                        }} type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
                                                                            <svg className="w-4 h-4 mr-2" viewbox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                                                            </svg>
                                                                            Delete
                                                                        </button>
                                                                        <div key={items._id} id="popup-modal" tabindex="-1" class="confirmation hidden overflow-y-auto overflow-x-hidden  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                                                            <div class="relative p-4 w-full max-w-md max-h-full">
                                                                                <div class="relative bg-slate-300 rounded-lg shadow-gray-500 shadow dark:bg-gray-700">

                                                                                    <div class="p-4 md:p-5 text-center">
                                                                                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                                        </svg>
                                                                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                                                                        <button onClick={() => {
                                                                                            deleteProduct(items._id)
                                                                                            const confirmclose = document.querySelectorAll(".confirmation")
                                                                                            const instantdelete = document.querySelectorAll(".mainproduct")
                                                                                            instantdelete[idx].classList.add("hidden")
                                                                                            location.replace(window.location.href);
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


                                                                    </li>
                                                                </ul>
                                                            </div>





                                                            <div className="updatemodal hidden h-full overflow-y-auto overflow-x-hidden fixed top-16 right-0 z-50 justify-center items-center w-full">
                                                                <div key={items._id} className=" gap-4 mb-4 flex justify-center overflow-y-auto">
                                                                    <div className="relative p-4 w-full max-w-4xl max-h-full">
                                                                        {/* <!-- Modal content --> */}
                                                                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                                                            {/* <!-- Modal header --> */}

                                                                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                                                    Update your Product
                                                                                </h3>
                                                                                <button onClick={() => {
                                                                                    const openmodal = document.querySelectorAll(".updatemodal");
                                                                                    openmodal[idx].classList.add("hidden")
                                                                                }} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                                    </svg>
                                                                                    <span className="sr-only">close</span>
                                                                                </button>
                                                                            </div>

                                                                            <Shop2 data={items._id} />


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>


                                                    </tr>

                                                </>
                                            ))
                                        }

                                    </tbody> : null}

                                    {/* tbody end here                     */}
                                </table>
                            </div>

                        </div>

                    </div>


                    {/* updatemodal */}



                </section>


            </div> :<div className='w-full h-screen flex justify-center items-center'>
            <button onClick={()=>{redirection.push("/login")}} className=' p-3 rounded bg-blue-700'>login first</button>
            </div> }
        </>
    )
}
export default Page

