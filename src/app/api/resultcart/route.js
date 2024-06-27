import { dbData } from "@/schemas/connection"
import { shopsInfo } from "@/schemas/productuploadSchema"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {
        const { id } = await req.json()
        // console.log("iddd", id)
        await mongoose.connect(dbData, { useNewUrlParser: true })
        const valOnsearch = await shopsInfo.findOne({id} )
        // console.log("database", valOnsearch)
        
       return NextResponse.json({message:valOnsearch,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"failed",success:false},{status:500})
    }
   
}
