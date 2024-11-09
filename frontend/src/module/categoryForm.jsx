'use client'

import { API_BASE_URL } from '@/api/config'
import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'

const CategoryForm = ({ onCategoryCreated }) => {
	const [image, setImage] = useState(null)

	const [translations, setTranslations] = useState([
		{ language: 'ru', name: '' },
		{ language: 'en', name: '' },
		{ language: 'uz', name: '' },
		{ language: 'cn', name: '' },
	])

	const handleChangeTranslation = (index, field, value) => {
		const newTranslations = [...translations]
		newTranslations[index][field] = value
		setTranslations(newTranslations)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', image)
		formData.append('translations', JSON.stringify(translations))

		try {
			await fetch(`${API_BASE_URL}/categories`, {
				method: 'POST',
				body: formData,
			})
			onCategoryCreated() // Update categories
		} catch (error) {
			console.error('Ошибка при создании категории:', error)
		}
	}

	return (
		<form className='flex flex-col gap-3 py-5' onSubmit={handleSubmit}>
			<h2 className='text-3xl font-bold text-white'>Создание категорий</h2>
			<input
				type='file'
				accept='image/*'
				onChange={e => {
					setImage(e.target.files[0])
				}}
			/>
			{translations.map((t, index) => (
				<div key={index}>
					<Input
						type='text'
						placeholder={`Название (${t.language})`}
						value={t.name}
						onChange={e =>
							handleChangeTranslation(index, 'name', e.target.value)
						}
						required
					/>
				</div>
			))}

			<Button type='submit'>Создать категорию</Button>
		</form>
	)
}

export default CategoryForm
