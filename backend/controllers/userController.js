import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
// api to register user
export const registerUserController = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
           return res.json({success:false,message:"Missing Details."})
        }

        // validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid Email"})
        }

        // validating user password
        if(password.length <4){
            return res.json({success:false,message:"Enter a storng password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}



// 8:56