'use client'
import { API_BASE_URL } from '@/api/config'
import { Button, Input } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LANGUAGES = ['uz', 'ru', 'en','cn']

const TechniqueEditAdminPage = () => {
	const [form, setForm] = useState({
		name: '',
		translations: LANGUAGES.map(lang => ({
			language: lang,
			title: '',
			subtitle: '',
			description: '',
		})),
	})
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [image, setImage] = useState(null)
	const { id, locale } = useParams()
	const router = useRouter()

	const fetchTechnique = async () => {
		try {
			const responses = await Promise.all(
				LANGUAGES.map(lang =>
					fetch(`${API_BASE_URL}/techniques/${id}?lang=${lang}`)
				)
			)

			const data = await Promise.all(
				responses.map(res => {
					if (!res.ok) throw new Error('Ошибка при получении техники')
					return res.json()
				})
			)

			const translations = data.map(item => item.translations[0]) // Предполагается, что массив переводов не пустой
			setForm({
				name: data[0].name, // Имя на узбекском
				translations,
			})
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	useEffect(() => {
		fetchTechnique()
	}, [id])

	const handleChange = e => {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	const handleTranslationChange = (index, e) => {
		const { name, value } = e.target
		const newTranslations = [...form.translations]
		newTranslations[index][name] = value
		setForm(prev => ({ ...prev, translations: newTranslations }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		setErrorMessage('')
		const url = `${API_BASE_URL}/techniques/${id}`

		const formData = new FormData()
		formData.append('name', form.name)
		formData.append('image', image)

		formData.append('translations', JSON.stringify(form.translations))
		// Правильная передача translations в FormData
		try {
			const response = await fetch(url, {
				method: 'PUT',
				body: formData,
			})
			if (!response.ok) throw new Error('Ошибка при отправке данных')
			router.push(`/${locale}/admin/techniques`)
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='container px-3 mx-auto text-white'>
			<h1>Редактирование Техники</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<Input
					type='text'
					name='name'
					placeholder='Имя техники'
					value={form.name}
					onChange={handleChange}
					required
				/>
				<input
					type='file'
					accept='image/*'
					onChange={e => setImage(e.target.files[0])}
				/>
				{form.translations.map((trans, index) => (
					<div className='flex flex-col gap-3' key={trans?.language}>
						<h3>Перевод на {trans?.language}</h3>
						<Input
							type='text'
							name='title'
							placeholder='Название'
							value={trans?.title}
							onChange={e => handleTranslationChange(index, e)}
							required
						/>
						<Input
							name='description'
							placeholder='Описание'
							value={trans?.description}
							onChange={e => handleTranslationChange(index, e)}
							required
						/>
					</div>
				))}
				<Button type='submit' disabled={loading}>
					{loading ? 'Загрузка...' : 'Обновить'}
				</Button>
				{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
			</form>
		</div>
	)
}

export default TechniqueEditAdminPage
