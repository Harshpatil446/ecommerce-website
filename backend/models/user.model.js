const mongoose = require("mongoose")

const userScheam = new mongoose.Schema({
    title: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        requied: true,
        unique: true
    },
    password: {
        type: String,
        requied: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userScheam)

module.exports = User