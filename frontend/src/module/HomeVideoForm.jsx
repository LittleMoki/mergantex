'use client'
import { API_BASE_URL } from '@/api/config'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const HomeVideoForm = () => {
	const [homeVideo, setHomeVideo] = useState([])
	const [imageFile, setImageFile] = useState(null)

	const handleSubmit = async () => {
		const formData = new FormData()
		formData.append('image', imageFile)

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

	useEffect(() => {
		fetchVideoHome()
	}, [])

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

	return (
		<div className='container px-3 mx-auto text-white'>
			<div className='flex flex-col gap-4'>
				<h3>Создать фото</h3>

				<input
					type='file'
					onChange={e => setImageFile(e.target.files[0])}
					accept='image/*'
				/>

				<Button onClick={handleSubmit}>Создать</Button>
			</div>
			<div className='flex gap-4 justify-start py-6 flex-wrap'>
				{homeVideo.map(el => (
					<p className='bg-white text-black p-3 flex  gap-2 items-center'>
						{el.image}
						<FaTrash className='hover:text-red-500 cursor-pointer' onClick={() => handleDeleteVideos(el.id)} />
					</p>
				))}
			</div>
		</div>
	)
}

export default HomeVideoForm
