const express = require("express");
const { userRegisterCtrl, userLoginCtrl, usersCtrl, userProfileCtrl, userDeleteCtrl, useUpdateCtrl } = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");

const userRouter = express.Router();

// POST /api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

// POST /api/v1/users/login
userRouter.post("/login", userLoginCtrl);

// GET /api/v1/users
userRouter.get("/", usersCtrl);

// GET /api/v1/users/profile/:id
userRouter.get("/profile/", isLogin, userProfileCtrl);

// DELETE /api/v1/users/:id
userRouter.delete("/:id", userDeleteCtrl);

// PUT /api/v1/users/:id
userRouter.put("/:id", useUpdateCtrl);

module.exports = userRouter;
