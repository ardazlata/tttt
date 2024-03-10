const jwt = require('jsonwebtoken');
const {promisify}=require("util")
 exports.protect = async (req, res, next) => {
  let token;  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    
    if(!token){
      return res.status(401).json({message:"Un authorized access to tken available"})
    }
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
      console.log(decoded);   
      req.userId=decoded.id;
         console.log(req.userId);
         return next();
      
    } catch (error) {

      return res.status(401).json({message:"Un authorized access Invalid token available"})
      
    }
  } 
  return res.status(401).json({message:"Un authorized access to token available"})

}