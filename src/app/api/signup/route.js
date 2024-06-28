import { dbData } from "@/schemas/connection"
import { EcomSchema } from "@/schemas/signupSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import mongoose from "mongoose";


export function GET() {
    return NextResponse.json({message:working,success:true},{status:200})
}

export async function POST(request) {

    try {
    const userdetail = await request.json()
    // console.log(userdetail)
    const email= await userdetail.email
    await mongoose.connect(dbData, { usenewUrlParser: true });
    const emailchecker=await EcomSchema.find({email})

    if (emailchecker.length <= 0) {
        
        userdetail.password = bcrypt.hashSync(userdetail.password, 10)
        
        const data = await new EcomSchema(userdetail)
        await data.save()
        // console.log("signupjwt", data)

        var objectIdAsString = await data._id
        
        var auth_token = jwt.sign(
            { userid:objectIdAsString },
            toString(process.env.NEXT_SECRET_TOKEN_KEY)
          );
      
        // console.log("hey",objectIdAsString)
         
      
          const response = NextResponse.json({ message: "connected", success: true }, { status: 200 });
      
          response.cookies.set("authtoken", auth_token, {
            expiresIn: "1d",
            httpOnly: true,
            secure:true
          });
      
          return response;

    } else {
        throw new Error
    }
    
  
  
        // return NextResponse.json({ message: "connected", success: true }, { status: 200 })  
        
    } catch (error) {
        error.message = "email already registered"
        return NextResponse.json({message:error.message,success:false},{status:201})
   }
     
}
