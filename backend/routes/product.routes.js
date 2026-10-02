const express = require("express")
const protect = require("../middlewares/auth.middleware")
const admin = require("../middlewares/admin.middleware")
const productController = require("../controllers/product.controller")
const multer = require("multer")
const upload = multer({ dest: "upload/" })

const router = express.Router()

router.get("/", productController.getProducts)
router.post("/", protect, admin, upload.single("image"), productController.createProduct)
router.get("/:id", productController.getProductById)
router.put("/:id", protect, admin, upload.single("image"), productController.updateProduct)
router.delete("/:id", protect, admin, productController.deleteProduct)

module.exports = router