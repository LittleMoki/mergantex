const { prisma } = require('../prisma/prisma-client')

const ProductController = {
	createProduct: async (req, res) => {
		const { productsCategoryId, translations } = req.body

		if (
			!productsCategoryId ||
			!translations ||
			translations.length === 0 ||
			!req.files || // Измените на req.files
			req.files.length === 0 // Проверяем наличие файлов
		) {
			return res.status(400).json({ error: 'Некорректные данные' })
		}
		const categoryExists = await prisma.productsCategory.findUnique({
			where: { id: Number(productsCategoryId) },
		})
		try {
			// Сохраняем массив изображений
			const product = await prisma.product.create({
				data: {
					productsCategoryId: Number(productsCategoryId),
					images: {
						create: {
							image: req.files.map(file => file.originalname).join(','),
						},
					},
					translations: {
						create: JSON.parse(translations),
					},
				},
			})

			res.status(201).json(product)
		} catch (error) {
			console.error('Ошибка при создании продукта:', error)
			res.status(500).json({ error: 'Ошибка при создании продукта' })
		}
	},

	getProducts: async (req, res) => {
		const { lang = 'ru' } = req.query

		try {
			const products = await prisma.product.findMany({
				include: {
					ProductsCategory: {
						include: { translations: { where: { language: lang } } },
					},
					images: true,
					translations: { where: { language: lang } },
				},
			})
			res.json(products)
		} catch (error) {
			console.error('Ошибка при получении продуктов:', error)
			res.status(500).json({ error: 'Ошибка при получении продуктов' })
		}
	},

	getProductImages: async (req, res) => {
		const { id } = req.params

		try {
			const images = await prisma.productImage.findMany({
			
				where: { productId: Number(id) }, // Условие поиска по productId
			})
			res.json(images)
		} catch (error) {
			console.error('Ошибка при получении продуктов:', error)
			res.status(500).json({ error: 'Ошибка при получении продуктов' })
		}
	},
	deleteProductImage: async (req, res) => {
		const { id } = req.params // Получаем imageId из параметров маршрута

		try {
			// Удаляем одно изображение по его ID
			const deletedImage = await prisma.productImage.delete({
				where: { id: Number(id) },
			})

			res.json({ message: 'Изображение успешно удалено', deletedImage })
		} catch (error) {
			console.error('Ошибка при удалении изображения:', error)
			res.status(500).json({ error: 'Ошибка при удалении изображения' })
		}
	},

	deleteProduct: async (req, res) => {
		const { id } = req.params

		try {
			const deletedProduct = await prisma.product.delete({
				where: { id: Number(id) },
			})
			res.json({ message: 'Продукт успешно удалён', product: deletedProduct })
		} catch (error) {
			console.error('Ошибка при удалении продукта:', error)
			res.status(500).json({ error: 'Ошибка при удалении продукта' })
		}
	},

	getProductById: async (req, res) => {
		const { id } = req.params
		const { lang = 'ru' } = req.query

		try {
			const product = await prisma.product.findUnique({
				where: { id: Number(id) },
				include: {
					ProductsCategory: {
						include: { translations: { where: { language: lang } } },
					},
					translations: { where: { language: lang } },
				},
			})

			if (!product) {
				return res.status(404).json({ error: 'Продукт не найден' })
			}

			res.json(product)
		} catch (error) {
			console.error('Ошибка при получении продукта:', error)
			res.status(500).json({ error: 'Ошибка при получении продукта' })
		}
	},
	updateProduct: async (req, res) => {
		const { id } = req.params
		const { productsCategoryId, translations } = req.body

		try {
			if (!id || !productsCategoryId || !translations)
				return res.status(400).json({ error: 'Некорректные данные' })

			// Если файлы не были переданы
			const images = req.files
				? req.files.map(file => ({ image: file.originalname }))
				: []

			const updatedProduct = await prisma.product.update({
				where: { id: Number(id) },
				data: {
					productsCategoryId: Number(productsCategoryId),
					images: {
						deleteMany: {}, // Удаляем старые изображения
						create: images, // Создаем новые изображения
					},
					translations: {
						deleteMany: {}, // Удаляем старые переводы
						create: JSON.parse(translations).map(t => ({
							language: t.language,
							title: t.title,
							subtitle: t.subtitle,
							description: t.description,
						})),
					},
				},
			})

			res
				.status(200)
				.json({ product: updatedProduct, message: 'Продукт обновлен успешно' })
		} catch (error) {
			console.error('Ошибка при обновлении продукта:', error)
			res.status(500).json({ error: 'Ошибка при обновлении продукта' })
		}
	},
}

module.exports = ProductController
