import mongoose  from "mongoose";

 const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL) ;
        console.log("connected to mogodb")
  }catch(err){
     console.log(`error is occure ${err.message}`);
  }
}
export default connectDB;
