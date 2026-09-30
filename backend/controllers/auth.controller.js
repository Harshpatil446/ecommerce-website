const User = require("../models/user.model")
const sendEmail = require("../utils/email.utils")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

async function registerUser(req, res) {
    const { name, email, password } = req.body

    try {
        const existingUser = User.findOne({
            email
        })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hash
        })

        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const message = `
            Welcome to shop, ${name}!
            Your OTP for registrtion is ${otp}`

            await sendEmail(email, "Registration OTP", message)

            res.status(200).json({
                message: "user created successfully",
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({
                message: "Invalid user data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400).json({ message: "Invalid email or password" })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

module.exports = { registerUser, loginUser, getUsers }