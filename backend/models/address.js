import mongoose, { Types } from "mongoose";

const addressSchema = new mongoose.Schema({
     userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user",
       required: true,
     },  
    fullname: String,
    phone: Number,
    address: String,
    city : String ,
    state : String ,
    pincode: Number 
}, {
    timestamps:true
})

export default mongoose.model('address' , addressSchema);