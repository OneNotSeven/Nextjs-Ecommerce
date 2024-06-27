import { dbData } from "@/schemas/connection";
import { shopsInfo } from "@/schemas/productuploadSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
    const userid=await content.params.getpro
    await mongoose.connect(dbData, { useNewUrlParser: true })
    const allproduct = await shopsInfo.find({userid})
    return NextResponse.json({message:allproduct,success:true},{status:200})

}


export async function DELETE(req, content) {
    try {
     
        const id = await content.params.getpro
        // console.log("sdgshdg",content)
     await mongoose.connect(dbData, { useNewUrlParse: true })
        const deletedProduct = await shopsInfo.deleteMany({userid:id})
       
     return NextResponse.json({message:"item Removed",success:true},{status:200})
    } catch (error) {
     return NextResponse.json({message:"something went wrong",success:false},{status:201})
    }
 }