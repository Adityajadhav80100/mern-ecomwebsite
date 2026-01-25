import express from "express";
import { addToCart , removeItem , getUserCart , updateCartItem } from "../controllers/cartController.js";

const  CartsRoute = express.Router();
CartsRoute.post('/add', addToCart) ;
CartsRoute.post('/remove', removeItem) ;
CartsRoute.get('/:userId', getUserCart) ;
CartsRoute.post('/update', updateCartItem) ;

export default  CartsRoute ; 