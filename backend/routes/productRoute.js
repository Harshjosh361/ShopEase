import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,getProductsController, getSingleProductController,productPhotoController,deleteProductController, updateProductController , productFilterController } from '../controllers/productController.js';
import formidable from 'express-formidable'

const router = express.Router();

//routes 
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);
//get all products
router.get('/get-products',getProductsController)
// get single product
router.get('/get-product/:slug',getSingleProductController)
//get photo
router.get('/product-photo/:pid',productPhotoController)
//delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
// update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)
// filter product
router.post('/product-filters',productFilterController)



export default router