const express = require("express")
const protect = require("../middlewares/auth.middleware")
const admin = require("../middlewares/admin.middleware")
const orderController = require("../controllers/order.controller")

const router = express.Router()

router.post("/", protect, orderController.createOrder)
router.get("/", protect, admin, orderController.getOrders)
router.get("/myorders", protect, orderController.myOrder)
router.put("/:id/status", protect, admin, orderController.updateOrderStatus)

module.exports = router