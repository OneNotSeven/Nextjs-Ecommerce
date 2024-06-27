import { apiProductsCategory } from '@/controller/controller'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Othersproducts = async() => {
    var dataProducts
    var datarr
    var dataSliced
    
    try {
      dataProducts = await apiProductsCategory("womens-dresses");
      datarr = [dataProducts]
      dataSliced = datarr[0].products.slice(1, 5)
      // console.log("slice",dataSliced)
      // console.log("dataaar",dataSliced)
    } catch (error) {
      // console.log("loading")
    }
     

   
  var pauseItems=0
      
    return (
      <>
        <div >
          <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
            <div className="flex justify-between items-center">
  
              <h2 className="trend flex text-2xl text-gray-200 pb-5">{dataSliced[0].category}</h2>
              <Link href={`/category/${dataSliced[0].category}`} className="flex hover:underline">see all</Link>
            </div>
  
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            
                        {
                           
                           dataSliced.map((products, i) => (
                                 <Link key={products.id} href={`/users/${products.title}/`+`${products.id}`}> 
                                  <div className=" relative group aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7  bg-[#212121] shadow-md" key={products.id}>
                                    <Image key={products.id}
                                            src={products.thumbnail}
                                            width={500}
                                            height={500}
                                      alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                                  />
                                  
                                   <button key={products.id} className="btn hidden  bg-gray-950 group-hover:block hover:bg-gray-800 rounded-tr-2xl absolute w-40 bottom-0 p-3 text-white">Buy Now</button>
                                  </div>
                                        <h3 key={products.id} className="mt-4 text-sm text-gray-500">{products.title}</h3>
                                    <p key={products.id} className="mt-1 text-lg font-medium text-gray-400">${ products.price}</p>
                                        
                              </Link>
                               ))
                            }
                            
             
              
              
              
              
              {/* <!-- More products... --> */}
            </div>
          </div>
        </div>
      </>
    );
}

export default Othersproducts