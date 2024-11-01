const { prisma } = require('../prisma/prisma-client')

const TechniqueController = {
	createTechnique: async (req, res) => {
		const { translations } = req.body

		// Проверка на наличие обязательных полей
		if (
			!req.file ||
			!Array.isArray(translations) ||
			translations.length === 0
		) {
			return res
				.status(400)
				.json({ error: 'Недостаточно данных для создания техники' })
		}

		// Проверка на валидность каждого перевода
		for (const translation of translations) {
			if (
				!translation.language ||
				!translation.title ||
				!translation.description
			) {
				return res.status(400).json({
					error: 'Каждый перевод должен содержать язык, заголовок и описание',
				})
			}
		}

		try {
			const technique = await prisma.technique.create({
				data: {
					image: req.file.originalname, // Опциональное поле для изображения
					translations: {
						create: translations.map(translation => ({
							language: translation.language,
							title: translation.title,
							subtitle: translation.subtitle, // Опциональное поле
							description: translation.description, // Обязательное поле в переводах
						})),
					},
				},
			})
			res.status(201).json(technique)
		} catch (error) {
			console.error('Ошибка при создании техники:', error)
			res
				.status(500)
				.json({ error: error.message || 'Ошибка при создании техники' })
		}
	},

	updateTechnique: async (req, res) => {
		const { id } = req.params
		const { name, translations } = req.body
		try {
			const techniqueExists = await prisma.technique.findUnique({
				where: { id: Number(id) },
			})
			if (!techniqueExists) {
				return res.status(404).json({ error: 'Техника не найдена' })
			}

			// Преобразуем JSON-строки в объекты
			const translationsData = JSON.parse(translations)
			const technique = await prisma.technique.update({
				where: { id: Number(id) },
				data: {
					image: req.file.originalname,
					translations: {
						deleteMany: {}, // Удаляем старые переводы
						create: translationsData.map(translation => ({
							language: translation.language,
							title: translation.title,
							subtitle: translation.subtitle,
							description: translation.description,
						})),
					},
				},
			})

			res.json(technique)
		} catch (error) {
			console.error('Ошибка при обновлении техники:', error)
			res.status(500).json({ error: 'Ошибка при обновлении техники' })
		}
	},

	deleteTechnique: async (req, res) => {
		const { id } = req.params

		try {
			await prisma.technique.delete({
				where: { id: Number(id) },
			})

			res.status(204).send() // Успешное удаление, без контента
		} catch (error) {
			console.error('Ошибка при удалении техники:', error)
			res.status(500).json({ error: 'Ошибка при удалении техники' })
		}
	},

	getTechniques: async (req, res) => {
		const { lang = 'ru' } = req.query

		try {
			const techniques = await prisma.technique.findMany({
				include: {
					translations: {
						where: { language: lang },
					},
				},
			})
			res.json(techniques)
		} catch (error) {
			console.error('Ошибка при получении техник:', error)
			res.status(500).json({ error: 'Ошибка при получении техник' })
		}
	},

	getTechnique: async (req, res) => {
		const { id } = req.params
		const { lang = 'ru' } = req.query

		try {
			const technique = await prisma.technique.findUnique({
				where: { id: Number(id) },
				include: {
					translations: {
						where: { language: lang },
					},
				},
			})

			if (!technique) {
				return res.status(404).json({ error: 'Техника не найдена' })
			}

			res.json(technique)
		} catch (error) {
			console.error('Ошибка при получении техники:', error)
			res.status(500).json({ error: 'Ошибка при получении техники' })
		}
	},
}

module.exports = TechniqueController
