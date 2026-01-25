import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from  './config/db.js';
import authrouter from './routes/authRoute.js';
import  ProductRoutes  from './routes/productRoute.js';
import CartsRoute  from './routes/CartsRoute.js';
import addressRoute from './routes/addressRoute.js';
import orderRoute from  './routes/orderRoute.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth' , authrouter);
// app.use('/api/auth' , authrouter);

app.use('/api/Product' , ProductRoutes );

app.use('/api/cart' , CartsRoute );

app.use('/api/address' , addressRoute)

app.use('/api/order' , orderRoute)

app.get('/', (req , res)=>{
  res.send("i am runnning");

})

connectDB();
 
app.listen(5001, ()=>{
    console.log("the server is runing on port 5001")
})