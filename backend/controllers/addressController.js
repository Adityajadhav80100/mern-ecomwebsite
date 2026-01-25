import address from "../models/address.js";


//save address
export const SaveAddress = async(req , res )=>{
    try {
        const Address = await address.create(req.body);
        res.json({message:'address save succsfully' ,Address});

    } catch (error) {
        res.status(500).json({message:'error in saveAddress' , error});
    }
} ;


//get saved address by userid
export const getAddress = async (req , res) => {
     try {
          const Address = await address.find({userId:req.params.userId})
          res.json({Address})
     } catch (error) {
        res.status(500).json({message:'error in getAddress' , error});
     }
}