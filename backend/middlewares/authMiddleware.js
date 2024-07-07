import JWT from "jsonwebtoken";
import { User } from "../models/user.model.js";

//PROTECTED ROUTE token base

export const requireSignIn = (req, res, next) => {
  try {
    const decode = JWT.verify(
      // SPECIFY IN FRONTEND
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //ASSIGN THIS OBJECT TO REQ.U SER
    // IN THIS CASE ONLY ID IS PRESENT
    // A NEW PROPERTY USER IS BEING ADDED TO THE REQ OBJECT 
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "unauthorized access", 
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success:false,
      message: error
    })
  }
};
