import { Inter } from "next/font/google";
import "./globals.css";
// import style from "@/app/stylesheets/header.module.css"
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Cry and Buy",
  description: "ecommerce site buying and selling products",
  
  
};




export default function RootLayout({ children }) {
  return (
    
    <html lang="en" className="dark">
     
      
      
        <body className={inter.className}>
        <ThemeProvider enableSystem={true} defaultTheme='dark' attribute='class'>
          <NextTopLoader
            color="#fa1238"
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
          />
          {children}
          <ToastContainer/>
      </ThemeProvider>
      </body>
      </html>
  );
}
