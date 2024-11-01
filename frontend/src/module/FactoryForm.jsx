'use client'
import { API_BASE_URL } from '@/api/config'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaRegPenToSquare } from 'react-icons/fa6'

const FactoryForm = () => {
	const [factories, setFactories] = useState([])
	const [form, setForm] = useState({
		name: '',
		translations: [
			{ language: 'uz', title: '', name: '', description: '' },
			{ language: 'ru', title: '', name: '', description: '' },
			{ language: 'en', title: '', name: '', description: '' },
			{ language: 'cn', title: '', name: '', description: '' },
		],
	})
	const { locale } = useParams()
	const [editing, setEditing] = useState(null)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [image, setImage] = useState(null)

	const fetchFactories = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/factories`)
			if (!response.ok) throw new Error('Ошибка при получении фабрик')
			const data = await response.json()
			setFactories(Array.isArray(data) ? data : [])
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	useEffect(() => {
		fetchFactories()
	}, [])

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
		const method = 'POST'
		const url = `${API_BASE_URL}/factories`

		const formData = new FormData()
		formData.append('name', form.name)
		formData.append('image', image)

		form.translations.forEach((trans, index) => {
			formData.append(`translations[${index}][language]`, trans.language)
			formData.append(`translations[${index}][title]`, trans.title)
			formData.append(`translations[${index}][name]`, trans.name) // Добавлено
			formData.append(`translations[${index}][description]`, trans.description)
		})

		try {
			const response = await fetch(url, {
				method,
				body: formData,
			})
			if (!response.ok) throw new Error('Ошибка при отправке данных')
			await fetchFactories()
			resetForm()
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		} finally {
			setLoading(false)
		}
	}

	const resetForm = () => {
		setForm({
			name: '',
			translations: [
				{ language: 'uz', title: '', name: '', description: '' },
				{ language: 'ru', title: '', name: '', description: '' },
				{ language: 'en', title: '', name: '', description: '' },
			],
		})
	}

	const handleDelete = async id => {
		setLoading(true)
		try {
			await fetch(`${API_BASE_URL}/factories/${id}`, {
				method: 'DELETE',
			})
			await fetchFactories()
		} catch (error) {
			console.error(error)
			setErrorMessage('Ошибка при удалении фабрики')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='container px-3 mx-auto text-white'>
			<h1>Управление Фабриками</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<Input
					type='text'
					name='name'
					placeholder='Имя фабрики'
					value={form.name}
					onChange={handleChange}
					required
				/>
				<input
					type='file'
					accept='image/*'
					onChange={e => {
						setImage(e.target.files[0])
					}}
				/>
				{form.translations.map((trans, index) => (
					<div className='flex flex-col gap-3' key={trans.language}>
						<h3>Перевод на {trans.language}</h3>
						<Input
							type='text'
							name='title'
							placeholder='Название'
							value={trans.title}
							onChange={e => handleTranslationChange(index, e)}
							required
						/>
						<Input
							type='text'
							name='name' // Новое поле для имени
							placeholder='Номер'
							value={trans.name}
							onChange={e => handleTranslationChange(index, e)}
							required
						/>
						<Input
							name='description'
							placeholder='Адрес'
							value={trans.description}
							onChange={e => handleTranslationChange(index, e)}
							required
						/>
					</div>
				))}
				<Button type='submit' disabled={loading}>
					{loading ? 'Загрузка...' : editing ? 'Обновить' : 'Создать'}
				</Button>
				{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
			</form>

			<h2>Список Фабрик</h2>
			<ul className='flex flex-wrap'>
				{factories.map(factory => (
					<li
						className='bg-white flex gap-3 p-3 rounded-lg text-black'
						key={factory.id}
					>
						<h3>{factory.name}</h3>
						<div className='flex items-center gap-4'>
							<Link href={`/${locale}/admin/factories/${factory.id}`}>
								<FaRegPenToSquare className='cursor-pointer' />
							</Link>
							<FaTrash
								className='cursor-pointer hover:text-red-500'
								onClick={() => handleDelete(factory.id)}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default FactoryForm
