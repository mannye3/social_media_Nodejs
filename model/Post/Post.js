const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },


    description: {
        type: String,
        required: [true, "Description is required"]

    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"]
    },


    numViews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
],


likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
],


disLikes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
],


user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please Author is required"]
    },
],



photo:
{
    type: String,
    required : [true, "Post image is required"]
},



   

},{
    timestamps: true,
})

module.exports = mongoose.model("Post", postSchema)