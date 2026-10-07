const User = require("../models/user.model")
const Order = require("../models/order.model")
const Product = require("../models/product.model")

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" })
        const totalOrders = await Order.countDocuments({})
        const totalProduct = await Product.countDocuments({})

        const orders = await Order.find({})

        const totalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount, 0)

        res.json({
            totalUsers,
            totalOrders,
            totalProduct,
            totalRevenueData
        })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }

}

module.exports = { getAdminStats }