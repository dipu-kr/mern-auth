const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = "jsdhsjdghgwjhdjgdghhdvbzvbcvcghc";

const authenticate = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      
      if (!token) {
        console.log("Unauthorized")
        return res.status(401).json({ error: "Unauthorized - Token is missing" });
      }
  
      // Verify the token
      const verifyToken = jwt.verify(token, keysecret);
      const rootUser = await userdb.findOne({_id:verifyToken})
      if(!rootUser) {throw new Error("User not found")}

      req.token = token
      req.rootUser = rootUser
      req.userId = rootUser._id
      next()
      
    } catch (error) {
      res.status(401).json({status:401,message:"Unauthorized no token provided"})
    }
  };

module.exports = authenticate;
