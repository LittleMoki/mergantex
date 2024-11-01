const { prisma } = require('../prisma/prisma-client')

const HomeVideo = {
	// Создание видео или изображения
	createVideo: async (req, res) => {
		try {
			const imageFile = req.file.originalname || null // Используем правильный путь к файлу

			const homeVideo = await prisma.homePageVideo.create({
				data: {
					image: imageFile,
				},
			})

			res.status(201).json(homeVideo)
		} catch (error) {
			console.error('Ошибка при создании видео:', error)
			res.status(500).json({ error: 'Ошибка при создании видео' })
		}
	},

	getAllVideo: async (req, res) => {
		try {
			const video = await prisma.homePageVideo.findMany({})

			res.status(200).send(video)
		} catch (error) {
			console.error('Ошибка при обновлении видео:', error)
			res.status(500).json({ error: 'Ошибка при обновлении видео' })
		}
	},

	// Обновление видео или изображения
	updateVideo: async (req, res) => {
		const { id } = req.params
		const { isVideo, videoLink } = req.body

		try {
			const imageFile = req.files || null
			const homeVideo = await prisma.homePageVideo.update({
				where: { id: parseInt(id) },
				data: {
					video: isVideo === 'true' ? videoLink : null,
					image: !isVideo ? imageFile : null,
					isVideo: isVideo === 'true',
				},
			})

			res.status(200).json(homeVideo)
		} catch (error) {
			console.error('Ошибка при обновлении видео:', error)
			res.status(500).json({ error: 'Ошибка при обновлении видео' })
		}
	},

	// Удаление видео или изображения
	deleteVideo: async (req, res) => {
		const { id } = req.params

		try {
			await prisma.homePageVideo.delete({ where: { id: parseInt(id) } })
			res.status(204).send()
		} catch (error) {
			console.error('Ошибка при удалении видео:', error)
			res.status(500).json({ error: 'Ошибка при удалении видео' })
		}
	},
}

module.exports = {
	HomeVideo,
}
