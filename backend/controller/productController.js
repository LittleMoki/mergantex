const { prisma } = require('../prisma/prisma-client')

const ProductController = {
	createProduct: async (req, res) => {
		const { productsCategoryId, translations } = req.body

		console.log('Received data:', { productsCategoryId, translations })

		if (!productsCategoryId || !translations || translations.length === 0) {
			return res.status(400).json({ error: 'Некорректные данные' })
		}

		try {
			const product = await prisma.product.create({
				data: {
					productsCategoryId,
					translations: {
						create: translations,
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
					translations: { where: { language: lang } },
				},
			})
			res.json(products)
		} catch (error) {
			console.error('Ошибка при получении продуктов:', error)
			res.status(500).json({ error: 'Ошибка при получении продуктов' })
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
}

module.exports = ProductController
