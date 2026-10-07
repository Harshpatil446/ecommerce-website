const express = require("express")
const paymentController = require("../controllers/payment.controller")
const router = express.Router()


router.post("/order", paymentController.createOrder)
router.post("/verify", paymentController.verify)

module.exports = router