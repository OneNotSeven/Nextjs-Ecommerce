"use client"
import { shopProductSchema } from '@/yupschema/yupschema'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { title } from '../../../next-pages-template/components/primitives'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiBaseUrl } from '@/config'

const Shop2 = ({data}) => {
  const [popudata, setpopudata] = useState({})
  const [img1, setimg1] = useState()
  const [toaster, settoaster] = useState(false)

    const [img2, setimg2] = useState()
    const [img3, setimg3] = useState()
  const [userid, setuserid] = useState("")
  const [loading, setloading] = useState(false)
    // const [images, setimages] = useState([])
    var userId
  var shopres

 

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
    (async function () {
      // console.log("oytr",data)
      shopres = await fetch(`${apiBaseUrl}/api/shopsupdate/`+`${data}`, {
        method: "GET",
        
      })
      const rest = await shopres.json()
      // console.log("frontdata",rest)
      setpopudata(rest?.message[0])
      setimg1(rest?.message[0]?.images[0])
      setimg2(rest?.message[0]?.images[1])
      setimg3(rest?.message[0]?.images[2])
    })()
  }, [data])
  
  
       
    console.log("ost",popudata)
    
  const initialvalue = {
    title: '',
    description: '',
    category: '',
    price: '',
    stock: '',
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
    
  var copyPop = { ...values }
  const removefields = ["images1","images2","images3"]
  for (const field of removefields) {
    delete copyPop[field]
  }
  

  
   values.title = popudata.title
  values.description = popudata.description
  values.category = popudata.category
  values.price = popudata.price
  values.stock = popudata.stock
  values.brand = popudata.brand
  values.warrantyInformation = popudata.warrantyInformation
  values.images1 = img1
  values.images2=img2
  values.images3 = img3
  values.returnPolicy = popudata.returnPolicy
  values.thumbnail = popudata.thumbnail
  
  values.availabilityStatus=popudata.availabilityStatus
  
  var images = [values.images1, values.images2, values.images3]

  // console.log("copyobj", errors) 

  const updateProductAdd = async () => {
    
   
    if (Object.keys(errors).length === 0) { 
      setloading(true)
     try {
      const shopsval = await fetch(`${apiBaseUrl}/api/shopsupdate`, {
        method: "Post",
        body: JSON.stringify({...copyPop, images,data})
      })
    settoaster(true)
    const shopsvalres=await shopsval.json()
    // console.log("toast verified")
     } catch (error) {
    //  console.log("error")
     } finally {
       setloading(false)
     }
      
      
      
       
         setTimeout(() => {
           location.replace(window.location.href);
         }, 2000);
      } 
        
  
      
  }
 
  if (toaster==true) {
    toast.success("updated successfully!", {
      style: {
        backgroundColor: 'black', 
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif' 
      },
    })
    settoaster(false)
  }  
 
  return (
      <>
      <ToastContainer/>

            <div className="p-4 md:p-5 flex flex-wrap gap-5">
                
                    <div>
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product title</label>
          <input value={values.title} type="email" name="title" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Product title" onChange={(e) => { handleChange,setpopudata({...popudata,title:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                               {errors.title && touched.title ? (<p className="text-red-400 text-sm">{errors.title}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                              <input value={values.description} type="" name="description" id="" placeholder="product description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => { handleChange,setpopudata({...popudata,description:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                                {errors.description && touched.description ? (<p className="text-red-400 text-sm">{errors.description}</p>) : null}
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                              <input value={values.category} type="text" name="category" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="category" onChange={(e) => { handleChange,setpopudata({...popudata,category:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                                {errors.category && touched.category ? (<p className="text-red-400 text-sm">{errors.category}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                              <input value={values.price} type="text" name="price" id="" placeholder="product price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => { handleChange,setpopudata({...popudata,price:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                                {errors.price && touched.price ? (<p className="text-red-400 text-sm">{errors.price}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number Of Stocks</label>
                              <input value={values.stock} type="text" name="stock" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="no. of stocks available" onChange={(e) => { handleChange,setpopudata({...popudata,stock:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                              {errors.stock && touched.stock ? (<p className="text-red-400 text-sm">{errors.stock}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Name</label>
                              <input value={values.brand} type="" name="brand" id="" placeholder="brand name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => { handleChange,setpopudata({...popudata,brand:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                               {errors.brand && touched.brand ? (<p className="text-red-400 text-sm">{errors.brand}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warranty Information</label>
                        <input value={values.warrantyInformation} type="" name="warrantyInformation" id="" placeholder="product description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => { handleChange,setpopudata({...popudata,warrantyInformation:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                               {errors.warrantyInformation && touched.warrantyInformation ? (<p className="text-red-400 text-sm">{errors.warrantyInformation}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Availability Status</label>
                              <input value={values.availabilityStatus} type="" name="availabilityStatus" id="" placeholder="Availability Status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => { handleChange,setpopudata({...popudata,availabilityStatus:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                               {errors.availabilityStatus && touched.availabilityStatus ? (<p className="text-red-400 text-sm">{errors.availabilityStatus}</p>) : null}
                          </div>
                          
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Return Policy</label>
                              <input value={values.returnPolicy} type="" name="returnPolicy" id="" placeholder="Days of return policy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => { handleChange,setpopudata({...popudata,returnPolicy:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                               {errors.returnPolicy && touched.returnPolicy ? (<p className="text-red-400 text-sm">{errors.returnPolicy}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images 1</label>
                              <input value={values.images1} type='text' name="images1" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="image link 1" onChange={(e) => { handleChange,setimg1(e.target.value) }}
                                  onBlur={handleBlur} />
                               {errors.images1 && touched.images1 ? (<p className="text-red-400 text-sm">{errors.images1}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images 2</label>
                              <input value={values.images2} type="text" name="images2" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="image link 2" onChange={(e) => { handleChange,setimg2(e.target.value) }}
                                  onBlur={handleBlur}
                              />
                               {errors.images2 && touched.images2 ? (<p className="text-red-400 text-sm">{errors.images2}</p>) : null}
                          </div>
                          <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images 3</label>
                              <input value={values.images3} type="text" name="images3" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="image link 3" onChange={(e) => { handleChange,setimg3(e.target.value) }}
                              onBlur={handleBlur}
                              />
                               {errors.images3 && touched.images3 ? (<p className="text-red-400 text-sm">{errors.images3}</p>) : null}
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail</label>
                              <input value={values.thumbnail} type="" name="" id="thumbnail" placeholder="Thumbnail Link image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => { handleChange,setpopudata({...popudata,thumbnail:e.target.value}) }}
                              onBlur={handleBlur}
                              />
                               {errors.thumbnail && touched.thumbnail ? (<p className="text-red-400 text-sm">{errors.thumbnail}</p>) : null}
                          </div>
                          
        <button onClick={() => {
          updateProductAdd()
         
           
                          }} type="button" className=" bg-blue-700 mt-4 p-2 w-24 end-2.5 text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >{loading==false?"Update":<div role="status">
                            <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>}</button>
                    
                
            </div>
        
    


      </>
  )
}

export default Shop2