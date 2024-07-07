import {User} from ".././models/user.model.js"
import { comparePassword, hashPassword } from "../helper/authhelper.js";
import JWT from 'jsonwebtoken'


// /REGISTER
export const registerController = async(req,res)=>{
    try {
            const {name,email,password,phone,address} = req.body; 
            //validations
            if(!name){
                return res.send({error:'Name is required'});
            }
            if(!email){
                return res.send({error:'Email is required'});
            }
            if(!password){
                return res.send({error:'Password is required'});
            }
            if(!phone){
                return res.send({ error:'phone is required'});
            }
            if(!address){
                return res.send({error:'address is required'});
            }
            //check user
            const existingUser = await User.findOne({email})
            if(existingUser)
                {   
                    return res.status(200).send(
                        {
                            // these properties will be present in res.data.__ in frontend
                            success:true,
                            harsh:true,
                            message:"Already Register please Login"
                        }
                    )
                }
            //register user
            const hashedPassword = await hashPassword(password)
            //saving
            const user = await User.create({name,email,phone,address,password:hashedPassword});
            res.status(200).send({
                success:true,
                message:"User registered Successfully",
                user
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in registerController'

        })
    }

};

// LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check User
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },  
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in loginController'
        });
    }
};

export const testController = async(req,res)=>{
    res.send("PROTECTED ROUTE");
}


