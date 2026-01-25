import React, { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/axios";

function AddProduct() {
  const [form, setform] = useState({
    title : "" ,
    description : "" ,
    image : "" , 
    price :  "" ,
    category : "" ,
    stock  : "" ,
  })
  const navigate = useNavigate();

  const handlechanges = (e)=>{
    setform({
      ...form , [e.target.name]: e.target.value
    });
  }; 

  const handlesubmit = async(e)=>{
    e.preventDefault();
    try{
      await api.post("/Product/add" , form);
      navigate("/admin/Products");
    }catch(err){
      console.log("Error adding product: ", err);
    }
    
  }


  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-slate-800 text-white p-8 rounded-xl w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">➕ Add Product</h2>

        <form onSubmit={handlesubmit} className="space-y-4">
          <input 
            name="title"
            value={form.title}
          onChange={handlechanges}
            type="text"
            placeholder="Product Title"
            className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none"
          />
          <input 
            name="image"
            value={form.image}
          onChange={handlechanges}
            type="text"
            placeholder="Image URL"
            className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none"
          />

          <input 
            name="price"
            value={form.price}
          onChange={handlechanges}
            type="number"
            placeholder="Price"
            className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none"
          />

          <input 
            name="stock"
            value={form.stock}
          onChange={handlechanges}
            type="number"
            placeholder="Stock"
            className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none"
          />

          <input 
            name="category"
            value={form.category}
            onChange={handlechanges}
            type="text"
            placeholder="Category"
            className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none"
          />

          <textarea   
            placeholder="Description"
            className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none"
          />

          <button className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
