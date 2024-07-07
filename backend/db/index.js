import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';
const connectDB = async()=>{
  try{
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log("Connection successful");
  }
  catch(err){
    console.log("COnnection failed");
    console.log(err);
  }
}
export default connectDB;