const express = require("express");
const { userRegisterCtrl, userLoginCtrl, usersCtrl, userProfileCtrl, updateUserCtrl, profilePhotoUploaddCtrl, whoViewedMyProfileCtrl, followingCtrl, unFollowCtrl,blockUsersCtrl,unblockUsersCtrl, AdminblockUserCtrl,AdminUnBlockUserCtrl,updatePasswordCtrl,deleteUserCtrl } = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");
const storage = require("../../config/cloudinary");
const multer = require("multer");
const isAdmin = require("../../middlewares/isAdmin");
const userRouter = express.Router();



const upload = multer ({storage})
// POST /api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

// POST /api/v1/users/login
userRouter.post("/login", userLoginCtrl);

// GET /api/v1/users
userRouter.get("/", usersCtrl);

// GET /api/v1/users/profile/:id
userRouter.get("/profile/", isLogin, userProfileCtrl);




// PUT /api/v1/users/:id
userRouter.put("/",isLogin, updateUserCtrl);


// PUT /api/v1/users/:id
userRouter.put("/updatepassword",isLogin, updatePasswordCtrl);


// PUT /api/v1/users/:id
userRouter.delete("/deleteuser",isLogin, deleteUserCtrl);





// GET /api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id",isLogin, whoViewedMyProfileCtrl);


// GET /api/v1/users/following/:id
userRouter.get("/following/:id",isLogin, followingCtrl);


// GET /api/v1/users/following/:id
userRouter.get("/unfollow/:id",isLogin, unFollowCtrl);

// GET /api/v1/users/following/:id
userRouter.get("/blocked/:id",isLogin, blockUsersCtrl);


userRouter.get("/unblocked/:id",isLogin, unblockUsersCtrl);

userRouter.put("/adminblock/:id",isLogin, isAdmin, AdminblockUserCtrl);



userRouter.put("/adminunblock/:id",isLogin, isAdmin, AdminUnBlockUserCtrl);







// POST /api/v1/users/:id
userRouter.post("/profile-photo-upload",isLogin, upload.single("profile"), profilePhotoUploaddCtrl);




module.exports = userRouter;
