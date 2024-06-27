import { dbData } from "@/schemas/connection"
import { EcomSchema } from "@/schemas/signupSchema"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {
    
    const { profileId } = await req.json()
    // console.log(profileId)
    await mongoose.connect(dbData, { useNewUrlParser: true })
    const payload = await EcomSchema.find({ _id:profileId } )
    return NextResponse.json({message:payload,success:true},{status:200})
}