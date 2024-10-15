import { Button, Input, Textarea } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaRegPenToSquare } from 'react-icons/fa6'

const TechniqueForm = () => {
	const [techniques, setTechniques] = useState([])
	const [form, setForm] = useState({
		name: '',
		translations: [
			{ language: 'uz', title: '', description: '' },
			{ language: 'ru', title: '', description: '' },
			{ language: 'en', title: '', description: '' },
		],
	})
	const [editing, setEditing] = useState(null)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const fetchTechniques = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/techniques')
			if (!response.ok) throw new Error('Ошибка при получении техник')
			const data = await response.json()
			setTechniques(Array.isArray(data) ? data : [])
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	useEffect(() => {
		fetchTechniques()
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
		const method = editing ? 'PUT' : 'POST'
		const url = editing
			? `http://localhost:3000/api/techniques/${editing}`
			: 'http://localhost:3000/api/techniques'

		try {
			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
			if (!response.ok) throw new Error('Ошибка при отправке данных')
			await fetchTechniques()
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
				{ language: 'uz', title: '', description: '' },
				{ language: 'ru', title: '', description: '' },
				{ language: 'en', title: '', description: '' },
			],
		})
		setEditing(null)
	}

	const handleEdit = technique => {
		setForm({
			name: technique.name,
			translations: technique.translations.map(trans => ({
				language: trans.language,
				title: trans.title,
				description: trans.description,
			})),
		})
		setEditing(technique.id)
	}

	const handleDelete = async id => {
		setLoading(true)
		try {
			await fetch(`http://localhost:3000/api/techniques/${id}`, {
				method: 'DELETE',
			})
			await fetchTechniques()
		} catch (error) {
			console.error(error)
			setErrorMessage('Ошибка при удалении техники')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>Управление Техниками</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<Input
					type='text'
					name='name'
					placeholder='Имя техники'
					value={form.name}
					onChange={handleChange}
					required
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
						<Textarea
							name='description'
							placeholder='Описание'
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

			<h2>Список Техник</h2>
			<ul className='flex flex-wrap'>
					{techniques.map(technique => (
					<li className='bg-white items-center gap-2 flex p-3 text-black' key={technique.id}>
						<h3>{technique.translations[0].title}</h3>
						<FaRegPenToSquare
							className='cursor-pointer'
							onClick={() => handleEdit(technique)}
						/>
						<FaTrash
							className='cursor-pointer hover:text-red-500'
							onClick={() => handleDelete(technique.id)}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TechniqueForm
