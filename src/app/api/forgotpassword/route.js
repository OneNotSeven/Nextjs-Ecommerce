import { dbData } from "@/schemas/connection"
import { EcomSchema } from "@/schemas/signupSchema"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
export async function POST(req) {
   try {
    const info = await req.json()
       const id = await info.resUserId
       const password=await info.password
    //    console.log("per", info)
       
       if (!id) {
           throw new Error
       }
    await mongoose.connect(dbData, { useNewUrlParser: true })
    const reset = await EcomSchema.findById({ _id: id })
       if (!reset) {
           throw new Error
       }
       const userPasswordEncrypt = bcrypt.hashSync(password, 10)

       const resetPasswordUpdater = await EcomSchema.updateOne({ _id: id }, { $set: { password: userPasswordEncrypt } })
       
       return NextResponse.json({message:"password changed",success:true},{status:200})
   } catch (error) {
    return NextResponse.json({message:"invalid user",success:false},{status:500})
   }
}