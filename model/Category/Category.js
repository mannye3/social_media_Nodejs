const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Author is required"]
    },
],


    title: {
        type: String,
        required: [true, "title is required"]

    },


},{
    timestamps: true,
})

module.exports = mongoose.model("Category", commentSchema)