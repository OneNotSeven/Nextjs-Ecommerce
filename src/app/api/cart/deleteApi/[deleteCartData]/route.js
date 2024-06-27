import { cartSchemamodel } from "@/schemas/cartSchema"
import { dbData } from "@/schemas/connection"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function DELETE(req, res) {
   try {
    console.log("tri",res)
    const id = await res.params.deleteCartData
    await mongoose.connect(dbData, { useNewUrlParse: true })
    const deletedUser = await cartSchemamodel.deleteOne({ _id: id })
    return NextResponse.json({message:"item Removed",success:true},{status:200})
   } catch (error) {
    return NextResponse.json({message:"something went wrong",success:false},{status:201})
   }
}