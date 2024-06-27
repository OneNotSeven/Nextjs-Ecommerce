import mongoose, { Types } from "mongoose";
import { number } from "yup";




const cartModel = new mongoose.Schema({
    
    userid: { type: String, required: true },
    productsUniqueId:Number,
    title: String,
    category: String,
    description: String,
    image: String,
    numberOfInputs:Number,
    price: String,
    reviews: [{
        rating: Number,
        comment: String,
        date: Date,
        reviewerName: String,
        reviewerEmail:String
    }]
})

export const cartSchemamodel=mongoose.models.Ecomuserscartdatas || mongoose.model("Ecomuserscartdatas",cartModel)