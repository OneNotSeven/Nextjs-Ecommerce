import { cartSchemamodel } from "@/schemas/cartSchema";
import { dbData } from "@/schemas/connection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    
    try {
    // console.log(content.params.cartdata)
    const userid=await content.params.cartdata
    await mongoose.connect(dbData, { useNewUrlParser:true })
    const cartArr=await cartSchemamodel.find({userid})
    return NextResponse.json({message:cartArr,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"failed to get Data",success:false},{status:201})
    }
}

export async function PUT(request, content) {
    try {
    const updateReq = await request.json();
    // console.log("mil gaya",updateReq)
    const updateCounter = await updateReq.counter
    const userId = await updateReq.productid
    // console.log("t242",userId)
    await mongoose.connect(dbData, { useNewUrlParser:true })
    const cartCounter = await cartSchemamodel.updateOne({ _id:userId }, { $set:{ numberOfInputs:updateCounter  } })
    // await cartCounter.close()
    return NextResponse.json({message:cartCounter,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"not updated",success:false},{status:201})
    }
}