"use client"
import { apiBaseUrl } from '@/config';
import { shopProductSchema } from '@/yupschema/yupschema'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shop = () => {
    const [img1, setimg1] = useState("")
    const [img2, setimg2] = useState("")
    const [img3, setimg3] = useState("")
  const [userid, setuserid] = useState("")
  const [tosting, settosting] = useState(false)
  const [tosting2, settosting2] = useState(false)
  const [loader, setloader] = useState(false)
    
    var userId

    

    const [productsDetails, setproductsDetails] = useState({
        title: "",
    description: "",
    category: "",
    price: "",
   
    stock: "",
    tags: [],
    brand: "",

    warrantyInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
   
   
    thumbnail: ""
    })

  
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
            // console.log("verify",responseVerify)
        return responseVerify
        } catch (error) {
            //   seterror(true)
            // console.log("err")
        }
      }

    
    userId = jwtverify().then((response) => {
      
      if (response != undefined) {
          // console.log("finalpoint", response.verifytoken.userid)  
          setuserid(response.verifytoken.userid)
        return response.verifytoken.userid;
          }
        
      })
  
  }, [])
    
  const initialvalue = {
    title: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    tags: "",
    brand: '',
    warrantyInformation: '',
    availabilityStatus: '',
    returnPolicy: '',
      images1: "",
      images2: "",
      images3: "",
    thumbnail: '',
  };

  const { errors, touched, handleBlur, handleChange, values } = useFormik({
    initialValues: initialvalue,
    validationSchema: shopProductSchema,
    onSubmit: (values) => {},
  });
    
    
    // console.log("serr", errors)
    // console.log("sval", values)
    

    const shopsProductAdd = async () => {
        
        
        
        var images = [values.images1, values.images2, values.images3]

    
        const copyobj={...values}
        const removefields = ["images1", "images2", "images3"]

        for (const field of removefields) {
            delete copyobj[field]
        }
        var reviews=[{
            rating: 0,
            comment: "",
            date: null,
            reviewerName: "",
            reviewerEmail:""
        }]
      if (Object.values(copyobj).some(value => value == "")) {
          // console.log("shgsgs")
        }
 console.log("fields",values)
      try {

        if (Object.values(copyobj).some(value => value == "" && images[0] == "" && images[1] == "" && images[2] == "")){
          settosting(true)
        }

        if (Object.keys(errors).length === 0 && Object.values(copyobj).some(value => value != "" && images[0]!="" && images[1]!="" && images[2]!="" ) ) {
          // console.log("not going")
          setloader(true)
          try {
            var id =  Math.floor(Date.now() + Math.random())
            const shopsval = await fetch(`${apiBaseUrl}/api/shopsproducts`, {
                method: "Post",
                body: JSON.stringify({...copyobj, images,userid,id,reviews})
            }
      )
          } catch (error) {
            // console.log("error")
            
          } finally {
            setloader(false)
            settosting2(true)
          }
           
          
         

          setTimeout(() => {
            location.replace(window.location.href);
          }, 2000);
            }
        
       } catch (error) {
        
       }
        
  }
  if (tosting == true) {
    toast.error("fill all details", {
      style: {
        backgroundColor: 'black', // Set your desired background color
        color: '#ffffff',        // Set your desired text color
        fontFamily: 'Arial, sans-serif'  // Set your desired font
      }
    })
    settosting(false)
  }

  if (tosting2 == true) {
    toast.success("Added successfully", {
      style: {
        backgroundColor: 'black', // Set your desired background color
        color: '#ffffff',        // Set your desired text color
        fontFamily: 'Arial, sans-serif'  // Set your desired font
      }
    })
    settosting2(false)
  }
 
  return (
      <>
      
{/* 
<!-- Modal toggle --> */}
          <button onClick={() => {
              const openmodal = document.querySelector(".mainmodal");
              openmodal.classList.remove("hidden")
      }} className="flex gap-1 items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
         <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
</svg>

  Add Product
</button>

{/* <!-- Main modal --> */}
<div id="authentication-modal" tabindex="-1" aria-hidden="true" className="mainmodal hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full left-[30vw] top-20">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[55vw] ">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Register your Product
                </h3>
                          <button onClick={() => {
                              const openmodal = document.querySelector(".mainmodal");
                              openmodal.classList.add("hidden")
                }} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">close</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 flex flex-wrap gap-5">
                
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product title</label>
                              <input value={values.title} type="email" name="title" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Product title" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                               {errors.title && touched.title ? (<p className="text-red-400 text-sm">{errors.title}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                              <input value={values.description} type="" name="description" id="" placeholder="product description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                                {errors.description && touched.description ? (<p className="text-red-400 text-sm">{errors.description}</p>) : null}
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                              <input value={values.category} type="text" name="category" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="category" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                                {errors.category && touched.category ? (<p className="text-red-400 text-sm">{errors.category}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                              <input value={values.price} type="text" name="price" id="" placeholder="product price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                                {errors.price && touched.price ? (<p className="text-red-400 text-sm">{errors.price}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number Of Stocks</label>
                              <input value={values.stock} type="text" name="stock" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="no. of stocks available" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                              {errors.stock && touched.stock ? (<p className="text-red-400 text-sm">{errors.stock}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Name</label>
                              <input value={values.brand} type="" name="brand" id="" placeholder="brand name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                               {errors.brand && touched.brand ? (<p className="text-red-400 text-sm">{errors.brand}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warranty Information</label>
                        <input value={values.warrantyInformation} type="" name="warrantyInformation" id="" placeholder="product description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                               {errors.warrantyInformation && touched.warrantyInformation ? (<p className="text-red-400 text-sm">{errors.warrantyInformation}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Availability Status</label>
                              <input value={values.availabilityStatus} type="" name="availabilityStatus" id="" placeholder="Availability Status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                               {errors.availabilityStatus && touched.availabilityStatus ? (<p className="text-red-400 text-sm">{errors.availabilityStatus}</p>) : null}
                          </div>
                          
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Return Policy</label>
                              <input value={values.returnPolicy} type="" name="returnPolicy" id="" placeholder="Days of return policy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                               {errors.returnPolicy && touched.returnPolicy ? (<p className="text-red-400 text-sm">{errors.returnPolicy}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images 1</label>
                              <input value={values.images1} type='text' name="images1" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="image link 1" onChange={handleChange}
                                  onBlur={handleBlur} />
                               {errors.images1 && touched.images1 ? (<p className="text-red-400 text-sm">{errors.images1}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images 2</label>
                              <input value={values.images2} type="text" name="images2" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="image link 2" onChange={handleChange}
                                  onBlur={handleBlur}
                              />
                               {errors.images2 && touched.images2 ? (<p className="text-red-400 text-sm">{errors.images2}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images 3</label>
                              <input value={values.images3} type="text" name="images3" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="image link 3" onChange={handleChange}
                              onBlur={handleBlur}
                              />
                               {errors.images3 && touched.images3 ? (<p className="text-red-400 text-sm">{errors.images3}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail</label>
                              <input value={values.thumbnail} type="" name="" id="thumbnail" placeholder="Thumbnail Link image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleChange}
                              onBlur={handleBlur}
                              />
                               {errors.thumbnail && touched.thumbnail ? (<p className="text-red-400 text-sm">{errors.thumbnail}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                              <input value={values.tags} type="email" name="tags" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="mobile,elctronics" required onChange={handleChange}
                              onBlur={handleBlur}
                              />
                               {errors.tags && touched.tags ? (<p className="text-red-400 text-sm">{errors.tags}</p>) : null}
                          </div>
              <button onClick={() => { shopsProductAdd() }} type="button" className=" mt-4 p-2 w-24 end-2.5 text-gray-400 bg-[#232121] hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">{loader == false ? "Add" :<div role="status">
    <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>}</button>
                    
                
            </div>
        </div>
    </div>
</div> 
<ToastContainer/>
      </>
  )
}

export default Shop