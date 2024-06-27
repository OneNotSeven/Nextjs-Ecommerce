import { cartSchemamodel } from "@/schemas/cartSchema"
import { dbData } from "@/schemas/connection"
import mongoose from "mongoose"

import { NextResponse } from "next/server"


export async function POST(request) {
    
    try {
        const cartdata = await request.json()
    // console.log("main",cartdata)
    await mongoose.connect(dbData, { useNewUrlParser: true })
    const cartdatamodel = await new cartSchemamodel(cartdata)
    await cartdatamodel.save()


    return NextResponse.json({message:"connected",success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"connection error,try again later",success:false},{status:201})
    }
}