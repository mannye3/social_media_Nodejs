const express = require("express");
const { createcategoryCtrl, categoriesCtrl,categoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } = require("../../controllers/categories/categoryCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
//const storage = require("../../config/cloudinary");
//const multer = require("multer");
//const isAdmin = require("../../middlewares/isAdmin");
const categoryRouter = express.Router();





categoryRouter.post("/", isLogin, isAdmin, createcategoryCtrl)

categoryRouter.get("/", isLogin, categoriesCtrl)


categoryRouter.get("/:id", isLogin, categoryCtrl)

categoryRouter.put("/:id", isLogin, updateCategoryCtrl)


categoryRouter.delete("/:id", isLogin, isAdmin, deleteCategoryCtrl)









module.exports = categoryRouter;