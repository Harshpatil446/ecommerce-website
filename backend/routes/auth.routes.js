const express = require("express")
const authController = require("../controllers/auth.controller")

const router = express.Router()

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.get("/user", protect, admin, authController.getUsers)

module.exports = router