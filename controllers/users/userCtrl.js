const bcrypt = require('bcryptjs')
const User = require("../../model/User/User");
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');
const {appErr, AppErr} = require('../../utils/appErr');
const Post = require('../../model/Post/Post');
const Category = require('../../model/Category/Category');
const Comment = require('../../model/Comment/Comment');




//Register
const userRegisterCtrl = async(req,res,next) =>{
    const {firstname,lastname,email,password} = req.body;
    try {
        const userFound = await User.findOne({email})
       if(userFound){

        return  next(new AppErr("User Already Exist", 500))

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
        next(appErr(error.message))
       // 
       //next(appErr(error.message))
    }
}

//Login
const userLoginCtrl = async(req,res,next) =>{
    const {email,password} = req.body
    
    try {
        //check if email exists
        const userFound = await User.findOne({email})
      
         if(!userFound){
            return next(appErr("Invalid login credentials"))
           
         }
    

         // Validate Password
         const isPasswordMatched = await bcrypt.compare(password, userFound.password)

         if(!isPasswordMatched){
             return next(appErr("Invalid login credentials"))
            // return res.json({
            //     msg: "Invalid login credentials"
            // })
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
        next(appErr(error.message))
       // next(appErr(error.message))
       // 
    }
}



const userProfileCtrl = async(req,res,next) =>{
   
    try {
        const user = await User.findById(req.userAuth).populate("posts")
        res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        next(appErr(error.message))
        
    }
}








const usersCtrl = async(req,res,next) =>{
    try {
        const users = await User.find()
        res.json({
            status: "success",
            data: users
        })
    } catch (error) {
        next(appErr(error.message))
        
    }
}


const blockUsersCtrl = async(req,res, next) =>{
    try {
       const userToBlocked =  await User.findById(req.params.id)
       const userWhoBlocked = await User.findById(req.userAuth)

       if(userWhoBlocked && userToBlocked)
       {
        const isUserAreadyBlocked = userWhoBlocked.blocked.find(blocked => blocked.toString() === userToBlocked._id.toString())

        if(isUserAreadyBlocked){
            return next (appErr('You already blocked this user'))
        }

        userWhoBlocked.blocked.push(userToBlocked._id);
        await userWhoBlocked.save();
        res.json({
            status: "success",
            data: "You have successfully blocked this user"
        })
       }
        
    } catch (error) {
        next(appErr(error.message))
        
    }
}



const unblockUsersCtrl = async(req,res, next) =>{
    try {
       const userToUnBlocked =  await User.findById(req.params.id)
       const userWhoUnBlocked = await User.findById(req.userAuth)

       if(userToUnBlocked && userWhoUnBlocked)
       {
        const isUserAreadyBlocked = userWhoUnBlocked.blocked.find(blocked => blocked.toString() === userToUnBlocked._id.toString())


        if(!isUserAreadyBlocked){
            return next (appErr('You have not block this user'))
        }

        userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
            blocked=> blocked.toString() !== userToUnBlocked._id.toString());

        await userWhoUnBlocked.save();
        res.json({
            status: "success",
            data: "You have successfully unblocked this user"
        })
       }
        
    } catch (error) {
        next(appErr(error.message))
        
    }
}




const AdminblockUserCtrl = async(req,res,next) =>{
    try {
        const userToBlocked = await User.findById(req.params.id)

        if(!userToBlocked){
            return next(appErr("User not found"))
        }
        userToBlocked.isBlocked = true

        await userToBlocked.save()
        res.json({
            status: "success",
            data: "User Blocked successfully"
        })
    } catch (error) {
        next(appErr(error.message))
        
    }
}



const AdminUnBlockUserCtrl = async(req,res,next) =>{
    try {
        const userToUnBlocked = await User.findById(req.params.id)

        if(!userToUnBlocked){
            return next(appErr("User not found"))
        }
        userToUnBlocked.isBlocked = false

        await userToUnBlocked.save()
        res.json({
            status: "success",
            data: "User Unblocked successfully"
        })
    } catch (error) {
        next(appErr(error.message))
        
    }
}



const whoViewedMyProfileCtrl = async(req,res,next) =>{
    try {
        const user =  await User.findById(req.params.id) 
        const userWhoViewed = await User.findById(req.userAuth)

        if(user && userWhoViewed){
            const isUserAlreadyViewed = user.viewers.find(
                viewer => viewer.toString() === userWhoViewed._id.toJSON()
            
            )
            if(isUserAlreadyViewed){
                return next(appErr("You already viewed this profile"))
            }
            else{
            user.viewers.push(userWhoViewed._id)
            await user.save()

             res.json({
            status: "success",
            data: "You have succesfully viewed this profile"
        })
        }
        }

       
    } catch (error) {
    next(appErr(error.message))

    }
}








const followingCtrl = async(req,res,next) =>{
    try {
        const userToFollow =  await User.findById(req.params.id)
        const userWhoFollowed = await User.findById(req.userAuth)


        if(userToFollow && userWhoFollowed){
            const isUserAlreadyFollowed = userToFollow.following.find(
                follower => follower.toString() === userWhoFollowed._id.toString()
            )

            if(isUserAlreadyFollowed){

                return next(appErr('You already followed this user'))
            }else{
                userToFollow.followers.push(userWhoFollowed._id)
                
                userWhoFollowed.following.push(userToFollow._id)

                await userWhoFollowed.save();
                await userToFollow.save();

                 res.json({
            status: "success",
            data: "You have successfully follow this user "
        })
            }
        }

       
    } catch (error) {
        next(appErr(error.message))
       
    }
}


const unFollowCtrl = async(req,res,next) =>{
    try {

        const userToBeUnfollowed =  await User.findById(req.params.id)
        const userWhoUnfollowed = await User.findById(req.userAuth)

        if(userToBeUnfollowed && userWhoUnfollowed){
            const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(
                follower =>follower.toString() === userWhoUnfollowed._id.toString()
            )

            if(!isUserAlreadyFollowed){
                return next(appErr('You have not follwed this user'))
            }else{
                userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
                    follower => follower.toString() !== userWhoUnfollowed._id.toString()
                )

                await userToBeUnfollowed.save();



                userWhoUnfollowed.following = userWhoUnfollowed.following.filter(
                    following => following.toString() !==userToBeUnfollowed._id.toString()
                )

                await userWhoUnfollowed.save()


                res.json({
            status: "success",
            data: "You have successfully unfollowed this user"
        })
            }
        }

        
    } catch (error) {
        next(appErr(error.message))
        
    }
}



