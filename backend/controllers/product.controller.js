const Product = require("../models/product.model")
const cloudinary = require("../config/cloudinary")

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

const getProductById = async (req, res) => {
    const { id } = req.paramas
    try {
        const product = Product.findById(id)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ message: "product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, stock } = req.body
        let imageUrl = ""
        if (req.file) {
            const resutl = await cloudinary.uploader.upload(req.file.path)
            imageUrl = resutl.secure_url
        }
        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock,
            imageUrl
        })
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { title, description, price, category, stock } = req.body
        const { id } = req.paramas
        const product = await Product.findById(id)
        if (product) {
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.category = category || category.price
            product.stock = stock || stock.price
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                console.log(result)
                product.imageUrl = result.secure_url
            }
            const updatedProduct = await prduct.save();
            res.json(updatedProduct)
        }
        else {
            res.status(404).json({ message: "product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

module.exports = { getProducts, getProductById, createProduct }