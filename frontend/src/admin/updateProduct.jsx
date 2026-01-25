import React from "react";
import { useEffect , useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../api/axios";


function UpdateProduct() {

   const [form, setform] = useState({
     title : "" ,
    description : "" ,
    image : "" , 
    price :  "" ,
    category : "" ,
    stock  : "" ,
   })
    const navigate = useNavigate();
    const {id} = useParams();

    const allowedFields = ["title", "price", "category", "description", "image", "stock"];

    const LoadeData = async()=>{
      try{
        const res = await api.get(`/Product/${id}` ,)
        const productData = res.data.product;
        const filteredData = {};  
        allowedFields.forEach(field => {
          filteredData[field] = productData[field];
        });
        setform(filteredData);
      }catch(err){
        console.log("error in loading product data" , err);
    }
    }

    useEffect(() => {
     LoadeData();
    }, [])
    
  const handlechanges = (e)=>{
    setform({
      ...form , [e.target.name]: e.target.value
    });
  };
  const handlesubmit = async(e)=>{  
    e.preventDefault(); 
    try{
      await api.put(`/Product/update/${id}` , form);
      navigate("/admin/products");
    }catch(err){
      console.log("Error updating product: ", err);
    } 
  }
    
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-slate-800 text-white p-8 rounded-xl w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">✏️ Update Product</h2>    
        <form onSubmit={handlesubmit} className="space-y-4">
           {
            allowedFields.map((field) => (
              allowedFields.includes(field) && (  

              <input
                key={field} 
                name={field}
                value={form[field]}
                onChange={handlechanges}
                type={field === "price" || field === "stock" ? "number" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none"
              />
            )))

           }
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Update Product
          </button>   
        </form>
      </div>
    </div>  
  );
}

export default UpdateProduct;
