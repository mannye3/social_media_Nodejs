const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");

const globalErrHandler = require("./middlewares/globalErrHandler");






require("dotenv").config();
require("./config/dbConnect")


const  app = express()

app.use(express.json())


//users routes
app.use("/api/v1/users/", userRouter)
app.use("/api/v1/posts/", postRouter)


app.use(globalErrHandler)

app.use('*', (req,res)=>{
    res.status(404).json({
        message: `${req.originalUrl} - Route Not Found`
    })
})
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`))