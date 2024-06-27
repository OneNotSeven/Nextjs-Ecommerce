import { dbData } from "@/schemas/connection";
import { shopsInfo } from "@/schemas/productuploadSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    
    await mongoose.connect(dbData, { useNewUrlParser: true })
    const ourDetail = await shopsInfo.find()
    // console.log("derer",ourDetail)
    return NextResponse.json({products:ourDetail,success:true},{status:200})
}