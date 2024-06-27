import { dbData } from "@/schemas/connection";
import { shopsInfo } from "@/schemas/productuploadSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
    try {
        const id = await content.params.shopsget
        // console.log("idst",id)
        await mongoose.connect(dbData, { useNewUrlParser: true })
        const allproduct = await shopsInfo.find({ _id: id })
        return NextResponse.json({message:allproduct,success:true},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"failed to fetch",success:false},{status:500})
    }
    

}


export async function DELETE(req, content) {
   try {
    
       const id = await content.params.shopsget
    //    console.log("sdgshdg",content.params.shopsget)
    await mongoose.connect(dbData, { useNewUrlParse: true })
       const deletedProduct = await shopsInfo.deleteOne({ _id: id })
      
    return NextResponse.json({message:"item Removed",success:true},{status:200})
   } catch (error) {
    return NextResponse.json({message:"something went wrong",success:false},{status:201})
   }
}