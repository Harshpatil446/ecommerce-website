const Order = require("../models/order.model")
const sendEmail = require("../utils/email.utils")

const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body
        if (!items || items.length === 0 || !totalAmount || !address) {
            res.status(400).json({ message: "Invalid order data" })
        } else {
            const order = await Order.create({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })

            const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully created with the following details:\n\nOrder ID: ${order._id}\nTotal Amount: ${totalAmount}\nShpping Address: ${address}\n\nwe will notify you once your order is shipped`
            await sendEmail(req.user.email, "Order created", message)
            res.status(201).json({ message: "order created successfully", order })
        }
    } catch (error) {
        res.status(500).json({
            message: "error while creating order"
        })
    }
}

const myOrder = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("items.productId", "name price")
        res.json(orders)
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "id name")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body
        const { id } = req.params
        const order = await Order.findById(id)
        if (order) {
            order.status = status
            await order.save()
            res.json({ message: "order status updated", order })
        } else {
            res.status(400).json("order not found")
        }
    } catch (error) {
        res.status(500).json({ messsge: "server error" })
    }
}

module.exports = { createOrder, myOrder, getOrders, updateOrderStatus }