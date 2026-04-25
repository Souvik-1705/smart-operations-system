import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//SIGNUP
export const signup=async(req,res)=>{
    try {
        const{name,email,password}=req.body;

        //1.Validation
        if(!name || !email || !password ){
            return res.status(400).json({message:"All fields required"});
        }

        //2.Check existing user
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist."});
        }

        //3.Hash Password
        const hashedPassword=await bcrypt.hash(password,10);

        //4.Create User
        const user=new User({
            name,
            email,
            password:hashedPassword,
            role:"user",
        })
        await user.save();

        //5.Response
        res.status(201).json({message:"User created successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        });
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message});
    }
}


//LOGIN
export const login=async(req,res)=>{
    try {
        const{email,password}=req.body;

        //1.Validation
        if(!email || !password){
            return res.status(400).json({message:"All fields required"});
        }

        //2.Check User Exist
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        //3.Compare Password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //4.Generate JWT
        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        //5.Response
        res.status(200).json({
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        });
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message});
    }
}