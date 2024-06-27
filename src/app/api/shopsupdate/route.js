import { dbData } from "@/schemas/connection";
import { shopsInfo } from "@/schemas/productuploadSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
    const payload=await req.json()
    const productid = await payload.data
    // console.log(productid)
    const copyPayload = { ...payload }
    const removefields = ["data"]
    for (const field of removefields) {
      delete copyPayload[field]
    }

    // console.log("payload",copyPayload)
    
    await mongoose.connect(dbData, { useNewUrlParser: true })
    const productUpdated = await shopsInfo.updateOne({ _id: productid },{$set:{...copyPayload}})
    
    // console.log("process",productUpdated)
    return NextResponse.json({message:"success",success:true},{status:200})
   } catch (error) {
    return NextResponse.json({message:"server error",success:false},{status:500})
   }
}