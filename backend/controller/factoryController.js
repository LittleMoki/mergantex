const { prisma } = require('../prisma/prisma-client')

const FactoryController = {
	createFactory: async (req, res) => {
		const { name, translations } = req.body

		// Проверка на наличие обязательных полей
		if (
			!req.file ||
			!name ||
			!Array.isArray(translations) ||
			translations.length === 0
		) {
			return res
				.status(400)
				.json({ error: 'Недостаточно данных для создания фабрики' })
		}

		// Проверка на валидность каждого перевода
		for (const translation of translations) {
			if (!translation.language || !translation.title || !translation.name) {
				return res.status(400).json({
					error: 'Каждый перевод должен содержать язык, название и имя',
				})
			}
		}

		try {
			const factory = await prisma.factory.create({
				data: {
					name, // Обязательное поле
					image: req.file.originalname,
					translations: {
						create: translations.map(translation => ({
							language: translation.language,
							title: translation.title,
							name: translation.name, // Обязательное поле в переводах
							description: translation.description, // Обязательное поле в переводах
						})),
					},
				},
			})
			res.status(201).json(factory)
		} catch (error) {
			console.error('Ошибка при создании фабрики:', error)
			res
				.status(500)
				.json({ error: error.message || 'Ошибка при создании фабрики' })
		}
	},
	updateFactory: async (req, res) => {
		const { id } = req.params
		const { name, translations } = req.body
	
		try {
			const factoryExists = await prisma.factory.findUnique({
				where: { id: Number(id) },
			})
			if (!factoryExists) {
				return res.status(404).json({ error: 'Фабрика не найдена' })
			}
	
			// Преобразуем JSON-строки в объекты
			const translationsData = JSON.parse(translations)
	
			const factory = await prisma.factory.update({
				where: { id: Number(id) },
				data: {
					name,
					translations: {
						deleteMany: {}, // Удаляем старые переводы
						create: translationsData.map(translation => ({
							language: translation.language,
							title: translation.title,
							name: translation.name,
							description: translation.description,
						})),
					},
				},
			})
	
			res.json(factory)
		} catch (error) {
			console.error('Ошибка при обновлении фабрики:', error)
			res.status(500).json({ error: 'Ошибка при обновлении фабрики' })
		}
	},
	

	deleteFactory: async (req, res) => {
		const { id } = req.params

		try {
			await prisma.factory.delete({
				where: { id: Number(id) },
			})

			res.status(204).send() // Успешное удаление, без контента
		} catch (error) {
			console.error('Ошибка при удалении фабрики:', error)
			res.status(500).json({ error: 'Ошибка при удалении фабрики' })
		}
	},

	getFactories: async (req, res) => {
		const { lang = 'ru' } = req.query

		try {
			const factories = await prisma.factory.findMany({
				include: {
					translations: {
						where: { language: lang },
					},
				},
			})
			res.json(factories)
		} catch (error) {
			console.error('Ошибка при получении фабрик:', error)
			res.status(500).json({ error: 'Ошибка при получении фабрик' })
		}
	},

	getFactory: async (req, res) => {
		const { id } = req.params
		const { lang = 'ru' } = req.query

		try {
			const factory = await prisma.factory.findUnique({
				where: { id: Number(id) },
				include: {
					translations: {
						where: { language: lang },
					},
				},
			})

			if (!factory) {
				return res.status(404).json({ error: 'Фабрика не найдена' })
			}

			res.json(factory)
		} catch (error) {
			console.error('Ошибка при получении фабрики:', error)
			res.status(500).json({ error: 'Ошибка при получении фабрики' })
		}
	},
}

module.exports = FactoryController
