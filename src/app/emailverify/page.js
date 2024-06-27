"use client"
import { emailVerifySchema } from '@/yupschema/yupschema'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { apiBaseUrl } from '@/config';

const Page = () => {
    // const [email, setemail] = useState({email:""})
    const [error, seterror] = useState(false)
    var email

     
    const submitVerify = async () => {
        
     
        // console.log("yester",email)
        if (Object.keys(errors).length === 0 && values.email!="") {
           
                
               console.log("notttt",email)
                const verified = await fetch(`${apiBaseUrl}/api/emailverify`, {
                    method: "Post",
                    body:JSON.stringify({email})
                })
                const verifiedRes = await verified.json()
                console.log(verifiedRes)
          if (verifiedRes.success == false) {
            toast.error("email not found", {
              style: {
                backgroundColor: 'black', // Set your desired background color
                color: '#ffffff',        // Set your desired text color
                fontFamily: 'Arial, sans-serif'  // Set your desired font
              }
                  })
                    // errors.email=verifiedRes.message
                    seterror(!error)
                } 
           
          if (verifiedRes.success == true) {
            toast.success("link sent successfully", {
              style: {
                backgroundColor: 'black', // Set your desired background color
                color: '#ffffff',        // Set your desired text color
                fontFamily: 'Arial, sans-serif'  // Set your desired font
              }
                  })
           }
        }

        
        
    }

    const initialvalue = {
        email: "",
      };
    
      const { errors, touched, handleBlur, handleChange, values } = useFormik({
        initialValues: initialvalue,
        validationSchema: emailVerifySchema, 
        onSubmit: (values) => {},
      });
      
  email = values.email
 
    
  return (
    <>
      <ToastContainer/>
      <div className='w-full h-screen flex justify-center items-center'>
       <div className=' w-[30%] flex flex-col gap-2'>
          <p>Email</p>
          <input
                    type="email"
                    className="block w-full p-4 text-gray-700 border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    name="email"
                    value={values.email}
                  onChange={handleChange}
                    onBlur={handleBlur}
                  />
        
                {errors.email && touched.email ? (
                  <p className="text-red-400 text-sm">{errors.email}</p>
          ) : null}
         
        <button className='bg-[#232121] mt-4 p-2 rounded-md' onClick={() => submitVerify()}>submit</button>
       </div>
        </div>      
      </>
  )
}

export default Page