const { use } = require("react")

const mongoose = "mongoose"

const userScheam = new mongoose.userScheam({
    name: {
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
    }
})

const User = mongoose.model("User", userScheam)

module.exports = User