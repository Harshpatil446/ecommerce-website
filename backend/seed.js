const dotenv = require("dotenv")
const mongoose = require("mongoose")
const Product = require("./models/product.model")
const User = require("./models/user.model")
const bcrypt = require("bcryptjs")
const dns = require("dns")
dns.setServers(["1.1.1.1", "8.8.8.8"])

dotenv.config()

const products = [
    {
        title: "Classic Cotton T-Shirt",
        description: "A soft, everyday cotton t-shirt with a comfortable regular fit.",
        price: 24.99,
        category: "Clothing",
        stock: 45,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        rating: 4.5
    },
    {
        title: "Everyday Canvas Sneakers",
        description: "Lightweight canvas sneakers designed for comfortable daily wear.",
        price: 49.99,
        category: "Footwear",
        stock: 28,
        imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
        rating: 4.3
    },
    {
        title: "Minimal Leather Backpack",
        description: "A versatile backpack with a roomy main compartment and clean design.",
        price: 89.0,
        category: "Accessories",
        stock: 16,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        rating: 4.7
    },
    {
        title: "Insulated Travel Bottle",
        description: "A reusable stainless-steel bottle that keeps drinks cold or hot on the go.",
        price: 29.5,
        category: "Lifestyle",
        stock: 52,
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
        rating: 4.6
    },
    {
        title: "Wireless On-Ear Headphones",
        description: "Comfortable wireless headphones with clear sound and simple controls.",
        price: 74.99,
        category: "Electronics",
        stock: 21,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        rating: 4.4
    },
    {
        title: "Polarized Everyday Sunglasses",
        description: "Classic polarized sunglasses with lightweight frames for daily use.",
        price: 39.99,
        category: "Accessories",
        stock: 34,
        imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        rating: 4.2
    }
]

const users = [
    {
        name: "Demo Customer",
        email: "customer@example.com",
        role: "user",
        verified: true
    },
    {
        name: "Jordan Lee",
        email: "jordan@example.com",
        role: "user",
        verified: true
    },
    {
        name: "Demo Admin",
        email: "admin@example.com",
        role: "admin",
        verified: true
    }
]

const seedDatabase = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set. Add it to backend/.env before seeding.")
    }

    await mongoose.connect(process.env.MONGO_URI)

    const operations = products.map((product) => ({
        updateOne: {
            filter: { title: product.title },
            update: { $setOnInsert: product },
            upsert: true
        }
    }))

    const result = await Product.bulkWrite(operations)

    const passwordHash = await bcrypt.hash("DemoPass123!", 10)
    const userOperations = users.map((user) => ({
        updateOne: {
            filter: { email: user.email },
            update: {
                $setOnInsert: { ...user, password: passwordHash }
            },
            upsert: true
        }
    }))

    const userResult = await User.bulkWrite(userOperations)
    console.log(`Seed complete: ${result.upsertedCount} products and ${userResult.upsertedCount} users added.`)
}

seedDatabase()
    .catch((error) => {
        console.error("Seed failed:", error.message)
        process.exitCode = 1
    })
    .finally(async () => {
        await mongoose.disconnect()
    })
