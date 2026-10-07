const express = require("express")
const router = express.Router()
const protect = require("../middlewares/auth.middleware")
const admin = require("../middlewares/admin.middleware")
const analyticsController = require("../controllers/analytics.controller")

router.get("/", protect, admin, analyticsController.getAdminStats)

module.exports = router