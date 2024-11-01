const { prisma } = require('../prisma/prisma-client')

const ProductCategoryController = {
	createCategory: async (req, res) => {
		const { url, translations } = req.body


		try {
			const category = await prisma.productsCategory.create({
				data: {
					url,
					translations: {
						create: translations,
					},
				},
			})
			res.status(201).json(category)
		} catch (error) {
			console.error('Ошибка при создании категории:', error)
			res.status(500).json({ error: 'Ошибка при создании категории' })
		}
	},

	updateCategory: async (req, res) => {
		const { id } = req.params
		const { translations } = req.body

		try {
			const category = await prisma.productsCategory.update({
				where: { id: Number(id) },
				data: {
					translations: {
						deleteMany: {},
						create: translations, // Используем set для обновления массива переводов
					},
				},
			})

			res.json(category)
		} catch (error) {
			console.error('Ошибка при обновлении категории:', error)
			res.status(500).json({ error: 'Ошибка при обновлении категории' })
		}
	},

	deleteCategory: async (req, res) => {
		const { id } = req.params

		try {
			await prisma.productsCategory.delete({
				where: { id: Number(id) },
			})

			res.status(204).send() // Успешное удаление, без контента
		} catch (error) {
			console.error('Ошибка при удалении категории:', error)
			res.status(500).json({ error: 'Ошибка при удалении категории' })
		}
	},

	getCategories: async (req, res) => {
		const { lang = 'ru' } = req.query

		try {
			const categories = await prisma.productsCategory.findMany({
				include: {
					translations: {
						where: { language: lang },
					},
				},
			})
			res.json(categories)
		} catch (error) {
			console.error('Ошибка при получении категорий:', error)
			res.status(500).json({ error: 'Ошибка при получении категорий' })
		}
	},

	getCategory: async (req, res) => {
		const { id } = req.params
		const { lang = 'ru' } = req.query

		try {
			const category = await prisma.productsCategory.findUnique({
				where: { id: Number(id) },
				include: {
					translations: {
						where: { language: lang },
					},
				},
			})

			if (!category) {
				return res.status(404).json({ error: 'Категория не найдена' })
			}

			res.json(category)
		} catch (error) {
			console.error('Ошибка при получении категории:', error)
			res.status(500).json({ error: 'Ошибка при получении категории' })
		}
	},
}

module.exports = ProductCategoryController