const profilePhotoUploaddCtrl = async(req,res, next) =>{
    try {

        const userToUpdate = await User.findById(req.userAuth)

        if(!userToUpdate){
            return next(appErr("User not found", 403))
        }


        if(userToUpdate.isBlocked){
            return next(appErr("action not allow, your account is blocked",403 ))
        }


        if(req.file){
            await User.findByIdAndUpdate(req.userAuth,{
                $set: {
                    profilePhoto: req.file.path
                }
            },
            {
                new: true
            })

               res.json({
            status: "success",
        data: "you have successfully updated your profile photo"

        })
        }


     
    } catch (error) {
        next(appErr(erro.message, 500))
       // next(appErr(error.message))
        // 
    }
}



const updateUserCtrl = async(req,res,next) =>{
    const {email, firstname, lastname} = req.body;
        try {
        if(email){
            const emailTaken = await User.findOne({email})
            if(emailTaken){
                return next(appErr('Email is taken'))
            }
        }

        const user  = await User.findByIdAndUpdate(req.userAuth, {
            lastname,
            firstname,
            email

        },{
            new:true,
            runValidators: true

        })
        res.json({
            status: "success",
            data: user
        })
    } catch (error) {
        next(appErr(error.message))
        
    }
}



const updatePasswordCtrl = async(req,res,next) =>{
    const {password} = req.body
    try {
        if(password){
            const salt = await  bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

             await User.findByIdAndUpdate(
                req.userAuth,
                {password: hashPassword},
                {new: true, runValidators: true}
            )
             res.json({
            status: "success",
            data: "Password has been updated"
        })
        }else{
            return next(appErr("Please provide password field"))
        }
       
    } catch (error) {
        next(appErr(error.message))
        
    }
}



const deleteUserCtrl = async (req, res, next) => {
  try {
    // 1. Find the user to be deleted
    const userToDelete = await User.findById(req.userAuth);

    if (!userToDelete) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // 2. Find and delete all posts of the user
    await Post.deleteMany({ user: req.userAuth });
    // 3. Find and delete all comments of the user
    await Comment.deleteMany({ user: req.userAuth });
    // 4. Find and delete all categories of the user
    await Category.deleteMany({ user: req.userAuth });
    // 5. Delete the user
    await userToDelete.deleteOne();

    // Send response
    return res.json({
      status: "success",
      data: "Your account has been deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message))

  }
};









module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    usersCtrl,
    userProfileCtrl,
    updateUserCtrl,
    updatePasswordCtrl,
    profilePhotoUploaddCtrl,
    whoViewedMyProfileCtrl,
    followingCtrl,
    unFollowCtrl,
    blockUsersCtrl,
    unblockUsersCtrl,
    AdminblockUserCtrl,
    AdminUnBlockUserCtrl,
    deleteUserCtrl
    
}