const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/');

const authMidd =(req, res, next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")){ 
    throw new UnauthenticatedError("No token provided");
  }
  //I retrieve the token's code.
  const token = authHeader.split(" ")[1];
  
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id, username} = decoded;
    req.user = {id, username};
    next();
  }catch(err){
    throw new UnauthenticatedError("Unauthorized token");
  }

  
}

module.exports = authMidd;