const bcrypt = require('bcryptjs')
const User = require("../../model/User/User");
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');



//Register
const userRegisterCtrl = async(req,res) =>{
    const {firstname,lastname,email,password} = req.body;
    try {
        const userFound = await User.findOne({email})
       if(userFound){
        return res.json({
            msg: 'User already Exist'
        })
       }
       //hash password
       const salt = await bcrypt.genSalt(10)
       const hashPassword = await bcrypt.hash(password, salt)
       const user = await User.create({
        firstname,lastname,email,password: hashPassword
       })
       res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.json(error.message)
    }
}

//Login
const userLoginCtrl = async(req,res) =>{
    const {email,password} = req.body
    
    try {
        //check if email exists
        const userFound = await User.findOne({email})
      
         if(!userFound){
            return res.json({
                msg: "Invalid login credentials"
            })
         }
    

         // Validate Password
         const isPasswordMatched = await bcrypt.compare(password, userFound.password)

         if(!isPasswordMatched){
            return res.json({
                msg: "Invalid login credentials"
            })
         }
    

        res.json({
            status: "success",
            data: {
                firstname: userFound.firstname,
                lastname: userFound.lastname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                token: generateToken(userFound._id)
            }
        })
    } catch (error) {
        res.json(error.message)
    }
}



const userProfileCtrl = async(req,res) =>{
   
    try {
        const user = await User.findById(req.userAuth)
        res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.json(error.message)
    }
}








const usersCtrl = async(req,res) =>{
    try {
        res.json({
            status: "success",
            data: "all users"
        })
    } catch (error) {
        res.json(error.message)
    }
}





const userDeleteCtrl = async(req,res) =>{
    try {
        res.json({
            status: "success",
            data: "Delete user route"
        })
    } catch (error) {
        res.json(error.message)
    }
}


const useUpdateCtrl = async(req,res) =>{
    try {
        res.json({
            status: "success",
            data: "Update user route"
        })
    } catch (error) {
        res.json(error.message)
    }
}





module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    usersCtrl,
    userProfileCtrl,
    userDeleteCtrl,
    useUpdateCtrl
}