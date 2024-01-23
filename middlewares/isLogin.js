const { AppErr } = require("../utils/appErr")
const getTokenFromHeader = require("../utils/getTokenFromHeader")
const verifyToken = require("../utils/verifyToken")




const isLogin = (req,res,next) =>{
    const token = getTokenFromHeader(req)
    const decodedUser = verifyToken(token)
    req.userAuth = decodedUser.id
    if(!decodedUser){
          return  next(new AppErr("Invalid/Expired Token", 500))
       
    }else{
        next();
    }


}


module.exports = isLogin