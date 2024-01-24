const Category = require("../../model/Category/Category");
const User = require("../../model/User/User")
const {appErr, AppErr} = require('../../utils/appErr');







const createcategoryCtrl = async(req,res,next) =>{
    const {title} = req.body;
    try {
       // const author = await User.findById(req.userAuth)
        const category = await Category.create({
            title,
            user: req.userAuth,
        })
       // author.posts.push(postCreated)
        await category.save()
        res.json({
            status: "success",
            data: category
        })
    } catch (error) {
    next(appErr(error.message))

    }
}




const categoriesCtrl = async(req,res,next) =>{
    try {
        const categories = await Category.find()
        res.json({
            status: "success",
            data: categories
        })
    } catch (error) {
     next(appErr(error.message))

    }
}


const categoryCtrl = async(req,res,next) =>{
    try {
        const category = await Category.findById(req.params.id)
        res.json({
            status: "success",
            data: category
        })
    } catch (error) {
     next(appErr(error.message))

    }
}

const updateCategoryCtrl = async(req,res,next) =>{
     const {title} = req.body;

   
        try {
            const category =  await Category.findByIdAndUpdate(
                req.params.id,
                {title},
                {new:true, runValidators: true}
            )
        res.json({
            status: "success",
            data: category
        })
    } catch (error) {
        next(appErr(error.message))
        
    }
}



const deleteCategoryCtrl = async(req,res,next) =>{
   
        try {
            const category =  await Category.findByIdAndDelete(req.params.id)
            res.json({
            status: "success",
            data: "Deleted Successfully"
        })
    } catch (error) {
        next(appErr(error.message))
        
    }
}







module.exports = {
    createcategoryCtrl,
    categoriesCtrl,
    categoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl

}