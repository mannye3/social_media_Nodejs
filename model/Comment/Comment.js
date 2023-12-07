const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
     post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post is required"]
    },

    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Author is required"]
    },
],


    description: {
        type: String,
        required: [true, "Description is required"]

    },



},{
    timestamps: true,
})

module.exports = mongoose.model("Comment", commentSchema)