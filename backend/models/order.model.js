const mongoose = require("mongoose")
const Product = require("./product.model")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            qty: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: [
        {
            fullname: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            postalCode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
        }
    ],
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered",],
        default: "pending"
    }
}, { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order