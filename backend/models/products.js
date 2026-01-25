import mongoose from "mongoose";


export const productSchema = new  mongoose.Schema({
    title : {
        type : String ,
        required : true ,
    }, 
    description : {
        type : String ,
    } ,
    image : {
        type : String ,
        required : true 
    },
    price :{
       type : Number ,
       required : true
    }, 
    category : {
        type : String ,
    },
    stock : {
        type : Number ,
        default : 0 

    }


}, {timestamps : true}) ; 
 
export default mongoose.model('product' , productSchema);