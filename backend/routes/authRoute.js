import express from "express";
import { loginUser, SignupUser } from "../controllers/AuthController.js";

  const authrouter = express.Router();

authrouter.post('/signup', SignupUser) ;
authrouter.post('/login', loginUser) ;

export default authrouter ; 