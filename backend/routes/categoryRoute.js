import express from 'express';
import { createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController } from '../controllers/categoryController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();


//routes 
// create category
router.post('/create-category', requireSignIn,isAdmin,createCategoryController);
// update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);
// getALl category
router.get('/get-category',categoryController)
// get a single category
router.get('/single-category/:id',singleCategoryController)
// delete a category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);
export default router;