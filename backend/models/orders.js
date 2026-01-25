import mongoose, { Types } from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },

            quanity: Number,
            price: Number
        }
    ],
    address: {
        fullname: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
    },

    totalamount: Number,
    paymentmethode: {
        type: String,
        required: true,
        default: "COD"
    },
    status: {
        type: String,
        default: "Placed"
    },
    
},{timestamps : true});


export default mongoose.model("Orders", OrderSchema);