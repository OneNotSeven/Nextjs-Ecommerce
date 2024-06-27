import { apiProducts, apiProductsCategory } from '@/controller/controller';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/app/_Components/Footer';
import Header from '@/app/_Components/Header';

const productsDisplay = async (req) => {
  var fullData 
  var fullDataArr
  var FilterArray
  try {
     fullData = await apiProducts()
    fullDataArr = [fullData]
    for (var i = 0; i <= fullDataArr.length; i++){
      
      FilterArray=fullDataArr[i].products.filter((items,idx)=>items.category==req.params.products)
    }
    // console.log("great",FilterArray)
  } catch (error) {
    // console.log("check your connection")
  }
  // console.log("great",FilterArray)
  
  
  return (
    <>
      <Header/>
      {FilterArray? <div className='w-fit m-auto'>
        <div className="mx-auto max-w-2xl px-4 pt-9 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">

            <h2 className="trend flex text-2xl text-gray-200 pb-5">{ req.params.products}</h2>
          </div>

          
         <div className="flex flex-col gap-14">
                         
                         {
                                        
                                        FilterArray.map((products, i) => (
                                          <Link key={ i} href={`/users/${products.title}/` + `${products.id}`}>
                                            <div key={ i} className='flex w-full gap-5'>
               
                                           
                                              <div  className=" w-96 h-72 overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7  bg-[#232121] shadow-md" key={i}>
                                                <Image key={ i}
                                                        src={products.thumbnail}
                                                        width={240}
                                                        height={240}
                                                  alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                  />
                                      
                                              </div>
                                            <div key={ i} className='flex gap-2 justify-between w-full'>
                                            <div key={ i} className='flex flex-col w-[80%] gap-4'>
                                            <h3 key={ i} className="mt-4 text-sm text-gray-500">{products.title}</h3>
                                                    
                                                  <p key={ i} className=' whitespace-normal overflow-hidden text-ellipsis'>{products.description}</p>
                                                  <div key={ i} className='flex text-center items-center gap-3'>
                                                    <span key={ i} className=' font-extralight font-mono text-[12px] bg-[#0f7214] text-white p-[6px] rounded'>Rating</span>  <span className='text-[16px] font-light'>{products.rating}</span>
                                                    <span key={ i} className='text-[16px] font-light'>&&  { products.reviews.length} reviews</span>
                                                  </div>
                                                  <span key={ i} className=' bg-gray-900 border border-gray-400 rounded p-[6px] w-fit text-[10px]'>{products.brand}</span>
                                                  
                                                  <span key={ i} className=' border-gray-400 text-gray-500 rounded w-fit text-[14px]'>warranty: {products.warrantyInformation}</span>
                                                  
                                                  <span key={ i} className='text-[#0f7214]'>{products.availabilityStatus}</span>
                                                </div>
                                                <p key={ i} className="mt-1 text-lg font-medium text-gray-400">${ products.price}</p>
                                              </div>
                                              </div>
                                                    </Link>
                                          
                                           ))
                                        }
                                   
                           
                           <Footer/>
                           
                           
                           {/* <!-- More products... --> */}
          </div>
        </div>
       
      </div> :<p className='relative left-16 top-16'>network issue</p>}
      
      </>
  )
}

export default productsDisplay