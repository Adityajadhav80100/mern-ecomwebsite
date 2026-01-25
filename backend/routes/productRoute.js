import express from 'express' 
import { CreateProduct , Update , Delete , GetProducts  , GetProductById} from '../controllers/productController.js'



 const ProductRoutes = express();

ProductRoutes.post('/add' , CreateProduct) ;
ProductRoutes.get('/' , GetProducts);
ProductRoutes.delete('/delete/:id' , Delete );
ProductRoutes.put('/update/:id' , Update);
ProductRoutes.get('/:id' , GetProductById);


export default ProductRoutes;