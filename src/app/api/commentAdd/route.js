import { dbData } from "@/schemas/connection";
import { shopsInfo } from "@/schemas/productuploadSchema";
import { EcomSchema } from "@/schemas/signupSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const commentData = await req.json()
    const proId=await commentData.id
    // console.log("sr-comment", commentData)

    const findUser = await EcomSchema.find({ _id: commentData.userid })

  if (findUser.length == 0) {
      throw new Error
    }
    
    // console.log("gttt",findUser)

    const newReview = {
        rating: 5,
        comment: commentData.comment,
        date: new Date(),
        reviewerName: findUser[0].name,
        reviewerEmail:  findUser[0].email
      };
    
    const posting = await shopsInfo.updateOne({ id: proId }, { $push: { reviews:newReview} })
    // console.log(posting)
    return NextResponse.json({message:posting,success:true},{status:200})
  } catch (error) {
    return NextResponse.json({message:"failed",success:false},{status:500})
  }
}