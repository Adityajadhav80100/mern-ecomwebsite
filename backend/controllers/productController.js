
import { compareSync } from "bcryptjs";
import products from "../models/products.js";
  
//creating product
export const CreateProduct = async  (req , res )=>{
    try{ 
          const newproduct = await products.create(req.body);
          res.json({
            message:"New product is Created successfully",
            newproduct
          })

        
      }catch(err){
          res.status(500).json({
            message: "error is here",
            error: err.message,
        });
      }
}

// get single product by id
export const GetProductById = async (req, res) => {
  try {
    const product = await products.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: "error in get product by id",
      err: err.message,
    });
  }
};


// get all product
export const GetProducts = async  (req , res )=>{
    try{ 
           const {search , category} = req.query;
        
           const filter = {};
           
           if(search){
              filter.title = {$regex:search  , $options:'i' };
           }

           if(category){
          filter.category = category;
           }

          const Getproducts = await products.find(filter).sort({createdAt:-1 });
          res.json({
            message:"products is Get successfully",
            Getproducts
          })

        
      }catch(err){
        res.status(500).json({message:"error in getproduct " , err: err.message});
      }
}

//update a product
export const Update = async (req, res) =>{
    try{
             const product = await products.findByIdAndUpdate(
                req.params.id ,
                req.body ,
                {new: true}
             );
             res.json({
                message:"product is Updated " ,
                product
             });
    }catch(err){
        res.status(500).json({message:"error in update" , err:err.message})
    }

}
//Delete a product
export const Delete = async (req, res) =>{
    try{
             const product = await products.findByIdAndDelete(  req.params.id );
             res.json({
                message:"product is Deleted " ,
                product
             });
    }catch(err){
        res.status(500).json({message:"error in update" , err:err.message})
    }

}