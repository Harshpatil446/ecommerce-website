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
    const { id } = req.params
    try {
        const product = await Product.findById(id)
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
        let imagePublicId = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            imageUrl = result.secure_url
            imagePublicId = result.public_id;
        }
        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock,
            imageUrl,
            imagePublicId
        })
        res.status(201).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { title, description, price, category, stock } = req.body
        const { id } = req.params
        const product = await Product.findById(id)
        if (product) {
            product.title = title || product.title
            product.description = description || product.description
            product.price = price || product.price
            product.category = category || category.price
            product.stock = stock || stock.price
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                console.log(result)
                product.imageUrl = result.secure_url
                product.imagePublicId = result.public_id;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct)
        }
        else {
            res.status(404).json({ message: "product not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Delete image from Cloudinary
        if (product.imagePublicId) {
            await cloudinary.uploader.destroy(product.imagePublicId);
        }

        // Delete product from MongoDB
        await product.deleteOne();

        res.json({
            message: "Product removed"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }