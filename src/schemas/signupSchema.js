import mongoose from "mongoose"

const signupModel = new mongoose.Schema({
    
    name: String,
    password: String,
    email: String,
    address: String,
    contact: Number,
    isLoggedIn: {
        type: Boolean,
        default:false
    }
})

export const EcomSchema=mongoose.models.Ecomusersdatas || mongoose.model("Ecomusersdatas",signupModel)