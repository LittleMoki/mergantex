const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
	ProductCategoryController,
	ProductController,
	FactoryController,
	TechniqueController,
} = require('../controller')

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

router.post('/products', ProductController.createProduct)
router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProductById)
router.delete('/products/:id', ProductController.deleteProduct)

router.post('/factories', FactoryController.createFactory)
router.get('/factories', FactoryController.getFactories)
router.get('/factories/:id', FactoryController.getFactory)
router.delete('/factories/:id', FactoryController.deleteFactory)
router.put('/factories/:id', FactoryController.updateFactory)

router.post('/techniques', TechniqueController.createTechnique)
router.get('/techniques', TechniqueController.getTechniques)
router.get('/techniques/:id', TechniqueController.getTechnique)
router.put('/techniques/:id', TechniqueController.updateTechnique)
router.delete('/techniques/:id', TechniqueController.deleteTechnique)

module.exports = router
