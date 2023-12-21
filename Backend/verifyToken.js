const jwt = require('jsonwebtoken');
const handleError = (statusCode, message) => {
  return { statusCode, message };
};


const verifyToken = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const token = req.cookies.access_token;
  if (!token) return next(handleError(401,"You are not authenticated"));
   jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err) return next(createError(403,"Token is invalid"));
    req.user=user;
    next();
   })
 
};
module.exports = { verifyToken };
