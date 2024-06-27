import React from 'react'
import Header from '@/app/_Components/Header'
import Showcasebtn from './_Components/Showcasebtn'
import Products from './_Components/Products'
import Trendingbtn from "@/app/_Components/Trendingbtn"
import Commonbtn from './_Components/Commonbtn'
import { apiProducts } from '@/controller/controller'
import Image from 'next/image'
import Shoes from './_Components/Shoes'
import Women from './_Components/Women'
import Electronics from './_Components/Electronics'
import Clothes from './_Components/Clothes'
import Footer from './_Components/Footer'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'


const page = async () => {
  
   
  
  
  const dataProducts = await fetch("https://dummyjson.com/products/categories");
    const datarr = [dataProducts]
   console.log("####",dataProducts)
  
  return (
    <>
      <ThemeProvider enableSystem={true} defaultTheme='dark' attribute='className'>

   
    <div>
      <Header />
      


    {/* <!-- Carousel wrapper --> */}
   
         {/* <!-- Item 1 --> */}
       

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
    <div className="flex flex-col gap-4 relative">
                  <Link href="/category/sports-accessories">
       
        <div className='group relative'>
                              <Image class="h-auto max-w-full rounded-lg filter group-hover:brightness-50 cursor-pointer  " src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"  width={370} height={517} alt="" />
                              <div class="absolute  bottom-0 w-fit h-fit m-5 opacity-0 group-hover:opacity-100 text-2xl cursor-pointer">Sports</div>
        </div>
        
                      </Link>
                          </div>
                      
    
                      <div className="flex flex-col gap-4 ">
          <Link href="/category/home-decoration">               
        <div className='group relative'>
                              <Image class="h-auto max-w-full rounded-lg filter group-hover:brightness-50 cursor-pointer " src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" width={370} height={362} alt="" />
                              <div class="absolute  bottom-0 w-fit h-fit m-5 opacity-0 group-hover:opacity-100 text-2xl cursor-pointer">Home Decoration</div>
                          </div>
                          </Link> 
        <Link href="/category/mens-shoes">
        <div className='group relative'>
                              <Image class="h-auto max-w-full rounded-lg filter group-hover:brightness-50 cursor-pointer " src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" width={370} height={231}  alt="" />
                              <div class="absolute  bottom-0 w-fit h-fit m-5 opacity-0 group-hover:opacity-100 text-2xl cursor-pointer">Shoes Collection</div>
                              </div>
                              </Link>
    </div>
    <div className="flex flex-col gap-4">
    <Link href="/category/womens-dresses">
        <div className='group relative'>
                              <Image class="h-auto max-w-full rounded-lg filter group-hover:brightness-50 cursor-pointer " src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" width={370} height={281} alt="" />
                              <div class="absolute  bottom-0 w-fit h-fit m-5 opacity-0 group-hover:opacity-100 text-2xl cursor-pointer">Dress</div>
                              </div>
                          </Link>
                          
                          <Link href="/category/kitchen-accessories">
        <div className='group relative'>
                              <Image class="h-auto max-w-full rounded-lg filter group-hover:brightness-50 cursor-pointer " src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" width={370} height={315} alt="" />
                              <div class="absolute  bottom-0 w-fit h-fit m-5 opacity-0 group-hover:opacity-100 text-2xl cursor-pointer">kitchen accessories</div>
                              </div>
                              </Link>
    </div>
    <div className="flex flex-col gap-4 ">
    <Link href="/category/beauty">
        <div className='group relative rounded-lg bg-white filter hover:brightness-50 flex'>
                              <Image class="h-auto w-full max-w-full rounded-lg filter group-hover:brightness-50 cursor-pointer " src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" width={370} height={515} alt="" />
                              <div class="absolute  bottom-0 w-fit h-fit m-5 opacity-0 group-hover:opacity-100 text-2xl cursor-pointer">Beauty</div>
                              
                              </div>
                              </Link>
    </div>
</div>

   



    
        <Products />
        <Shoes />
        <Women />
        <Electronics />
        <Clothes />
        <Footer/>
        </div>
        </ThemeProvider>
      </>
  )
}

export default page