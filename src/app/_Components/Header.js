"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/app/stylesheets/header.module.css";
import {IoChevronUpOutline,IoPersonOutline,IoCartOutline,IoSettingsOutline,IoLogOutOutline,} from "react-icons/io5";
import { FaStoreAlt } from "react-icons/fa";
import CartModal from "./CartModal";
import Dotscontent from "./Dotscontent";
import { populateFieldsApi } from "@/controller/controller";
import { apiBaseUrl } from "@/config";



const Header = ({ data }) => {
  // console.log(data)
  const [items, setitems] = useState(false);
  const [cartmodal, setcartmodal] = useState(false);
  const [showuserbtn, setshowuserbtn] = useState(false);
  const [profileInfo, setprofileInfo] = useState({})
  const [searchProduct, setsearchProduct] = useState()
  const [userauth, setuserauth] = useState()

  var myiduser

  const showcasemenu = () => {
    const menu = document.querySelector(".showuserdiv");
    const a = document.querySelector(".arrowUp");

    if (showuserbtn == false) {
      menu.classList.remove("hidden");
      setshowuserbtn(!showuserbtn);
    } else {
      menu.classList.add("hidden");
      setshowuserbtn(!showuserbtn);
    }

    if (items == false) {
      setitems(!items);
      a.classList.add("transform");
      a.classList.add("rotate-180");
      // console.log(items);
    } else {
      setitems(!items);
      a.classList.remove("rotate-180");
      a.classList.remove("transform");
    }
  };

  useEffect(() => {
    try {
        const jwtverify = async () => {
            const verifydone= await fetch(`${apiBaseUrl}/api/tokengetter`, {
             method: "Post"
            })
          
             const responseVerify = await verifydone.json()
             return responseVerify
      }
      const errorhandler=jwtverify().then((res)=>{return res.success})
      
      
      
      myiduser = jwtverify().then((response) => {
        if (response.success == !false) {
          
          setuserauth(response.verifytoken.userid) 
          return response.verifytoken.userid;
            }
          })
        // console.log("ben10",myiduser)
         
    
    } catch (error) {
        // console.log("something went wrong...edit")
    }
EditPageInfo()
  }, [])

  async function EditPageInfo() {
    try {
    const profileId = await myiduser
    const Populateres = await populateFieldsApi(profileId)
    const populateResDone = await Populateres.json()
    // console.log("popopo", populateResDone)
    const objPopulate={name:populateResDone.message[0].name,email:populateResDone.message[0].email,address:populateResDone.message[0].address,contact:populateResDone.message[0].contact}
    setprofileInfo(objPopulate)
    } catch (error) {
      // console.log("newtwork error")
    }
    
  }

  const logoutAccount = async () => {
    
    const logouts = await fetch(`${apiBaseUrl}/api/logout`, {
      method:"Post"
    })

    const dels = await logouts.json()
    if (dels.success == true) {
      setTimeout(() => {
        location.replace(window.location.href);
      }, 1000);
    }
  
}
  // console.log("profileinfo", profileInfo)
 
  // console.log("find", searchProduct)
  // console.log("userauth",userauth)
  return (
    <>
      {/* <Link href={`/category/${dataSliced[0].category}`} className="flex hover:underline">see all</Link> */}
      <div className="flex justify-evenly items-center dark:bg-none p-4 relative">
        <div>
         <a href="/">logo</a> 
        </div>
        <div className="flex w-[32rem] gap-1">
          <input
            className="w-[100%] p-2 rounded  outline-none border border-gray-800 bg-[#232323]"
            type="search"
            placeholder="search products"
            onChange={(e)=> setsearchProduct(e.target.value)}
          />
         {searchProduct? <Link href={`/search/${searchProduct}`}>
          <button className="p-2 dark:border-white dark:text-white border-2 border-gray-900 bg-[#1f1e1e]  rounded flex items-center gap-1">
            search
          </button>
          </Link>:<button className="p-2 dark:border-white dark:text-white border-2 border-gray-900 bg-[#1f1e1e] rounded flex items-center gap-1">
            search
          </button>}
        </div>
        <div>
          <div className="flex relative z-10">
            <button
              className="flex items-center gap-1"
              onClick={() => {
                showcasemenu();
              }}
            >
              <IoPersonOutline />
              {userauth != undefined && profileInfo.name!=undefined ? profileInfo.name : "Login"}
              <IoChevronUpOutline className="arrowUp" />
            </button>
            <div className="showuserdiv dropDownItems absolute hidden list-none top-16 left-[-1rem] w-40 bg-white rounded-md shadow-xl dark:bg-gray-800 z-10">
              {/* <div className={styles.rotatar}></div> */}
              <div className="p-4 flex flex-col gap-1">
                <li className="group flex cursor-pointer gap-2 items-center px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <IoPersonOutline />
                  {userauth != undefined ? <span>My profile</span> :<span>My profile/ <Link href="/login" className=" text-blue-700">sign in</Link></span>}
                  
{/* <button data-popover-target="popover-user-profile" type="button" className="group text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">User profile</button> */}

                  {userauth!=undefined ? <div data-popover id="popover-user-profile" role="tooltip" className="profile absolute left-40 top-0 z-10 group-hover:visible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
            
                        <div>
                          <Link href="/profile/edit" className="text-blue-600 hover:underline hover:text-blue-500">edit</Link>
                        </div>
                      </div>
       
                      {profileInfo.name != undefined ? <p className="text-base pb-4 font-semibold leading-none text-gray-600 dark:text-white">{profileInfo.name}</p> : null}
        
                      {profileInfo.address != undefined ? <p className="mb-4 text-sm">Address:{profileInfo.address}</p> : <p className="mb-4 text-sm">Address:Not mentioned</p>}
                      <ul className="flex text-sm">
                        <li className="me-2">
               
                          {profileInfo.contact != undefined ? <p className=" flex font-semibold text-gray-600 dark:text-white">Contact:<span className="hover:underline font-normal text-gray-600 dark:text-white">{profileInfo.contact}</span></p> : <p className="font-semibold text-gray-900 dark:text-white">Contact:Not mentioned</p>}
                    
                
                        </li>
            
                      </ul>
                    </div>
                    
                  </div> : null}

                </li>
                <hr className="border-gray-200 dark:border-gray-700 " />

                <li className="flex cursor-pointer gap-2 items-center px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <IoCartOutline />
                  orders
                </li>
                <hr className="border-gray-200 dark:border-gray-700 " />

                <li className="flex cursor-pointer gap-2 items-center px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <IoSettingsOutline />
                  setting
                </li>
                <hr className="border-gray-200 dark:border-gray-700 " />

                <li onClick={() => { 
                  if (userauth != undefined) {
                    const loss = document.querySelector(".logout");
                  
                    loss.classList.remove("hidden")
                    loss.classList.add("flex")
                  }
                  
                }} className="flex cursor-pointer gap-2 items-center px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <IoLogOutOutline />
                  Logout
                </li>

                {/* //modal   */}
                
               {userauth!=undefined? <div id="popup-modal" tabindex="-1" class="logout hidden overflow-y-auto overflow-x-hidden  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                                                            <div class="relative p-4 w-full max-w-md max-h-full">
                                                                                <div class="relative bg-slate-300 rounded-lg shadow-gray-500 shadow dark:bg-gray-700">

                                                                                    <div class="p-4 md:p-5 text-center">
                                                                                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                                        </svg>
                                                                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout</h3>
                        <button onClick={() => {
                          logoutAccount(); 
                          const loss = document.querySelector(".logout");
                          loss.classList.add("hidden")
                        }} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                                                            logout
                                                                                        </button>
                                                                                        <button onClick={() => {
                                                                                                              const loss = document.querySelector(".logout");
                                                                                                              loss.classList.add("hidden")
                                                                                        }} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>:null}




              </div>
            </div>
          </div>
        </div>
        <Link href="/shop">
        <div className="flex justify-center items-center gap-1">
          <FaStoreAlt />
          Your shop
        </div>
        </Link>
        <Link href="/users/cart">
          {" "}
          <button className="flex justify-center items-center gap-1">
            <IoCartOutline />
            Cart
          </button>
        </Link>
        <Dotscontent />
      </div>
    </>
  );
};

export default Header;
