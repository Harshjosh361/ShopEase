import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';


export const createCategoryController = async(req,res)=> {
  try {
      const {name} = req.body;
      if(!name){
        return res.status(401).send({
          success: false,
          message: 'Name is required'
        })
      }
      const existingCategory = await categoryModel.findOne({name});
      if(existingCategory){
        return res.status(200).send({
          success: true,
          message: 'Category already exists'
        })
      }
      const category = await new categoryModel({name,slug:slugify(name)}).save();
      res.status(201).send({
        success: true,
        message: 'Category created successfully',
        category
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in category'
    })
  }
}

export const updateCategoryController = async (req,res)=>{
  try {
    const {name} =  req.body;
    const {id} =req.params
    // to update the category page we need to pass new true 
    const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    res.status(200).send(
      {
        success:true,
        message:'category updated successfully',
        category
      }
    )
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:'Error while updating category'
    })
  }
}

export const categoryController = async(req,res)=>{
  try {
    const category = await categoryModel.find({})
    res.status(200).send({
      success:true,
      message:"All categories listed",
      category   
     })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:'error in getting categories'
    })
  }
}

export const singleCategoryController =async (req,res)=>{
  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id);
    res.send({
      success:true,
      message:'single category listed',
      category
    })
  } catch (error) {
    console.log(error);
    res.send({
      success:false,
      error,
      message:'error in getting single category'
    })
  }
}

export const deleteCategoryController = async(req,res)=>{
  try{
    const {id} = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.send({
      success:true,
      message:'category deleted successfully'
    })
  }
  catch(error){
    console.log(error);
    res.send({
      success:false,
      error,
      message:'error in deleting category'
    })
  }
}