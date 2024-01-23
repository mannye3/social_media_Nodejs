const Post = require("../../model/Post/Post")
const User = require("../../model/User/User")






const createpostCtrl = async(req,res) =>{
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
        res.json(error.message)
    }
}




const postsCtrl = async(req,res) =>{
    try {
        const posts = await Post.find()
        res.json({
            status: "success",
            data: posts
        })
    } catch (error) {
        res.json(error.message)
    }
}







module.exports = {
    createpostCtrl,
    postsCtrl

}