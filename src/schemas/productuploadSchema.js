import { text } from "@fortawesome/fontawesome-svg-core"
import mongoose from "mongoose"

const producrtUploadModel = new mongoose.Schema({
    
    userid: { type: String, required: true },
    id:Number,
    title: {type:String,text:true},
    description: { type: String, text: true },
    category: { type: String, text: true },
    price: String,
   
    stock: String,
    tags: [ String],
    brand: String,

    warrantyInformation: String,
    availabilityStatus: String,
    returnPolicy: String,
   
    images: [
    
    ],
    thumbnail: String,
    reviews: [{
        rating: Number,
        comment: String,
        date: Date,
        reviewerName: String,
        reviewerEmail:String
    }]
})

export const shopsInfo=mongoose.models.shopsdatas || mongoose.model("shopsdatas",producrtUploadModel)