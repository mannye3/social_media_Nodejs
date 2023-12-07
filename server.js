const express = require("express");
const userRouter = require("./routes/users/userRoutes");


require("dotenv").config();
require("./config/dbConnect")


const  app = express()

app.use(express.json())


//users routes
app.use("/api/v1/users/", userRouter)

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`))