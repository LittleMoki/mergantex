const express = require('express')
const router = express.Router()
const multer = require('multer')
const { ProductCategoryController, ProductController } = require('../controller')

// uploads storage

const uploadsDestination = 'uploads'

const storage = multer.diskStorage({
	destination: uploadsDestination,
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const uploads = multer({ storage: storage })

// category

router.post('/categories', ProductCategoryController.createCategory)
router.get('/categories', ProductCategoryController.getCategories)
router.get('/categories/:id', ProductCategoryController.getCategory)
router.put('/categories/:id', ProductCategoryController.updateCategory)
router.delete('/categories/:id', ProductCategoryController.deleteCategory)

// product

router.post('/products',ProductController.createProduct)
router.get('/products',ProductController.getProducts)
router.delete('/products/:id', ProductController.deleteProduct);


module.exports = router
