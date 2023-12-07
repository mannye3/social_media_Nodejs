const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"]
    },


    lastname: {
        type: String,
              required: [true, "Last Name is required"]

    },

    profilePhoto: {
        type: String,
             

    },

    email: {
        type: String,
        required: [true, "Please add the contact email"],
        unique: [true, "Email address already taken"]
    },


    password: {
        type: String,
        required: [true, "Please add user password"]
    },


     postCount: {
        type: Number,
        default: 0,
    },


     isBlock: {
        type: Boolean,
        required: false,
    },

     isAdmin: {
        type: Boolean,
        default: false
    },


         role: {
        type: String,
        enum: ["Admin","Guest","Editor"],
    },


    viewedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
],

followers : [{
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
},
],



following : [{
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
},
],


active: {
    type: Boolean,
    default: true
},

posts : [{
      type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
},

],
 

},{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema)