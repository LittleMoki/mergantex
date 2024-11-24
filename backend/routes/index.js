const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
	ProductCategoryController,
	ProductController,
	FactoryController,
	TechniqueController,
	HomeVideo,
	AboutVideo,
} = require('../controller')
const { prisma } = require('../prisma/prisma-client')

// uploads storage

const uploadsDestination = 'uploads'

const storage = multer.diskStorage({
	destination: uploadsDestination,
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: storage })

// category

router.post(
	'/categories',
	upload.single('image'),
	ProductCategoryController.createCategory
)
router.get('/categories', ProductCategoryController.getCategories)
router.get('/categories/:id', ProductCategoryController.getCategory)
router.put(
	'/categories/:id',
	upload.single('image'),
	ProductCategoryController.updateCategory
)
router.delete('/categories/:id', ProductCategoryController.deleteCategory)

// product

// Маршруты для продукта
router.post(
	'/products',
	upload.array('images'),
	ProductController.createProduct
)
router.get('/products', ProductController.getProducts)
router.get('/products/images/:id', ProductController.getProductImages)
router.delete('/products/images/:id', ProductController.deleteProductImage)
router.get('/products/:id', ProductController.getProductById)
router.put(
	'/products/:id',
	upload.array('images'),
	ProductController.updateProduct
)
router.delete('/products/:id', ProductController.deleteProduct)

router.post(
	'/factories',
	upload.single('image'),
	FactoryController.createFactory
)
router.get('/factories', FactoryController.getFactories)
router.get('/factories/:id', FactoryController.getFactory)
router.delete('/factories/:id', FactoryController.deleteFactory)
router.put(
	'/factories/:id',
	upload.single('image'),
	FactoryController.updateFactory
)

router.post(
	'/techniques',
	upload.single('image'),
	TechniqueController.createTechnique
)
router.get('/techniques', TechniqueController.getTechniques)
router.get('/techniques/:id', TechniqueController.getTechnique)
router.put(
	'/techniques/:id',
	upload.single('image'),
	TechniqueController.updateTechnique
)
router.delete('/techniques/:id', TechniqueController.deleteTechnique)

// Маршруты для видео
router.post('/video', upload.single('image'), HomeVideo.createVideo)
router.get('/video', HomeVideo.getAllVideo)
router.put('/video/:id', upload.single('image'), HomeVideo.updateVideo)
router.delete('/video/:id', HomeVideo.deleteVideo)

router.post('/videos', AboutVideo.createVideo)
router.get('/videos', AboutVideo.getAllVideo)
router.delete('/videos/:id', AboutVideo.deleteVideo)

module.exports = router
