import axios from "axios";

 export const api = axios.create({
    baseURL : "https://mern-ecomwebsite.onrender.com/api" 
})