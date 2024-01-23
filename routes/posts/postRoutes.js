const express = require("express");
const { createpostCtrl, postsCtrl, deletepostCtrl, updatepostCtrl } = require("../../controllers/posts/postCtrl");
const isLogin = require("../../middlewares/isLogin");
const storage = require("../../config/cloudinary");
//const multer = require("multer");
//const isAdmin = require("../../middlewares/isAdmin");
const postRouter = express.Router();





postRouter.post("/", isLogin, createpostCtrl)

postRouter.get("/", isLogin, postsCtrl)






module.exports = postRouter;