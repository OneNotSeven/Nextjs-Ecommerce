import { dbData } from "@/schemas/connection";
import { shopsInfo } from "@/schemas/productuploadSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { object } from "yup";



export async function POST(req) {
    try {
        const proval = await req.json()
    // console.log("proval", proval)
    const userid=await proval.userid
    await mongoose.connect(dbData, { useNewUrlParser: true })
        
            const proDetail = await new shopsInfo(proval)
            await proDetail.save()
            // console.log("prodetail",proDetail)
            return NextResponse.json({message:"true",success:true},{status:200})
    
    
    } catch (error) {
        return NextResponse.json({message:"failed",success:false},{status:500})
    }
}