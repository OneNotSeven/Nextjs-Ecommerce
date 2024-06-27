
import React from "react";
import Showcasebtn from "./Showcasebtn";
import { apiProducts, apiProductsCategory } from "@/controller/controller";
import Image from "next/image";
import Link from "next/link";
const Products = async () => {

  var dataProducts
  var datarr
  var dataSliced
  try {
    dataProducts = await apiProductsCategory("mens-watches");
    datarr = [dataProducts]
    dataSliced = datarr[0].products.slice(1, 5)
    // console.log("slice",dataSliced)
    
  } catch (error) {
    // console.log("loading")
  }
   

 
var pauseItems=0
    
  return (
    <>
      {dataSliced ? <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">

            <h2 className="trend flex text-2xl text-gray-200 pb-5">Mens Watches</h2>
            <Link href={`/category/${dataSliced[0].category}`} className="flex hover:underline">see all</Link>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
          
            {
                         
              dataSliced.map((products, i) => (
                <>
                  <Link href={`/users/${products.title}/` + `${products.id}`}>
                    <div className=" relative group aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7 bg-[#212121] shadow-md" key={i}>
                      <Image
                        src={products.thumbnail}
                        width={500}
                        height={500}
                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                      <button className="btn hidden bg-gray-950 group-hover:block hover:bg-gray-800 rounded-tr-2xl absolute w-40 bottom-0 p-3 text-white">Buy Now</button>
                    </div>
                    <h3 className="mt-4 text-sm text-gray-500">{products.title}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-400">${products.price}</p>
                                      
                  </Link>
                               
                </>
              ))
            }
                          
           
            
            
            
            
            {/* <!-- More products... --> */}
          </div>
        </div>
      </div> :  <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>}
    </>
  );
};

export default Products;
