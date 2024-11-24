'use client'
import { API_BASE_URL } from '@/api/config'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const HomeVideoForm = () => {
	const [homeVideo, setHomeVideo] = useState([])
	const [imageFile, setImageFile] = useState(null)
	const [video, setVideo] = useState([])
	const [videoInput, setVideoInput] = useState('')

	const handleSubmit = async () => {
		const formData = new FormData()
		formData.append('image', imageFile)
		if (imageFile === null) throw new Error('Фотопустое')

		try {
			const response = await fetch(`${API_BASE_URL}/video`, {
				method: 'POST',
				body: formData,
			})
			fetchVideoHome()
			await response.json()
		} catch (error) {
			console.error('Ошибка при создании видео:', error)
		}
	}

	const fetchVideoHome = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/video`)
			if (!response.ok) throw new Error('Ошибка при создании видео')

			const data = await response.json()

			setHomeVideo(data)
		} catch (error) {
			console.error('Ошибка при создании видео:', error)
		}
	}

	const handleDeleteVideos = async id => {
		try {
			await fetch(`${API_BASE_URL}/video/${id}`, {
				method: 'DELETE',
			})
			await fetchVideoHome()
		} catch (error) {
			console.error(error)
			setErrorMessage('Ошибка при удалении фабрики')
		}
	}

	const fetchVideoAbout = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/videos`)
			if (!response.ok) throw new Error('Ошибка при создании видео')

			const data = await response.json()

			setVideo(data)
		} catch (error) {
			console.error('Ошибка при создании видео:', error)
		}
	}
	const handleSubmitAboutVideo = async () => {
		try {
			if (!videoInput.trim()) {
				throw new Error('Видео пустое')
			}

			const response = await fetch(`${API_BASE_URL}/videos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Указываем, что тело запроса — JSON
				},
				body: JSON.stringify({
					link: videoInput, // Передаем значение переменной
				}),
			})

			if (!response.ok) {
				throw new Error(`Ошибка сервера: ${response.statusText}`)
			}

			const data = await response.json()
			console.log('Видео добавлено:', data)

			// Очищаем поле ввода
			setVideoInput('')
			fetchVideoAbout() // Обновляем список видео
		} catch (error) {
			console.error('Ошибка при создании видео:', error)
		}
	}

	const handleDeleteVideosAbout = async id => {
		try {
			await fetch(`${API_BASE_URL}/videos/${id}`, {
				method: 'DELETE',
			})
			await fetchVideoAbout()
		} catch (error) {
			console.error(error)
			setErrorMessage('Ошибка при удалении фабрики')
		}
	}

	useEffect(() => {
		fetchVideoAbout()
		fetchVideoHome()
	}, [])
	return (
		<div className='container px-3 mx-auto text-white'>
			<div className='flex flex-col gap-4'>
				<h3>Создать фото</h3>

				<input
					type='file'
					onChange={e => setImageFile(e.target.files[0])}
					accept='image/*'
				/>

				<Button onClick={handleSubmit}>Создать фото</Button>
			</div>
			<div className='flex gap-4 justify-start py-6 flex-wrap'>
				{homeVideo.map(el => (
					<p
						key={el.id}
						className='bg-white text-black p-3 flex  gap-2 items-center'
					>
						{el.image}
						<FaTrash
							className='hover:text-red-500 cursor-pointer'
							onClick={() => handleDeleteVideos(el.id)}
						/>
					</p>
				))}
			</div>
			<div className='flex flex-col gap-4'>
				<Input
					value={videoInput}
					onChange={e => setVideoInput(e.target.value)}
					placeholder='Ссылка на youtube'
					description={
						<p className='text-base'>
							Пример ссылки https://www.youtube.com/watch?v=
							<strong className='text-red-900'>_vx9LQL6I5s</strong>
							{` `}
							вставьте только выделенный текст
						</p>
					}
				/>
				<div className='flex gap-3 flex-wrap'>
					{video?.map(el => (
						<p
							key={el.id}
							className='bg-white text-black py-1 px-4 flex  items-center gap-2'
						>
							{el.link}{' '}
							<FaTrash
								className='hover:text-red-500 cursor-pointer'
								onClick={() => handleDeleteVideosAbout(el.id)}
							/>
						</p>
					))}
				</div>
				<Button onClick={handleSubmitAboutVideo}>Создать видео</Button>
			</div>
		</div>
	)
}

export default HomeVideoForm
