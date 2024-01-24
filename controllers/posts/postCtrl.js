const Post = require("../../model/Post/Post")
const User = require("../../model/User/User")






const createpostCtrl = async(req,res,next) =>{
    const {title, description} = req.body;
    try {
        const author = await User.findById(req.userAuth)
        const postCreated = await Post.create({
            title,
            description,
            user: author._id,
        })
        author.posts.push(postCreated)
        await author.save()
        res.json({
            status: "success",
            data: postCreated
        })
    } catch (error) {
    next(appErr(error.message))

    }
}




const postsCtrl = async(req,res,next) =>{
    try {
        const posts = await Post.find()
        res.json({
            status: "success",
            data: posts
        })
    } catch (error) {
     next(appErr(error.message))

    }
}







module.exports = {
    createpostCtrl,
    postsCtrl

}