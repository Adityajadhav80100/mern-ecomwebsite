import express from 'express' 
import { SaveAddress , getAddress } from '../controllers/addressController.js'


const Routes = express.Router();

Routes.post('/add', SaveAddress);
Routes.get('/:userId', getAddress);

export default Routes;