import jwt from "jsonwebtoken";
import User from "../models/User.js";


//MIDDLEWARE SUPPORT
export const protect=async(req,res,next)=>{
    try {
        let token;

        //1.Get Token from header
        if(req.headers.authorization?.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message:"Not Authorized,no token"});
        }

        //2.Verify Token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //3.Get user from DB
        const user=await User.findById(decoded.id).select("-password");

        req.user=user;
        next();
    } catch (error) {
        res.status(500).json({message:"Not authorized,token failed"});
    }
}

//ROLES
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }
    next();
  };
};